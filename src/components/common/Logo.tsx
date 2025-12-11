import { Code2 } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export function Logo({ className }: { className?: string }) {
    return (
        <Link
            href="/"
            className={clsx(
                "flex items-center gap-3 group select-none",
                className
            )}
        >
            {/* Icon */}
            <div
                className="
                    h-10 w-10 flex items-center justify-center rounded-xl
                    bg-linear-to-br from-primary/20 to-primary/40
                    text-primary transition-transform group-hover:scale-105
                "
            >
                <Code2 className="h-6 w-6" />
            </div>

            {/* Text */}
            <div className="leading-tight text-left">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                    Future <span className="text-primary">Programmer</span>
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground tracking-wide">
                    Innovators
                </p>
            </div>
        </Link>
    );
}
