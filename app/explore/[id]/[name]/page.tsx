//app/explore/[id]/[name]/page.tsx

import { notFound } from 'next/navigation'
import CustomerHeader from "@/app/_components/CustomerHeader"
import RestaurantFooter from "@/app/_components/RestaurantFooter"

interface FoodItem {
    id: number
    name: string
    price: number
    description: string
    img_path: string
}
type Props = {
    params: Promise<{
      id: string
      name: string
    }>
  }

const Page = async ({ params }: Props) => {
    const { id, name } = await params

    const numericId = Number(id)
    const decodedName = decodeURIComponent(name)

    if (Number.isNaN(numericId)) notFound()

    const response = await fetch(`http://localhost:3000/api/customer/${numericId}`, {
        cache: 'no-store'
      })

    const data = await response.json()

    if (!data.success || !data.restaurant) {
        return <div>Restaurant Missing</div>
    }

    const restaurant = data.restaurant
    return (
        <div>
            <CustomerHeader />
            <div className="restaurant-page-banner">
                <h1>{decodedName}</h1>
            </div>
            {/* foods list */}
            {restaurant.foods?.length > 0 ? (
                <div>
                    <h2 className="food-menu-heading">Menu</h2>
                    <div className="food-item-wrapper">
                        {restaurant.foods.map((food: FoodItem) => (
                            <div className="food-list" key={food.id}>
                                <img style={{ width: 100 }} src={food.img_path} alt={food.name} />
                                <div className="food-detail-list">
                                    <div className="food-name">{food.name}</div>
                                    <div className="food-price">Rs. {food.price}</div>
                                    {food.description && (
                                        <div className="description">{food.description}</div>
                                    )}
                                    <button className="cart-button">Add to cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="no-food-section">
                    <h3>No Food Item Added</h3>
                    <p>This restaurant hasn&apos;t added any menu items yet.</p>
                    {/* optional: icon ya image daal sakte ho */}
                </div>
            )}

            <RestaurantFooter />
        </div>
    )
}

export default Page
