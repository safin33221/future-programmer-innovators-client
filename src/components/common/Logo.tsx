import { Code2 } from "lucide-react";
import Link from "next/link";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-3">
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
            <div className="leading-tight">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                    Future <span className="text-primary">Programming</span>
                </h1>
                <p className="text-md text-muted-foreground tracking-wide">
                    Innovators
                </p>
            </div>
        </Link>
    );
}
