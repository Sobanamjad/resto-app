import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const restaurants = await prisma.restaurant.findMany();

    const cities = restaurants.map((item) => item.city.charAt(0).toUpperCase()+ item.city.slice(1))
    const sameCity = [...new Set(cities.map((item) => item))]

    return NextResponse.json({
        success: true,
        result: sameCity
    });
}