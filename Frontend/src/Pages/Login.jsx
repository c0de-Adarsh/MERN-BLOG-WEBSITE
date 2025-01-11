import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import {  setLogAlertTrue, setRegAlertFalse, setUserTrue } from '../Slice'
import { CgSpinnerTwo } from 'react-icons/cg'

function Login() {
  
  const regAlert = useSelector((state)=> state.profile.regAlert)
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [showAlert , setShowAlert] = useState('')
   const [loading, setLoading] = useState(false);
   
 
  const dispatch = useDispatch()
   const navigate = useNavigate()

  const loginHandler = async(e) =>{
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(`${API}/login`,{
        email,
        password
      })

      setShowAlert('success')
        localStorage.setItem("accesstoken",res.data.token)
      dispatch(setUserTrue())
      console.log(res.data)
    } catch (error) {
      setShowAlert('failed')
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  setTimeout(() => {
    dispatch(setRegAlertFalse())
}, 2000)

if (showAlert === "success") {
    dispatch(setLogAlertTrue())
   navigate('/')
}

if (showAlert === "failed") {
    setTimeout(() => {
        setShowAlert(null)
    }, 3000)
}



if (regAlert) {
    setTimeout(() => {
        dispatch(setRegAlertFalse());
    }, 3000)
}
 
  return (
    <>
    <div className='min-h-screen w-full text-white bg-gray-950 pt-14'>

<div className='flex items-center justify-center pt-14 md:px-0  '>
    
    {
      (showAlert === 'failed') ? (<p className='fixed text-white top-14 md:left-0 py-2 px-4 md:w-1/4 w-full  font-extrabold opacity-85 bg-red-500'>Login Failed Something Went Wrong</p>):null
    }

    {
      regAlert && (<p className='fixed text-white top-14 md:left-0 py-2 px-4 md:w-1/4 w-full  font-extrabold opacity-85 bg-green-400'>Login Successfull</p>)
    }
    <div className=' shadow-2xl bg-gray-800 p-8 rounded-lg'>
        <form action="" onSubmit={loginHandler} className='flex md:w-80 w-72 flex-col gap-2'>
            <h1 className='md:text-6xl font-bold text-5xl text-center'>Login</h1>
           <div className='flex flex-col'>

           <label className='text-xl'>Email</label>
            <input  type="text" placeholder='Enter username' onChange={(e)=> setEmail(e.target.value)} className='px-2 py-1 bg-gray-700 outline-none rounded-md'  />

           </div>
           
            <div className='flex flex-col'>
                
            <label className='text-xl'>Password</label>
            <input  type="password" onChange={(e)=> setPassword(e.target.value)} placeholder='Enter password' className='px-2 py-1 bg-gray-700 outline-none rounded-md' />

            </div>
        <button
                       disabled={loading}
                       className={`rounded-md w-full font-semibold text-lg py-1 text-white ${
                         loading
                           ? 'bg-blue-600 cursor-not-allowed'
                           : 'bg-blue-500 hover:bg-blue-600'
                       }`}
                     >
                       {loading ? (
                         <div className="flex justify-center py-1 animate-spin items-center">
                           <CgSpinnerTwo size={20} />
                         </div>
                       ) : (
                         'Login'
                       )}
                     </button>
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