import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest, response: NextResponse) {
  const protectedRoutes = ['/admin-panel', '/admin-panel/addArticle'];
  // adds mobile or desktop value to the viewport field on response
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  url.searchParams.set('viewport', viewport);
  // --------------------------------------------------------------

  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('userRole')?.value;

  console.log('token in MIDDLEWARE', token);
  console.log('url in MIDDLEWARE', url);

  // If the user is authenticated, continue as normal
  if (token) {
    const res = NextResponse.next();
    res.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
    });
    //return NextResponse.next();
  }
  // Redirect to login page if not authenticated
  if (!token) {
    console.log('REDIRECTING TO LOGIN');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const isProtectedRoute = protectedRoutes.includes(url.pathname);

  if (isProtectedRoute && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return NextResponse.rewrite(url);
}

// TODO: match the paths that need autorization
export const config = {
  matcher: ['/', '/admin-panel/:path*'],
};
