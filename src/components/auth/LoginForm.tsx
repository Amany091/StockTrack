"use client"
import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import fetchApi from '@/src/utils/asyncWrapperApi'
import * as Yup from 'yup'
import { UseFormFormik } from '@/src/hooks/useFormik'
import { LoginFields, User } from '@/src/types/login'
import Link from 'next/link'

type Api = {
    data: User
}

const fields = [
    {
        name: "email",
        isLabel: true,
        type: "email",
        placeholder: "Email",
    },
    {
        name: "password",
        isLabel: true,
        type: "password",
        placeholder: "type your password"
    }
]

const initalValues = { email: "", password: "" }

const validationSchema = Yup.object({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("password is required")
});

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
                router.push("/")
            }
        } catch (error) {
            return error
        }
    }

    return (
        <div>
            <UseFormFormik
                fields={fields}
                initalValues={initalValues}
                validationSchema={validationSchema}
                onSubmit={accLogin}
            />
            <Link href={"/auth/signup"} className='text-xs block mx-auto text-center'>
                Does not has an account? create one
            </Link>
        </div>
    )
}

export default LoginForm
