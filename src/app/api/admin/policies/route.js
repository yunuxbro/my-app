import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Policy } from '@/models/DashboardModels';

const API_KEY = process.env.NEXT_PUBLIC_NEXUS_ADMIN_API_KEY || "NEXUS_DEMO_KEY_2026";

function validateApiKey(req) {
  const apiKey = req.headers.get('x-nexus-api-key');
  return apiKey === API_KEY;
}

export async function GET(req) {
  if (!validateApiKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const policies = await Policy.find({}).sort({ created_at: -1 });
    return NextResponse.json(policies);
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
    const policy = await Policy.create(body);
    return NextResponse.json(policy, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
