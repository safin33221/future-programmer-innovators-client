"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb } from "lucide-react";

export default function VisionMission() {
  return (
    <div className="container mx-auto py-16 px-4 md:px-6 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Vision & Mission
        </h1>
        <p className="text-xl text-muted-foreground">
          Our guiding principles that drive everything we do at FPI.
        </p>
      </div>

      {/* Vision + Mission Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Vision */}
        <Card className="bg-linear-to-br from-background to-primary/5 border-primary/20">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-3xl">Our Vision</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To become the leading student-driven technology community that
              empowers every diploma student to become a world-class software
              engineer and innovator.
            </p>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card className="bg-linear-to-br from-background to-accent/5 border-accent/20">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Lightbulb className="h-6 w-6 text-accent" />
            </div>
            <CardTitle className="text-3xl">Our Mission</CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="space-y-4 text-lg text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                Provide accessible, high-quality technical education.
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                Foster a competitive spirit through regular coding contests.
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                Bridge the gap between academic curriculum and industry needs.
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">•</span>
                Build a supportive community of learners and mentors.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
