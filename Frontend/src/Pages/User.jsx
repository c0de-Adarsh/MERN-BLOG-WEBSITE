import axios from 'axios'
import React, { useEffect, useState } from 'react'
import API from '../utils'

const User = () => {

  const [logUserName , setLogUserName] = useState('')
  const [logUserEmail , setLogUserEmail] = useState('')
  const [logUserId , setLogUserId] = useState('')
  const [openAlert , setOpenAlert] = useState('')
  const [redirect , setRedirect] = useState('')


  useEffect(()=>{

    const getData = async () =>{
      const res = await axios.get(`${API}/status`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        }
      })
      setLogUserName(res.data.username)
      setLogUserEmail(res.data.email)
      setLogUserId(res.data._id)
    
    console.log(res.data)
    }

    getData()
  },[])
  return (
   <>
   <div className='min-h-screen bg-gray-900 w-full pt-14'>

   </div>
   </>
  )
}

export default User