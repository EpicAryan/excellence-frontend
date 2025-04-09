import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

// Type for decoded token
interface DecodedToken {
  user: {
    id: number
    username: string
    email: string
    role: string
    createdAt: string
  }
  iat: number
  exp: number
}


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('Middleware running for path:', pathname)

  const accessToken = request.cookies.get('accessToken')?.value
  if (accessToken) {
    try {
      const decoded = jwtDecode<DecodedToken>(accessToken)
      const currentTime = Math.floor(Date.now() / 1000)

      if (decoded && decoded.exp > currentTime) {
       
        if (pathname === '/auth/login') {
          if (decoded.user.role === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.url))
          } else {
            return NextResponse.redirect(new URL('/courses', request.url))
          }
        }
        
        // Check role-based access for protected routes
        if (pathname.startsWith('/admin') && decoded.user.role !== 'admin') {
          return NextResponse.redirect(new URL('/courses', request.url))
        }
        return NextResponse.next()
      }
    } catch (error) {
      console.error('Token validation error:', error)
    }
  }

  // Handle protected routes that require authentication
  if (pathname.startsWith('/admin') || pathname.startsWith('/courses')) {
    const url = new URL('/auth/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  // Allow access to public routes (login, register, etc.)
  return NextResponse.next()
}

// Define which routes this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all routes except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (public files)
     * 4. All files with extensions (e.g. favicon.ico)
     */
    '/auth/login', '/admin/:path*', '/courses/:path*',
    '/((?!api|_next|static|.*\\..*).*)',
  ],
}
