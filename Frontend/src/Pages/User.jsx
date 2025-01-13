import axios from 'axios'
import React, { useEffect, useState } from 'react'
import API from '../utils'
import { BiUser } from 'react-icons/bi'
import { AiOutlineUserDelete } from 'react-icons/ai'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserDelAlertTrue } from '../Slice'

const User = () => {

  const [logUserName , setLogUserName] = useState('')
  const [logUserEmail , setLogUserEmail] = useState('')
  const [logUserId , setLogUserId] = useState('')
  const [openAlert , setOpenAlert] = useState('')
  const [redirect , setRedirect] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{

    const getData = async () =>{
      const res = await axios.get(`${API}/status`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        }
      })
 
  
    
      setLogUserName(res.data.user.name)
      setLogUserEmail(res.data.user.email)
      setLogUserId(res.data.user._id)
    
  
    }

    getData()
  },[])

 

  
  const delAccount = async () =>{
    console.log("Deleting User with ID:", logUserId);
    const res = await axios.delete(`${API}/delete/${logUserId}`)
    setOpenAlert(false)
    setRedirect(true)
  }


  const openAlr = () =>{
    setOpenAlert(true)
   }

   if(redirect){
    localStorage.removeItem('accesstoken')
    dispatch(setUserDelAlertTrue())
    navigate('/')
   }
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

                  {
                    openAlert && 

                    <div className='fixed top-[235px]  md:left-96 md:mx-0 mx-5 left-0'>
                      <div className='bg-gray-800 border rounded-md text-center pt-5 pb-2 text-2xl md:px-6 px-2 font-bold text-white'>
                        <p>Are sure you want to delete your account</p>
                        <div className='flex justify-center pt-8 gap-10'>
                          <button onClick={()=> delAccount()} className='bg-red-600 py-1 text-xl rounded-md px-5 text-white'>Yes</button>
                          <button onClick={()=> setOpenAlert(false)} className='bg-blue-600  py-1 text-xl rounded-md px-5 text-white'>No</button>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <div className='md:flex flex items-center justify-center px-4 py-8 mt-20'>
                <span onClick={()=> openAlr()} className='text-white bg-red-600 p-2 rounded-lg flex gap-2 cursor-pointer'>
                <AiOutlineUserDelete size={25} /> <p className='md:text-xl text-lg font-bold'>Delete Account</p></span>
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