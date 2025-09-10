import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const ImpactStatistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const stats = [
    { number: 150, suffix: "+", label: "Projects Delivered", description: "Across 25+ countries" },
    { number: 50, suffix: "M+", label: "People Impacted", description: "Through our programs" },
    { number: 95, suffix: "%", label: "Client Satisfaction", description: "Repeat partnerships" },
    { number: 15, suffix: "+", label: "Years Experience", description: "In development work" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedNumber = ({ number, suffix, isVisible }: { number: number; suffix: string; isVisible: boolean }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      if (isVisible) {
        const increment = number / 50;
        const timer = setInterval(() => {
          setCurrent((prev) => {
            if (prev < number) {
              return Math.min(prev + increment, number);
            }
            clearInterval(timer);
            return number;
          });
        }, 30);

        return () => clearInterval(timer);
      }
    }, [isVisible, number]);

    return (
      <span className="text-4xl md:text-5xl font-bold text-gradient">
        {Math.floor(current)}{suffix}
      </span>
    );
  };

  return (
    <section ref={ref} className="section-padding border-t bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Making a <span className="text-gradient">Measurable Impact</span>
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Real numbers from real projects that transformed communities and systems.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={stat.label} className={`card-premium text-center transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: `${index * 150}ms` }}>
              <CardContent className="pt-8 pb-6">
                <div className="mb-4">
                  <AnimatedNumber 
                    number={stat.number} 
                    suffix={stat.suffix} 
                    isVisible={isVisible}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStatistics;