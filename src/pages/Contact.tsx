import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const { toast } = useToast();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    toast({ title: "Thanks!", description: "We’ll get back to you shortly." });
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <div>
      <SEO
        title="Contact – Let’s Work Together"
        description="Get in touch for project inquiries, partnerships, or to join our talent pool."
      />
      <SiteHeader />
      <main className="container mx-auto py-16">
        <h1 className="text-4xl font-bold tracking-tight">Let’s Work Together</h1>
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
          <Button type="submit" variant="hero">Send message</Button>
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