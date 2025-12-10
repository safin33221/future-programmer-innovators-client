
import Link from 'next/link';


import { CheckCircle2, Zap, Users, Award, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/shared/SectionTitle';

export default function WhyJoin() {
    const benefits = [
        {
            title: 'Skill Development',
            description:
                'Master modern technologies and programming languages through structured learning paths.',
            icon: Zap,
        },
        {
            title: 'Networking',
            description:
                'Connect with like-minded peers, seniors, and industry professionals.',
            icon: Users,
        },
        {
            title: 'Recognition',
            description:
                'Earn certificates and badges to showcase your achievements on your resume.',
            icon: Award,
        },
        {
            title: 'Career Ready',
            description:
                'Build a portfolio of real-world projects that employers love.',
            icon: Briefcase,
        },
    ];

    return (
        <div className="container mx-auto py-16 px-4 md:px-6 space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <SectionTitle title='Why Join' highlight='Future Programmer Innovators?' />

                <p className="text-xl text-muted-foreground">
                    Invest in your future. Here&apos;s what you get when you become a member.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                    <Card
                        key={index}
                        className="border-none shadow-md hover:shadow-xl transition-all"
                    >
                        <CardHeader>
                            <benefit.icon className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>{benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{benefit.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-muted rounded-2xl p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-8 text-center">
                    Membership Perks
                </h2>

                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {[
                        'Access to all premium courses',
                        'Weekly coding contests with prizes',
                        'One-on-one mentorship sessions',
                        'Exclusive workshops and webinars',
                        'Internship opportunities',
                        'Code review and feedback',
                    ].map((perk, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 bg-background p-4 rounded-lg"
                        >
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                            <span className="font-medium">{perk}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/apply">
                        <Button size="lg" className="px-8">
                            Apply Now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
