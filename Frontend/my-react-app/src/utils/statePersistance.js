import React, {useMemo, useState, useEffect, useRef} from 'react'
import { useLocation } from 'react-router-dom';

export default function usePersistState(initial_value,id){
    const location = useLocation();
    const prevLocationRef = useRef(location);


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

    useEffect(() => {
        prevLocationRef.current = location;
        if (prevLocationRef.current.pathname !== location.pathname) {
            setState(initial_value);
        }
        console.log(prevLocationRef, location);
        
        // Update the ref to the current location
    }, [location]);

    return [state, setState];

}