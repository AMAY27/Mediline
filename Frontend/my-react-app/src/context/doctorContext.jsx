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

const AppointmentIdContext = createContext();

export const AppointmentIdProvider = ({children}) => {
    const [currentAppointmentId, setCurrentAppointmentId] = useState(() => {
        return localStorage.getItem("appointmentId") || null;
    });
    
    const [prevAppointmentId, setPrevAppointmentId] = useState(() => {
        return localStorage.getItem("prevAppointmentId") || null;
    });

    useEffect(() => {
        if (currentAppointmentId !== prevAppointmentId) {
            localStorage.setItem("prevAppointmentId", currentAppointmentId);
            setPrevAppointmentId(currentAppointmentId);
        }
    }, [currentAppointmentId, prevAppointmentId]);

    return (
        <AppointmentIdContext.Provider value={{currentAppointmentId, setCurrentAppointmentId}}>
            {children}
        </AppointmentIdContext.Provider>
    )

}



export const useLocationContext = () => useContext(LocationContext);
export const useAppointmentIdContext = () => useContext(AppointmentIdContext)