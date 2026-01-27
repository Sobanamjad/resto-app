import Link from 'next/link'
const CustomerHeader = () => {
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
                    <Link href='/'> Cart (0) </Link>
                </li>
                <li>
                    <Link href='/'> Add Restaurant </Link>
                </li>
            </ul>
        </div>
    )
}

export default CustomerHeader