import React from 'react'
import { SignIn } from '@clerk/clerk-react'
function LoginPage() {
  return (
    <div className='flex items-center justify-center'>
      <SignIn signUpUrl='/register'></SignIn>
    </div>
  )
}

export default LoginPage