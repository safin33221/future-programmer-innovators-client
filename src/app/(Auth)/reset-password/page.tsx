"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/common/Logo";

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        
        <div className="flex flex-col items-center text-center">
                  <Logo className="pb-10" />

          <h2 className="text-3xl font-bold tracking-tight">New Password</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a new password for your account
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Please enter your new password below
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">New Password</label>
              <Input type="password" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Confirm New Password</label>
              <Input type="password" />
            </div>

            <Button className="w-full">Reset Password</Button>
          </CardContent>

          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Remember your password?
            <Link
              href="/login"
              className="ml-1 text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
