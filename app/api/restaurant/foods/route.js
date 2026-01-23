// app/api/restaurant/foods/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export async function POST(request) {
  const payload = await request.json();

  let success = false

  const price = Number(payload.price)

  if (isNaN(price)) {
    return NextResponse.json(
      { success: false, message: 'There should be a price number' },
      { status: 400 }
    )
  }

  const result = await prisma.foods.create({
    data: {
      name: payload.name,
      price: price,
      img_path: payload.img_path,
      description: payload.description,
      restaurant_id: payload.restaurant_id
    }
  })

  if (result) {
    success = true
  }

  return NextResponse.json({ result, success });
}

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const restaurant_id = searchParams.get('restaurant_id');

//   if (!restaurant_id) {
//     return NextResponse.json(
//       { success: false, message: 'Create Account First' },
//       { status: 400 }
//     );
//   }

//   const foods = await prisma.foods.findMany({
//     where: {
//       restaurant_id: Number(restaurant_id)
//     }
//   });

//   return NextResponse.json({ success: true, result: foods });
// }