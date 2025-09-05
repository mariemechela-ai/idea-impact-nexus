import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing. Please ensure your Supabase integration is properly connected.')
  console.log('Available env vars:', Object.keys(import.meta.env))
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for our database tables
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  message: string
  file_name?: string | null
  file_path?: string | null
  created_at?: string
}

export interface CareerSubmission {
  id?: string
  name: string
  email: string
  expertise: string
  message?: string
  cv_file_name?: string
  cv_file_path?: string
  created_at?: string
}