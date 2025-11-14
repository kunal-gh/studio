import { NextRequest, NextResponse } from 'next/server';
import { getPhotographById, updatePhotograph, deletePhotograph } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const photo = getPhotographById(params.id);
    if (!photo) {
      return NextResponse.json({ error: 'Photograph not found' }, { status: 404 });
    }
    return NextResponse.json(photo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch photograph' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = updatePhotograph(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Photograph not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update photograph' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = deletePhotograph(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Photograph not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete photograph' }, { status: 500 });
  }
}
