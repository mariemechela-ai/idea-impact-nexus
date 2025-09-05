-- Add file storage columns to contact_submissions table
ALTER TABLE public.contact_submissions 
ADD COLUMN file_name TEXT,
ADD COLUMN file_path TEXT;

-- Create storage bucket for contact form documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('contact-documents', 'contact-documents', false);

-- Create storage policies for contact documents
CREATE POLICY "Only admins can view contact documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'contact-documents' AND public.is_admin());

CREATE POLICY "Anyone can upload contact documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'contact-documents');