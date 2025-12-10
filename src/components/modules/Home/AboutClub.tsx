export function AboutClub() {
    return (
        <section className="py-28 bg-linear-to-b from-background via-primary/5 to-background relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,var(--color-primary),transparent_70%)]/[40]" />

            <div className="container px-4 md:px-6 relative mx-auto">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Who <span className="text-primary">We Are</span>
                    </h2>

                    <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto">
                        Future Programmer Innovators  is a next-gen programming club dedicated to uplifting
                        diploma students through <span className="text-foreground font-semibold">real-world projects</span>,
                        <span className="text-foreground font-semibold">industry-level mentorship</span>, and
                        <span className="text-foreground font-semibold">competitive programming excellence</span>.
                    </p>

                    <div
                        className=" mt-10 p-8 md:p-12 rounded-3xl border bg-card/40 backdrop-blur-xl shadow-lg hover:shadow-primary/10 transition-all duration-300"
                    >
                        <p className="text-base md:text-lg text-foreground leading-relaxed">
                            Our mission is to build confident, skilled, and innovative programmers who can compete globally—
                            whether it&apos;s in <strong>web development, app development, cybersecurity, AI, or programming contests</strong>.
                            We believe every student deserves a platform to learn, build, grow, and shine.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
