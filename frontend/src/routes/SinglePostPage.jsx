import React, { useEffect,useState } from 'react'
import Image from '../components/Image'
import PostMenuActions from '../components/PostMenuActions'
import Search from '../components/Search'
import { data, Link, useParams} from 'react-router-dom'
import Comments from '../components/Comments'
import axios from 'axios'
import  {format} from 'timeago.js'

async function fetchPosts(slug){
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${slug}`,{method: 'GET'});
  const response = await res.json();
  return response
}

function SinglePostPage() {
  
  const { slug } = useParams();
  const [post, setPost] = useState({
    title : "",
    user : {
      username : ""
    },
    content : "",
    createAt  : "2024-02-25",
    slug : "",
    desc : "",
    category : "",
    img : "postImg.jpeg",
    _id : ""
  });

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPosts(slug);
      setPost(data);
    }
    fetchData();
  }, [slug]);

   // Logs the fetched post
  return (
    <div className='flex flex-col gap-8'>
      {/* details */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
            <h1 className='text-xl md:text-3xl xl:text-4xl 2xl: text-5xl font-semibold'> 
              {post.title}
            </h1>
           <div className="flex ietms-center gap-2 text-gray-400 text-sm">
           <span>Written by</span>
           <Link>{post.user.username}</Link>
           <span>{format(post.createAt)}</span>
           </div>
           <p className='text-gray-600 font-medium'>
            {post.desc}
           </p>
        </div>
        <div className="hidden lg:block w-2/5">
          <Image className='rounded-2xl' src={post.img} w='600'></Image>
        </div>
      </div>
      {/*content */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="lg:text-lg flex flex-col gap-6 text-justify ">
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
        {/* side menu is sticky pos */}
        <div className='px-4 h-max top-8 sticky'>
          <h1 className=""></h1>
          <div className="flex flex-col gap-1">
            <div className='flex items-center gap-8'>
              <Image src='userImg.jpeg' 
              className='w-12 h-12 rounded-3xl object-cover' 
              w="40" 
              h='48'></Image>
              <Link className='underline text-blue-800'>{post.user.username}</Link>
            </div>
            <div className='flex gap-2'>
              <Link>
                <Image src = 'facebook.svg'></Image>
              </Link>
              <Link>
                <Image src = 'instagram.svg'></Image>
              </Link>
            </div>
          </div>
          <PostMenuActions post = {post}></PostMenuActions>
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline">All</Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              Development
            </Link>
            <Link className="underline" to="/">
              Databases
            </Link>
            <Link className="underline" to="/">
              Search Engines
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>

      <Comments postId={post._id}></Comments>
    </div>
  )
}

export default SinglePostPage