import { NextResponse } from 'next/server';

export async function GET() {
  const isSet = !!process.env.MONGODB_URI;
  const prefix = isSet ? process.env.MONGODB_URI.substring(0, 15) : 'MISSING';
  
  return NextResponse.json({ 
    envSet: isSet, 
    prefix: prefix + '...',
    nodeEnv: process.env.NODE_ENV
  });
}
