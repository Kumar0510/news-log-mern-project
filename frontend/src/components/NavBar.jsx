import React, { useState, useEffect } from 'react'

import Image from './Image';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";

function NavBar() {
  const[open, setOpen] = useState(false);
  const {getToken} = useAuth()

  useEffect(()=>{
    getToken().then(token=>{console.log(token)})
  },[])
    return (
    <div className = "w-full h-16 md:h-20 flex items-center justify-between">
        <Link className = "flex items-center gap-4 text-2xl font-bold">
            <Image src='logo.png' w={32} h={32} alt="" />
            <span>NewsLog</span>
         </Link>
        <div className = "md:hidden">
            <div className = "cursor-pointer text-4xl" onClick={()=>{setOpen(!open)}}>
                {open ? 'X' : "="}
            </div>
            <div className= {`w-full h-screen flex flex-col gap-8 font-medium text-large items-center justify-center absolute top-16 ${open ? "-right-0" : "-right-[100%]"}  transition-all ease-in-out`}>
            <Link to='/' >Home</Link>
            <Link to='posts' >Trending</Link>
            <Link to='about' >about</Link>
            <Link to='/register'> <button className="px-2 py-2 rounded-3xl bg-blue-200">Login</button></Link>
            </div>
        </div>
        <div className='hidden md:flex items-center gap-8 xl:gap-10 font-medium'>
            <Link to='/' >Home</Link>
            <Link to='posts' >Trending</Link>
            <Link to='about' >about</Link>
            <SignedOut>
                <Link to='/login'> <button className="px-2 py-2 rounded-3xl bg-blue-200">Login</button></Link>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </div>
    
  )
}

export default NavBar