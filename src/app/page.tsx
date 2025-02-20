import React, { Suspense } from 'react'
import Link from 'next/link'
import Pagination from '../components/Pagination'
import { Metadata } from 'next'
import FilterProducts from '../components/products/FilterProducts'
import Products from '../components/products/Products'
import Loading from './loading'
import { getProducts } from '../utils/fetchWrapper'

export const metadata: Metadata = {
  title: {
    absolute: "Products",
  }
}

const page = async (props: {
  searchParams?: Promise<{
    page?: string;
    ["min-price"]: string;
    ["max-price"]: string;
  }>;
}) => {
  const query = await props.searchParams
  const page = query?.page
  const minPrice = query?.["min-price"] || "0"
  const maxPrice = query?.["max-price"] || "10000"

  const { data: products, total } = await getProducts({ page, minPrice, maxPrice })

  return (
    <div className='container p-5'>
      <Link href={"/addProduct"} className='bg-button p-2 w-40 rounded text-white float-right text-center' >Add Product</Link>

      <FilterProducts />
      <Suspense fallback={<Loading />}>
        <Products products={products} />
      </Suspense>
      <Pagination total={total} />
    </div>
  )
}

export default page