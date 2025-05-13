
import React from 'react'
import AddProductForm from '@/src/components/products/addProductForm/AddProductForm'
import { cookies } from 'next/headers'

const Page = async () => {

    const cookieStore = cookies()
    const cookie = (await cookieStore).get("access_token")?.value
    const token: string | undefined = cookie?.split(" ")[1]

    return (
        <div className='container max-w-7xl mx-auto bg-slate-200/40 rounded p-3 m-5'>
            <AddProductForm token={token} />
        </div>
    )
}

export default Page
