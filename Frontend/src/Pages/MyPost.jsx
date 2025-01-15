import axios from 'axios'
import React, { useEffect, useState } from 'react'
import API from '../utils'
import { Link } from 'react-router-dom'
import Posts from '../Components/Posts'


function MyPost() {

  const [PostData , setPostData] = useState([])

  const [logUser , setLogUserName] = useState(null)
  const [ShowMessage , setShowMessage] = useState(false)

  const getData = async () =>{
    const res = await axios.get(`${API}/status`,{

      headers:{
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
      }
    })
    setLogUserName(res.data.username)
  }

  useEffect(()=>{
    const fetchPost = async () =>{
      const res = await axios.get(`${API}/getallpost?user=${logUser}`)
      setPostData(res.data)
      console.log(res.data)
    }
    fetchPost()
    getData()
  },[logUser])

  useEffect(()=>{
    if(PostData.length === 0){
      const timeoutId = setTimeout(()=>{
        setShowMessage (true)
      },3000)

      return () => clearTimeout(timeoutId)
    }
  },[PostData])
  return (
   <>
   <div className='pt-14 bg-gray-950 min-h-screen'>
   <div className=''>
    <p className='text-white font-bold text-3xl text-center pt-3'>My Articles</p>

    {

      (PostData.length == 0) && (
      
        <div className='flex justify-center items-center pt-20'>
         <p><img src="/images/load.svg" className='h-28' alt="" /></p>
        </div>

      )
    }
    {
      ShowMessage && (

        <div className='bg-red-500 text-white fixed top-28 z-10 px-3 py-2 text-center text-xl font-semibold rounded'>
         Hey there! It looks like there are no posts yet. Why not <Link to='/write' className='font-bold underline'>Wtite</Link>one?
        </div>
      ) }
      {/* <Posts PostData={PostData} /> */}
   </div>
   </div>
   </>
  )
}

export default MyPost