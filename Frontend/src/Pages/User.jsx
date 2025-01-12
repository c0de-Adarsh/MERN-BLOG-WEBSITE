import axios from 'axios'
import React, { useEffect, useState } from 'react'
import API from '../utils'
import { BiUser } from 'react-icons/bi'

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

     console.log(res.data)
      setLogUserName(res.data.user.name)
      setLogUserEmail(res.data.user.email)
      setLogUserId(res.data._id)
    
  
    }

    getData()
  },[])
  return (
   <>
   <div className='min-h-screen bg-gray-900 w-full pt-14'>
        
        {
          (logUserEmail === '') ? (<div className='flex justify-center pt-20 items-center'>
            <p><img src="/images/load.svg" className='h-28' alt="" /></p>
          </div>) : 
          <>
          
          <div className='flex md:px-10 pt-2 flex-col md:flex-row justify-between  text-white gap-1'>

            <div className='flex flex-col md:text-4xl text-3xl  font-bold'>
              <BiUser size={30} /> Your Account
            </div>
          </div>
          

          <div className='flex flex-col pt-7'>

            <div className='flex justify-start py-5 md:gap-0 gap-2 md:flex-col flex-col'>
              <div className='flex flex-col justify-center items-center'>
                <div className='text-white'>

                  <div className='pb-10 md:text-4xl text-3xl flex flex-col gap-2'>
                    <p><span className='font-bold'>Username</span>:{logUserName}</p>
                    <p><span className='font-bold'>Email</span>:{logUserEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
        }
   </div>
   </>
  )
}

export default User