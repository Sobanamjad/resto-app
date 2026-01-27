// app/restaurant/dashboard/[id]/page.tsx
'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { use } from "react"

interface EditFoodItemProps {
  params: Promise<{ id: string }>
}

const EditFoodItem = ({ params }: EditFoodItemProps) => {
  const resolvedParams = use(params)
  const id = resolvedParams.id

  console.log("Food ID:", id)  // ← check karna console mein id aa rahi hai ya nahi

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [path, setPath] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!id) return

    const loadFood = async () => {
      const response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`)

      if (!response.ok) {
        alert('Food load nahi hua: ' + response.status)
        return
      }

      const data = await response.json()

      if (data.success && data.result) {
        setName(data.result.name || '')
        setPrice(data.result.price?.toString() || '')
        setPath(data.result.img_path || '')
        setDescription(data.result.description || '')
      } else {
        alert('Food details nahi mile: ' + (data.message || 'Unknown issue'))
      }
    }

    loadFood()
  }, [id])

  const handleEditFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true)
      return
    }
    setError(false)

    const response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: Number(price), path, description })
    })

    const data = await response.json()

    if (data.success) {
      alert('Food updated Successfully!')
      router.push('/restaurant/dashboard')
    } else {
      alert('Update fail: ' + (data.message || 'Unknown'))
    }
  }

  return (
    <div className="container">
      <h1>Edit Food Items</h1>
      <div className="input-wrapper">
        <input 
          className="input-field" 
          type="text" 
          placeholder="Enter Food name"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        {error && !name && <span className="input-error">Please Enter Food Name</span>}
      </div>
      <div className="input-wrapper">
        <input 
          className="input-field" 
          type="text" 
          placeholder="Enter Price"
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
        {error && !price && <span className="input-error">Please Enter Food Price</span>}
      </div>
      <div className="input-wrapper">
        <input 
          className="input-field" 
          type="text" 
          placeholder="Enter image Path"
          value={path} 
          onChange={(e) => setPath(e.target.value)} 
        />
        {error && !path && <span className="input-error">Please Enter Image Path</span>}
      </div>
      <div className="input-wrapper">
        <input 
          className="input-field" 
          type="text" 
          placeholder="Enter Description"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        {error && !description && <span className="input-error">Please Enter Food Description</span>}
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={handleEditFoodItem}>
          Edit Food Item
        </button>
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={() => router.push('/restaurant/dashboard')}>
          Back To Food Item List
        </button>
      </div>
    </div>
  )
}

export default EditFoodItem