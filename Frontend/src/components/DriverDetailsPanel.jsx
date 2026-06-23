import React from 'react';
import 'remixicon/fonts/remixicon.css';

const DriverDetailsPanel = (props) => {
  const { ride } = props;

  const captainName = ride?.captain?.fullname?.firstname
    ? `${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname || ''}`
    : 'Driver';
  const plate = ride?.captain?.vehicle?.plate || '—';

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <h5
        onClick={() => props.setWaitingForDriverPanel(false)}
        className="p-2 text-center absolute top-0 w-[93%]"
      >
        <i className="text-xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <div className="flex items-center justify-between mb-5">
        <img
          className="h-20 rounded-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s"
          alt="Car"
        />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">{captainName}</h2>
          <h4 className="text-xl font-bold">{plate}</h4>
          <p className="text-sm text-gray-500">En route</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 p-3 border-b">
          <i className="ri-map-pin-2-fill text-lg"></i>
          <div>
            <h3 className="text-lg font-semibold">Pickup</h3>
            <p className="text-gray-500 text-sm">{ride?.origin || '—'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 border-b">
          <i className="ri-square-fill text-lg"></i>
          <div>
            <h3 className="text-lg font-semibold">Drop-off</h3>
            <p className="text-gray-500 text-sm">{ride?.destination || '—'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3">
          <i className="ri-currency-fill text-lg"></i>
          <div>
            <h3 className="text-lg font-semibold">₹{ride?.fare ?? '—'}</h3>
            <p className="text-gray-500 text-sm">Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailsPanel;
