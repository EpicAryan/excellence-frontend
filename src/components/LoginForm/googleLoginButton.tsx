'use client';

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  };

  return (
    <Button 
      variant="outline" 
      type="button" 
      className="w-full flex items-center justify-center gap-2 bg-background"
      onClick={handleGoogleLogin}
    >
      <FcGoogle className="h-5 w-5" />
      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
