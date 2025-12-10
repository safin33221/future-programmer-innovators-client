"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

// ----------------------------------------------------------------------
// Reusable Form Field Wrapper
// ----------------------------------------------------------------------

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------
// Main Contact Section
// ----------------------------------------------------------------------

export default function Contact() {
  return (
    <section className="container mx-auto py-16 px-4 md:px-6">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* ---------------------------------------
            LEFT SECTION : CONTACT INFO
        ----------------------------------------- */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We&apos;d love to hear from you. Send us a message and
              we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Visit Us</h3>
                <p className="text-muted-foreground">
                  Computer Science Department
                  <br />
                  Polytechnic Campus, Block A
                  <br />
                  City, State 12345
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">contact@fpi-club.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------
            RIGHT SECTION : CONTACT FORM
        ----------------------------------------- */}

        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>
              Fill out the form below to reach our team.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="First Name">
                  <Input placeholder="John" />
                </FormField>

                <FormField label="Last Name">
                  <Input placeholder="Doe" />
                </FormField>
              </div>

              <FormField label="Email">
                <Input type="email" placeholder="john@example.com" />
              </FormField>

              <FormField label="Subject">
                <Input placeholder="How can we help?" />
              </FormField>

              <FormField label="Message">
                <Textarea
                  placeholder="Your message here..."
                  className="min-h-[120px]"
                />
              </FormField>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

