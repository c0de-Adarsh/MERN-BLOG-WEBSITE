import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import { RxCross2 } from 'react-icons/rx'
import { FaBars } from 'react-icons/fa'
import { useEffect } from 'react'
import axios from 'axios'
import API from '../utils'


const NavBar = () => {




    const [toggle, setToggle] = useState(false)
    const [userToggle, setUserToggle] = useState(null)
    const [logUserpic, setLogUserPic] = useState('')


    useEffect(() => {
        const getStatus = async () => {
            try {
                const res = await axios.get(`${API}/status`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                    }
                });
                setLogUserPic(res.data.profilePic)
            } catch (error) {
                console.error('Error fetching status:', error.response?.data || error.message);
            }
        };
        getStatus();
    }, []);


    useEffect(() => {
        const logornot = async () => {
            try {
                const res = await axios.get(`${API}/logornot`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
                    },
                })

                setUserToggle(res.data.loggedIn)
            } catch (error) {
                console.log(error)
            }
        }

        logornot()
        const intervalId = setInterval(logornot, 1000);
        return () => clearInterval(intervalId);
    }, [])
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
                            <Link className='hover:text-yellow-300' to="/mypost">MyPost</Link>
                            <Link className='hover:text-yellow-300' to="/about">About</Link>
                        </ul>

                        <div className='flex justify-center md:gap-7 gap-3 items-center text-white'>
                            <div className='text-white md:hidden flex'><Search /></div>
                            <div className='text-white md:flex hidden'><Search /></div>

                            <Link to='/user' className='w-9 h-9 rounded-full bg-cover'>
                                <img className={`rounded-full bg-gray-800 object-cover max-h-full max-w-full ${userToggle ? 'flex' : 'hidden'}`} src="/images/pic.jpg" alt="" />
                            </Link>



                            {/* agar user login ho gya to logout ka option show kara do */}
                            <div>

                                {

                                    userToggle ? (<Link to='/logout' className='hover:text-yellow-300 text-2xl font-semibold md:flex hidden'>Logout</Link>) : (<div className='md:flex hidden'>
                                        <Link className='hover:text-yellow-300 text-2xl font-semibold' to="/Login">Login</Link>
                                        <span className='text-2xl font-semibold'>/</span>
                                        <Link className='hover:text-yellow-300 text-2xl font-semibold' to="/Register">Register</Link>
                                    </div>)
                                }
                            </div>
                        </div>

                    </div>
                </div>

                <div className='md:hidden text-white flex justify-center items-center'>

                    {
                        toggle ? (<RxCross2 size={26} className='fixed top-4 right-3' onClick={() => setToggle(!toggle)} />) : (<FaBars className='fixed top-4 right-3' onClick={() => setToggle(!toggle)} size={26} />)
                    }
                </div>

                <div className='fixed bg-gray-800 text-white z-50 top-14 opacity-90 w-full'>
                    <ul className={`${toggle ? "flex" : "hidden"} md:hidden justify-center gap-7 items-center flex flex-col font-semibold py-3 text-2xl`}>


                        <Link onClick={() => setToggle(!toggle)} to='/'>Home</Link>
                        <Link onClick={() => setToggle(!toggle)} to='/write'>Write</Link>
                        <Link onClick={() => setToggle(!toggle)} to='/mypost'>My Post</Link>
                        <Link onClick={() => setToggle(!toggle)} to='/about'>About</Link>

                        {
                            userToggle ? (<Link onClick={() => setToggle(!toggle)} to='/logout'>Logout</Link>) : (<div>

                                <Link onClick={() => setToggle(!toggle)} to="/Login">Login/</Link>
                                <Link onClick={() => setToggle(!toggle)} to="/Register">Register</Link>
                            </div>)
                        }


                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavBar