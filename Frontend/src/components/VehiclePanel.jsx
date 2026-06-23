import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="p-2 text-center absolute top-0 w-[93%]"
      >
        <i className="text-xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-3xl font-bold mb-5">Choose a vehicle</h3>
      <div
        onClick={() => {
          props.setVehicleType("car");
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
        className="w-full p-1 mb-2 flex items-center justify-between border-2 active:border-black rounded-xl"
      >
        <img
          className="h-14"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s"
          alt="Car"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-lg">
            Car{" "}
            <span className="text-sm">
              <i className="ri-user-3-fill text-sm"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-base text-xs text-gray-500">
            Affordable compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold px-2">₹{props.fare?.car}</h2>
      </div>
      <div
        onClick={() => {
          props.setVehicleType("motorcycle");
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
        className="w-full p-3 mb-2 flex items-center justify-between border-2 active:border-black rounded-xl"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt="Bike"
        />
        <div className="ml-8 w-1/2">
          <h4 className="font-medium text-lg">
            Bike{" "}
            <span className="text-sm">
              <i className="ri-user-3-fill text-sm"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-base text-xs text-gray-500">
            Affordable bike rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare?.motorcycle}</h2>
      </div>
      <div
        onClick={() => {
          props.setVehicleType("auto");
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
        }}
        className="w-full p-3 mb-2 flex items-center justify-between border-2 active:border-black rounded-xl"
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt="Auto"
        />
        <div className="ml-8 w-1/2">
          <h4 className="font-medium text-lg">
            Auto{" "}
            <span className="text-sm">
              <i className="ri-user-3-fill text-sm"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-base text-xs text-gray-500">
            Affordable auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{props.fare?.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
