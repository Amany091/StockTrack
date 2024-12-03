import React from 'react'
import { Products } from '@/src/interfaces/products'
import Image from 'next/image'

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
        <div className=' container p-2 flex flex-col justify-center items-center '>
            <Image
                src={imgCover}
                alt={title}
                width={300}
                height={300}
            />
            <h1> {title}</h1>
            <p> {description}</p>
            <span className='flex gap-3 items-center '>
                <p className='line-through'> {price}</p>
                <p>{priceAfterDiscount}</p>
                {priceAfterDiscount > 0 && <p className='text-red-600 text-xs' > {Math.trunc(((price - priceAfterDiscount) / price) * 100)}% </p>}
            </span>

        </div>
    )
}

export default page
