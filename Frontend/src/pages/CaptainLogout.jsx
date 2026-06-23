import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          setCaptain({ email: '', fullName: { firstName: '', lastName: '' }, vehicle: {} });
          navigate("/captain-login");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, []);

  return <div>Logging out...</div>;
};

export default CaptainLogout;
