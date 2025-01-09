import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar'
import SignUp from './Pages/SignUp'
import Write from './Pages/Write'
import User from './Pages/User'
import MyPost from './Pages/MyPost'
import About from './Pages/About'
import Login from './Pages/Login'
import LogOut from './Pages/LogOut'
import Single from './Pages/Single'
import HomePage from './Pages/HomePage'
import Footer from './Components/Footer'

const App = () => {
  return (
    <>
    <div>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/write' element={<Write/>}/>
      <Route path='/user' element={<User/>}/>
      <Route path='/mypost' element={<MyPost/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/logout' element={<LogOut/>}/>


      <Route path='/post' element={<Single/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App