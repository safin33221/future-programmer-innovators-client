import SectionTitle from "@/components/shared/SectionTitle";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, Trophy, Rocket, Users } from "lucide-react";

export function FeaturesSection() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 md:px-8 mx-auto">
                <SectionTitle title="Features" className="pb-12" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow p-6 md:p-8 rounded-2xl">
                        <CardHeader className="space-y-3">
                            <BookOpen className="h-10 w-10 text-primary" />
                            <CardTitle className="text-xl font-semibold">Learn</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                Access professional courses designed to take you from basics to advanced concepts.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow p-6 md:p-8 rounded-2xl">
                        <CardHeader className="space-y-3">
                            <Trophy className="h-10 w-10 text-yellow-500" />
                            <CardTitle className="text-xl font-semibold">Compete</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                Participate in regular coding contests and climb the leaderboard.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow p-6 md:p-8 rounded-2xl">
                        <CardHeader className="space-y-3">
                            <Rocket className="h-10 w-10 text-purple-500" />
                            <CardTitle className="text-xl font-semibold">Build</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                Work on real-world projects and build a portfolio that stands out.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow p-6 md:p-8 rounded-2xl">
                        <CardHeader className="space-y-3">
                            <Users className="h-10 w-10 text-green-500" />
                            <CardTitle className="text-xl font-semibold">Grow</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                Connect with mentors and peers to accelerate your career growth.
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    );
}
