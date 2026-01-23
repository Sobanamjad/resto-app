
import { useState } from "react"

const AddFoodItem = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [path, setPath] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(false)

    const handleAddFoodItem = async ()=>{
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
            alert('Restaurant ID nahi mila! Pehle login karo.');
          }
        const response =await fetch('http://localhost:3000/api/restaurant/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                price: Number(price),
                img_path: path,
                description,
                restaurant_id
            })
        })
        const data = await response.json()
        if(data.success){
            alert('Food Item Added')
        } else {
            alert('Food Item Not Added')
        }

    }

    return (
        <div className="container">
            <h1>Add Food Items</h1>
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
                <button className="button" onClick={handleAddFoodItem}>Add Food Item</button>
            </div>
        </div>
    )
}

export default AddFoodItem