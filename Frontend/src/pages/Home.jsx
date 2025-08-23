import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className="bg-contain  bg-[url(/uber_home.avif)]  h-screen w-full pt-8   flex justify-between flex-col ">
        <img src="uber.png" className='w-16 ml-9 ' alt="uber-logo" />
        <div className='bg-white py-4 pb-7 px-4'>
          <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-2'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
