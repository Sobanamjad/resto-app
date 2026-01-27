// app/api/restaurant/foods/[id]/route.js
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    return NextResponse.json({ success: false, message: 'ID nahi mila' }, { status: 400 });
  }

  const parsedId = Number(id);

  if (isNaN(parsedId)) {
    return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
  }

  // Pehle restaurant ke foods ki list try karo
  const foods = await prisma.foods.findMany({
    where: {
      restaurant_id: parsedId
    }
  });

  // Agar foods mili hain (kam se kam 1 bhi), to list return kar do
  if (foods.length > 0) {
    return NextResponse.json({
      success: true,
      result: foods
    });
  }

  // Agar list empty hai → shayad yeh single food id hai (edit ke liye)
  const singleFood = await prisma.foods.findUnique({
    where: {
      id: parsedId
    }
  });

  if (singleFood) {
    return NextResponse.json({
      success: true,
      result: singleFood
    });
  }

  // Agar kuch bhi nahi mila
  return NextResponse.json({
    success: false,
    message: 'Food not found'
  }, { status: 404 });
}

export async function DELETE(request, context) {
  
  const params = await context.params  

  const food_id = Number(params.id)

  // Agar id missing ya invalid hai
  if (!params.id || isNaN(food_id)) {
      return NextResponse.json({
          success: false,
          message: 'Food ID missing or invalid'
      }, { status: 400 })
  }

  const existingFood = await prisma.foods.findUnique({
      where: { id: food_id },
  })

  if (!existingFood) {
      return NextResponse.json({
          success: false,
          message: 'Food ID not found'
      }, { status: 404 })
  }

  await prisma.foods.delete({
      where: {
          id: food_id,
      }
  })

  return NextResponse.json({
      success: true,
      message: 'This item successfully deleted!'
  })
}

export async function PUT(request, context) {
  const params = await context.params
  const food_id = params.id

  if (!food_id) {
    return NextResponse.json({ success: false, message: 'Food ID not found in params' }, { status: 400 })
  }

  const payload = await request.json()

  const updated = await prisma.foods.update({
    where: { id: Number(food_id) },
    data: {
      name: payload.name,
      price: Number(payload.price),
      img_path: payload.path,
      description: payload.description, 
    }
  })

  return NextResponse.json({ success: true, message: 'Food updated', result: updated })
}