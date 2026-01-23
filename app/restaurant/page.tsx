'use client'
import React, { useState } from 'react'
import RestaruntLogin from '../_components/RestaurantLogin'
import RestaruntSignUp from '../_components/RestaurantSignUp'
import RestaurantHeader from '../_components/RestaurantHeader'
import RestaurantFooter from '../_components/RestaurantFooter'
import './style.css'

const Restaurant = () => {

   const [login, setLogin] = useState(true)

    return (
        <>
            <div className="container">
                <RestaurantHeader />
                <h1>Restaurant login/Signup page</h1>
                {
                    login ? <RestaruntLogin /> : <RestaruntSignUp />
                }
                <div>
                    <button 
                    onClick={() => { setLogin(!login) }} 
                    className='button-link'
                    >
                        {login ? 'Do not have account? Signup' : 'Already have Account? Login in'}
                    </button>
                </div>
            </div>
            <RestaurantFooter />
        </>
    )
}

export default Restaurant