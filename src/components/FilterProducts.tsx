"use client"
import React, { useContext, useEffect, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { getProducts } from '../utils/fetchWrapper';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { ProductsContext } from '../context/productsContext';

const FilterProducts = (props: {
    searchParams?: Promise<{
        page?: string | undefined,
        minPrice?: string | undefined,
        maxPrice?: string | undefined,
    }>;
}) => {

    const [page, setPage] = useState("1")
    const [minPrice, setMinPrice] = useState("0")
    const [maxPrice, setMaxPrice] = useState("3000")
    const [show, setShow] = useState(false)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const {setProducts} = useContext(ProductsContext)


    useEffect(() => {
        async function getQueries() {
            const queries = await props.searchParams
            if (queries) {
                const { page, minPrice, maxPrice } = queries;
                setPage(page || "1")
                setMinPrice(minPrice || "0")
                setMaxPrice(maxPrice || "3000")
            }
           const { data } = await getProducts({ page, minPrice, maxPrice })
           setProducts(data)
        }
        getQueries().catch(error => console.log(error))
    }, [])

    const handleFilter = async (e: React.MouseEvent) => {
        e.preventDefault()

        const params = new URLSearchParams(searchParams)
        if (page) params.set('page', page.toString() )
        if (minPrice) params.set('min-price', minPrice.toString() )
        if (maxPrice) params.set('max-price', maxPrice.toString() )
        replace(`${pathname}?${params.toString()}`);

        const { data } = await getProducts({ page, minPrice, maxPrice })
        setProducts(data)
        
    }

    return (
        <div >
            <span className='flex gap-3 items-center cursor-pointer' onClick={() => setShow(!show)}>
                <h5>Filter by price</h5>
                <MdOutlineKeyboardArrowDown  />
            </span>
            <form className={`transition-all duration-300 ease-in-out overflow-hidden flex gap-3 items-center ${show ? "max-h-16 opacity-100": "max-h-0 opacity-0"} `}>
                <div id="minPrice">
                    <label className='text-sm' htmlFor="min-price">Form</label>
                    <input
                        type="text"
                        id='min-price'
                        name='minPrice'
                        className='mx-2 max-w-16 border border-slate-400 rounded text-sm text-center'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value)}
                    />
                </div>
                <div id="maxPrice">
                    <label className='text-sm' htmlFor="max-price">To</label>
                    <input
                        type="text"
                        id='max-price'
                        name='maxPrice'
                        className='mx-2 max-w-16 border border-slate-400 rounded text-sm text-center'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value)}
                    />
                </div>
                <button
                    type='submit'
                    onClick={(e) => handleFilter(e)}
                >Filter</button>
            </form>
        </div>



    )
}

export default FilterProducts
