import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

// GET /api/fields/:id - Get single field
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const field = storage.getField(params.id);
    
    if (!field) {
      return NextResponse.json(
        { error: 'Field not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(field);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch field' },
      { status: 500 }
    );
  }
}

// PUT /api/fields/:id - Update field
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Convert lastIrrigated to Date if it's a string
    if (body.lastIrrigated && typeof body.lastIrrigated === 'string') {
      body.lastIrrigated = new Date(body.lastIrrigated);
    }

    const updatedField = storage.updateField(params.id, body);
    
    if (!updatedField) {
      return NextResponse.json(
        { error: 'Field not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedField);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update field' },
      { status: 500 }
    );
  }
}

// DELETE /api/fields/:id - Delete field
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = storage.deleteField(params.id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Field not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Field deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete field' },
      { status: 500 }
    );
  }
}