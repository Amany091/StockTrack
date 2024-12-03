"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const [token, setToken] = useState("")
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const fetchToken = async () => {
            const res = await fetch("/api/cookie", { credentials: "include", cache: "force-cache" });
            const { token } = await res.json()
            setToken(token?.split(" ")[1])
        }
        fetchToken()
    }, [])

    async function logout() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            })
            const data = await response.json()
            if (data.success) {
                setToken("")
                router.push("/auth/login")
            };
            
            return data
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <nav className='bg-slate-100 p-2 flex items-center' >
            <h1>Stock Track</h1>
            <ul className='mx-10'>
                <li>
                    <Link href={"/"} className={pathname === "/" ? "text-blue-600" : "text-slate-500"} >Products</Link>
                </li>
            </ul>

            <button
                className='bg-button p-2 w-40 rounded text-white ml-auto'
                onClick={!!token ? () => logout() : () => router.push("/auth/login")} >
                {!!token ? "Logout" : "Login"}
            </button>

        </nav>
    )
}

export default Navbar
