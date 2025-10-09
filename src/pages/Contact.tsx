import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  message: z.string()
    .trim()
    .min(1, "Message is required")
    .max(10000, "Message must be less than 10,000 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log('Form submission started');
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };
    
    // Validate form data
    const validation = contactSchema.safeParse(rawData);
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    let data: {
      name: string;
      email: string;
      message: string;
      file_name: string | null;
      file_path: string | null;
    } = {
      name: validation.data.name,
      email: validation.data.email,
      message: validation.data.message,
      file_name: null,
      file_path: null,
    };
    
    console.log('Validated form data:', data);

    try {
      console.log('Supabase client:', supabase);
      if (!supabase) {
        throw new Error('Supabase not configured. Please ensure your Supabase integration is connected.');
      }

      // Handle file upload if present
      const fileInput = form.querySelector('input[name="documents"]') as HTMLInputElement;
      if (fileInput?.files && fileInput.files.length > 0) {
        const file = fileInput.files[0]; // Handle first file for now
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name}`;
        const filePath = `contact-documents/${fileName}`;
        
        console.log('Uploading file:', fileName);
        const { error: uploadError } = await supabase.storage
          .from('contact-documents')
          .upload(filePath, file);
        
        if (uploadError) {
          throw new Error(`File upload failed: ${uploadError.message}`);
        }
        
        data.file_name = file.name;
        data.file_path = filePath;
        console.log('File uploaded successfully');
      }

      console.log('Attempting to insert data into contact_submissions table');
      const response = await supabase
        .from('contact_submissions')
        .insert([data]);

      console.log('Full Supabase response:', response);
      console.log('Response data:', response.data);
      console.log('Response error:', response.error);
      console.log('Response status:', response.status);
      console.log('Response statusText:', response.statusText);

      if (response.error) {
        console.error('Supabase insert error:', response.error);
        throw new Error(`Database error: ${response.error.message}`);
      }

      console.log('Form submitted successfully, sending notification email');
      
      // Send notification email with only the required fields
      const emailData = {
        name: data.name,
        email: data.email,
        message: data.message,
        file_name: data.file_name,
        file_path: data.file_path
      };
      
      try {
        const notificationResponse = await supabase.functions.invoke('send-contact-notification', {
          body: emailData
        });
        
        if (notificationResponse.error) {
          console.error('Email notification error:', notificationResponse.error);
          // Don't throw here - form submission was successful, email is secondary
        } else {
          console.log('Email notification sent successfully');
        }
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't throw here - form submission was successful
      }

      console.log('Showing success toast');
      toast({ title: "Thanks!", description: "We'll get back to you shortly." });
      form.reset();
      console.log('Form reset completed');
    } catch (error) {
      console.error('Caught error type:', typeof error);
      console.error('Caught error:', error);
      console.error('Error constructor:', error?.constructor?.name);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
      
      toast({ 
        title: "Error", 
        description: `Failed to submit form: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
      console.log('Form submission completed, isSubmitting set to false');
    }
  };

  return (
    <div>
      <SEO
        title="Contact – Let's Work Together"
        description="Get in touch for project inquiries, partnerships, or to join our talent pool."
      />
      <SiteHeader />
      <main className="container mx-auto py-16">
        <h1 className="text-4xl font-bold tracking-tight">Let's Work Together</h1>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          Whether you're looking for a strategic partner, a subject-matter expert, or a bold new approach to development, we're here to collaborate.
        </p>

        <form onSubmit={onSubmit} className="mt-10 grid gap-4 max-w-xl">
          <div>
            <label className="text-sm">Name</label>
            <Input name="name" required placeholder="Your full name" />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input type="email" name="email" required placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm">Message</label>
            <Textarea name="message" required placeholder="How can we help?" />
          </div>
          <div>
            <label className="text-sm">Upload documents (optional)</label>
            <Input type="file" name="documents" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" multiple />
          </div>
          <Button type="submit" variant="hero" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send message"}
          </Button>
        </form>

        <div className="mt-10 text-sm text-muted-foreground">
          <p>Email: </p>
          <p>Offices in: Europe — with projects across Africa, Latin America & beyond</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Contact;