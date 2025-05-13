import React from 'react'
import Image from 'next/image'
import { Products } from '@/src/types/product'

const page = async ({ params }: { params?: Promise<{ id: string }> }) => {
    const id = (await params)?.id
    async function getProduct() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`)
            const data = await response.json()
            return data.data
        } catch (error) {
            console.log(error)
        }
    }
    const { description, imgCover, price, priceAfterDiscount = 0, title }: Products = await getProduct()

    return (
        <div className=' container p-2 flex gap-3 justify-center items-center bg-blue-50 mt-5 rounded-lg'>
            <Image
                src={imgCover}
                alt={title}
                width={300}
                height={300}
            />
            <div className='space-y-3'>
                <h1 className='font-bold'> {title}</h1>
                <p className='text-slate-500 text-sm'> {description}</p>
                <span className='flex gap-3 items-center '>
                    <p className='line-through text-slate-500'> {price}$</p>
                    <p className='text-blue-500'>{priceAfterDiscount}$</p>
                    {priceAfterDiscount > 0 && <p className='text-red-600 text-xs' > {Math.trunc(((price - priceAfterDiscount) / price) * 100)}% discount </p>}
                </span>
            </div>

        </div>
    )
}

export default page
