import { prisma } from '@/lib/prisma';
import { NextResponse } from "next/server";

export async function GET(request) {
    const queryParams = request.nextUrl.searchParams
    console.log(queryParams.get('restaurant'))
    let filter = {}
    if (queryParams.get('location')) {
        let city = queryParams.get('location')
        filter = {
            city: {
                contains: city,           
                mode: 'insensitive'       
            }
        }
    } else if (queryParams.get('restaurant')) {
        let name = queryParams.get('restaurant')
        filter = {
            name: {
                contains: name,           
                mode: 'insensitive'       
            }
        }
    }
    const restaurant = await prisma.restaurant.findMany({
        where: filter
    })



    return NextResponse.json({ success: true, restaurant })
}