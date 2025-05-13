"use client"
import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import fetchApi from '@/src/utils/asyncWrapperApi'
import { User } from '@/src/types/login'
import { RegisterFields } from '@/src/types/login'
import { UseFormFormik } from '@/src/hooks/useFormik'
import Link from 'next/link'
import { signupFields, signUpInitialValues, signupValidationSchema } from './signupFormHelper'

type Api = {
  data: User
}

const SignupForm = () => {
  const router = useRouter()

  async function addAccount(values: RegisterFields) {
    const { data } = await fetchApi<Api>({
      baseUrl: String(process.env.NEXT_PUBLIC_BASE_URL),
      endPoint: "auth/signup",
      method: "POST",
      body: JSON.stringify(values),
    })
    if (data) {
      toast.success("Account Created Successfully")
      return router.push("/auth/login")
    }
  }

  return (
    <>
      <UseFormFormik
        fields={signupFields}
        initalValues={signUpInitialValues}
        onSubmit={addAccount}
        validationSchema={signupValidationSchema}
      />
      <Link href={"/auth/login"} className='block text-center mx-auto text-xs'>
        Do you have an account? Login to your account
      </Link>
    </>
  )
}

export default SignupForm
