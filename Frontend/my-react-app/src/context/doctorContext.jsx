import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const location = useLocation();
    const prevLocationRef = useRef(location);
    const [currentLocation, setCurrentLocation] = useState(location);

    useEffect(() => {
        console.log(location,prevLocationRef);
        console.log(currentLocation);
        
        if (prevLocationRef.current.pathname !== location.pathname) {            
            setCurrentLocation(location);
        }

        // Update the ref to the current location
        //prevLocationRef.current = location;
    }, [location]);

    return (
        <LocationContext.Provider value={currentLocation}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => useContext(LocationContext);