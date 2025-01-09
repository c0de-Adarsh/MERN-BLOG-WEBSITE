import React from 'react'
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  return (
   <>
   <div>
    <div className='flex flex-row '>
        <span className='flex justify-center px-1 bg-gray-900 items-center rounded-s-sm pl-2 pr-1  border-r-0 border border-gray-500 text-center'>
            <FaSearch/>
        </span>
        <input
          type='text'
         
          placeholder='Search an article'
     
          className='bg-gray-900 md:w-56 w-40 border text-white border-gray-500 outline-none px-2 md:text-lg text-sm md:py-0 py-1  border-l-0 md:pt-1 rounded-e-sm '
        />
    </div>
   </div>
   </>
  )
}

export default Search