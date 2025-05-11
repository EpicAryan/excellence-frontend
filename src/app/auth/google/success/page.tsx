// src/app/auth/google/success/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getUserAction } from '@/app/actions/user.actions';

export default function GoogleAuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Verify authentication status and redirect
    const verifyAndRedirect = async () => {
      try {
        // Check if the user is authenticated
        const user = await getUserAction();
        
        if (user) {
          toast.success('Successfully logged in with Google!');
          // Redirect to courses page
          router.push('/courses');
        } else {
          toast.error('Authentication failed');
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error during authentication verification:', error);
        toast.error('Authentication verification failed');
        router.push('/auth/login');
      }
    };

    verifyAndRedirect();
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Logging you in...</h1>
        <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full mx-auto"></div>
      </div>
    </div>
  );
}
