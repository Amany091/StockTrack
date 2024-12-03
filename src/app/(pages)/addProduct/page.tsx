
import React from 'react'
import AddProductForm from '@/src/components/AddProductForm'
import { cookies } from 'next/headers'

const Page =async () => {
   
    const cookieStore = cookies()
    const cookie = (await cookieStore).get("access_token")?.value
    const token:string | undefined = cookie?.split(" ")[1]
   
    return (
        <div className='container max-w-6xl bg-slate-200/40 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-3'>
           <AddProductForm token= {token} />
        </div>
    )
}

export default Page
