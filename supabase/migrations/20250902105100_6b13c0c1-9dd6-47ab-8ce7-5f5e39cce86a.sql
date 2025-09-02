-- Create security definer function to check admin status
-- This prevents RLS recursion issues when checking roles
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER 
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- Update contact_submissions SELECT policy to admin-only
DROP POLICY IF EXISTS "Only authenticated users can view contact submissions" ON public.contact_submissions;
CREATE POLICY "Only admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (public.is_admin());

-- Update career_submissions SELECT policy to admin-only  
DROP POLICY IF EXISTS "Only authenticated users can view career submissions" ON public.career_submissions;
CREATE POLICY "Only admins can view career submissions"
ON public.career_submissions
FOR SELECT 
TO authenticated  
USING (public.is_admin());

-- Fix the default role assignment issue - change default from 'admin' to 'user'
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user';