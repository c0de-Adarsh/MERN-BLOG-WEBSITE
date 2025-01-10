import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../utils'
import { useDispatch } from 'react-redux'
import { setUserTrue } from '../slice'

function Login() {

  const [username , setUserName] = useState('')
  const [password , setPassword] = useState('')
  const [showAlert , setShowAlert] = useState('')
   
  const dispatch = useDispatch()
  const loginHandler = async(e) =>{
    e.preventDefault()

    try {
      const res = await axios.post(`${API}/login`,{
        username,
        password
      })

      setShowAlert('Success')
      localStorage.setItem("accesstoken",res.data.accesstoken)
      dispatch(setUserTrue())
      console.log(res.data) 
    } catch (error) {
      
    }
  }
  return (
    <>
    <div className='min-h-screen w-full text-white bg-gray-950 pt-14'>

<div className='flex items-center justify-center pt-14 md:px-0  '>
    

    <div className=' shadow-2xl bg-gray-800 p-8 rounded-lg'>
        <form action="" onSubmit={loginHandler} className='flex md:w-80 w-72 flex-col gap-2'>
            <h1 className='md:text-6xl font-bold text-5xl text-center'>Login</h1>
           <div className='flex flex-col'>

           <label className='text-xl'>username</label>
            <input  type="text" placeholder='Enter username' onChange={(e)=> setUserName(e.target.value)} className='px-2 py-1 bg-gray-700 outline-none rounded-md'  />

           </div>
           
            <div className='flex flex-col'>
                
            <label className='text-xl'>Password</label>
            <input  type="password" onChange={(e)=> setPassword(e.target.value)} placeholder='Enter password' className='px-2 py-1 bg-gray-700 outline-none rounded-md' />

            </div>
        <div className='flex justify-center items-center pt-3'>
            <button  className='px-2  py-1 font-bold rounded-md  bg-blue-500 w-full'>Register</button>
        </div>
        <p className='text-center'>Don't have an account,
            <Link to="/signup" className='underline' >SignUp</Link> here.</p>
            
        </form>
    </div>

</div>

</div>
    </>
  )
}

export default Login