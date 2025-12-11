import SectionTitle from "@/components/shared/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutPanelTop, Smartphone, ShieldCheck, Sword } from "lucide-react";

export default function CodingTracksSection() {
    return (
        <section className="py-20 bg-muted/20">
            <div className="container px-4 md:px-8 mx-auto">

                <div className="text-center space-y-6 mb-14">
                    <SectionTitle title="Explore Your" highlight="Coding Path" />

                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Choose a specialization and start mastering the skills that make
                        top-tier developers. Future Programmer Innovators helps you grow with structured learning,
                        real projects, and contest-ready training.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Web Development */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all p-6 md:p-8 rounded-2xl">
                        <CardHeader className="space-y-3">
                            <LayoutPanelTop className="h-10 w-10 text-blue-500" />
                            <CardTitle className="text-xl font-semibold">Web Development</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                Master HTML, CSS, JavaScript, React, MERN stack, and build
                                production-ready web applications.
                            </p>
                        </CardContent>
                    </Card>

                    {/* App Development */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all p-6 md:p-8 rounded-2xl">
                        <CardHeader className="space-y-3">
                            <Smartphone className="h-10 w-10 text-purple-500" />
                            <CardTitle className="text-xl font-semibold">App Development</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                Learn Flutter, React Native, and build smooth, high-performance
                                apps for Android & iOS.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Cybersecurity */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all p-6 md:p-8 rounded-2xl">
                        <CardHeader className="space-y-3">
                            <ShieldCheck className="h-10 w-10 text-red-500" />
                            <CardTitle className="text-xl font-semibold">Cybersecurity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                Understand ethical hacking, system security, penetration testing,
                                and networking essentials to secure digital systems.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Competitive Programming */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all p-6 md:p-8 rounded-2xl">
                        <CardHeader className="space-y-3">
                            <Sword className="h-10 w-10 text-green-500" />
                            <CardTitle className="text-xl font-semibold">Competitive Programming</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                Practice problem-solving and algorithms to excel in ICPC,
                                Codeforces, AtCoder, and more.
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    );
}
