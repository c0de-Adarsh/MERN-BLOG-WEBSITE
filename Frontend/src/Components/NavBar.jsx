import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import { RxCross2 } from 'react-icons/rx'
import { FaBars } from 'react-icons/fa'


const NavBar = () => {

     const [toggle , setToggle] = useState(false)
  return (
    <>
    <div>
        <div>
    <div className='h-14 min-w-full bg-gray-900 fixed flex justify-between text-white pl-3 md:pr-24 pr-10'>
       
            <div className='md:hidden flex justify-center items-center '>
                <Link><img src='/images/icons.png' alt="" className='md:h-8 md:w-10 h-8' /></Link>
                </div>
            <ul className='md:flex hidden justify-center gap-7 font-semibold py-3 text-2xl'>
                <div>
                    <Link><img src='/images/icons.png' alt="" className='md:h-8 md:w-10 h-8' /></Link>
                </div>

                <Link className='hover:text-yellow-300' to="/">Home</Link>
                <Link className='hover:text-yellow-300' to="/write">Write</Link>
                <Link className='hover:text-yellow-300' to="/mypost">My Post</Link>
                <Link className='hover:text-yellow-300' to="/about">About</Link>
            </ul>

            <div className='flex justify-center md:gap-7 gap-3 items-center text-white'>
                <div className='text-white'><Search/></div>
          

            <div>

                <div className='md:flex hidden'>
                    <Link className='text-2xl font-semibold hover:text-yellow-300' to='/login'>Login</Link>
                    <span className='text-2xl font-semibold '>/</span>
                    <Link className='text-2xl font-semibold hover:text-yellow-300' to='/signup'>Signup</Link>
                </div>
            </div>
            </div>
       
    </div>
    </div>

    <div className='md:hidden text-white flex justify-center items-center'>
     
    {
        toggle? (<RxCross2 size={26} className='fixed top-4 right-3' onClick={()=> setToggle(!toggle)}/>):(<FaBars className='fixed top-4 right-3' onClick={()=> setToggle(!toggle)} size={26}/>)
    }
    </div>

    <div className='fixed bg-gray-800 text-white z-50 top-14 opacity-90 w-full'>
      <ul className={`${toggle ? "flex": "hidden" } md:hidden justify-center gap-7 items-center flex flex-col font-semibold py-3 text-2xl`}>
                

                <Link>Home</Link>
                <Link>Write</Link>
                <Link>My Post</Link>
                <Link>About</Link>
                <div>
                <Link className='text-2xl font-semibold hover:text-yellow-300'>Login/</Link>
                   
                   <Link className='text-2xl font-semibold hover:text-yellow-300'>Signup</Link>
                </div>
                
            </ul>
    </div>
    </div>
    </>
  )
}

export default NavBar