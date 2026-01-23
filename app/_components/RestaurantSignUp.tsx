'use client'
import { useState } from "react"
import { useRouter } from 'next/navigation';

const RestaruntSignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [c_password, setC_password] = useState('')
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const router = useRouter()
    const [error, setError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleSignUp = async () => {
        if (password !== c_password) {
            setPasswordError(true)
            return false
        }
        if (!name || !email || !password || !c_password || !city || !address || !contact) {
            setError(true)
            return false
        } else {
            setError(false)
        }

        const response = await fetch('http://localhost:3000/api/restaurant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                name,
                city,
                address,
                contact,
            }),
        })

        const result = await response.json()
        console.log("API Response:", result)

        if (response.ok && result.success) {
            const userData = { ...result.result };
            delete userData.password;

            localStorage.setItem('restaurantuser', JSON.stringify(userData));

            alert("Restaurant Added Successfully!");
            setEmail('');
            setPassword('');
            setC_password('');
            setName('');
            setCity('');
            setAddress('');
            setContact('');
            router.push('/restaurant/dashboard');
        } else {
            alert(result.message || "Failed to add restaurant");
        }
    }
    return (
        <>
            <h3>
                Sign page
            </h3>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter Email" className="input-field"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                {
                    error && !email && <span className="input-error">Please Enter valid Email</span>
                }
            </div>
            <div className="input-wrapper">
                <input type="password" placeholder="Enter password" className="input-field"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                {
                    passwordError && <span className="input-error">Password and Confirm Password Do not Match</span>
                }
                {
                    error && !password && <span className="input-error">Please Enter valid Password</span>
                }
            </div>
            <div className="input-wrapper">
                <input type="password" placeholder="Enter confirm password" className="input-field"
                    value={c_password} onChange={(e) => setC_password(e.target.value)} />
                {
                    passwordError && <span className="input-error">Password and Confirm Password Do not Match</span>
                }
                {
                    error && !c_password && <span className="input-error">Please Enter valid Confirm Password</span>
                }
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter Restaurant name" className="input-field"
                    value={name} onChange={(e) => setName(e.target.value)} />
                {
                    error && !name && <span className="input-error">Please Enter Name</span>
                }
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter contact NO." className="input-field"
                    value={city} onChange={(e) => setCity(e.target.value)} />
                {
                    error && !city && <span className="input-error">Please Enter Contact NO.</span>
                }
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter city" className="input-field"
                    value={address} onChange={(e) => setAddress(e.target.value)} />
                {
                    error && !address && <span className="input-error">Please Enter City</span>
                }
            </div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter full address" className="input-field"
                    value={contact} onChange={(e) => setContact(e.target.value)} />
                {
                    error && !contact && <span className="input-error">Please Enter Address</span>
                }
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleSignUp}>Sign Up</button>
            </div>
        </>


    )

}

export default RestaruntSignUp