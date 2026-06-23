import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FinishRidePanel = (props) => {
  const { ride } = props;
  const navigate = useNavigate();

  const completeRide = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/complete`,
        { rideId: ride?._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      props.setFinishRidePanel(false);
      navigate('/captain-home');
    } catch (error) {
      console.error('Error completing ride:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h5
        onClick={() => props.setFinishRidePanel(false)}
        className="p-2 text-center absolute top-0 w-[93%]"
      >
        <i className="text-xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl mb-6 font-bold">Ride Finished!</h3>
      <div className='flex items-center justify-between mb-2 p-3 bg-yellow-300 rounded-lg'>
        <div className="flex items-center gap-3">
          <img
            className='h-10 w-10 object-cover rounded-full'
            src="https://st2.depositphotos.com/2931363/6569/i/450/depositphotos_65699901-stock-photo-black-man-keeping-arms-crossed.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
            {ride?.user?.fullname?.firstname || 'Rider'}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">₹{ride?.fare}</h5>
      </div>

      <div className="flex gap-3 justify-between items-center flex-col">
        <div className="w-full mt-2">
          <div className="flex gap-6 items-center p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-semibold">Pickup</h3>
              <p className="text-gray-500 -mt-1 text-sm">{ride?.origin || '—'}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center p-3 border-b-2">
            <i className="ri-square-fill text-base"></i>
            <div>
              <h3 className="text-lg font-semibold">Drop-off</h3>
              <p className="text-gray-500 -mt-1 text-sm">{ride?.destination || '—'}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center p-3">
            <i className="ri-currency-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-semibold">₹{ride?.fare ?? '—'}</h3>
              <p className="text-gray-500 -mt-1 text-sm">Cash</p>
            </div>
          </div>
        </div>
        <div className="w-full mt-5 bg-green-500 text-white p-2 rounded-lg font-semibold text-center">
          <button onClick={completeRide}>Complete Ride</button>
        </div>
      </div>
    </div>
  );
};

export default FinishRidePanel;
