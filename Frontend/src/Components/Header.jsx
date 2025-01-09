import React from 'react'

const Header = () => {
  return (
    <>
     <div className='min-h-[70vh] bg-[url(/images/icons.jpg)] bg-cover pt-14'>
        <div className='md:pt-20 pt-36'>
            <div className='flex justify-center gap-5 opacity-100 items-center flex-col'>
                <div>
                    <h1 className='text-white text-center text-7xl font-bold'>ViTo Blog</h1>
                    <p className='text-white md:text-xl px-20 font-bold text-center text-sm mt-2'>Unleash magic through captivating blogs on our user-friendly platform</p>
                </div>
            </div>
        </div>
     </div>
    </>
  )
}

export default Header