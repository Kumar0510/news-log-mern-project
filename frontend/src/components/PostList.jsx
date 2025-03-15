import React from 'react'
import PostListItem from './PostListItem'
import axios from 'axios'

import {
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'

import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router-dom'

async function fetchPosts(pageParam, searchParams){
  const searchParamsObj = Object.fromEntries([...searchParams])
  console.log(searchParamsObj);
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params : {page:pageParam,limit : 10, ...searchParamsObj}
    });
    return res.data
}

function PostList() {
  const [searchParams ,setSearchParams] = useSearchParams()
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({pageParam = 1})=>fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ?  pages.length + 1 : undefined,
  })
  //data.pages.map(x=>console.log(x.posts))
  
  
  if (isFetching) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  
  const allPosts = data?.pages?.flatMap((x)=>x.posts) || []
  console.log(allPosts);


  return (
    
    <InfiniteScroll
      dataLength={allPosts.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>posts have ended</b>
        </p>
      }
      className='flex flex-col gap-5'
      >
    
    {allPosts.map(post=>(
      <PostListItem key={post._id} post = {post}/>
    ))}
  </InfiniteScroll>
  )
}

export default PostList