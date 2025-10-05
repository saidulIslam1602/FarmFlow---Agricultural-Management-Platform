import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

// GET /api/fields - Get all fields
export async function GET() {
  try {
    const fields = storage.getFields();
    return NextResponse.json(fields);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch fields' },
      { status: 500 }
    );
  }
}

// POST /api/fields - Create new field
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.cropType || !body.area) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert lastIrrigated to Date if it's a string
    if (body.lastIrrigated && typeof body.lastIrrigated === 'string') {
      body.lastIrrigated = new Date(body.lastIrrigated);
    }

    const newField = storage.addField(body);
    return NextResponse.json(newField, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create field' },
      { status: 500 }
    );
  }
}