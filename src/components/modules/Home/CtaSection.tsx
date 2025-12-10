import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
    return (
        <section className="py-20">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="bg-muted rounded-3xl p-8 md:p-16 text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                        Ready to start your journey?
                    </h2>

                    <p className="text-muted-foreground max-w-[600px] mx-auto text-lg">
                        Join hundreds of other students who are building their future with
                        Future Programming Innovators today.
                    </p>

                    <Link href="/apply">
                        <Button size="lg" className="mt-4">
                            Apply for Membership
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
