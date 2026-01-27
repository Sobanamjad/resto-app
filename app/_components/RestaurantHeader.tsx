'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface RestaurantUser {
    id: number         
    name?: string      
    email: string      
    city?: string  
    address?: string
    contact?: string
}

const RestaurantHeader = () => {
   
    const [details, setDetails] = useState<RestaurantUser | null>(null)

    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        
        const syncUserData = () => {
            const storedData = localStorage.getItem('restaurantuser')

            if (!storedData) {
                setDetails(null)  

               
                if (pathname === '/restaurant/dashboard') {
                    router.replace('/restaurant')
                }
            } else {
                // Safe parse
                if (typeof storedData === 'string' && storedData.trim() !== '') {
                    const parsed = JSON.parse(storedData)
                    setDetails(parsed)

                
                    if (pathname === '/restaurant') {
                        router.replace('/restaurant/dashboard')
                    }
                } else {
                    setDetails(null)
                    localStorage.removeItem('restaurantuser')

                    if (pathname === '/restaurant/dashboard') {
                        router.replace('/restaurant')
                    }
                }
            }
        }

       
        syncUserData()
    }, [pathname, router]) 

    const logout = () => {
        localStorage.removeItem('restaurantuser')
        setDetails(null)
        router.replace('/restaurant')
    }

    return (
        <div className='header-wrapper'>
            <div className="logo">
                <img
                    style={{ width: 100 }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ci9fGC6jGhnszpTaEc1tSQr0V-KosAfCng&s"
                    alt="Restaurant Logo"
                />
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>

                {details && details.name ? (
                    <>
                        <li>
                            
                            <Link href="/restaurant/dashboard">Profile</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/restaurant/signup">Sign Up</Link>
                        </li>
                        <li>
                            <Link href="/restaurant">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default RestaurantHeader