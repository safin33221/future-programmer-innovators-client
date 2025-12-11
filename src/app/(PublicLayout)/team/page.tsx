"use client";

import Image from "next/image";
import SectionTitle from "@/components/shared/SectionTitle";
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";

const teamMembers = [
    {
        name: "Safayet Hossan Safin",
        position: "Founder & President",
        designation: "Full Stack Developer",
        bio: "Leads the vision and growth of Future Programming Innovators.",
        image: "/team/safin.jpg",
        socials: {
            facebook: "#",
            instagram: "#",
            linkedin: "#",
            github: "#",
        },
    },
    {
        name: "Noman",
        position: "Vice President",
        designation: "Competitive Programmer",
        bio: "Manages operations and ensures smooth club activities.",
        image: "/team/ersa.jpg",
        socials: {
            facebook: "#",
            instagram: "#",
            linkedin: "#",
            github: "#",
        },
    },
    {
        name: "Muntasir",
        position: "General Secretary",
        designation: "MERN Stack Developer",
        bio: "Coordinates events and maintains proper documentation.",
        image: "/team/rakib.jpg",
        socials: {
            facebook: "#",
            instagram: "#",
            linkedin: "#",
            github: "#",
        },
    },
    {
        name: "Rafi",
        position: "Event Coordinator",
        designation: "Event Manager",
        bio: "Handles event planning, management, and logistics.",
        image: "/team/rafi.jpg",
        socials: {
            facebook: "#",
            instagram: "#",
            linkedin: "#",
            github: "#",
        },
    },
    {
        name: "Mahin",
        position: "Treasurer",
        designation: "Finance & Budget Lead",
        bio: "Manages financial planning and budget allocation.",
        image: "/team/mahin.jpg",
        socials: {
            facebook: "#",
            instagram: "#",
            linkedin: "#",
            github: "#",
        },
    },
    {
        name: "Nadim",
        position: "Technical Lead",
        designation: "Backend Developer",
        bio: "Oversees the technical development of club projects.",
        image: "/team/nadim.jpg",
        socials: {
            facebook: "#",
            instagram: "#",
            linkedin: "#",
            github: "#",
        },
    },
];

export default function TeamPage() {
    return (
        <div className="min-h-screen container mx-auto py-20 lg:py-20 overflow-hidden bg-muted/20">
            <div className=" mx-auto px-6 lg:px-8">

                {/* Page Header */}
                <div className="text-center mb-16">
                    <SectionTitle title="Meet Our" highlight="Team" subtitle="The dedicated members powering Future Programming Innovators." />

                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {teamMembers.map((member) => (
                        <div
                            key={member.name}
                            className="bg-background rounded-xl border shadow-sm hover:shadow-lg transition p-6 flex flex-col items-center text-center group"
                        >
                            {/* Image */}
                            <div className="relative h-32 w-32 rounded-full overflow-hidden border mb-4 group-hover:scale-105 transition">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Name */}
                            <h3 className="text-lg font-semibold">{member.name}</h3>

                            {/* Position */}
                            {/* <p className="text-primary font-medium text-sm">
                                {member.position}
                            </p> */}

                            {/* Designation */}
                            <p className="text-muted-foreground text-xs">
                                {member.designation}
                            </p>

                            {/* Bio */}
                            <p className="mt-3 text-sm text-muted-foreground">
                                {member.bio}
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center gap-4 mt-4">
                                {member.socials.facebook && (
                                    <a href={member.socials.facebook} target="_blank">
                                        <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition" />
                                    </a>
                                )}
                                {member.socials.instagram && (
                                    <a href={member.socials.instagram} target="_blank">
                                        <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition" />
                                    </a>
                                )}
                                {member.socials.linkedin && (
                                    <a href={member.socials.linkedin} target="_blank">
                                        <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition" />
                                    </a>
                                )}
                                {member.socials.github && (
                                    <a href={member.socials.github} target="_blank">
                                        <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
