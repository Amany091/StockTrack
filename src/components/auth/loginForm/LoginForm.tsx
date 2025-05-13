"use client"
import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import fetchApi from '@/src/utils/asyncWrapperApi'
import { UseFormFormik } from '@/src/hooks/useFormik'
import { LoginFields, User } from '@/src/types/login'
import Link from 'next/link'
import { loginFields, loginInitialValues, loginValidationSchema } from './loginFormHelper'

type Api = {
    data: User
}

const LoginForm = () => {
    const router = useRouter()

    async function accLogin(values: LoginFields) {
        try {
            const { data } = await fetchApi<Api>({
                baseUrl: String(process.env.NEXT_PUBLIC_BASE_URL),
                endPoint: "auth/login",
                method: "POST",
                body: JSON.stringify(values),
                credentials: "include"
            })
            if (data) {
                toast.success("Login Successfully")
                return router.push("/")
            }
        } catch (error) {
            return error
        }
    }

    return (
        <div>
            <UseFormFormik
                fields={loginFields}
                initalValues={loginInitialValues}
                validationSchema={loginValidationSchema}
                onSubmit={accLogin}
            />
            <Link href={"/auth/signup"} className='text-xs block mx-auto text-center'>
                Does not has an account? create one
            </Link>
        </div>
    )
}

export default LoginForm
