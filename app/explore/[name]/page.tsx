//app/explore/[name]/page.tsx

import CustomerHeader from "@/app/_components/CustomerHeader"

type Props = {
    params: Promise<{ name: string }>
    // agar searchParams bhi use kar rahe ho to yahan add kar sakte ho
  }

const Page = async ({ params }: Props) => {
    const resolvedParams = await params
    const { name } = resolvedParams

    const decodedName = decodeURIComponent(name)
    return (
        <div>
            <CustomerHeader />
            <div className="restaurant-page-banner">
                <h1>{decodedName}</h1>
            </div>
        </div>
    )
}

export default Page

