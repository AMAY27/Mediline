import React, {useMemo, useState, useEffect, useRef} from 'react'
import { useLocation } from 'react-router-dom';
import { useLocationContext, useAppointmentIdContext } from '../context/doctorContext';


export default function usePersistState(initial_value,id){

    const _initial_value = useMemo(() => {
        const local_storage_value_str = localStorage.getItem('state:' + id);
        // If there is a value stored in localStorage, use that
        if(local_storage_value_str) {
            return JSON.parse(local_storage_value_str);
        } 
        // Otherwise use initial_value that was passed to the function
        return initial_value;
    }, []);

    const [state, setState] = useState(_initial_value);
    useEffect(() => {
        const state_str = JSON.stringify(state); // Stringified state
        localStorage.setItem('state:' + id, state_str) // Set stringified state as item in localStorage
    }, [state]);

    // useEffect(() => {
    //     // const handleStorageChange = (event) => {
    //     //     if (event.key === "appointmentId") {
    //     //       // If the appointmentId changes, reset the state to the initial value
    //     //       setState(initial_value);
    //     //     }
    //     //   };
      
    //     //   window.addEventListener("storage", handleStorageChange);
    //     //   return () => {
    //     //     window.removeEventListener("storage", handleStorageChange);
    //     // };
    //     setState(initial_value)
    // }, [currappointmentId]);

    useEffect(() => {
        const handleStorageChange = (event) => {
          if (event.key === "appointmentId") {
            const newAppointmentId = event.newValue;
            const currentAppointmentId = localStorage.getItem("appointmentId");
    
            // Reset the state if the appointmentId has changed
            if (newAppointmentId !== currentAppointmentId) {
              setState(initial_value);
            }
          }
        };
    
        // Listen for storage events
        window.addEventListener("storage", handleStorageChange);
        
        return () => {
          // Clean up the event listener on component unmount
          window.removeEventListener("storage", handleStorageChange);
        };
      }, [initial_value]);

    return [state, setState];

}