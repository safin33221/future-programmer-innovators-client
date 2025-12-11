import SectionTitle from "@/components/shared/SectionTitle";
import { CheckCircle2 } from "lucide-react";

export function WhyJoin() {
  const features = [
    "Learn directly from industry-level mentors",
    "Get access to exclusive study materials",
    "Participate in regional & national contests",
    "Build strong portfolios with real projects",
  ];

  return (
    <section className="py-24 bg-linear-to-b from-primary/10 via-background to-background">
      <div className="container px-4 md:px-8 max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionTitle title="Why Join" highlight="Future Programmer Innovators Club?" />

          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Unlock opportunities, learn real-world skills, and grow with a community of passionate programmers.
          </p>
        </div>

        {/* Feature List */}
        <div className="grid sm:grid-cols-2 gap-7 md:gap-9">
          {features.map((item) => (
            <div
              key={item}
              className="
                group relative overflow-hidden rounded-3xl border bg-card/50 backdrop-blur-xl
                p-7 flex items-start gap-5 transition-all duration-300
                hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10
              "
            >
              {/* Icon */}
              <div
                className="
                  w-14 h-14 rounded-full flex items-center justify-center text-primary
                  bg-primary/10 transition-all duration-300
                  group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground
                "
              >
                <CheckCircle2 size={24} />
              </div>

              {/* Text */}
              <p className="text-base md:text-lg font-medium text-foreground leading-relaxed transition-colors group-hover:text-primary">
                {item}
              </p>

              {/* Hover Glow */}
              <div
                className="
                  absolute inset-0 pointer-events-none bg-linear-to-r 
                  from-primary/0 via-primary/5 to-primary/0
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
