'use client'

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';


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
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      if (onSuccess) onSuccess(data);
    } catch (error) {
      if (onError) onError(error);
    } finally {
      setIsLoading(false);
    }
  };

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


      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-[#8D6CCB] hover:bg-[#9000FF] text-white font-semibold rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0.5 flex justify-center"
      >
        {isLoading ? (
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
