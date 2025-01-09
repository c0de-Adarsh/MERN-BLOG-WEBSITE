import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'


const NavBar = () => {
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

                <Link>Home</Link>
                <Link>Write</Link>
                <Link>My Post</Link>
                <Link>About</Link>
            </ul>

            <div className='flex justify-center md:gap-7 gap-3 items-center text-white'>
                <div className='text-white'><Search/></div>
          

            <div>

                <div>
                    <Link className='text-2xl font-semibold hover:text-yellow-300'>Login</Link>
                    <span className='text-2xl font-semibold m-2'>/</span>
                    <Link className='text-2xl font-semibold hover:text-yellow-300'>Signup</Link>
                </div>
            </div>
            </div>
       
    </div>
    </div>
    </div>
    </>
  )
}

export default NavBar