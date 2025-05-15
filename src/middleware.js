import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;
  const isAuthPage = ['/login', '/signup'].includes(pathname);
  const isProtectedPage = ['/account', '/dashboard'].includes(pathname);
    console.log(token)
  // 🔐 Prevent logged-in users from visiting login/signup
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 🔒 Protect private pages
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/signup', '/account', '/dashboard'],
};
