-- Fix security linter issues

-- Remove the problematic view that exposes auth.users
DROP VIEW IF EXISTS public.admin_user_management;

-- Update the get_all_user_profiles function to not expose auth.users directly
-- and use a more secure approach
CREATE OR REPLACE FUNCTION public.get_user_profiles_for_admin()
RETURNS TABLE(
  profile_id UUID,
  user_id UUID,
  display_name TEXT,
  role TEXT,
  email TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
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
  
  -- Return only profile information without directly exposing auth.users
  RETURN QUERY
  SELECT 
    p.id as profile_id,
    p.user_id,
    p.display_name,
    p.role,
    CASE 
      WHEN public.is_admin() THEN (
        SELECT email FROM auth.users WHERE id = p.user_id
      )
      ELSE NULL
    END as email,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  ORDER BY p.created_at DESC;
END;
$$;

-- Drop the old function
DROP FUNCTION IF EXISTS public.get_all_user_profiles();