import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  return NextResponse.json({
    dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
  });
}
