import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Insights = () => {
  return (
    <div>
      <SEO
        title="Insights – Big Ideas. Real-World Learning."
        description="Thought pieces, field reflections, interviews, and practical tools coming soon."
      />
      <SiteHeader />
      <main className="container mx-auto py-16">
        <h1 className="text-4xl font-bold tracking-tight">Big Ideas. Real-World Learning.</h1>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          We’re working on a curated space to explore what’s shaping the future of inclusive development.
        </p>
        <ul className="mt-6 list-disc pl-5 text-muted-foreground space-y-2">
          <li>Thought pieces from our team</li>
          <li>Field reflections and case insights</li>
          <li>Interviews with partners and practitioners</li>
          <li>Practical tools and resources</li>
        </ul>
        <div className="mt-8 flex gap-3">
          <Button asChild variant="hero"><a href="#">Follow us on LinkedIn</a></Button>
          <Button asChild variant="secondary"><Link to="/contact">Contact Us to Collaborate</Link></Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Insights;