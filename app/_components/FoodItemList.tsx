'use client'
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

interface FoodItem {
    id: number
    name: string
    price: number
    description: string
    img_path: string
    // agar restaurant_id bhi hai to yahan add kar sakte ho
}
const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState<FoodItem[]>([])
    const router = useRouter()

    
    const isDeletingRef = useRef(false)


    const LoadFoodItems = async () => {
        const restaurantData = localStorage.getItem('restaurantuser')
    
        if (!restaurantData) {
            alert('Login First.')
            return
        }
    
        const resto = JSON.parse(restaurantData)
        const restaurant_id = resto.id
    
        if (!restaurant_id) {
            alert('Login again.')
            return
        }
    
        const url = `http://localhost:3000/api/restaurant/foods/${restaurant_id}`
    
        const response = await fetch(url)
    
        if (!response.ok) {
            
            if (response.status !== 404) {
                alert('Server Problem: ' + response.status)
            }
            setFoodItems([])  
            return
        }
    
        const data = await response.json()
    
        if (data.success) {
            setFoodItems(data.result || [])
        } else {
            setFoodItems([])
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await LoadFoodItems()
        }
        fetchData()
    }, [])

    const deleteFoodItem = async (id: number) => {
        if (isDeletingRef.current) return
        isDeletingRef.current = true

        const restaurantData = localStorage.getItem('restaurantuser')
        if (!restaurantData) {
            alert('Login First.')
            isDeletingRef.current = false
            return
        }
        const resto = JSON.parse(restaurantData)
        const restaurant_id = resto.id
       
        if (!restaurant_id) {
            alert('Restaurant ID not found')
            isDeletingRef.current = false
            return
        }

        const url = `http://localhost:3000/api/restaurant/foods/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            }
        })

        const data = await response.json()

        if (data.success) {
            alert('Food item deleted successfully!')
            await LoadFoodItems()
        } else {
            alert('Delete failed: ' + (data.message || 'Unknown error'))
        }

        isDeletingRef.current = false
    }

    return (
        <div>
            <h1>Food Item</h1>
            <table>
                <thead>
                    <tr>
                        <td>Sr. No</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        foodItems && foodItems.map((item, key) => (
                            <tr key={item.id}>
                                <td>{key + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img src={item.img_path} alt={item.name} /></td>
                                <td><button onClick={() => { deleteFoodItem(item.id) }}>Delete</button>
                                    <button onClick={() => router.push(`/restaurant/dashboard/${item.id}`)}>
                                        Edit
                                    </button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FoodItemList