import SEO from "@/components/SEO";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Projects = () => {
  const cases = [
    {
      title: "Unlocking €300M in Investment – Global Gateway, DR",
      meta: "Client: European Commission | Focus: Investment Strategy | Trade",
      bullets: [
        "Designed investment roadmaps and coordinated EU, local governments, and private sector.",
        "Two major Global Gateway projects greenlit; sectoral strategies created.",
      ],
    },
    {
      title: "Local Innovation Meets Women’s Empowerment – Lolgy Ltd., Kenya",
      meta: "Client: Social enterprise | Focus: Sustainable Development | Gender | Health",
      bullets: [
        "Strategy support, partnership development, gender-responsive programming.",
        "Community-led innovation linking economic development and SRHR.",
      ],
    },
    {
      title: "Citizen Science for Clean Air – Apicultural Biomonitoring, DR",
      meta: "With WHO & EU Delegation | Focus: Environmental Data | Communications",
      bullets: [
        "Bee-based air monitoring outreach combining CSR and stakeholder engagement.",
        "Actionable data and increased public awareness.",
      ],
    },
    {
      title: "Reducing Plastics Through Storytelling – ‘Voy Con La Mía’",
      meta: "Client: UNDP & EEAS | Focus: Communications | Environment | Behaviour Change",
      bullets: [
        "Multimedia campaign across influencers, radio, and national events.",
        "Reached 3.5M+ people; mobilized youth and informed policy.",
      ],
    },
  ];

  return (
    <div>
      <SEO
        title="Projects & Case Studies – IDEA"
        description="Selected case studies across investment, gender, environment, and digital innovation."
      />
      <SiteHeader />
      <main className="container mx-auto py-16">
        <h1 className="text-4xl font-bold tracking-tight">Projects & Case Studies</h1>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          We work across regions, sectors, and scales — always focused on real-world impact.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cases.map((c) => (
            <Card key={c.title}>
              <CardHeader>
                <CardTitle>{c.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{c.meta}</p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {c.bullets.map((b) => (
                    <li key={b}>{b}</li>
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

export default Projects;