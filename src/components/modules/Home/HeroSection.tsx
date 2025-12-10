"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative py-20 lg:py-22 overflow-hidden ">
      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary/10 text-primary hover:bg-primary/20">
            Registration Open for 2024 Batch
          </div>

          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/50">
            Future Programmer Innovators
          </h1>

          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Build Your Programming Career. Compete. Learn. Grow. Join the
            premier digital programming club for Feni Polytechnic Institute students.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
            <Link href="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Join Future Programmer Innovators <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/courses">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Abstract Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 bg-linear-to-tr from-primary to-accent rounded-full blur-3xl -z-10" />
    </section>
  );
}
