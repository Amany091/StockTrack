" use client"
import { ProductsProvider } from "../context/productsContext";

export function Providers({ children }: { children: React.ReactNode }) { 
    return (
        <ProductsProvider>{children}</ProductsProvider>
    )
}
