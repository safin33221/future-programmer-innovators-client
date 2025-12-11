import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-muted rounded-3xl py-12 px-8 md:py-20 md:px-16 text-center space-y-8">
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Ready to start your journey?
          </h2>

          <p className="text-muted-foreground max-w-[620px] mx-auto text-lg md:text-xl leading-relaxed">
            Join hundreds of other students who are building their future with 
            Future Programmer Innovators today.
          </p>

          <div className="pt-4">
            <Link href="/apply">
              <Button size="lg" className="px-8 py-6 text-lg">
                Apply for Membership
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
