import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const SinglePost = ({logUser}) => {

  const [post , setPost] = useState([])
  const [PostDel , setPostDel] = useState(false)

  const [newTitle , setNewTitle] = useState(post.title)
  const [newDesc , setNewDesc] = useState(post.desc)

  const [updateAlert , setUpdateAlert] = useState(false)

  const [updateMode , setUpdateMode] = useState(false)
  const [openAlert , setOpenAlert] = useState(false)

  const dispatch = useDispatch()

  useEffect(()=>{
   
    const singlePost = async () =>{
      const res = await axios.get()

    }

  })
  return (
    <div>SinglePost</div>
  )
}

export default SinglePost