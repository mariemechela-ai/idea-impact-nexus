import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import HeroBackground from "@/components/HeroBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, Link as LinkIcon, MapPin, Handshake } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Link } from "react-router-dom";

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
        <section className="relative overflow-hidden">
          <div className="container mx-auto pt-20 pb-28 text-center relative">
            <HeroBackground />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Smarter, Faster, More Sustainable Development
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We bridge the gap between public ambition and private innovation — turning bold ideas into real-world impact across development, gender, climate, trade, health and tech.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Work With Us</Link>
              </Button>
              <Button asChild variant="elevated" size="lg">
                <Link to="/projects">Explore Our Portfolio</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 border-t">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight">
              Making Development Work — for People, Planet, and Progress
            </h2>
            <p className="mt-3 text-muted-foreground max-w-3xl">
              IDEA (International Development & Economic Advisory) is a lean, expert-driven consultancy that helps governments, donors, and private partners deliver measurable impact. We work hands-on and across sectors to craft innovative, inclusive, and locally grounded solutions.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                "Strategic & Program Advisory",
                "Humanitarian, Health & Gender Programming",
                "Economic Development & Trade",
                "Innovation, AI & Digital Tools",
              ].map((s) => (
                <Card key={s} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-base">{s}</CardTitle>
                  </CardHeader>
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
        <section className="py-16 border-t">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight">Global Reach. Local Insight.</h2>
            <p className="mt-3 text-muted-foreground max-w-3xl">
              With experience across Europe, Africa, and the Americas, IDEA delivers context-specific solutions with a global lens. From EU institutions to field partners in Sudan and Kenya — we adapt to realities on the ground.
            </p>
            <div className="mt-8">
              <Carousel>
                <CarouselContent>
                  {[
                    { region: "Europe", detail: "EU institutions and partners" },
                    { region: "Africa", detail: "Sudan, Kenya and beyond" },
                    { region: "Americas", detail: "Dominican Republic, Haiti" },
                  ].map((r) => (
                    <CarouselItem key={r.region} className="md:basis-1/2 lg:basis-1/3">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">{r.region}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{r.detail}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-16 border-t">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight">From Vision to Implementation</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Global Gateway, Dominican Republic",
                  text: "€300M+ in investment strategies unlocked through private sector engagement and trade facilitation.",
                  meta: "Client: EU Commission",
                },
                {
                  title: "Lolgy Ltd., Kenya",
                  text: "Sustainable mining meets women’s health — piloting a cross-sector solution rooted in community.",
                  meta: "Focus: Health & Gender Innovation",
                },
                {
                  title: "Apicultural Biomonitoring, DR",
                  text: "Citizen science for clean air — communications and stakeholder engagement.",
                  meta: "With WHO & EU Delegation",
                },
              ].map((p) => (
                <Card key={p.title} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{p.text}</p>
                    <p className="mt-3 text-xs text-muted-foreground">{p.meta}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Insights CTA */}
        <section className="py-16 border-t">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Ideas that Travel. Insights that Matter.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              From digital health to financing for development — we share what we learn.
            </p>
            <div className="mt-6">
              <Button asChild variant="hero">
                <Link to="/insights">Visit Our Insights</Link>
              </Button>
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