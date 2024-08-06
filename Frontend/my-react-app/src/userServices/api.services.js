import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_NODE_BACKEND_URL;
import api from '../utils/axiosHelper';

const uploadReport = async(files, userId) => {
    const body = files;
    const config = {
        headers : {
            "Content-Type": "multipart/form-data",
            "userid" : userId
        }
    }
    try {
        const reportResponse = await api.post(`${BACKEND_URL}/uploadReport`, body,config);
        return reportResponse;
    } catch (error) {
        return error
    }
}

const getReports = async (userid) => {
    try {
        const config = {
            headers :{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        };
        const res = await api.get(`${BACKEND_URL}/getReports?userid=${userid}`,config);
        console.log(res);
        return res.data.reports
    } catch (error) {
        console.log(error);
    }
}

const getDetailsForBookingAppointments = async (officeid, docid) => {
    try {
        const config = {
            headers :{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        };
        const res = await api.get(`${BACKEND_URL}/detailsForBooking?officeid=${officeid}&docid=${docid}`);
        return res.data
    } catch (error) {
        
    }
}

const getAllAppointmentsForUser = async (userId) => {
    try {
        const config = {
            headers :{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        };
        const res = await api.get(`${BACKEND_URL}/getAppointments?userId=${userId}`, config)
        console.log(res);
        return res.data.appointments
    } catch (error) {
        console.log(error);
    }
}

export {uploadReport, getReports, getDetailsForBookingAppointments, getAllAppointmentsForUser}