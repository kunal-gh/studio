import { NextRequest, NextResponse } from 'next/server';
import { getPhotographs, addPhotograph } from '@/lib/db';

export async function GET() {
  try {
    const photographs = getPhotographs();
    return NextResponse.json(photographs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch photographs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newPhoto = addPhotograph(body);
    return NextResponse.json(newPhoto, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create photograph' }, { status: 500 });
  }
}
