import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      if (!supabase) {
        throw new Error('Supabase not configured. Please ensure your Supabase integration is connected.');
      }

      const { error } = await supabase
        .from('contact_submissions')
        .insert([data]);

      if (error) throw error;

      toast({ title: "Thanks!", description: "We'll get back to you shortly." });
      (e.currentTarget as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({ 
        title: "Error", 
        description: "Failed to submit form. Please try again.",
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
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