import React from 'react'
import Navbar from '../extras/Navbar'
import 'react-datepicker/dist/react-datepicker.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useState, useEffect } from 'react';
import { checkauthenticated, load_user } from '../actions/auth';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../actions/auth'
import axios from 'axios';
import AppointmentDetails from '../Components/AppointmentDetails';
import ReportUploadForm from '../Components/ReportUploadForm';
//import { BACKEND_URL } from '../utils/constants';

// const Dasboarduser = ({isAuthenticated}) => {
const Dasboarduser = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
    const uid = localStorage.getItem('userid')
    const [appointmentList, setAppointmentList] = useState([]);
    const [appDetailsOpen, setAppDetailsOpen] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState()
    const [activeTab, setActiveTab] = useState('appointment');
    const [zindexBool, setZindexBool] = useState(false);
    const z_index = zindexBool ? "z-[-1]" : "z-0";
    const dispatch = useDispatch()
    // useEffect(()=>{
    //     // dispatch(checkauthenticated())
    //     // dispatch(load_user())
    //     // handleGetreports()
    //     // handleGetAppointments()
    // },[])
    useEffect(()=>{
        console.log(appointmentList);
    },[appointmentList])
    const [msg , setmsg] = useState('')
    const navigate = useNavigate();

    const handleClick = (tab) => {
        setActiveTab(tab);
      };
    
    const tabs = [
        { key: 'appointment', label: 'Appointment' },
        { key: 'report', label: 'Reorts and Diagnostics' },
        { key: 'upload', label: 'Upload Reports' }
    ];

  const handleGetreports = async (e) => {
    try {
        const config = {
            headers :{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        };
        const res = await axios.get(`${BACKEND_URL}/api/files/?uid=${uid}`,config)
        console.log(res);
    } catch (error) {
        console.log(error);
    }
  }

//   async function handleGetAppointments(){
//     const config = {
//             headers :{
//                 'Content-Type' : 'application/json',
//                 'Accept' : 'application/json'
//             }
//         };
//     const res = await axios.get(`${BACKEND_URL}/api/appointment/?uid=${uid}`,config)
//     const appList = res.data
//     setAppointmentList(appList)
//   }

//   const handleAppointmentDetailsClick = async (appointmentid) => {
//     const config = {
//         headers :{
//             'Content-Type' : 'application/json',
//             'Accept' : 'application/json'
//         }
//     };
//     const res = await axios.get(`${BACKEND_URL}/api/appointmentdetails/${appointmentid}/`, config)
//     setAppointmentDetails(res.data);
//     setZindexBool(true);
//     setAppDetailsOpen(true);
//   }

//   const handleAppointmentDetailsClose = () => {
//     setAppDetailsOpen(false);
//     setZindexBool(false);
//   }

//   if(!isAuthenticated){
//     navigate('/loginuser')
//   }
  return (
    <>
    {/* <AppointmentDetails appDetails={appointmentDetails} isOpen={appDetailsOpen} onClose={handleAppointmentDetailsClose} /> */}
      <Navbar/>
        <div className='md:h-screen md:flex md:flex-col bg-green-100' id='dashboard-user'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:mx-16 md:my-8'>
                <div className='hidden md:grid grid-cols-3 bg-green-300 rounded-xl'>
                    <div className='col-span-1 items-center pl-4'>
                        <h2 className="text-[3rem] text-white font-bold">Welcome,</h2>
                        <h2 className="text-[3rem] text-white font-bold">User</h2>
                    </div>
                    <div className="col-span-2">
                        <img src="assets/doctor-6810751.svg" className="h-80" alt="" />
                    </div>
                </div>
                <div className='md:col-span-2'>
                    <div>
                        <div className='flex space-x-2'>
                        {tabs.map((tab, index) => (
                            <div
                                key={tab.key}
                                className={`cursor-pointer rounded-t-2xl ${index !== 0 ? 'ml-2' : ''} p-2 ${
                                    activeTab === tab.key
                                        ? 'border-l-4 border-t-4 border-green-300 bg-white text-green-500'
                                        : 'hover:border-green-300 bg-green-300'
                                }`}
                                onClick={() => handleClick(tab.key)}
                            >
                                <h2 className='text-2xl font-bold md:text-sm p-2'>{tab.label}</h2>
                            </div>
                        ))}
                        </div>
                        <div className='md:h-[70%] bg-white rounded-r-md'>
                            {activeTab === 'upload' &&<ReportUploadForm/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}   
// const mapStatetoProps = (state) =>({
//     isAuthenticated: state.auth.isAuthenticated
//   })

// export default connect(mapStatetoProps, {logout}, null,{checkauthenticated,load_user})(Dasboarduser);
export default Dasboarduser