import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

function LogOut() {

  const [logout , setLogOut] = useState()

  const dispatch = useDispatch()
  return (
    <>
    <div>
      <div>
        <h1></h1>
        <button>Logout</button>
      </div>
    </div>
    </>
  )
}

export default LogOut