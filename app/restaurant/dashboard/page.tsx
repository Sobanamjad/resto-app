'use client'
import AddFoodItem from "@/app/_components/AddFooditem"
import FoodItemList from "@/app/_components/FoodItemList"
import RestaurantHeader from "@/app/_components/RestaurantHeader"
import '@/app/restaurant/style.css'
import { useState } from "react"

const Dashboard = () => {
    const [addItems, setAddItems] = useState(false)



    return (
        <div>
            <RestaurantHeader />
            <button onClick={()=>setAddItems(true)}>Add Food</button>
            <button onClick={()=>setAddItems(false)}>Dashboard</button>
            {
                addItems ?   <AddFoodItem setAddItems={setAddItems} />: <FoodItemList />
            }
        </div>
    )
}


export default Dashboard