// app/api/customer/[id]/route.ts

import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

// ek restaurant ko get krny ky liya
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params


  const numericId = Number(id)
  if (Number.isNaN(numericId)) {
    return NextResponse.json(
      { success: false, message: "Invalid restaurant ID" },
      { status: 400 }
    )
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: numericId },
    include: { foods : true }
  })


  if (!restaurant) {
    return NextResponse.json(
      { success: false, message: "Restaurant not found" },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    restaurant
  })
}