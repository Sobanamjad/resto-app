// app/api/restaurant/foods/[id]/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, context) {  // ← context le lo
  // params ko await karo
  const params = await context.params       // ← yeh line add kar do
  const restaurant_id = params.id         // ← ab id sahi milega

  if (!restaurant_id) {
    return NextResponse.json(
      { success: false, message: 'Restaurant ID not found' },
      { status: 400 }
    )
  }

  const foods = await prisma.foods.findMany({
    where: {
      restaurant_id: Number(restaurant_id)
    }
  })

  return NextResponse.json({ success: true, result: foods })
}

export async function DELETE(request, context) {
  const params = await context.params
  const food_id = params.id

  if (!food_id) {
    return NextResponse.json({
      success: false,
      message: 'Food ID not found'
    }, { status: 400 });
  }
  await prisma.foods.delete({
    where: {
      id: Number(food_id),
    }
  })

  return NextResponse.json({
    success: true,
    message: 'This item successfully deleted!'
  })

}