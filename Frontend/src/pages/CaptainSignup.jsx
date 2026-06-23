import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email,
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
    if(response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');

  
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-16 mb-4'
          src='https://www.svgrepo.com/show/505031/uber-driver.svg'
          alt=''
        />
        <form onSubmit={submitHandler}>
          <h3 className='text-base font-medium mb-2'>What's your name?</h3>
          <div className='flex gap-4'>
            <input
              required
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-sm placeholder-gray-500 placeholder:text-sm'
              type='text'
              placeholder='First Name'
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-sm placeholder-gray-500 placeholder:text-sm'
              type='text'
              placeholder='Last Name'
            />
          </div>
          <h3 className='text-base font-medium mb-2'>What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-sm placeholder-gray-500 placeholder:text-sm'
            type='email'
            placeholder='email@example.com'
          />
          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-sm placeholder-gray-500 placeholder:text-sm'
            type='password'
            placeholder='password'
          />
          <h3 className='text-base font-medium mb-2'>Vehicle Details</h3>
          <div className='flex gap-4 mb-[2px]'>
            <input
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-sm placeholder-gray-500 placeholder:text-sm'
              type='text'
              placeholder='Vehicle Color'
            />
            <input
              required
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-sm placeholder-gray-500 placeholder:text-sm'
              type='text'
              placeholder='Vehicle Plate'
            />
          </div>
          <div className='flex gap-4'>
            <input
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-sm placeholder-gray-500 placeholder:text-sm'
              type='number'
              placeholder='Vehicle Capacity'
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className='bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-sm placeholder-gray-500 placeholder:text-sm'
            >
              <option value='' disabled>
                Vehicle Type
              </option>
              <option value='car'>Car</option>
              <option value='motorcycle'>Motorcycle</option>
              <option value='auto'>Auto</option>
            </select>
          </div>
          <button className='bg-[#111] mb-3 rounded px-4 py-2 w-full text-lg text-[#fff] font-semibold'>
            Create Captain Account
          </button>
        </form>
        <p className='text-center'>
          Already have an account?{' '}
          <Link to='/captain-login' className='text-blue-600'>
            Login here
          </Link>
        </p>
      </div>
      <div className='mt-auto'>
        <p className='text-[10px] leading-tight text-gray-500'>
          By signing up, you agree to receive email notifications regarding your rides and other offers.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;