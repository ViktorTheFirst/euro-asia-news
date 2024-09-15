import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest, response: NextResponse) {
  // adds mobile or desktop value to the viewport field on response
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  url.searchParams.set('viewport', viewport);

  return NextResponse.rewrite(url);

  /* const token = request.cookies.get('token');

  // If the user is authenticated, continue as normal
  if (token) {
    const res = NextResponse.next();
    res.cookies.set({
      name: 'token',
      value: token.value,
      httpOnly: true,
    });
    return NextResponse.next();
  }
  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL('/login', request.url)); */
}

// TODO: match the paths that need autorization
export const config = {
  matcher: '/',
};
