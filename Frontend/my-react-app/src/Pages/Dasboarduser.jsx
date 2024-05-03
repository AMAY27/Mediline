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
//import { BACKEND_URL } from '../utils/constants';

const Dasboarduser = ({isAuthenticated}) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
    const uid = localStorage.getItem('userid')
    const [appointmentList, setAppointmentList] = useState([]);
    const [appDetailsOpen, setAppDetailsOpen] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState()
    const [zindexBool, setZindexBool] = useState(false);
    const z_index = zindexBool ? "z-[-1]" : "z-0";
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(checkauthenticated())
        dispatch(load_user())
        handleGetreports()
        handleGetAppointments()
    },[])
    useEffect(()=>{
        console.log(appointmentList);
    },[appointmentList])
    const [msg , setmsg] = useState('')
    const navigate = useNavigate();

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

  async function handleGetAppointments(){
    const config = {
            headers :{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        };
    const res = await axios.get(`${BACKEND_URL}/api/appointment/?uid=${uid}`,config)
    const appList = res.data
    setAppointmentList(appList)
  }

  const handleAppointmentDetailsClick = async (appointmentid) => {
    const config = {
        headers :{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    };
    const res = await axios.get(`${BACKEND_URL}/api/appointmentdetails/${appointmentid}/`, config)
    setAppointmentDetails(res.data);
    setZindexBool(true);
    setAppDetailsOpen(true);
  }

  const handleAppointmentDetailsClose = () => {
    setAppDetailsOpen(false);
    setZindexBool(false);
  }

  if(!isAuthenticated){
    navigate('/loginuser')
  }
  return (
    <>
    <AppointmentDetails appDetails={appointmentDetails} isOpen={appDetailsOpen} onClose={handleAppointmentDetailsClose} />
      <Navbar/>
        <div className='md:h-screen md:flex md:flex-col ' id='dashboard-user'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:m-8'>
                <div className='md:col-span-1 md:h-screen'>
                    <button className="m-4 md:ml-4 bg-white-500 hover:bg-green-300 text-black border-2 border-green-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="button"
                        onClick={()=>navigate('/appointmentbook')}
                    >
                        Book an appointment
                    </button>
                    {msg && <p>{msg}</p>}
                    <div className='m-5 md:ml-4 md:mr-10 border-2 border-green-300 rounded-lg'>
                        <div className='grid grid-cols-1 divide-y divide-green-300 px-8 mt-8 mb-8'>
                            {appointmentList.map((key)=>{
                                if(key.appointment_status === 'active'){
                                    return (
                                        <div>
                                            <div className='flex items-center justify-between mt-3'>
                                                <h2 className='text-green-500'>{key.patient_name}</h2>
                                                <button className='border-2 border-green-300 hover:bg-green-300 text-black py-1 px-4 rounded' onClick={() => handleAppointmentDetailsClick(key.id)}>View details</button>
                                            </div>
                                            <div className='flex items-center justify-between m-2'>
                                                <h2 className='font-bold'>{key.appointment_date}</h2>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    {/* <div className='m-5 md:ml-4 md:mr-10 border-2 border-green-300 shadow-md rounded-t-lg relative'>
                        <div className=' mb-6 bg-green-300 absolute top-0 left-0 w-full rounded-t-lg'>
                            <h1 className='text-2xl md:text-2xl p-2'>Previous Appointments</h1>
                        </div>
                        <div className='grid grid-cols-1 divide-y divide-green-300 px-8 mt-16 mb-8'>
                        {appointmentList.map((key)=>{
                                if(key.appointment_status !== 'active'){
                                    return (
                                        <div className='flex justify-between m-2 pt-2'>
                                            <h2 className='font-bold'>{key.appointment_type}</h2>
                                            <button className='bg-green-300 text-black py-1 px-4 rounded'>View details</button>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div> */}
                </div>
                <div className='md:col-span-2'>
                    {/* <div className='caraousel-userdash md:h-40'>
                        <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} className={`carousel ${z_index}`}>
                            <div>
                                <div className='caraousel-div'><h1 className='text-3xl p-8 font-bold'>Upto 30% off on Full health checkups</h1>
                                </div>
                                <p className='legend'>Image 1</p>
                            </div>
                            <div>
                                <img src='src/assets/medical-5459661.svg' alt='med2'/>
                                <p className='legend'>Image 1</p>
                            </div>
                            <div>
                                <img src='src/assets/react.svg' alt='med3'/>
                                <p className='legend'>Image 1</p>
                            </div>
                        </Carousel>
                    </div> */}
                    <div className='mt-4 md:mt-6 flex justify-between items-center'>
                        <h1 className='md:text-4xl font-bold'>Reports and Diagnostics</h1>
                        <div>
                            <button className='border-2 border-green-300 hover:bg-green-300 text-black py-3 px-8 rounded' onClick={()=> navigate('/reportupload')}>Upload Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}   
const mapStatetoProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated
  })

export default connect(mapStatetoProps, {logout}, null,{checkauthenticated,load_user})(Dasboarduser);