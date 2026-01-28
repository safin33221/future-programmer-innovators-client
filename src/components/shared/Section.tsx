const Section = ({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) => (
    <div className="space-y-4">
        <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
        </div>
        <div className="rounded-lg border p-4 space-y-4">
            {children}
        </div>
    </div>
);
export default Section;