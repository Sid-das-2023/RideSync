import React from "react";

const RidePopUp = (props) => {
  const { ride } = props;

  return (
    <div>
      <h5
        onClick={() => props.setRidePopUpPanel(false)}
        className="p-2 text-center absolute top-0 w-[93%]"
      >
        <i className="text-xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl mb-6 font-bold">New Ride Available!</h3>
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
              <p className="text-gray-500 -mt-1 text-sm">{ride?.origin}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center p-3 border-b-2">
            <i className="ri-square-fill text-base"></i>
            <div>
              <h3 className="text-lg font-semibold">Drop-off</h3>
              <p className="text-gray-500 -mt-1 text-sm">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center p-3">
            <i className="ri-currency-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-semibold">₹{ride?.fare}</h3>
              <p className="text-gray-500 -mt-1 text-sm">Cash</p>
            </div>
          </div>
        </div>
        <div className="w-full mt-5 bg-green-500 text-white p-2 rounded-lg font-semibold text-center">
          <button onClick={() => props.setConfirmRidePopUpPanel(true)}>
            Accept
          </button>
        </div>
        <div className="w-full bg-gray-200 text-black p-2 rounded-lg font-semibold text-center">
          <button onClick={() => props.setRidePopUpPanel(false)}>
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
