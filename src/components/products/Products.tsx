import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Roboto } from 'next/font/google'
import { Products as ProductAPI } from '@/src/types/product'
import DeleteProduct from './Delete'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400'
});


const Products = ({ products }: { products: ProductAPI[] }) => {
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 my-10 gap-2' >
      {
        products.length > 0 ?
          products?.map((product) => {
            const { _id, imgCover, price, title, description } = product;
            return (
              <div className='rounded-lg p-2 bg-blue-50 relative'>
                <Link key={_id} href={`/details/${_id}`} >
                  <div className={`my-5`} >
                    {imgCover && <Image
                      src={imgCover}
                      alt={title}
                      width={100}
                      height={100}
                      className=' rounded-lg w-full object-cover h-52 md:size-52'
                    />}
                    <h5 className='font-bold'> {title} </h5>
                    <p className={`${roboto.className} font-sans text-sm text-slate-500`}> {description} </p>
                    <small className='text-blue-500'> {price}$</small>
                  </div>
                </Link>
                <DeleteProduct product={product} />
              </div>
            )
          }) :
          "no products"
      }
    </div>
  )
}

export default Products
