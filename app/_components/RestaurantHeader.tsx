'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Optional: type define kar do (TypeScript error khatam ho jayega)
interface RestaurantUser {
    id: number;         // database mein Int hai
    name?: string;      // optional (String?)
    email: string;      // required (String @unique)
    city?: string;      // optional
    address?: string;   // optional
    contact?: string;
}

const RestaurantHeader = () => {
    // State ko type do taake null allowed ho
    const [details, setDetails] = useState<RestaurantUser | null>(null);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Ek alag function banao
        const syncUserData = () => {
            const storedData = localStorage.getItem('restaurantuser');

            if (!storedData) {
                setDetails(null);  // ← ab yeh safe hai

                // Dashboard pe hai to login pe bhej do
                if (pathname === '/restaurant/dashboard') {
                    router.replace('/restaurant');
                }
            } else {
                // Safe parse
                if (typeof storedData === 'string' && storedData.trim() !== '') {
                    const parsed = JSON.parse(storedData);
                    setDetails(parsed);

                    // Login page pe hai to dashboard pe bhej do
                    if (pathname === '/restaurant') {
                        router.replace('/restaurant/dashboard');
                    }
                } else {
                    setDetails(null);
                    localStorage.removeItem('restaurantuser');

                    if (pathname === '/restaurant/dashboard') {
                        router.replace('/restaurant');
                    }
                }
            }
        };

        // Effect ke andar sirf function call karo
        syncUserData();
    }, [pathname, router]);  // dependencies sahi rakho// ← dependencies daal do (important)

    const logout = () => {
        localStorage.removeItem('restaurantuser');
        setDetails(null);
        router.replace('/restaurant');
    };

    return (
        <div className='header-wrapper'>
            <div className="logo">
                <img
                    style={{ width: 100 }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ci9fGC6jGhnszpTaEc1tSQr0V-KosAfCng&s"
                    alt="Restaurant Logo"
                />
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>

                {details && details.name ? (
                    <>
                        <li>
                            {/* Profile link sahi karo – dashboard ya profile page pe */}
                            <Link href="/restaurant/dashboard">Profile</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/restaurant/signup">Sign Up</Link>
                        </li>
                        <li>
                            <Link href="/restaurant">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default RestaurantHeader;