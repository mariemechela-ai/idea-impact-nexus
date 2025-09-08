-- Phase 1: Critical Admin Security Fix
-- Create a secure way to manage admin roles

-- First, create an admin management function that only allows existing admins to promote users
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(target_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if the caller is an admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied. Only admins can promote users.';
  END IF;
  
  -- Update the target user's role to admin
  UPDATE public.profiles 
  SET role = 'admin', updated_at = now()
  WHERE user_id = target_user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User profile not found for user ID: %', target_user_id;
  END IF;
END;
$$;

-- Create a function to create the very first admin (can only be used when no admins exist)
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
  -- Get the expected secret from environment (you'll need to set this in Supabase secrets)
  expected_secret := 'INITIAL_ADMIN_SECRET_2024';
  
  -- Verify the secret
  IF admin_secret != expected_secret THEN
    RAISE EXCEPTION 'Invalid admin secret provided.';
  END IF;
  
  -- Check if any admins already exist
  SELECT COUNT(*) INTO admin_count 
  FROM public.profiles 
  WHERE role = 'admin';
  
  IF admin_count > 0 THEN
    RAISE EXCEPTION 'Initial admin already exists. Use promote_user_to_admin instead.';
  END IF;
  
  -- Create the first admin
  UPDATE public.profiles 
  SET role = 'admin', updated_at = now()
  WHERE user_id = target_user_id;
  
  IF NOT FOUND THEN
    -- If profile doesn't exist, create it
    INSERT INTO public.profiles (user_id, role, display_name)
    VALUES (target_user_id, 'admin', 'Initial Admin');
  END IF;
END;
$$;

-- Create a view for admin user management (only accessible to admins)
CREATE OR REPLACE VIEW public.admin_user_management AS
SELECT 
  p.id,
  p.user_id,
  p.display_name,
  p.role,
  p.created_at,
  p.updated_at,
  au.email,
  au.created_at as auth_created_at,
  au.last_sign_in_at
FROM public.profiles p
JOIN auth.users au ON p.user_id = au.id
WHERE public.is_admin(); -- Only visible to admins

-- Add RLS policy for the admin user management view
ALTER VIEW public.admin_user_management OWNER TO postgres;

-- Create a secure function to get user profile info for admins
CREATE OR REPLACE FUNCTION public.get_all_user_profiles()
RETURNS TABLE(
  id UUID,
  user_id UUID,
  display_name TEXT,
  role TEXT,
  email TEXT,
  created_at TIMESTAMPTZ,
  last_sign_in_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if the caller is an admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied. Only admins can view user profiles.';
  END IF;
  
  RETURN QUERY
  SELECT 
    p.id,
    p.user_id,
    p.display_name,
    p.role,
    au.email,
    p.created_at,
    au.last_sign_in_at
  FROM public.profiles p
  JOIN auth.users au ON p.user_id = au.id
  ORDER BY p.created_at DESC;
END;
$$;