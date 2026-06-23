import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import FinishRidePanel from "../components/FinishRidePanel";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  const location = useLocation();
  const ride = location.state?.ride;

  useEffect(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, { transform: 'translateY(0%)' });
    } else {
      gsap.to(finishRidePanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex items-center justify-between p-4 py-3">
        <img
          className="w-14"
          src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
          alt="Uber Logo"
        />
        <Link
          to="/captains/logout"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/4 w-full">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
        />
      </div>
      <div className="h-1/4 relative py-3 px-4 bg-yellow-300">
        <h5
          onClick={() => setFinishRidePanel(true)}
          className="p-1 text-center absolute top-0 w-[93%]"
        >
          <i className="text-xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <div className="rounded-lg flex justify-between px-4 mt-6 items-center w-full">
          <h2 className="text-xl font-semibold">{ride?.destination || 'Destination'}</h2>
          <div className="flex items-center bg-green-500 py-2 px-6 rounded-lg">
            <button onClick={() => setFinishRidePanel(true)}>
              <h3 className="text-gray-100 font-medium">Finish Ride</h3>
            </button>
          </div>
        </div>
      </div>
      <div ref={finishRidePanelRef} className='fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <FinishRidePanel ride={ride} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
