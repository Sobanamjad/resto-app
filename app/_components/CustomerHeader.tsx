//app/_components/customerheader.tsx
'use client'
import Link from 'next/link'

interface CustomerHeaderProps {
    cartNumber?: number
}

const CustomerHeader = ({ cartNumber = 0 }: CustomerHeaderProps) => {



    return (
        <div className='header-wrapper'>
            <div className='logo'>
                <img
                    style={{ width: 100 }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ci9fGC6jGhnszpTaEc1tSQr0V-KosAfCng&s"
                    alt="Restaurant Logo"
                />
            </div>
            <ul>
                <li>
                    <Link href='/'> Home </Link>
                </li>
                <li>
                    <Link href='/'> Login </Link>
                </li>
                <li>
                    <Link href='/'> Sign Up </Link>
                </li>
                <li>
                    <Link href="/cart">
                        Cart
                        <span style={{
                            background: cartNumber > 0 ? '#e74c3c' : '#95a5a6',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px 8px',
                            fontSize: '0.8em',
                            marginLeft: '4px'
                        }}>
                            {cartNumber}
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href='/'> Add Restaurant </Link>
                </li>
            </ul>
        </div>
    )
}

export default CustomerHeader