"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, History, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4 md:px-6 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <SectionTitle title="About" highlight="Future Programmer Innovators" />

        <p className="text-xl text-muted-foreground">
          Future Programmer Innovators is more than just a club. It is a
          community dedicated to shaping the next generation of programmers,
          innovators, and tech leaders.
        </p>
      </div>

      {/* History Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            Established in 2023, FPI began with a mission to bridge the gap
            between academic learning and the real-world skills required in the
            tech industry—especially for Feni Polytechnic Institute students. What started as a
            small learning circle has now transformed into a digital hub for
            coding, creativity, and collaboration.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We believe every student deserves access to quality mentorship,
            guidance, and resources to unlock their full potential in the world
            of programming and technology.
          </p>
        </div>
        <div className="bg-muted rounded-xl h-[300px] flex items-center justify-center">
          <History className="h-24 w-24 text-muted-foreground/20" />
        </div>
      </div>

      {/* Team Structure */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Our Structure</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Mentors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Experienced professionals and senior students who guide members
                on their learning and career journey.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Core Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The backbone of FPI, managing events, workshops, contests, and
                club operations with dedication.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle>Members</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Passionate learners committed to improving their coding skills
                and building real-world projects.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold">Our Achievements</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Award className="h-6 w-6 text-primary" />
                <span>Winners of National Coding Championship 2023</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="h-6 w-6 text-primary" />
                <span>Recipient of Best Student Tech Community Award</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="h-6 w-6 text-primary" />
                <span>Successfully deployed 100+ real-world projects</span>
              </li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <Award className="h-48 w-48 text-primary/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
