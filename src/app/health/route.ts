import { NextResponse } from 'next/server';

/** Liveness probe — no auth, no upstream dependencies. */
export function GET() {
  return new NextResponse('staging-craftscript healthy', {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
