import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  message: string
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