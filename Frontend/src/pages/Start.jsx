import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://media.istockphoto.com/id/1303526732/vector/woman-using-car-sharing-service-for-order-rent-of-transport-via-mobile-phone.jpg?s=1024x1024&w=is&k=20&c=0zv1zt1r3pHHCUXKcNzS4Lxbil5wiIT3rDbXc4wex8M=)] h-screen w-full pt-8 flex justify-between flex-col' >
        <img className='w-14 ml-8' src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png" alt="" />
        <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black rounded-lg text-white py-3 mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
