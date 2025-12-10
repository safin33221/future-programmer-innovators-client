interface SectionTitleProps {
    title: string;
    highlight?: string;
    subtitle?: string;
    align?: "left" | "center";
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}

const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
};

export default function SectionTitle({
    title,
    highlight,
    subtitle,
    align = "center",
    size = "lg",
    className = "",
}: SectionTitleProps) {
    return (
        <div className={`space-y-3 ${align === "center" ? "text-center" : "text-left"} ${className}`}>
            <h2 className={`${sizeClasses[size]} font-bold tracking-tight text-3xl md:text-4xl`}>
                {title} {highlight && <span className="text-primary">{highlight}</span>}
            </h2>

            {subtitle && (
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
