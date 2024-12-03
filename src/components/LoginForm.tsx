"use client"
import React, { useState } from 'react'
import { useLogin } from '../hooks/useCostomeFormik'
import Input from './Input'
import Form from 'next/form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Link from 'next/link'
import { Roboto } from 'next/font/google'
import { toast } from 'react-toastify'
import {  useRouter } from 'next/navigation'
import fetchApi from '../utils/asyncWrapperApi'
import { User } from '../interfaces/accInfo'

const roboto = Roboto({
    subsets: ['latin'],
    weight: '400',
});

type Api = {
    data : User
  }

const LoginForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false)
    const [showPassword, setShowPassword]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false)

    // Formik Validation
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useLogin(accLogin)
    async function accLogin() {
        setIsLoading(true)
        try {
            const {data} =await fetchApi<Api>({
                baseUrl: String(process.env.NEXT_PUBLIC_BASE_URL),
                endPoint: "auth/login",
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            })
            if (data) {
                toast.success("Login Successfully")
                router.push("/")
            } else {
                setIsLoading(false)
            }
        } catch (error) {
           return error
        }
        setIsLoading(false)
    }

    return (
        <Form action={""} formEncType='multipart/form-data' className={'flex flex-col gap-3 w-full'} onSubmit={handleSubmit}>
            <div id="usrEmail">
                <label htmlFor="userEmail">Email*</label>
                <Input
                    type='email'
                    id='userEmail'
                    name='email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}
            </div>
            <div id="usrPassword" className='relative'>
                <label htmlFor="password">Password*</label>

                <Input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <span className={'absolute right-5 top-2/4 '}>
                    {showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> : <FaEye onClick={() => setShowPassword(!showPassword)} />}
                </span>
                {errors.password && touched.password && <p className='text-red-500'>{errors.password}</p>}
            </div>
            <span className={`text-center ${roboto.className}`} >
                Don&apos;t have an account ? <Link href={'/auth/signup'} replace >SignUp</Link>
            </span>
            <button
                type='submit'
                className={'bg-button text-white p-2 w-28 rounded mx-auto my-5'}
            >{ isLoading ? "Sumitting..." : "Submit" }</button>
        </Form>
    )
}

export default LoginForm
