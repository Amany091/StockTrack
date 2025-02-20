"use client"
import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import fetchApi from '../../utils/asyncWrapperApi'
import { User } from '../../types/login'
import * as Yup from "yup"
import { RegisterFields } from '../../types/login'
import { FormField, UseFormFormik } from '../../hooks/useFormik'
import Link from 'next/link'

type Api = {
  data: User
}

const fields: FormField[] = [
  {
    name: "name",
    isLabel: true,
    placeholder: "type your name",
    type: "text"
  }, {
    name: "email",
    isLabel: true,
    placeholder: "type your email",
    type: "email"
  },
  {
    name: "password",
    isLabel: true,
    placeholder: "type your password",
    type: "password"
  },
  {
    name: "passwordConfirm",
    isLabel: true,
    placeholder: "type your password again",
    type: "password"
  }
]

const initalValues = { name: "", email: "", password: "", passwordConfirm: "" };

const validationSchema = Yup.object({
  name: Yup.string().required('name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!, @, #, $, %, ^, &, *)"),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
});

const SignupForm = () => {
  const router = useRouter()

  async function addAccount(values: RegisterFields) {
    const { data } = await fetchApi<Api>({
      baseUrl: String(process.env.NEXT_PUBLIC_BASE_URL),
      endPoint: "auth/signup",
      method: "POST",
      body: JSON.stringify(values),
    })
    console.log(data);
    if (data) {
      toast.success("Account Created Successfully")
      router.push("/auth/login")
    }
  }

  return (
    <>
      <UseFormFormik
        fields={fields}
        initalValues={initalValues}
        onSubmit={addAccount}
        validationSchema={validationSchema}
      />
      <Link href={"/auth/login"} className='block text-center mx-auto text-xs'>
        Do you have an account? Login to your account
      </Link>
    </>
  )
}

export default SignupForm
