import React, {useContext} from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {

  const {captain} = useContext(CaptainDataContext)

  return (
    <div>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-3'>
            <img
              className='h-12 w-12 rounded-full object-cover'
              src='https://st2.depositphotos.com/2931363/6569/i/450/depositphotos_65699901-stock-photo-black-man-keeping-arms-crossed.jpg'
              alt='Captain'
            />
            <h4 className='text-xl font-semibold capitalize'>{captain?.fullname?.firstname + " " + captain?.fullname?.lastname}</h4>
          </div>
          <div className='text-right'>
            <h4 className='text-xl font-bold'>₹245.50</h4>
            <p className='text-sm text-gray-500'>Earned</p>
          </div>
        </div>
        <div className='flex items-center justify-between py-3 px-5 bg-gray-200 rounded-lg'>
          <div className='text-center'>
            <i className='text-2xl ri-time-line'></i>
            <h5 className='text-lg font-semibold'>10.2</h5>
            <p className='text-sm text-gray-500'>Hours Online</p>
          </div>
          <div className='text-center -ml-3'>
            <i className='text-2xl ri-speed-up-line'></i>
            <h5 className='text-lg font-semibold'>120 km</h5>
            <p className='text-sm text-gray-500'>Distance</p>
          </div>
          <div className='text-center mr-2'>
            <i className='text-2xl ri-sticky-note-2-line'></i>
            <h5 className='text-lg font-semibold'>15</h5>
            <p className='text-sm text-gray-500'>Rides</p>
          </div>
        </div>
        </div>
  )
}

export default CaptainDetails
