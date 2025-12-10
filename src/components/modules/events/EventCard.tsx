
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
export default function EventCard({
    title,
    date,
    time,
    location,
    type,
    description,
    status,
}: {
    title: string;
    date: string;
    time: string;
    location: string;
    type: string;
    description: string;
    status: string;
}) {
    return (
        <Card className="flex flex-col hover:border-primary/50 transition-colors">
            <CardHeader>
                <div className="flex justify-between items-start mb-2">
                    <Badge variant={type === "Contest" ? "default" : "secondary"}>
                        {type}
                    </Badge>

                    <Badge
                        variant="outline"
                        className="text-green-600 border-green-200 bg-green-50"
                    >
                        {status}
                    </Badge>
                </div>

                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
                <p className="text-muted-foreground text-sm">{description}</p>

                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{location}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Button className="w-full">Register Now</Button>
            </CardFooter>
        </Card>
    );
}
