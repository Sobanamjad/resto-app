// app/api/restaurant/route.js
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const data = await prisma.restaurant.findMany()
    console.log(data)
    return NextResponse.json({ result: true, data })
}

export async function POST(request) {
    const payload = await request.json();
    let result
    let success = false

    if (payload.login) {
        result = await prisma.restaurant.findUnique({
            where: { email: payload.email }
        })  
        if (result && result.password === payload.password) {
            
        } 
        if(result){
            success = true
        }
        else {
            result = null;  
        }
    } 
    else {
  
        result = await prisma.restaurant.create({
            data: {
                email: payload.email || null,
                password: payload.password || null,
                name: payload.name || null,
                city: payload.city || null,
                address: payload.address || null,
                contact: payload.contact || null,
            },
        });
        if(result){
            success = true
        }
    }

    return NextResponse.json({ result, success });
}