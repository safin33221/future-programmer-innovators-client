import { Logo } from "@/components/common/Logo";
import Link from "next/link";

export default function NotFound() {
    return (
        <section className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">

            {/* Logo */}
            {/* <Logo className="mb-8 mx-auto" /> */}

            <h1 className="text-7xl font-extrabold text-primary">404</h1>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                Page Not Found
            </h2>

            <p className="mt-3 max-w-md text-muted-foreground">
                The page you’re looking for doesn’t exist or has been moved.
            </p>

            <Link
                href="/"
                className="
                    mt-6 inline-block px-6 py-3 rounded-lg 
                    bg-primary text-white font-medium
                    hover:bg-primary/90 transition
                "
            >
                Return Home
            </Link>
        </section>
    );
}
