import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectShowcase = () => {
  const projects = [
    {
      title: "Sudan Health Systems Strengthening",
      location: "Sudan",
      beneficiaries: "2.3M people",
      timeframe: "2022-2024",
      description: "Comprehensive health system reform and capacity building in conflict-affected regions.",
      impact: "Reduced maternal mortality by 35% and improved access to healthcare for vulnerable populations.",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Kenya Digital Trade Platform",
      location: "Kenya",
      beneficiaries: "15K SMEs",
      timeframe: "2023-Present",
      description: "AI-powered platform connecting small businesses to regional and global markets.",
      impact: "Increased trade volumes by 60% and created 8,000+ new employment opportunities.",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    },
    {
      title: "EU-Caribbean Climate Resilience",
      location: "Caribbean Region",
      beneficiaries: "500K people",
      timeframe: "2021-2023",
      description: "Climate adaptation strategies and disaster preparedness across 8 island nations.",
      impact: "Enhanced climate resilience for coastal communities and reduced disaster recovery costs by 40%.",
      gradient: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20",
    },
  ];

  return (
    <section className="section-padding border-t">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Featured <span className="text-gradient">Project Impact</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From emergency response in conflict zones to innovative digital solutions — see how we turn challenges into sustainable outcomes.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <Card key={project.title} className={`card-premium overflow-hidden group hover:scale-[1.02] transition-all duration-500 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              <div className={`absolute inset-0 ${project.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
              <CardContent className="relative p-8 lg:p-12">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                        {project.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 glass-effect px-3 py-2 rounded-lg">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2 glass-effect px-3 py-2 rounded-lg">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{project.beneficiaries}</span>
                      </div>
                      <div className="flex items-center gap-2 glass-effect px-3 py-2 rounded-lg">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{project.timeframe}</span>
                      </div>
                    </div>

                    <div className="p-4 glass-effect rounded-lg">
                      <h4 className="font-semibold mb-2 text-primary">Impact Achieved:</h4>
                      <p className="text-sm leading-relaxed">{project.impact}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-1 flex flex-col items-center text-center space-y-4">
                    <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                      <ExternalLink className="w-12 h-12 text-white" />
                    </div>
                    <Button asChild variant="secondary" className="w-full">
                      <Link to="/projects">View Full Case Study</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="hero" size="lg">
            <Link to="/projects">Explore All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;