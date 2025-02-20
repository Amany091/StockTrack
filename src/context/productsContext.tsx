"use client"
import { createContext, useContext, useState } from "react";
import { Products } from "@/src/types/product";

export const ProductsContext = createContext({} as { products: Products[], setProducts: React.Dispatch<React.SetStateAction<Products[]>> })

export function ProductsProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Products[]>([])
    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    )
}

export function useProductsContext() {
    const context = useContext(ProductsContext)
    if (!context) {
        throw new Error('useProductsContext must be used within a ProductsProvider')
    }
    return context
}