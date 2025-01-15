import axios from 'axios'
import React, { useEffect, useState } from 'react'
import API from '../utils'
import SinglePost from '../Components/SinglePost'

const Single = () => {

  const [LogUser , setLogUser] = useState("")

  useEffect(()=>{
    const getData = async () =>{
      const res = await axios.get(`${API}/status`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        }
      })

      setLogUser(res.data.user)
    }
    getData()
  },[])
  return (
   <>
   <div className='min-h-screen bg-gray-950 text-white pt-14 '>
    <div className='flex justify-center'>
     <SinglePost logUser={LogUser}/>
    </div>
   </div>
   </>
  )
}

export default Single