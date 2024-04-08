import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // TODO: Handle Form Data

  return NextResponse.json({message: 'ok'});
}
