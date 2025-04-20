'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { loginAction, getUserRoleFromToken } from '@/app/actions/auth.actions'
import { toast } from "sonner";


interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSuccess?: (data: LoginFormInputs) => void;
  onError?: (error: unknown) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormInputs>();
  
  const router = useRouter()
  
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormInputs) => {
      return await loginAction(data)
    },
    onSuccess: async (response, variables) => {
      if (response.success && response.accessToken) {
        // Get user role from the token
        const role = await getUserRoleFromToken(response.accessToken)
        console.log("User role: ", role);
        toast.success("Login successful!");
        // Redirect based on role
        if (role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/courses')
        }
        
        if (onSuccess) onSuccess(variables)
      } else {
        throw new Error(response.message || 'Login failed')
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
      if (onError) onError(error)
    }
  })

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    loginMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="relative">
        <label 
          htmlFor="email" 
          className="absolute -top-2 left-3 px-1 bg-neutral-900 text-xs text-[#A3A3A3] font-medium"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-3 bg-transparent border border-[#A3A3A3] focus:border-[#B091EA] rounded-lg text-white outline-none transition-colors"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="relative">
        <label 
          htmlFor="password" 
          className="absolute -top-2 left-3 px-1 bg-neutral-900 text-xs text-[#A3A3A3] font-medium"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-4 py-3 bg-transparent border border-[#A3A3A3] focus:border-[#B091EA] rounded-lg text-white outline-none transition-colors"
          {...register("password", { 
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }
          })}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      {loginMutation.error ? (
        <p className="text-red-400 text-sm">
          {loginMutation.error instanceof Error 
            ? loginMutation.error.message 
            : "Login failed. Please try again."}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full py-3 bg-[#8D6CCB] hover:bg-[#9000FF] text-white font-semibold rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0.5 flex justify-center"
      >
        {loginMutation.isPending  ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
