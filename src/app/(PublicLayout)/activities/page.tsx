import { Code2, Laptop, Presentation, Users } from "lucide-react";
import SectionTitle from "@/components/shared/SectionTitle";
import ActivityCard from "@/components/modules/activities/ActivityCard";


export default function Activities() {
    const activities = [
        {
            title: "Coding Bootcamps",
            description:
                "Intensive training sessions on technologies like React, Python, and Cloud Computing.",
            icon: Laptop,
            tags: ["Learning", "Hands-on"],
            status: "Ongoing",
        },
        {
            title: "Weekly Contests",
            description:
                "Regular algorithmic challenges to improve problem-solving skills.",
            icon: Code2,
            tags: ["Competition", "Prizes"],
            status: "Weekly",
        },
        {
            title: "Tech Talks",
            description:
                "Industry experts share insights on trends, technologies, and career growth.",
            icon: Presentation,
            tags: ["Networking", "Knowledge"],
            status: "Monthly",
        },
        {
            title: "Hackathons",
            description:
                "24–48 hour events to build innovative solutions for real-world problems.",
            icon: Users,
            tags: ["Innovation", "Teamwork"],
            status: "Quarterly",
        },
    ];

    return (
        <section className="container mx-auto py-16 px-4 md:px-6 space-y-12">
            <SectionTitle
                title="Club"
                highlight="Activities"
                subtitle="There’s always something happening at FPI. Explore what we do."
            />

            <div className="grid gap-6 md:grid-cols-2">
                {activities.map((activity, index) => (
                    <ActivityCard key={index} {...activity} />
                ))}
            </div>
        </section>
    );
}
