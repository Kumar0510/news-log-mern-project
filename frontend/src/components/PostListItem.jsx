import React from 'react'
import Image from '../components/Image'
import { Link } from 'react-router-dom'
import {format} from 'timeago.js'

import axios from 'axios'



function PostListItem({ post}) {

  return (
    <div className='flex flex-col xl:flex-row gap-8 mr-4'>
        {post.img && <div
        className="md:hidden xl:block xl:w-1/3">
            <Image
            src={post.img} w = '735'
            className='rounded-2xl object-cover'></Image>
        </div>}
        <div className='flex flex-col gap-4 xl:w-2/3'>
            <Link to={`/${post.slug}`}
             className='text-4xl font-semibold'>
                {post.title}
             </Link>
             <div className='flex items-center gap-2 text-gray-400 text-sm'>
                <span>Written by</span>
                <span>{}</span>
                <Link>{}</Link>
                <span>{post.category}</span>
                <span>{format(post.createdAt)}</span>
             </div>
        {post.desc}
        <Link to={`/${post.slug}`} className='underline text-blue- text-sm'> read more</Link>
        </div>
    </div>
  )
}

export default PostListItem