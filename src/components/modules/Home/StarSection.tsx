export function StarSection() {
    return (
        <section className="py-24 bg-linear-to-b from-primary to-primary/90 text-primary-foreground relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-10 right-10" />
                <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl bottom-10 left-10" />
            </div>

            <div className="container px-4 md:px-8 relative mx-auto">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                    <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-center">
                        <h3 className="text-5xl md:text-6xl font-extrabold tracking-tight">500+</h3>
                        <p className="text-primary-foreground/80 mt-3 text-lg">Active Members</p>
                    </div>

                    <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-center">
                        <h3 className="text-5xl md:text-6xl font-extrabold tracking-tight">50+</h3>
                        <p className="text-primary-foreground/80 mt-3 text-lg">Contests Held</p>
                    </div>

                    <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-center">
                        <h3 className="text-5xl md:text-6xl font-extrabold tracking-tight">20+</h3>
                        <p className="text-primary-foreground/80 mt-3 text-lg">Courses</p>
                    </div>

                    <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-center">
                        <h3 className="text-5xl md:text-6xl font-extrabold tracking-tight">95%</h3>
                        <p className="text-primary-foreground/80 mt-3 text-lg">Success Rate</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
