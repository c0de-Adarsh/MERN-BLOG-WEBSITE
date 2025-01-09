import React from 'react'

const Home = () => {
  return (
    <>
    <div>
        <div className='flex flex-col justify-between bg-gray-900'>
            <p className='text-white text-center text-3xl font-bold pt-3'>Recent Articles</p>
            <div className='flex justify-center items-center pt-10'>
              <p><img src="/images/load.svg" alt="" /></p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home