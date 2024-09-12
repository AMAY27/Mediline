const BACKEND_URL = import.meta.env.VITE_NODE_BACKEND_URL;
import api from '../utils/axiosHelper';

export const getClinicData = async(docid, date) =>{
    try {
        const config = {
            headers :{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        };
        const res = await api.get(`${BACKEND_URL}/clinicdata?docid=${docid}&date=${date}`)
        return res
    } catch (error) {
        console.log(error);
    }
}