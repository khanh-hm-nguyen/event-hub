import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; 

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // 1. Define protected routes
  if (pathname.startsWith('/admin')) {
    
    // 2. If no token exists, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // 3. Verify the JWT
      const { payload } = await jwtVerify(token, SECRET);

      // 4. Check if the user has the 'admin' role
      if (payload.role !== 'admin') {
        // If not admin, send back to home or access denied
        return NextResponse.redirect(new URL('/', request.url));
      }

      // If all checks pass, allow the request
      return NextResponse.next();
    } catch (error) {
      // If token is invalid or expired
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// 5. Only run middleware on admin routes
export const config = {
  matcher: ['/admin/:path*'],
};