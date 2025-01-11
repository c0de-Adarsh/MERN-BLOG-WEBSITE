import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLogAlertTrue, setUserFalse } from '../Slice'
import { useNavigate } from 'react-router-dom'

function LogOut() {

  const [logout , setLogOut] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const Logout = () =>{
    localStorage.removeItem('accesstoken')
    setLogOut(true)
    dispatch(setUserFalse)
  }

  if(logout){
    dispatch(setLogAlertTrue())
    navigate('/')
  }
  return (
    <>
    <div  className='bg-gray-950 pt-14 min-h-screen'>
      <div className='flex justify-center items-center flex-col px-5 pt-28 gap-3'>
        <h1 className='text-white text-3xl text-center'>Are you sure you want to Logout</h1>
        <button onClick={()=> Logout()} className='bg-red-500 px-9 font-bold py-2 text-xl rounded-md bg-red'>Logout</button>
      </div>
    </div>
    </>
  )
}

export default LogOut