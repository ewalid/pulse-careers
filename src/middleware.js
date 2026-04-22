import { NextResponse } from 'next/server';

// Middleware is intentionally a no-op — homepage personalization is handled
// client-side in HeroBlock via usePersonalization (headline + suggestion chips).
// Full story rewrites caused discipline card images to break on variant stories.
export function middleware(request) {
  return NextResponse.next();
}

export const config = { matcher: ['/'] };
