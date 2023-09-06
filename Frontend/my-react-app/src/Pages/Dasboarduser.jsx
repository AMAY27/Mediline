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

const Dasboarduser = ({isAuthenticated}) => {
    const uid = localStorage.getItem('userid')
    const [appointmentList, setAppointmentList] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(checkauthenticated())
        dispatch(load_user())
        handleGetreports()
        handleGetAppointments()
    },[])
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
        const res = await axios.get(`http://127.0.0.1:8000/api/files/?uid=${uid}`,config)
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
    const res = await axios.get(`http://127.0.0.1:8000/api/appointment/?uid=${uid}`,config)
    const appList = res.data
    setAppointmentList(appList)
    console.log(appointmentList[0].appointment_status);  
  }

  if(!isAuthenticated){
    navigate('/loginuser')
  }
  return (
    <>
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
                    <div className='m-5 md:ml-4 md:mr-10 border-2 border-green-300 shadow-md rounded-t-lg relative'>
                        <div className=' mb-6 bg-green-300 absolute top-0 left-0 inset-x-0 w-full rounded-t-lg'>
                            <h1 className='text-2xl md:text-2xl p-2'>Upcoming Appointments</h1>
                        </div>
                        <div className='grid grid-cols-1 divide-y divide-green-300 px-8 mt-16 mb-8'>
                            {appointmentList.map((key)=>{
                                if(key.appointment_status === 'active'){
                                    return (
                                        <div className='flex justify-between m-2 pt-2'>
                                            <h2 className='font-bold'>{key.appointment_type}</h2>
                                            <button className='bg-green-300 text-black py-1 px-4 rounded'>View details</button>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <div className='m-5 md:ml-4 md:mr-10 border-2 border-green-300 shadow-md rounded-t-lg relative'>
                        <div className=' mb-6 bg-green-300 absolute top-0 left-0 inset-x-0 w-full rounded-t-lg'>
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
                    </div>
                    {/* <form className='z-5 border-2 border-gray-200 shadow-md rounded-t-lg px-8 pt-6 pb-8 my-4 mr-10 ml-4 relative'>
                        <div className=' mb-6 bg-green-300 absolute top-0 left-0 inset-x-0 w-full rounded-t-lg'><h1 className='text-2xl md:text-2xl p-2'>Book an Appointment</h1></div>
                        <div className='mb-4 mt-10'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Appointment for:</label>
                            <select name="appointmenttype"
                                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            >
                                {appointmenttype.map(type =>(
                                    <option value={type} key={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Enter Email</label>
                            <input type='email' placeholder='email' name='email' className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Enter Full Name</label>
                            <input type='text' placeholder='name' name='name' className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Select Date:</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy/MM/dd"
                                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Select Time Slot:</label>
                            <select
                                name='timeSlot'
                                onChange={handleTimeSlotChange}
                                value={selectedTimeSlot}
                                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            >
                                {timeSlots.map(slot => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
                    </form> */}
                </div>
                <div className='md:col-span-2'>
                    <div className='caraousel-userdash md:h-40'>
                        <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} className='carousel'>
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
                    </div>
                    <div className='mt-4 md:mt-6'>
                        <h1 className='md:text-4xl font-bold'>Health Diagnosis</h1>
                        <div>
                            <button className='bg-green-300 text-black py-1 px-4 rounded' onClick={()=> navigate('/reportupload')}>Upload Report</button>
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