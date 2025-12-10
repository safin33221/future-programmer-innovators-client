import SectionTitle from "@/components/shared/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LayoutPanelTop,
    Smartphone,
    ShieldCheck,
    Sword,
} from "lucide-react";

export default function CodingTracksSection() {
    return (

        <section className="py-16 bg-muted/20">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-14">
                    <SectionTitle title="Explore Your" highlight="Coding Path"/>
                
                    <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
                        Choose a specialization and start mastering the skills that make
                        top-tier developers. Future Programmer Innovators helps you grow with structured learning,
                        real projects, and contest-ready training.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Web Development */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader>
                            <LayoutPanelTop className="h-10 w-10 text-blue-500 mb-2" />
                            <CardTitle>Web Development</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Master HTML, CSS, JavaScript, React, MERN stack, and build
                                production-ready real-world web applications.
                            </p>
                        </CardContent>
                    </Card>

                    {/* App Development */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader>
                            <Smartphone className="h-10 w-10 text-purple-500 mb-2" />
                            <CardTitle>App Development</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Learn Flutter, React Native, and build smooth, high-performance
                                mobile apps for Android & iOS.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Cybersecurity */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader>
                            <ShieldCheck className="h-10 w-10 text-red-500 mb-2" />
                            <CardTitle>Cybersecurity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Understand ethical hacking, system security, penetration testing,
                                and networking concepts to secure digital systems.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Competitive Programming */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader>
                            <Sword className="h-10 w-10 text-green-500 mb-2" />
                            <CardTitle>Competitive Programming</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Practice problem-solving, algorithms, and data structures to excel
                                in ICPC, Codeforces, AtCoder, and more.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

    );
};
