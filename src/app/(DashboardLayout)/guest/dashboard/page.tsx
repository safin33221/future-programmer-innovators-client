import { Users, GraduationCap, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="space-y-10">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Guest Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                    Limited access enabled. Upgrade your role to unlock full platform features.
                </p>
            </div>

            {/* STATUS BAR */}
            <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/30 p-4">
                <ShieldCheck className="h-5 w-5 text-orange-500" />
                <p className="text-sm">
                    Current Role: <span className="font-medium">Guest</span>
                </p>
                <span className="ml-auto text-xs text-muted-foreground">
                    Access Level: Read-only
                </span>
            </div>

            {/* FEATURE GRID */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* MEMBER CARD */}
                <div className="group rounded-xl border p-6 transition hover:shadow-lg">
                    <Users className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold">Membership Access</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Join the community and unlock learning resources, events, and projects.
                    </p>

                    <ul className="mt-4 space-y-2 text-sm">
                        <li>• Events & Workshops</li>
                        <li>• Internal Projects</li>
                        <li>• Learning Tracks</li>
                        <li>• Community Access</li>
                    </ul>

                    <Link href={`/guest/dashboard/apply`}>
                        <button className="mt-5 flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:gap-3 transition">
                            Apply for Membership <ArrowRight size={16} />
                        </button></Link>
                </div>

                {/* MENTOR CARD */}
                <div className="group rounded-xl border p-6 transition hover:shadow-lg">
                    <GraduationCap className="h-10 w-10 text-purple-600 mb-4" />
                    <h3 className="text-lg font-semibold">Mentor Program</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Share expertise, guide members, and grow your professional influence.
                    </p>

                    <ul className="mt-4 space-y-2 text-sm">
                        <li>• 1:1 Mentorship</li>
                        <li>• Technical Sessions</li>
                        <li>• Career Guidance</li>
                        <li>• Leadership Recognition</li>
                    </ul>

                    <button className="mt-5 flex items-center gap-2 text-sm font-medium text-purple-600 group-hover:gap-3 transition">
                        Become a Mentor <ArrowRight size={16} />
                    </button>
                </div>

                {/* SECURITY / REVIEW CARD */}
                <div className="rounded-xl border p-6 bg-muted/20">
                    <ShieldCheck className="h-10 w-10 text-green-600 mb-4" />
                    <h3 className="text-lg font-semibold">Review & Approval</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        All applications go through a manual verification process.
                    </p>

                    <ul className="mt-4 space-y-2 text-sm">
                        <li>• Profile verification</li>
                        <li>• Academic / professional review</li>
                        <li>• Admin approval</li>
                        <li>• Role upgrade after approval</li>
                    </ul>
                </div>
            </div>

            {/* FOOTER CTA */}
            <div className="rounded-lg border bg-primary/5 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                    Ready to unlock your full potential?
                </p>
                <p className="mt-1 font-medium">
                    Apply for membership or mentor access to continue.
                </p>
            </div>
        </div >
    );
}
