'use server'

import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  role: z.enum(["user", "admin"]),
});

interface LoginCredentials {
  email: string
  password: string
}

type UserResponse = {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface LoginResponse {
  success: boolean
  accessToken?: string
  sessionId?: string
  userWithoutPassword?: UserResponse
  message?: string
}

export async function loginAction(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      return { 
        success: false, 
        message: data.message || 'Login failed' 
      }
    }

    // // Set cookies on the server
    const cookieStore = await cookies(); 
    cookieStore.set('sessionId', data.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })


    return {
      success: true,
      accessToken: data.accessToken,
      sessionId: data.sessionId,
      userWithoutPassword: data.user,
    }
  } catch (error) {
    console.error('Login action error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred',
    }
  }
}


export async function getUserRoleFromToken(token: string): Promise<string> {
  try {
    const decoded = jwtDecode<{  user: { role: string } }>(token)
    return Promise.resolve(decoded.user.role)
  } catch (error) {
    console.error('Error decoding token:', error)
    return Promise.resolve('user') // Default fallback
  }
}

export async function registerStudentAction(formData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    // Client-side validation for password match
    if (formData.password !== formData.confirmPassword) {
      return {
        success: false,
        errors: {
          confirmPassword: ["Passwords do not match"]
        }
      };
    }

    // Server-side validation using zod
    const validationResult = signUpSchema.safeParse({
      username: formData.name,
      email: formData.email,
      password: formData.password,
      role: "user" // Assuming students are regular users
    });

    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.format()
      };
    }

    // Call the backend API
    const API_URL = process.env.NEXT_BACKEND_API_URL;
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.name,
        email: formData.email,
        password: formData.password,
        role: "user"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Registration failed",
        errors: data.errors || {}
      };
    }

    return {
      success: true,
      user: data.user
    };
  } catch (error) {
    console.error('Error registering student:', error);
    return {
      success: false,
      message: "Failed to connect to the server"
    };
  }
}
