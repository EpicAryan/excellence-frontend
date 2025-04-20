'use server'

import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

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

  