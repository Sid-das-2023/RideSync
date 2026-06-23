import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { ride } = props;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/accept`,
        { rideId: ride._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      const startResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/start`,
        { rideId: ride._id, otp },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      props.setConfirmRidePopUpPanel(false);
      props.setRidePopUpPanel(false);
      navigate('/captain-riding', { state: { ride: startResponse.data } });
    } catch (error) {
      console.error('Error confirming ride:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='h-full'>
      <h3 className="text-2xl mb-5 font-bold text-center">Confirm Your Ride</h3>

      <div className="flex flex-col items-center">
        <div className="w-full">
          <div className='flex items-center justify-between my-2 p-3 bg-yellow-300 rounded-lg'>
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
          <div className="flex gap-4 items-center p-2 border-b">
            <i className="ri-map-pin-2-fill text-lg text-gray-600"></i>
            <div>
              <h3 className="text-lg font-semibold">Pickup</h3>
              <p className="text-gray-500 text-sm">{ride?.origin}</p>
            </div>
          </div>
          <div className="flex gap-4 items-center p-2 border-b">
            <i className="ri-square-fill text-lg text-gray-600"></i>
            <div>
              <h3 className="text-lg font-semibold">Drop-off</h3>
              <p className="text-gray-500 text-sm">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex gap-4 items-center p-2">
            <i className="ri-currency-fill text-lg text-gray-600"></i>
            <div className='flex items-center justify-between w-full'>
              <h3 className="text-lg font-semibold">Total Fare</h3>
              <p className="text-lg font-bold">₹{ride?.fare}</p>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2 mt-6'>
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="number"
              placeholder='Enter OTP'
              className='bg-[#eee] px-8 py-3 text-lg rounded-lg w-full mt-2 font-mono'
            />
            <div className="w-full mt-4 bg-green-500 text-white p-2 rounded-lg font-semibold text-center">
              <button type="submit">Confirm Ride</button>
            </div>
            <div className="w-full mt-3 bg-red-500 text-white p-2 rounded-lg font-semibold text-center">
              <button
                type="button"
                onClick={() => {
                  props.setConfirmRidePopUpPanel(false);
                  props.setRidePopUpPanel(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
