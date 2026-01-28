'use client'
import { useEffect, useState, useMemo } from "react";
import CustomerHeader from "./_components/CustomerHeader"
import RestaurantFooter from "./_components/RestaurantFooter";
import { useRouter } from "next/navigation";

export default function Home() {

  const [locations, setLocations] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [showLocationList, setShowLocationList] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [searchQueries, setsearchQueries] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()


  
    const loadData = async (selectedLoc?: string) => {
      setIsLoading(true)
      const locationResponse = await fetch('http://localhost:3000/api/customer/locations')

      const locationData = await locationResponse.json()
      if (locationData.success) {
        setLocations(locationData.result)

      }
      let url = 'http://localhost:3000/api/customer'
      if (selectedLoc) {
        url += `?location=${encodeURIComponent(selectedLoc)}`
      }
      const restaurantResponse = await fetch(url)
      const restaurantData = await restaurantResponse.json()
      if (restaurantData.success) {
        setRestaurants(restaurantData.restaurant || [])
      } else {
        setRestaurants([])
      }

      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      loadData()

  }, [])


  const selectLocation = (location: string) => {
    setSelectedLocation(location)
    setShowLocationList(false)
    setsearchQueries('')
    loadData(location)
  }

  // Filtered restaurants (search ke mutabiq)
  const filteredRestaurants = useMemo(() => {
    if (!searchQueries.trim()) return restaurants // agar search khali → full list

    const lowerQuery = searchQueries.toLowerCase().trim()

    return restaurants.filter((r) =>
      r.name?.toLowerCase().includes(lowerQuery) ||
      r.address?.toLowerCase().includes(lowerQuery) ||
      r.city?.toLowerCase().includes(lowerQuery)
      // agar food items bhi hain to yahan add kar sakte ho
    )
  }, [restaurants, searchQueries])



  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>

        <div className="input-wrapper">
          <input type="text" className="select-input" placeholder="Select Place"
            value={selectedLocation}
            onClick={() => setShowLocationList(true)}
            readOnly
          />
          <ul className="location-list">
            {
              showLocationList && locations.map((item) => (
                <li key={item} onClick={() => selectLocation(item)}>{item}</li>
              ))
            }
          </ul>
          <input type="text" className="search-input" placeholder="Enter Food or Restaurant Name"
            value={searchQueries} 
            onChange={(e)=> setsearchQueries(e.target.value)}
          />
        </div>
      </div>
      <div className="restaurants-list-container">
        {isLoading ? (
          <h3>Loading restaurants...</h3>
        ) : !Array.isArray(restaurants) || filteredRestaurants.length === 0 ? (
          <h3>{searchQueries.trim()
            ? `No results found for "${searchQueries}"`
            : selectedLocation
            ? `No restaurants found in ${selectedLocation}`
            : "No restaurants found"}</h3>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id || restaurant._id || restaurant.name} className="restaurant-wrapper"
              onClick={()=>router.push('explore/'+ restaurant.name)}
            >
              <div className="heading-wrapper">
                <h3>{restaurant.name}</h3>
                <h5>Contact: {restaurant.contact}</h5>
              </div>
              <div className="address-wrapper">
                <div>Email: {restaurant.email}.</div>
                <div className="address">{restaurant.city}, </div>
                <div className="address">{restaurant.address}</div>

              </div>
            </div>
          ))
        )}
      </div>
      <RestaurantFooter />
    </main>
  );
}
