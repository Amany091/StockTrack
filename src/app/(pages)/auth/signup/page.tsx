import React from 'react'
import { Roboto } from 'next/font/google'
import SignupForm from '@/src/components/SignupForm'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400'
})

const page = () => {
    
  return (
    <div className={`container max-w-4xl bg-slate-200/40 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 `}>
      <h1 className={`${roboto.className} text-center my-5 text-title`} >Create Account</h1>

      {/* Third Party Signup */}
      <SignupForm />
    </div>
  )
}

export default page
