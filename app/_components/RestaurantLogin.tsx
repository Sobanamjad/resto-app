'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

const RestaruntLogin = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        if(!email || !password){
            setError(true)
            return false
        }else {
            setError(false)
        }
        const response = await fetch('http://localhost:3000/api/restaurant',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body:JSON.stringify({email,password, login:true})
        })
        const data = await response.json()
        if(data.success){
            const {result} = data
            delete result.password
            localStorage.setItem('restaurantuser', JSON.stringify(result))
            router.replace('/restaurant/dashboard')
        } else{
            alert('login failed')
        }

    }
    return (
        <>
        <h3>
        Login page
        </h3>
        <div className="input-wrapper">
            <input type="text" placeholder="Enter Email" className="input-field" 
            value={email} onChange={(e)=>setEmail(e.target.value)}/>
            {
                error && !email && <span className="input-error">Enter Valid Passwrod</span>
            }
        </div>
        <div className="input-wrapper">
            <input type="password" placeholder="Enter password" className="input-field"
            value={password} onChange={(e)=>setPassword(e.target.value)} />
            {
                error && !password && <span className="input-error">Enter Valid Password</span>
            }
        </div>
        <div className="input-wrapper"> 
            <button className="button" onClick={handleLogin}>Login</button>
        </div>
        </>


    )

}

export default RestaruntLogin