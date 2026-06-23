import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehicleFound(false);
        }}
        className="p-2 text-center absolute top-0 w-[93%]"
      >
        <i className="text-xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-3xl font-bold mb-5">Looing for Driver</h3>

      <div className="flex gap-3 justify-between items-center flex-col">
        <img
          className="h-28 ml-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s"
          alt="Car"
        />
        <div className="w-full mt-3">
          <div className="flex gap-6 items-center p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-semibold">562/11-A</h3>
              <p className="text-gray-500 -mt-1 text-sm">
                {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center p-3 border-b-2">
            <i className="ri-square-fill text-base"></i>
            <div>
              <h3 className="text-lg font-semibold">562/11-A</h3>
              <p className="text-gray-500 -mt-1 text-sm">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center p-3">
            <i className="ri-currency-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-semibold">₹{props.fare?.[props.vehicleType]}</h3>
              <p className="text-gray-500 -mt-1 text-sm">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver
