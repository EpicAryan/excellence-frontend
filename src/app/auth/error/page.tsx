// src/app/auth/error/page.tsx
'use client';


import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const error = searchParams.get('error');
  const message = searchParams.get('message') || "An error occurred during authentication";
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg border-x-[1px] border-b-[1px] border-gradient bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-red-600">Authentication Failed</CardTitle>
          <CardDescription className="text-sm text-[#A3A3A3]">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className=" text-neutral-50 text-center">
            {error === 'user_not_found' ? 
              "Access requires prior registration. Kindly contact the teacher to proceed." : 
              "Please try again or contact support if the problem persists."}
          </p>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => router.push('/auth/login')}
              className="flex-1 border-x-[1px] border-b-[1px] border-gradient bg-neutral-300 font-bold"
            >
              Return to Login
            </Button>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
