"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-10">

          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm font-semibold transition-colors border-transparent bg-primary/10 text-primary hover:bg-primary/20">
            Registration Open for 2024 Batch
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/50 leading-tight">
            Future Programmer Innovators
          </h1>

          <p className="mx-auto max-w-[720px] text-muted-foreground text-base md:text-xl leading-relaxed">
            Build Your Programming Career. Compete. Learn. Grow. Join the
            premier digital programming club for <b className="text-gray-900">Feni Polytechnic Institute</b> students.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/membership-application">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6">
                Join Future Programmer Innovators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/courses">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[900px] h-[900px] opacity-10 bg-linear-to-tr from-primary to-accent rounded-full blur-3xl" />
      </div>
    </section>
  );
}
