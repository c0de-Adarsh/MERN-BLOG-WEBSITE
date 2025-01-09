import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import API from '../utils'
import { setRegAlertTrue } from '../slice'

const SignUp = () => {

    const [username , setUserName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [showAlert , setShowAlert] = useState('')

    const dispatch = useDispatch()
          const navigate = useNavigate()

    const submitHandler = async(e) =>{
     
         e.preventDefault()
         try {
            
            const res = await axios.post(`${API}/signup`,{
                username,
                email,
                password
            })

           setShowAlert('success')
         } catch (error) {
            setShowAlert("failed") ;
            console.log("Error User already registered",error) 
         }

         if(showAlert === 'success'){
            dispatch(setRegAlertTrue())
            return navigate('/login')
         }
         if(showAlert === "failed"){
            setTimeout(()=>{
                setShowAlert(null)
            },3000)
        }
    }
  return (
    <>
    <div className='min-h-screen w-full text-white bg-gray-950 pt-14'>

            <div className='flex items-center justify-center pt-14 md:px-0  '>
                

                <div className=' shadow-2xl bg-gray-800 p-8 rounded-lg'>
                    <form action="" onSubmit={submitHandler} className='flex md:w-80 w-72 flex-col gap-2'>
                        <h1 className='md:text-6xl font-bold text-5xl text-center'>Register</h1>
                       <div className='flex flex-col'>

                       <label className='text-xl'>Username</label>
                        <input  type="text" placeholder='Enter username' onChange={(e) => setUserName(e.target.value)} className='px-2 py-1 bg-gray-700 outline-none rounded-md'  />

                       </div>
                       <div className='flex flex-col'>

                       <label className='text-xl'>Email</label>
                        <input  type="text" placeholder='Enter email' onChange={(e)=> setEmail(e.target.value)} className='px-2 py-1 bg-gray-700 outline-none rounded-md'  />

                       </div>
                        <div className='flex flex-col'>
                            
                        <label className='text-xl'>Password</label>
                        <input  type="password" placeholder='Enter password' onChange={(e)=> setPassword(e.target.value)} className='px-2 py-1 bg-gray-700 outline-none rounded-md' />

                        </div>
                    <div className='flex justify-center items-center pt-3'>
                        <button className='px-2  py-1 font-bold rounded-md bg-blue-500 w-full'>Register</button>
                    </div>
                    <p className='text-center'>Already have a account,
                        <Link to="/Login" className='underline' >Login</Link> here.</p>
                        
                    </form>
                </div>

            </div>

        </div>
    </>
  )
}

export default SignUp