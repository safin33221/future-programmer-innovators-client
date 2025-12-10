
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
export default function ActivityCard({
    title,
    description,
    icon: Icon,
    tags,
    status,
}: {
    title: string;
    description: string;
    icon: LucideIcon;
    tags: string[];
    status: string;
}) {
    return (
        <Card className="hover:border-primary/50 transition-colors">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex gap-2 items-center  justify-center">

                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">{title}</CardTitle>
                    </div>
                    <Badge variant="secondary">{status}</Badge>
                </div>

            </CardHeader>

            <CardContent>
                <p className="text-muted-foreground mb-6">{description}</p>

                <div className="flex gap-2 flex-wrap">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}