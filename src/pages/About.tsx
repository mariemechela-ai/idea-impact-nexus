import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const About = () => {
  return (
    <div>
      <SEO
        title="About IDEA – Who We Are"
        description="IDEA is a mission-driven consultancy connecting public ambition with private innovation across health, gender, trade and digital."
      />
      <SiteHeader />
      <main className="container mx-auto py-16">
        <h1 className="text-4xl font-bold tracking-tight">Who We Are</h1>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          International Development & Economic Advisory (IDEA) is a mission-driven consultancy that makes development smarter, faster, and more sustainable. We connect public ambition with private innovation to deliver inclusive, high-impact solutions across sectors — from health and gender to trade and digital transformation.
        </p>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          Founded by a team of development professionals with hands-on experience across Europe, Africa, and Latin America, IDEA was created to do things differently: leaner, more agile, and deeply grounded in field realities.
        </p>
        <section className="mt-10 grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold">Our Vision</h2>
            <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-2">
              <li>Bridge the gap between public and private sectors</li>
              <li>Embed equity, gender, and innovation into every solution</li>
              <li>Turn funding into measurable impact — fast</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Our Principles</h2>
            <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-2">
              <li>Client Value First – Results matter more than deliverables.</li>
              <li>Lean & Agile – No bloated teams, no wasted time.</li>
              <li>Hands-On – We go where others don’t — and we stay until it works.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Where We Work</h2>
            <ul className="mt-3 list-disc pl-5 text-muted-foreground space-y-2">
              <li>Africa (e.g. Sudan, Kenya)</li>
              <li>Latin America (e.g. Dominican Republic, Haiti)</li>
              <li>North America (United States)</li>
              <li>Europe (e.g. Germany, Luxembourg, Belgium, Switzerland)</li>
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default About;