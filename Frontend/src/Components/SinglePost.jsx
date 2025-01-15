import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import API from '../utils'
import { setPostDelAlertTrue } from '../Slice'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'

const SinglePost = ({logUser}) => {

  const Location = useLocation()
  const navigate = useNavigate()

  const path = Location.pathname.slice(6)

  const [post , setPost] = useState([])
  const [PostDel , setPostDel] = useState(false)

  const [newTitle , setNewTitle] = useState(post.title)
  const [newDesc , setNewDesc] = useState(post.desc)

  const [updateAlert , setUpdateAlert] = useState(false)

  const [updateMode , setUpdateMode] = useState(false)
  const [openAlert , setOpenAlert] = useState(false)

  const dispatch = useDispatch()

  useEffect(()=>{
   
    const singlePost = async () =>{
      const res = await axios.get(`${API}/getpost/` +path)

      setPost(res.data.post)
      
    }
   singlePost()
  },[])

  const deletePost = async () =>{
    const res = await axios.delete(`${API}/deletepost`+ path,{
      data: {username: logUser}
    })
    setOpenAlert(false)
    setPostDel(true)
  }

  if(PostDel){
    dispatch(setPostDelAlertTrue())
    navigate('/')
  }

  const EditPost = async () =>{
    const res = await axios.put(`${API}/updatepost/${path}`,{
      username:logUser,
      title:newTitle,
      desc:newDesc
    })
    setUpdateAlert(true)
    setUpdateMode(false)
  }

  const openAlr = () =>{
    setOpenAlert(true)
  }

  if(updateAlert){
    setTimeout(() => {
      setUpdateAlert(false)
    }, 3000);
  }
  return (
    <>
    <div>
      {
        (post.length === 0) ? (
          <div className='flex justify-center items-center pt-28'>

             <p className=''><img src="/images/load.svg" className='h-28' alt="" /></p>
          </div>
        ) : (
          <div>
          <div className='flex flex-col gap-3 py-5'>

            {

              updateAlert && <p className='font-bold text-green-400 text-lg px-3 py-2 left-0  fixed'>Post Updated Successfully</p>
            }
            {
              updateMode && <h1 className='text-center text-5xl md:text-6xl font-bold'>Edit your post</h1>
            }
            <div className='flex justify-center md:px-28 px-5 items-center'>
              <img src={post.photo.imageUrl} className='md:w-2/3 w-full rounded-md' alt="" />
            </div>

            <div className='flex justify-center w-full gap-3 py-6'>

              {

                (updateMode) ? (
                  <div className='md:w-[62vw] w-full md:pl-0 pl-6'>
                  <p htmlFor="editTitle" className='md:text-3xl text-2xl font-bold'>Edit Title :</p>
                  <input onChange={(e) => setNewTitle(e.target.value)} type="text" name='editTitle' className='bg-gray-900 font-white  outline-none py-1 font-bold px-2 rounded-md md:text-4xl text-2xl' defaultValue={post.title} />
              </div>
                ):(<p className='text-white font-bold text-4xl md:text-5xl'>{post.title}</p>)
              }
              
            </div>

            <div className='flex justify-between md:px-28 px-6 text-yellow-400 text-sm md:text-xl'>
              <p>Author: {post.username}</p>
              <p>{new Date(post.createdAt).toDateString()}</p>
            </div>

            <div className='md:px-28 px-6'>
              {
                (updateMode) ? (
                  <div className='md:w-[62vw w-full]'>
                   <p className='text-2xl font-bold'>Edit Description :</p>
                   <textarea onChange={(e)=> setNewDesc(e.target.value)} className='bg-gray-900 text-white rounded-md md:px-2 py-2 outline-none w-full h-52 px-2' cols={100} defaultValue={post.desc}></textarea>
                  </div>
                ):( <p>{post.desc}</p>)
              }
            </div>
          {

          openAlert && 

          <div className={'fixed md:left-96 top-56 md:mx-0 mx-5 left-0'}>
            <div className='bg-gray-800 rounded-md text-center border pt-5 pb-2 text-2xl md:px-6 px-2 font-bold text-white'>
              <p>Are you sure you want to delete this post</p>
              <div className='flex gap-10 justify-center pt-8'>
              <button onClick={()=> deletePost()} className='text-lg bg-red-600 text-white px-5 rounded-md py-1'>Yes</button>
              <button onClick={()=> setOpenAlert(false)} className='text-lg bg-blue-600 px-5 rounded-md py-1'>No</button>
              </div>
            </div>
          </div>

          }
             <div className='flex justify-center py-5'> 
               <span className='text-center flex gap-7'>
               {

                (logUser === post.username) ?

                ((updateMode)?
               (<div className='flex gap-10 pt-10'>
                <AiOutlineDelete onClick={()=> setOpenAlert(true)} className=' cursor-pointer text-red-500 ' />
                <FaRegEdit className=' cursor-pointer text-green-500' onClick={()=> setUpdateMode(true)} size={30} />
               </div>):(<button className='px-2 md:text-2xl text-xl rounded-md md:w-52 w-32 py-1 bg-blue-600 font-bold' onClick={()=> EditPost()}>Edit Post :</button>)):null
               }
               </span>
             </div>

          </div>
          </div>)
      }
    </div>
    </>
  )
}

export default SinglePost