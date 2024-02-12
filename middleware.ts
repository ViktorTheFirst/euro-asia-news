import { NextResponse, NextRequest } from 'next/server';
import { getUserToken } from './auth/utils/users';

export function middleware(request: NextRequest) {
  console.log('MIDDLEWARE');
  const token = getUserToken();

  // If the user is authenticated, continue as normal
  if (!token) {
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL('/registration', request.url));
}

export const config = {
  matcher: '/',
  missing: [
    { type: 'header', key: 'next-router-prefetch' },
    { type: 'header', key: 'purpose', value: 'prefetch' },
  ],
};
