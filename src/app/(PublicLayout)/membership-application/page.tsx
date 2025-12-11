import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function MembershipApplication() {
    return (
        <div className="container py-20 px-4 md:px-6 max-w-4xl mx-auto">

            {/* Header */}
            <div className="text-center space-y-4 mb-16">
                <h1 className="text-4xl font-bold tracking-tight">
                    Membership Application
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Join the community of innovators. Fill out the form below to apply.
                </p>
            </div>

            {/* Form Card */}
            <Card className="shadow-sm rounded-2xl">
                <CardHeader className="space-y-2 pb-4">
                    <CardTitle className="text-xl font-semibold">
                        Personal Information
                    </CardTitle>
                    <CardDescription>
                        Please provide accurate details for your student profile.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">

                    {/* First + Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">First Name</label>
                            <Input placeholder="John" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Last Name</label>
                            <Input placeholder="Doe" />
                        </div>
                    </div>

                    {/* Email + Student ID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <Input type="email" placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Student ID</label>
                            <Input placeholder="e.g., 2023CS101" />
                        </div>
                    </div>

                    {/* Program + Year */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Program/Branch</label>
                            <Select defaultValue="cs">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Program" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cs">Computer Science</SelectItem>
                                    <SelectItem value="it">Information Technology</SelectItem>
                                    <SelectItem value="ec">Electronics</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Session</label>
                            <Select defaultValue="2020-2021">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2020-2021">2020-2021</SelectItem>
                                    <SelectItem value="2021-2022">2021-2022</SelectItem>
                                    <SelectItem value="2022-2023">2022-2023</SelectItem>
                                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                                    <SelectItem value="2026-2027">2026-2027</SelectItem>
                                    <SelectItem value="2027-2028">2027-2028</SelectItem>
                                    <SelectItem value="2028-2029">2028-2029</SelectItem>
                                    <SelectItem value="2029-2030">2029-2030</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    {/* Areas of Interest */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">Areas of Interest</label>

                        <div className="grid sm:grid-cols-2 gap-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="cloud" />
                                <label htmlFor="cloud" className="text-sm font-medium">
                                    Cloud Computing
                                </label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="coding" />
                                <label htmlFor="coding" className="text-sm font-medium">
                                    Competitive Coding
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="web" />
                                <label htmlFor="web" className="text-sm font-medium">
                                    Web Development
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="app" />
                                <label htmlFor="app" className="text-sm font-medium">
                                    App Development
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="ai/ml" />
                                <label htmlFor="ai/ml" className="text-sm font-medium">
                                    Ai/ML
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="competitive-programming" />
                                <label htmlFor="competitive-programming" className="text-sm font-medium">
                                    Competitive Programming
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Motivation */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Why do you want to join FPI?</label>
                        <Textarea
                            placeholder="Tell us about your motivation and what you hope to achieve..."
                            className="min-h-[130px]"
                        />
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-start space-x-3 pt-1">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm text-muted-foreground leading-relaxed"
                        >
                            I agree to the{" "}
                            <a href="#" className="text-primary hover:underline">
                                Code of Conduct
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-primary hover:underline">
                                Terms
                            </a>
                            .
                        </label>
                    </div>
                </CardContent>

                <CardFooter className="pt-4">
                    <Button className="w-full" size="lg">
                        Submit Application
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}