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
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Why Join <span className="text-primary">Future Programming Innovators Club?</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Unlock opportunities, learn real-world skills, and grow with a community of passionate programmers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {features.map((item) => (
            <div
              key={item}
              className="
                group relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur 
                p-6 flex items-start gap-4 transition-all duration-300
                hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10
              "
            >
              <div
                className="
                  w-12 h-12 rounded-full flex items-center justify-center
                  bg-primary/10 text-primary transition-transform duration-300
                  group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground
                "
              >
                <CheckCircle2 size={22} />
              </div>

              <p className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                {item}
              </p>

              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
