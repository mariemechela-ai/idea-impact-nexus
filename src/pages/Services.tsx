import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const groups = [
    {
      title: "Investment, Trade & Economic Development",
      items: [
        "Investment & project strategy (incl. Global Gateway)",
        "Trade & market analysis",
        "Mergers & acquisitions support",
        "PPP design & financing partner identification",
        "Economic modelling & feasibility studies",
      ],
    },
    {
      title: "Partnerships, Communication & Advocacy",
      items: [
        "Donor relations & resource mobilization",
        "Strategic communication & campaign design",
        "Content creation (social, decks, video)",
        "Stakeholder engagement",
        "Crisis communications & PR",
      ],
    },
    {
      title: "Humanitarian, Health & Gender Programming",
      items: [
        "Program design & advisory (GBV, livelihoods, health, etc.)",
        "Protection, gender-based, and SRHR programming",
        "MEAL (Monitoring, Evaluation, Accountability & Learning)",
        "Crisis response & recovery planning",
        "Capacity building & training",
      ],
    },
    {
      title: "Innovation, Digital & AI for Development",
      items: [
        "AI & digital tool design for health, gender, crisis response",
        "Data strategy & digital health innovation",
        "Tech partnerships & ecosystem building",
        "Agile prototyping and solution mapping",
        "Digital inclusion audits",
      ],
    },
  ];

  return (
    <div>
      <SEO
        title="Services – Strategic, Inclusive, Real-World Solutions"
        description="We design, implement, and scale development solutions across investment, partnerships, humanitarian programming, and digital innovation."
      />
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-narrow text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We help our clients design, implement, and scale development solutions that are strategic, inclusive, and grounded in real-world needs. Our expertise spans four core domains.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding border-t bg-muted/30">
          <div className="container mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              {groups.map((g, index) => {
                const icons = ["💼", "🤝", "❤️", "🚀"];
                return (
                  <Card key={g.title} className="card-premium group hover:scale-[1.02] transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center group-hover:shadow-glow transition-all">
                          <span className="text-xl">{icons[index]}</span>
                        </div>
                        <CardTitle className="text-2xl text-gradient">{g.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {g.items.map((i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <span className="text-primary mt-1 flex-shrink-0">•</span>
                            <span className="leading-relaxed">{i}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding border-t">
          <div className="container-narrow text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Ready to <span className="text-gradient">Get Started</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Let's work together to build something that matters. Whether you need strategic guidance or hands-on implementation, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="hero" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                <Link to="/contact">Start a Project</Link>
              </Button>
              <Button asChild variant="elevated" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                <Link to="/projects">View Our Work</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Services;