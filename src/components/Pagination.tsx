"use client"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { ProductsContext } from '../context/productsContext';

type Pagination = {
  currentPage: number;
  pages: number[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ total }: { total: number }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const { products } = useContext(ProductsContext)
  const pagesN = Math.ceil(total / 10)
  const pages = Array.from({ length: pagesN }, (_, index: number) => index + 1);
  console.log(pagesN);

  const handlePageChange = (page: number, e: React.MouseEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (page < 1 || page > pagesN) return;
    if (currentPage) {
      params.set('page', page.toString())
    }

    replace(`${pathname}?${params.toString()}`)
  }


  return (
    <div>
      {products.length > 0 && (
        <div className="flex justify-center items-center gap-5">
          <MdOutlineKeyboardArrowLeft
            className='cursor-pointer rounded-full w-5 h-5 bg-cyan-500'
            onClick={(e) => handlePageChange(currentPage - 1, e)}
          />
          {pages.map((page) => {
            return (
              <button
                type='button'
                key={page}
                className={`${currentPage === page ? "text-cyan-800" : "text-black "} p-2 w-10 rounded `}
                onClick={(e) => handlePageChange(page, e)}
              >
                {page}
              </button>

            )
          })}
          <MdOutlineKeyboardArrowRight
            className='cursor-pointer rounded-full w-5 h-5 bg-cyan-500'
            onClick={(e) => handlePageChange(currentPage + 1, e)}
          />

        </div>
      )}
    </div>
  )
}

export default Pagination
