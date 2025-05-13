import React from 'react'
import { Roboto } from 'next/font/google'
import LoginForm from '@/src/components/auth/loginForm/LoginForm'

export const metadata = {
  title: 'Login Page',
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
})

const Page = () => {
  return (
    <div className='container max-w-7xl bg-slate-200/40 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 '>
      <h1 className={`${roboto.className} text-center text-title`}>Login to your account</h1>
      <LoginForm />
    </div>
  )
}

export default Page
