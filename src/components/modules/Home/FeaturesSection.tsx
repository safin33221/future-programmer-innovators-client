
import SectionTitle from "@/components/shared/SectionTitle";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, Trophy, Rocket, Users } from "lucide-react";

export function FeaturesSection() {
    return (
        <section className="py-16 bg-muted/30">
            <SectionTitle title="Features" className="pb-6" />
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <BookOpen className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>Learn</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Access professional courses designed to take you from basics
                                to advanced concepts.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <Trophy className="h-10 w-10 text-yellow-500 mb-2" />
                            <CardTitle>Compete</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Participate in regular coding contests and climb the leaderboard.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <Rocket className="h-10 w-10 text-purple-500 mb-2" />
                            <CardTitle>Build</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Work on real-world projects and build a portfolio that stands out.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <Users className="h-10 w-10 text-green-500 mb-2" />
                            <CardTitle>Grow</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Connect with mentors and peers to accelerate your career growth.
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    );
}
