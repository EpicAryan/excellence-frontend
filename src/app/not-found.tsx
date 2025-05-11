// src/app/not-found.tsx
'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 px-4">
      <Card className="w-full max-w-md border border-gray-700 bg-neutral-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-red-500 text-3xl font-bold text-center">404 - Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-300">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={() => router.push('/')} 
              variant="outline" 
              className="border-gradient bg-neutral-300 font-bold text-neutral-900 active:105"
            >
              Go to Homepage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
