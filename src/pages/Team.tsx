import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const Team = () => {
  return (
    <div>
      <SEO
        title="Team – IDEA"
        description="Meet the experts behind IDEA’s work across regions and sectors."
      />
      <SiteHeader />
      <main className="container mx-auto py-16">
        <h1 className="text-4xl font-bold tracking-tight">Our Team</h1>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          We’ll be sharing our team bios and network of associates here soon.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Team;