// import { NextResponse } from 'next/server';
// import { isUserAdmin, isUserAuthenticated } from './utils/API/auth';

export async function middleware(req) {
  // if (
  //   !(await isUserAuthenticated()) &&
  //   !(req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/')
  // ) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }
  // console.log(await isUserAdmin());
  // if (!(await isUserAdmin()) && req.nextUrl.pathname.match(/^\/admin\//)) {
  //   return NextResponse.redirect(new URL('/dashboard', req.url));
  // }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json (manifest file)
     */
    '/((?!api|_next/static|_next/image|manifest.json|favicon.ico).*)',
  ],
};
