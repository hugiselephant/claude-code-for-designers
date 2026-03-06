"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleOAuth = async (provider: "google" | "github") => {
    setIsLoading(provider);
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Neural Garden Academy</CardTitle>
        <CardDescription>Sign in to access your course</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuth("google")}
          disabled={isLoading !== null}
        >
          {isLoading === "google" ? "Redirecting..." : "Continue with Google"}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuth("github")}
          disabled={isLoading !== null}
        >
          {isLoading === "github" ? "Redirecting..." : "Continue with GitHub"}
        </Button>
      </CardContent>
    </Card>
  );
}
