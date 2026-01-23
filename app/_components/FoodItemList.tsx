'use client'
import { useEffect, useState } from "react"

interface FoodItem {
    id: number
    name: string
    price: number
    description: string
    img_path: string
    // agar restaurant_id bhi hai to yahan add kar sakte ho
}
const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);


    const LoadFoodItems = async () => {
        const restaurantData = localStorage.getItem('restaurantuser')

        if (!restaurantData) {
            alert('Login First.')
            return;
        }

        const resto = JSON.parse(restaurantData)
        const restaurant_id = resto.id

        if (!restaurant_id) {
            alert('Login again.')
            return;
        }

        const url = `http://localhost:3000/api/restaurant/foods/${restaurant_id}`

        const response = await fetch(url);

        if (!response.ok) {
            const text = await response.text();
            console.log('Backend Code Issue', response.status, text)
            alert('Server Porblem :' + response.status)
            return;
        }

        const data = await response.json()

        if (data.success) {
            setFoodItems(data.result);
        } else {
            alert('Food Items not loaded! ' + (data.message || 'Something Wrong'))
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await LoadFoodItems()
        }
        fetchData();
    }, [])

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
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img src={item.img_path} alt={item.name} /></td>
                                <td><button>Delete</button><button>Edit</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FoodItemList