'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader"
import RestaurantFooter from "./_components/RestaurantFooter";

export default function Home() {

  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState()
  const [showLocation, setShowLocation] = useState(false)


  useEffect(() => {
  const loadLocations = async () => {
    const response = await fetch ('http://localhost:3000/api/customer/locations')

    const data = await response.json()

    if(data.success){
      setLocations(data.result)

    }
  }
    loadLocations()
  }, [])

  const handleListItem =  (item) => {
    setSelectedLocation(item)
    setShowLocation(false)
  }

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>

        <div className="input-wrapper">
          <input type="text" className="select-input" placeholder="Select Place"
            value={selectedLocation}
            onClick={()=>setShowLocation(true)}
          />
          <ul className="location-list">
          {
            showLocation && locations.map((item) => (
              <li onClick={()=>handleListItem(item)}>{item}</li>
            ))
          }
          </ul>
          <input type="text" className="search-input" placeholder="Enter Food or Restaurant Name" />
        </div>
      </div>
      <RestaurantFooter />
    </main>
  );
}
