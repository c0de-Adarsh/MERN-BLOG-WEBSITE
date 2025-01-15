import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({image , Desc , title , createdAt , postId , user }) => {
  
  return (
   <>
   <div className='text-white flex flex-col gap-2'>
    <div className='rounded-xl flex flex-col justify-center items-center border-gray-400 pt-4'>
      <Link to={`/post/${postId}`}>
      <div className='h-52'>
        <img src={image} className='rounded-xl object-contain h-full w-full' alt="" />
      </div>
      <div className='font-bold text-2xl text-center'>
        <p>{title}</p>
      </div>

      <div className='flex flex-row justify-between px-2'>
        <p className='text-yellow-600'>Author: {user}</p>
        <p className='text-yellow-600'>{new Date(createdAt).toDateString()}</p>
      </div>

      <div>
        <p className='px-1 text-left'>{Desc}</p>
      </div>
      </Link>
    </div>
   </div>
   </>
  )
}

export default Post