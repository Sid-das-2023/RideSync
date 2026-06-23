import React, { useState, createContext } from 'react';

// Create the context
export const CaptainDataContext = createContext();

// Create a provider component
const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        },
        vehicle: {
            color: '',
            plate: '',
            capacity: '',
            vehicleType: ''
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain, isLoading, setIsLoading, error, setError, updateCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;