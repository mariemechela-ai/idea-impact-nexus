import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import HeroBackground from "@/components/HeroBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, Link as LinkIcon, MapPin, Handshake } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-development.jpg";
import strategicImage from "@/assets/strategic-advisory.jpg";
import healthcareImage from "@/assets/healthcare-humanitarian.jpg";
import economicImage from "@/assets/economic-development.jpg";
import innovationImage from "@/assets/innovation-ai.jpg";

const Index = () => {
  return (
    <div>
      <SEO
        title="IDEA – Smarter, Faster, More Sustainable Development"
        description="We bridge public ambition and private innovation to deliver impact across development, gender, climate, trade, health and tech."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "International Development & Economic Advisory (IDEA)",
          "url": window.location.origin,
          "sameAs": ["https://www.linkedin.com"],
        }}
      />
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden min-h-screen flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="container mx-auto pt-20 pb-28 text-center relative z-10">
            <HeroBackground />
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
                <span className="text-gradient">Smarter</span>, <span className="text-gradient">Faster</span>,<br />
                More <span className="text-gradient">Sustainable</span><br />
                Development
              </h1>
              <p className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                We bridge the gap between public ambition and private innovation — turning bold ideas into real-world impact across development, gender, climate, trade, health and tech.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild variant="hero" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                  <Link to="/contact">Work With Us</Link>
                </Button>
                <Button asChild variant="elevated" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                  <Link to="/projects">Explore Our Portfolio</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none"></div>
        </section>

        {/* What We Do */}
        <section className="section-padding border-t">
          <div className="container-narrow text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Making Development Work — for <span className="text-gradient">People</span>, <span className="text-gradient">Planet</span>, and <span className="text-gradient">Progress</span>
            </h2>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              IDEA (International Development & Economic Advisory) is a lean, expert-driven consultancy that helps governments, donors, and private partners deliver measurable impact. We work hands-on and across sectors to craft innovative, inclusive, and locally grounded solutions.
            </p>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Strategic & Program Advisory",
                  image: strategicImage,
                  desc: "Strategic guidance for maximum impact"
                },
                {
                  title: "Humanitarian, Health & Gender Programming",
                  image: healthcareImage,
                  desc: "Human-centered solutions in complex environments"
                },
                {
                  title: "Economic Development & Trade",
                  image: economicImage,
                  desc: "Sustainable economic growth and partnerships"
                },
                {
                  title: "Innovation, AI & Digital Tools",
                  image: innovationImage,
                  desc: "Technology for inclusive development"
                },
              ].map((s) => (
                <Card key={s.title} className="card-premium h-full group cursor-pointer overflow-hidden">
                  <CardHeader className="text-center pb-4">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden shadow-glow group-hover:scale-110 transition-transform">
                      <img 
                        src={s.image} 
                        alt={s.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg leading-tight">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Edge */}
        <section className="py-16 border-t">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight">What Sets Us Apart</h2>
            <p className="mt-3 text-muted-foreground max-w-3xl">
              We’re not your typical consultancy. IDEA was founded to make development faster, smarter, and more impactful — without the overheads, silos, and slow processes that hold so many actors back.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Lean & Agile", text: "We cut through bureaucracy and deliver high-quality, cost-efficient solutions.", Icon: Gauge },
                { title: "Public–Private Linkages", text: "We connect governments, funders, and innovators to scale what works.", Icon: LinkIcon },
                { title: "Hands-On Fieldwork", text: "We go where others won’t. From conflict zones to startup hubs.", Icon: MapPin },
                { title: "Aligned Incentives", text: "We work toward shared outcomes, not just outputs.", Icon: Handshake },
              ].map(({ title, text, Icon }) => (
                <Card key={title} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className="text-primary" />
                      <CardTitle className="text-base">{title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Global Work */}
        <section className="section-padding border-t">
          <div className="container-narrow text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Global <span className="text-gradient">Reach</span>. Local <span className="text-gradient">Insight</span>.</h2>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              With experience across Europe, Africa, and the Americas, IDEA delivers context-specific solutions with a global lens. From EU institutions to field partners in Sudan and Kenya — we adapt to realities on the ground.
            </p>
            <div className="mt-16">
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  { region: "Europe", detail: "EU institutions and partners", flag: "🇪🇺", countries: "Germany • Luxembourg • Belgium • Switzerland" },
                  { region: "Africa", detail: "Sudan, Kenya and beyond", flag: "🌍", countries: "Sudan • Kenya • Regional Partners" },
                  { region: "Americas", detail: "Dominican Republic, Haiti", flag: "🌎", countries: "Dominican Republic • Haiti • United States" },
                ].map((r) => (
                  <Card key={r.region} className="card-premium group hover:scale-[1.02] transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{r.flag}</div>
                      <CardTitle className="text-2xl text-gradient">{r.region}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-3">
                      <p className="text-muted-foreground">{r.detail}</p>
                      <p className="text-sm text-muted-foreground/80 leading-relaxed">{r.countries}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Final CTA */}
        <section className="py-20 border-t">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Let’s Build Something That Lasts</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Ready to shape inclusive, future-ready solutions? Whether you're a funder, implementer, or innovator — IDEA is here to help turn your mission into measurable outcomes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="hero" size="lg"><Link to="/contact">Contact Us</Link></Button>
              <Button asChild variant="elevated" size="lg"><Link to="/careers">Send us your CV</Link></Button>
              <Button asChild variant="secondary" size="lg"><Link to="/services">See Our Services</Link></Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;