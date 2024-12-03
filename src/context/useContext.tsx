"use client"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Products } from "../interfaces/products";



type PaginationContextType = {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    products: Products[];
    setProducts: Dispatch<SetStateAction<Products[]>>
}

export const ProductsContext = createContext<PaginationContextType>({} as PaginationContextType);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [products, setProducts] = useState<Products[]>([])
    const contextValue: PaginationContextType = { currentPage, setCurrentPage, products, setProducts }

    return (
        <ProductsContext.Provider value={contextValue} >
            {children}
        </ProductsContext.Provider>
    )
}

export const useProductsContext = () => {
    const context = useContext(ProductsContext)
    if (!context) {
        throw new Error('usePagination must be used within a ContextProvider')
    }
    return context
}

