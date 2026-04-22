import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname !== '/') return NextResponse.next();

  const segment = request.cookies.get('pulse_segment')?.value;
  if (!segment) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${segment}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ['/'] };
