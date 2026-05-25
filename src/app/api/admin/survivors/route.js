import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Survivor } from '@/models/DashboardModels';

const API_KEY = process.env.NEXT_PUBLIC_NEXUS_ADMIN_API_KEY || "NEXUS_DEMO_KEY_2026";

function validateApiKey(req) {
  const apiKey = req.headers.get('x-nexus-api-key');
  return apiKey === API_KEY;
}

export async function GET(req) {
  if (!validateApiKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    await dbConnect();
    const survivors = await Survivor.find({}).sort({ created_at: -1 }).limit(limit);
    return NextResponse.json(survivors);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  if (!validateApiKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await req.json();
    const survivor = await Survivor.create(body);
    return NextResponse.json(survivor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
