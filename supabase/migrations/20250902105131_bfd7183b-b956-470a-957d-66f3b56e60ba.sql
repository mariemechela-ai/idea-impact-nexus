-- Create security definer function to check admin role safely
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- Drop and recreate contact_submissions SELECT policy
DROP POLICY IF EXISTS "Only authenticated users can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only admins can view contact submissions" ON public.contact_submissions;

CREATE POLICY "Only admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Drop and recreate career_submissions SELECT policy  
DROP POLICY IF EXISTS "Only authenticated users can view career submissions" ON public.career_submissions;
DROP POLICY IF EXISTS "Only admins can view career submissions" ON public.career_submissions;

CREATE POLICY "Only admins can view career submissions"
ON public.career_submissions  
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Fix the auto-admin assignment issue by updating default role
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user';

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;