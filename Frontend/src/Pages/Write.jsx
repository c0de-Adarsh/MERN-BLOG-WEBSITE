import React from 'react'
import { RiImageAddLine } from 'react-icons/ri'

const Write = () => {
  return (
    <>
    <div className='min-h-screen pt-10 pb-20 text-white bg-gray-900'>
     <div>

      <form action="">

        <div className='flex flex-col justify-center items-center px-5  w-full gap-4 md:px-0'>
          <div>
            <h1 className='md:text-5xl text-4xl font-bold py-6'>Create Your Post</h1>
          </div>


          <div>
            <label htmlFor="fileinput">
            <RiImageAddLine className='cursor-pointer' size={32} />
            </label>
            <input type="file" />
            <input type="text" placeholder='Add Title' />
          </div>
          <div>
            <input type="text" placeholder='Add summary' />
          </div>
          <div>
            <input type="text" placeholder='Tell Your Story' />
          </div>

          <div className='py-2'> 
            <button className='bg-blue-500  rounded-md px-6 py-1 font-semibold text-xl'>Publish</button>
          </div>
        </div>
      </form>
     </div>
    </div>
    </>
  )
}

export default Write