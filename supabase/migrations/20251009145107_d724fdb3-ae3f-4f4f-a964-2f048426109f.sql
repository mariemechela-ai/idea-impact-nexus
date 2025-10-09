-- Phase 1: Fix Privilege Escalation - Create user_roles table with proper RLS
-- Step 1: Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Step 2: Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    UNIQUE (user_id, role)
);

-- Step 3: Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 4: Create security definer function BEFORE using it in policies
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Step 5: Update is_admin function to use new user_roles table
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

-- Step 6: NOW create policies using the function
CREATE POLICY "Only admins can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own roles, admins can view all"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR user_id = auth.uid());

CREATE POLICY "Only admins can update roles"
ON public.user_roles FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Step 7: Migrate existing admin data from profiles to user_roles
INSERT INTO public.user_roles (user_id, role, created_by)
SELECT user_id, 'admin'::app_role, user_id
FROM public.profiles
WHERE role = 'admin'
ON CONFLICT (user_id, role) DO NOTHING;

-- Step 8: Update admin management functions
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(target_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied. Only admins can promote users.';
  END IF;
  
  INSERT INTO public.user_roles (user_id, role, created_by)
  VALUES (target_user_id, 'admin', auth.uid())
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

CREATE OR REPLACE FUNCTION public.create_initial_admin(target_user_id UUID, admin_secret TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_count INTEGER;
  expected_secret TEXT;
BEGIN
  expected_secret := 'INITIAL_ADMIN_SECRET_2024';
  
  IF admin_secret != expected_secret THEN
    RAISE EXCEPTION 'Invalid admin secret provided.';
  END IF;
  
  SELECT COUNT(*) INTO admin_count 
  FROM public.user_roles 
  WHERE role = 'admin';
  
  IF admin_count > 0 THEN
    RAISE EXCEPTION 'Initial admin already exists. Use promote_user_to_admin instead.';
  END IF;
  
  INSERT INTO public.user_roles (user_id, role, created_by)
  VALUES (target_user_id, 'admin', target_user_id);
  
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (target_user_id, 'Initial Admin')
  ON CONFLICT (user_id) DO NOTHING;
END;
$$;

-- Step 9: Remove vulnerable role column from profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- Phase 2: Fix Storage Access - Add SELECT policies for storage buckets
CREATE POLICY "Only admins can download CVs"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'cvs' AND public.is_admin());

CREATE POLICY "Only admins can download contact documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'contact-documents' AND public.is_admin());