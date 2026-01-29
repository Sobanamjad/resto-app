// app/explore/[id]/[name]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import CustomerHeader from "@/app/_components/CustomerHeader"
import RestaurantFooter from "@/app/_components/RestaurantFooter"

interface Restaurant {
    id: number
    name: string
    foods: FoodItem[]
}

// State same rakho (array of cart items)
interface CartItem extends FoodItem {
    quantity: number
    restaurantId: number
}

interface FoodItem {
    id: number
    name: string
    price: number
    description: string
    img_path: string
}

export default function Page() {
    const params = useParams()
    const router = useRouter()

    const id = params.id as string
    const name = params.name as string

    const numericId = Number(id)
    const decodedName = decodeURIComponent(name)

    const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)

    // 1. Page load hone par localStorage se cart load karo
    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems')
        if (savedCart) {
            setCartItems(JSON.parse(savedCart))
        }
    }, [])

    // 2. Jab bhi cartItems change ho, localStorage mein save kar do
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
        } else {
            localStorage.removeItem('cartItems')
        }
    }, [cartItems])

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (Number.isNaN(numericId)) return router.push('/404')

            const res = await fetch(`/api/customer/${numericId}`, { cache: 'no-store' })
            const data = await res.json()

            if (!res.ok || !data.success || !data.restaurant) {
                return router.push('/404')
            }

            setRestaurant(data.restaurant)
            setLoading(false)
        }

        fetchRestaurant()
    }, [numericId, router])

    if (loading) {
        return <div>Loading...</div>
    }

    const cartCount = cartItems.length

    if (!restaurant) {
        return (
            <div>
                <div className="no-food-section">
                    <h3>Restaurant Missing</h3>
                </div>
                <RestaurantFooter />
            </div>
        )
    }

    const addToCart = (food: FoodItem) => {
        setCartItems((prev) => {
            // Agar cart khali hai ya pehle se same restaurant ka hai
            if (prev.length === 0 || prev[0].restaurantId === numericId) {
                const existing = prev.find(item => item.id === food.id)
    
                if (existing) {
                    return prev.map(item =>
                        item.id === food.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
    
                // Naya item same restaurant ka
                return [...prev, { ...food, quantity: 1, restaurantId: numericId }]
            }
    
            // Different restaurant → purana cart clear + naya start
            console.log("Different restaurant detected → clearing old cart");
            return [{ ...food, quantity: 1, restaurantId: numericId }];
        });
    }
    

    return (
        <div>
            <CustomerHeader cartData={cartItems[0]} cartNumber={cartItems.length}/>

            <div className="restaurant-page-banner">
                <h1>{decodedName}</h1>
            </div>

            {restaurant.foods?.length > 0 ? (
                <div>
                    <h2 className="food-menu-heading">Menu</h2>

                    <div className="food-item-wrapper">
                        {restaurant.foods.map((food: FoodItem) => (
                            <div className="food-list" key={food.id}>
                                <img width={100} src={food.img_path} alt={food.name} />

                                <div className="food-detail-list">
                                    <div className="food-name">{food.name}</div>
                                    <div className="food-price">Rs. {food.price}</div>

                                    {food.description && (
                                        <div className="description">
                                            {food.description}
                                        </div>
                                    )}

                                    <button className="cart-button"
                                    onClick={()=>addToCart(food)}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="no-food-section">
                    <h3>No Food Item Added</h3>
                    <p>This restaurant hasn&apos;t added any menu items yet.</p>
                </div>
            )}

            <RestaurantFooter />
        </div>
    )
}
