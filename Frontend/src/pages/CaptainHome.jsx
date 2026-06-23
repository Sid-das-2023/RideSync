import React, { useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { socket } from '../socket';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);

  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (captain?._id) {
      socket.emit('join', { userId: captain._id, userType: 'captain' });
    }
  }, [captain]);

  useEffect(() => {
    socket.on('new-ride', (incomingRide) => {
      setRide(incomingRide);
      setRidePopUpPanel(true);
    });

    return () => {
      socket.off('new-ride');
    };
  }, []);

  useEffect(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, { transform: 'translateY(0%)' });
    } else {
      gsap.to(ridePopUpPanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [ridePopUpPanel]);

  useEffect(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, { transform: 'translateY(0%)' });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [confirmRidePopUpPanel]);

  return (
    <div className='h-screen overflow-hidden'>
      <div className="flex items-center justify-between p-4 py-3">
        <img
          className="w-14"
          src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
          alt="Uber Logo"
        />
        <Link
          to='/captains/logout'
          className='h-10 w-10 bg-white flex items-center justify-center rounded-full'
        >
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>
      <div className='h-3/5 w-full'>
        <img
          className='h-full w-full object-cover'
          src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'
          alt='Background'
        />
      </div>
      <div className='h-2/5 p-5'>
        <CaptainDetails />
      </div>
      <div ref={ridePopUpPanelRef} className='fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-10'>
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
