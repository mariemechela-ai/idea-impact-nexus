import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <main className="container mx-auto py-16">
        <h1 className="text-4xl font-bold tracking-tight">Our Services</h1>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          We help our clients design, implement, and scale development solutions that are strategic, inclusive, and grounded in real-world needs.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {groups.map((g) => (
            <Card key={g.title}>
              <CardHeader>
                <CardTitle>{g.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Services;