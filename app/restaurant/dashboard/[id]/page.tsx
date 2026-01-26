'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

const EditFoodItem = (props) => {
    console.log(props.params.id)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [path, setPath] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(false)
    const router = useRouter()

    const handleEditFoodItem = async ()=>{
        console.log(name,price,path,description)
        if(!name || !path || !description || !price){
            setError(true)
            return false
        } else{
            setError(false)
        }

        let restaurant_id = null
        const restaurantdata = localStorage.getItem('restaurantuser');
        if (restaurantdata) {
            const parsed = JSON.parse(restaurantdata);
            restaurant_id = parsed.id;
          }

          if (!restaurant_id) {
            alert('Restaurant ID not found! Please login first.');
          }
       

    }

    return (
        <div className="container">
            <h1>Edit Food Items</h1>
            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter Food name"
                value={name} onChange={(e)=>setName(e.target.value)} />
                {
                    error && !name && <span className="input-error">Please Enter Food Name</span>
                }
            </div>
            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter Price"
                value={price} onChange={(e)=>setPrice(e.target.value)} />
                {
                    error && !price && <span className="input-error">Please Enter Food Price</span>
                }
            </div>
            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter image Path"
                value={path} onChange={(e)=>setPath(e.target.value)} />
                {
                    error && !path && <span className="input-error">Please Enter Image Path </span>
                }
            </div>
            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter Description"
                value={description} onChange={(e)=>setDescription(e.target.value)} />
                {
                    error && !description && <span className="input-error">Please Enter Food Description</span>
                }
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleEditFoodItem}>Edit Food Item</button>
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={()=> router.push('../dashboard/')}>Back To Food Item List</button>
            </div>
        </div>
    )
}

export default EditFoodItem