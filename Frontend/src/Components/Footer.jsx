import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <>
   <div>
    <div className='text-sm text-gray-500 text-center bg-gray-900'>
        <p className='py-1'>© 2025 ViTo-Blog. All rights reserved</p>
        <p>Designed and developed with ♥ by <Link to='https://adarsh-web-portfolio.netlify.app' className=' font-bold underline text-white'>Adarsh</Link></p>
    </div>
   </div>
   </>
  )
}

export default Footer