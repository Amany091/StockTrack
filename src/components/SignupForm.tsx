"use client"
import React, { useState } from 'react'
import { useSignup } from '../hooks/useCostomeFormik'
import Input from './Input'
import Form from 'next/form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Link from 'next/link'
import { Roboto } from 'next/font/google'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import fetchApi from '../utils/asyncWrapperApi'
import { User } from '../interfaces/accInfo'

const roboto = Roboto({
    subsets: ['latin'],
    weight: '400'
})

type Api = {
  data : User
}
  
const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const [isLoading, setIsLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false)
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useSignup(addAccount)

    async function addAccount() {
      setIsLoading(true)
     try {
      const { data } = await fetchApi<Api>({
        baseUrl: String(process.env.NEXT_PUBLIC_BASE_URL),
        endPoint: "auth/signup",
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json"
        }
      })
      if (data) {
          toast.success("Account Created Successfully")
          router.push("/auth/login")
       }
       
     } catch (error) {
      console.log(error)
     }
      setIsLoading(false)
    }

    const handleShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setShowPassword((prevValue) => !prevValue)
    }
    return (
        <Form action={""} formEncType='multipart/form-data' onSubmit={handleSubmit} className='w-full flex flex-col gap-3' >
        <div id="name">
          <label htmlFor="name">name*</label>
          <Input
            type='text'
            name='name'
            id='name'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && <div className="text-red-500 text-xs">{errors.name}</div>}
        </div>
        <div id="email">
          <label htmlFor="email">Email*</label>
          <Input
            type='email'
            name='email'
            id='email'
            onChange={handleChange}
            onBlur={handleBlur}

          />
          {errors.email && touched.email && <div className="text-red-500 text-xs">{errors.email}</div>}
        </div>

        <div id="password" className='relative'>
          <label htmlFor="password">Password*</label>
          <Input
            type={showPassword ? "text": "password"}
            name='password'
            id='password'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            type='button'
            aria-label='toggle password visibility'
            className='absolute right-5 top-2/4 '
            onClick={handleShowPassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && touched.password && <div className="text-red-500 text-xs">{errors.password}</div>}
        </div>

        <div id="confirmPass" className='relative'>
          <label htmlFor="confirmPass">Confirm Password*</label>
          <Input
            type={showPassword? "text" : "password"}
            name='passwordConfirm'
            id='confirmPass'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            type='button' 
            aria-label='toggle password visibility'
            className='absolute right-5 top-2/4 '
            onClick={handleShowPassword}
            >
            {showPassword ? <FaEyeSlash  /> : <FaEye  />}
          </button>
          {errors.passwordConfirm && touched.passwordConfirm && <div className="text-red-500 text-xs">{errors.passwordConfirm}</div>}
        </div>

        <span className={`text-center ${roboto.className} `}>
          Already have an account ? <Link href={'/auth/login'}>Login</Link>
        </span>
        <button
          className=' bg-button text-white p-2 w-28 rounded mx-auto my-5'
          type='submit'
            >{isLoading ? "Submitting..." : "Submit"}
            </button>
      </Form>
    )
}

export default SignupForm
