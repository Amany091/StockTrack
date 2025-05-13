"use client"

import { useEffect } from "react"

export default function Error({ error }:{error: Error & {digest?:string} }) {
    useEffect(() => {
        
        console.error("from login", error);
    }, [error])
    
    return (
        <div className="text-xs text-red-600">
            {error.message}
        </div>
    )
}