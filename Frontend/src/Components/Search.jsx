import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import API from '../utils';
import { Link } from 'react-router-dom';

const Search = () => {

  const [PostData , setPostData] = useState([])
  const [filterData , setFilterData] = useState([])
  const [keyWord , setKeyword] = useState('')


  useEffect(()=>{
    const fetchPost = async () =>{
      const res = await axios.get(`${API}/getallpost`)
      setPostData(res.data.post)
    }
    fetchPost()
  },[])

  const handlerFilter = (e) =>{
   const searchWord = e.target.value;
   setKeyword(searchWord)

   const newFilter = PostData.filter((value)=>{
    return value.title.toLowerCase().includes(searchWord.toLowerCase())
   })

   if(searchWord === ''){
    setFilterData([])
   }else{
    setFilterData(newFilter)
   }
  }

  const handleLinkClick = () =>{
    setFilterData([])
    setKeyword('')
  }
  return (
   <>
   <div>
    <div className='flex flex-row '>
        <span className='flex justify-center px-1 bg-gray-900 items-center rounded-s-sm pl-2 pr-1  border-r-0 border border-gray-500 text-center'>
            <FaSearch className='text-white'/>
        </span>
        <input
          type='text'
          onChange={handlerFilter}
          value={keyWord}
          placeholder='Search an article'
          className='bg-gray-900 md:w-56 w-40 border text-white border-gray-500 outline-none px-2 md:text-lg text-sm md:py-0 py-1  border-l-0 md:pt-1 rounded-e-sm '
        />

        {
          filterData.length !== 0 && (
            <div className={'bg-gray-900  rounded-s-md  fixed rounded-e-md top-12 w-48  md:w-64 text-white'}>
             <ul className='min-h-0 overflow-hidden  overflow-y-hidden flex flex-col  py-1'>
               
             {filterData.slice(0, 4).map((e) => (
                <Link to={`/post/${e._id}`} className='flex justify-start hover:bg-gray-800' key={e._id}>
                  <span className='flex justify-center pt-2 pl-1 '>
                  <FaSearch size={10} />
                  </span>
                  <p  className='  px-2 md:text-xl text-sm py-1' onClick={handleLinkClick}>
                    {e.title}
                  </p>
                </Link>
              ))}
             </ul>
            </div>
          )
        }
    </div>
   </div>
   </>
  )
}

export default Search