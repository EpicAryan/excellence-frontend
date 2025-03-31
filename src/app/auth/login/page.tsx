'use client'

import React from 'react';
import { LoginForm } from '@/components';


interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {

  const handleLoginSuccess = (data: LoginFormInputs) => {
    console.log('Login successful:', data);
    
  };

  // Handle login errors
  const handleLoginError = (error: unknown) => {
    console.error('Login error:', error);
    // Handle errors, display notifications, etc.
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center px-4 py-12 relative">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9000FF] rounded-full opacity-20 blur-3xl -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8D6CCB] rounded-full opacity-20 blur-3xl translate-y-1/4 -translate-x-1/4"></div>
      </div>

      {/* Login card */}
      <div className="w-full max-w-md bg-neutral-900 border-x-[1px] border-b-[1px] border-gradient rounded-xl shadow-xl overflow-hidden relative">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#9000FF] via-[#8D6CCB] to-[#8BA0B1]"></div>
        
        <div className="px-8 py-10">
          <div className="text-center mb-8">
            <h1 className="font-title text-3xl font-bold text-white tracking-tight text-gradient-500">Excellence Pathशाला</h1>
            <p className="text-sm text-[#A3A3A3] mt-1">Your tagline here</p>
          </div>

          <h2 className="text-xl font-semibold text-white text-center mb-6">Sign in to your account</h2>

          <LoginForm 
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
