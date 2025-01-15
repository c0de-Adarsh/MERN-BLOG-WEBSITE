import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiImageAddLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import API from '../utils'
import { CgSpinnerTwo } from 'react-icons/cg'
import { setPostCreAlertTrue } from '../Slice'

const Write = () => {

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null)
  const [author, setAuthor] = useState('')

  const [postCreated, setPostCreated] = useState(false)
  const [alert, setAlert] = useState(true)
  const [postId, setPostId] = useState('')

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {

    const getData = async () => {
      const res = await axios.get(`${API}/status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        }
      })

      setAuthor(res.data.user.name)
    }

    getData()
  }, [])

  useEffect(() => {

    const logOrNot = async () => {

      const res = await axios.get(`${API}/logornot`, {
        headers: {
          Authorization: ` Bearer ${localStorage.getItem('accesstoken')}`
        }
      })

      setAlert(res.data.loggedIn)

    }
    logOrNot()
  }, [])

  const createPost = async (e) => {

    e.preventDefault()
    const data = new FormData()

    data.append('photo', file)
   
    const res = await axios.post(`${API}/upload`, data)
    const photoUrl = res.data
   
    const newPost = {

      username: author,
      title: title,
      summary: summary,
      desc: desc,
      photo: photoUrl
    }

    const savePost = await axios.post(`${API}/createpost`, newPost)
    setPostCreated(true)
  }

  if(postCreated){
    dispatch(setPostCreAlertTrue())
    navigate('/')
  }
  return (
    <>
      <div className='min-h-screen pt-14 pb-20 text-white bg-gray-900'>
        <div>

          <form action="" onSubmit={createPost}>

            <div className='flex flex-col justify-center items-center px-5  w-full gap-4 md:px-0'>
              <div>
                <h1 className='md:text-5xl text-4xl font-bold py-6'>Create Your Post</h1>
              </div>

              {
                alert ? null : (<p className='fixed top-32 bg-red-500 font-bold text-xl py-2 px-2'>Please <Link to='/login' className='underline'>Log in</Link>to write a post</p>)
              }

              <div className='flex justify-center items-center'>
                {
                  file &&
                  (<img src={URL.createObjectURL(file)} className='w-full rounded-md' alt='' />)
                }
              </div>
              <div className='flex gap-2 md:w-1/2 w-full'>
                <label htmlFor="fileinput">
                  <RiImageAddLine className='cursor-pointer' size={32} />
                </label>


                <input type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className='hidden' id='fileinput' />

                <input type="text" placeholder='Add Title' id='title' onChange={(e) => setTitle(e.target.value)} autoFocus={true} className=' outline-none border border-white rounded-md bg-gray-800 px-2 py-1 text-white w-full ' />
              </div>


              <div className='flex gap-2 md:w-1/2 w-full '>
                <input type="text" placeholder='Add summary' onChange={(e) => setSummary(e.target.value)} className='outline-none border border-white rounded-md bg-gray-800 px-2 py-1 text-white w-full' />
              </div>


              <div className='md:w-1/2'>
                <textarea name="" className='rounded-md outline-none border border-white bg-gray-800 px-2 py-1 w-full' onChange={(e) => setDesc(e.target.value)} cols={60} rows={10} placeholder='Tell Your Story...' ></textarea>
              </div>

              <div className='py-2'>
                <button disabled={loading}
                  className={`bg-blue-500 rounded-md px-6 font-semibold text-xl py-1
             text-white ${loading
                      ? 'bg-blue-600 cursor-not-allowed' : ' bg-blue-600'
                    }`}

                >{loading ? (<div className='flex justify-center items-center py-1 animate-spin'>
                  <CgSpinnerTwo size={20} />
                </div>) : (
                  'Publish'
                )}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Write