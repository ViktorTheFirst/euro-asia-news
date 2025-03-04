import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest, response: NextResponse) {
  const protectedRoutes = ['/admin-panel', '/admin-panel/addArticle'];

  // adds mobile or desktop value to the viewport field on request object
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  url.searchParams.set('viewport', viewport);
  NextResponse.rewrite(url);
  // --------------------------------------------------------------

  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('userRole')?.value;

  // If the user is authenticated, attach its token to response cookies
  const res = NextResponse.next();

  if (token) {
    res.cookies.set({
      name: 'token',
      secure: true,
      //sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      value: token,
      httpOnly: true,
      //domain: '/euro-asia-news.com',
      //maxAge: 60 * 60 * 24 * 7,
    });
  }
  if (role) {
    res.cookies.set({
      name: 'userRole',
      value: role,
      //sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: true,
      httpOnly: true,
      //domain: '/euro-asia-news.com',
      //maxAge: 60 * 60 * 24 * 7,
    });
  }

  const isProtectedRoute = protectedRoutes.includes(url.pathname);

  return res;
}

// TODO: match the paths that need autorization
export const config = {
  matcher: ['/', '/admin-panel/:path*'],
};
