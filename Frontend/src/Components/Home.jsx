import axios from 'axios'
import React, { useEffect, useState } from 'react'
import API from '../utils'
import Post from './Post'
import Posts from './Posts'

const Home = () => {


  const [PostData , setPostData] = useState([])

  useEffect(()=>{
    
    const fetchPost = async () =>{
      const res = await axios.get(`${API}/getallpost`)
     
      //console.log(res.data.post)
      setPostData(res.data.post)
     
    }
 
   fetchPost()
  },[])


  // useEffect(()=>{

  //   console.log('postdata updated',PostData)
  // },[PostData])
  return (
    <>
    <div>
        <div className='flex flex-col justify-between bg-gray-900'>
            <p className='text-white text-center text-3xl font-bold pt-3'>Recent Articles</p>

            {

              (PostData.length == 0) && (
                <div className='flex justify-center items-center pt-10'>
                <p><img src="/images/load.svg" alt="" /></p>
              </div>
              )
            }

            <Posts PostData={PostData}/>
        </div>
    </div>
    </>
  )
}

export default Home