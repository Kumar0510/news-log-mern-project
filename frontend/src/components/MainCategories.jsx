import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
function MainCategories() {
  return (
    <div className='hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8'>
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <Link to='/posts' 
          className='hover:bg-blue-800 
          hover:text-white rounded-full px-4 py-2'
          >All posts
        </Link>
        <Link to='/posts?cat=national' 
          className='hover:bg-blue-800 
          hover:text-white rounded-full px-4 py-2'
          >National
        </Link>
        
        <Link to='/posts?cat=international' 
          className='hover:bg-blue-800 
          hover:text-white rounded-full px-4 py-2'
          >International
        </Link>

        
        <Link to='/posts?cat=education' 
          className='hover:bg-blue-800 
          hover:text-white rounded-full px-4 py-2'
          >education
        </Link>

        
        <Link to='/posts?cat=health' 
          className='hover:bg-blue-800 
          hover:text-white rounded-full px-4 py-2'
          >health
        </Link>

        
        <Link to='/posts?cat=finance' 
          className='hover:bg-blue-800 
          hover:text-white rounded-full px-4 py-2'
          >finance
        </Link>
      </div>
      <span className='text-xl font-medium'>|</span>
      <Search>

      </Search>
    </div>
  )
}

export default MainCategories