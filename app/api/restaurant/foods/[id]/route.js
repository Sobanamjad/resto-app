import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, context) {  // ← context le lo
  // params ko await karo
  const params = await context.params;        // ← yeh line add kar do
  const restaurant_id = params.id;            // ← ab id sahi milega

  if (!restaurant_id) {
    return NextResponse.json(
      { success: false, message: 'Restaurant ID nahi mila' },
      { status: 400 }
    );
  }

  const foods = await prisma.foods.findMany({
    where: {
      restaurant_id: Number(restaurant_id)
    }
  });

  return NextResponse.json({ success: true, result: foods });
}