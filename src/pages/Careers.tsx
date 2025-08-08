import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const Careers = () => {
  const { toast } = useToast();
  const [consent, setConsent] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!consent) {
      toast({ title: "Consent required", description: "Please consent to data processing for recruitment purposes.", variant: "destructive" as any });
      return;
    }
    toast({ title: "CV submitted", description: "Thanks for your interest! We’ll be in touch." });
    (e.currentTarget as HTMLFormElement).reset();
    setConsent(false);
  };

  return (
    <div>
      <SEO
        title="Careers – Submit Your CV"
        description="Join our talent pool across development, trade, environmental, health, gender, and digital fields."
      />
      <SiteHeader />
      <main className="container mx-auto py-16">
        <h1 className="text-4xl font-bold tracking-tight">Careers / CV Portal</h1>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          We’re always looking to connect with consultants, practitioners, and innovators. Submit your details below.
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
            <label className="text-sm">Areas of expertise</label>
            <Input name="expertise" required placeholder="e.g. Gender, Digital Health, Trade" />
          </div>
          <div>
            <label className="text-sm">Message / short motivation</label>
            <Textarea name="message" placeholder="Tell us about your work" />
          </div>
          <div>
            <label className="text-sm">Upload CV (.pdf preferred)</label>
            <Input type="file" name="cv" accept=".pdf,.doc,.docx" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
            <label htmlFor="consent" className="text-sm text-muted-foreground">
              I consent to the processing of my data for recruitment purposes
            </label>
          </div>
          <Button type="submit" variant="hero">Submit</Button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Careers;