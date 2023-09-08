import React, { useEffect } from 'react'
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Navbar from '../extras/Navbar';
import { checkauthenticated, logout, load_user } from '../actions/auth';
import { useDispatch, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Appointmentbook = ({isAuthenticated}) => {
  const dispatch = useDispatch()
  const timeSlots = ['Select','9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm'];
  const appointmenttype = ['Select','Test', 'Consultation', 'Health Checkup']
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(timeSlots[0]);
  const [clinicList , setClinicList] = useState([])
  const [testcenters, setTestcenters] = useState([])
  const [docList, setDoclist] = useState([])
  const [testclick, setTestclick ] = useState(false)
  const [consultclick, setConsultclick ] = useState(true)
  const [healthclick, setHealthclick ] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(checkauthenticated())
    dispatch(load_user())
    handleClinicdata()
    handledoctordata()
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setShowMenu(false); // Close the overlay on resize for mobile
    };
    handleTestcenterdata()

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  },[])

  const handleTestclick = ()=>{
    setTestclick(true)
    setConsultclick(false)
    setHealthclick(false)
    setIsOpen(!isOpen)
  }
  const handleConsultclick = ()=>{
    setTestclick(false)
    setConsultclick(true)
    setHealthclick(false)
    setIsOpen(!isOpen)
  }
  const handleHealthclick = ()=>{
    setTestclick(false)
    setConsultclick(false)
    setHealthclick(true)
    setIsOpen(!isOpen)
  }
  const handleClinicdata = async(e)=>{
    const config = {
      headers : {
        'Content-Type':'application/json',
        'Accept' : 'application/json'
      }
    }
    const res = await axios.get(`http://127.0.0.1:8000/api/clinic/`,config)
    const cliniclist = res.data
    setClinicList(cliniclist)
  }

  const handleTestcenterdata = async(e)=>{
    const config = {
      headers : {
        'Content-Type':'application/json',
        'Accept' : 'application/json'
      }
    }
    const res = await axios.get(`http://127.0.0.1:3000/centers`,config)
    const centerlist = res.data.centers
    setTestcenters(centerlist)
    console.log(res.data.centers);
  }

  const handledoctordata = async(e)=>{
    const config = {
      headers : {
        'Content-Type':'application/json',
        'Accept' : 'application/json'
      }
    }
    const res = await axios.get(`http://127.0.0.1:8000/api/doctors/`,config)
    const doclist = res.data
    setDoclist(doclist)
  }

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleTimeSlotChange = event => {
    setSelectedTimeSlot(event.target.value);
  };

  function handleBooktest(id){
    console.log(id);
    localStorage.setItem('testcenter_id',id)
    navigate('/testappointment')
    
  }
  function handleBookconsultation(id, clinicid){
    console.log(id);
    localStorage.setItem('docid',id)
    localStorage.setItem('clinicid',clinicid)
    navigate('/clinicappointment')
    
  }
  // if(!isAuthenticated){
  //   navigate('/loginuser')
  // }

  return (
    <div>
      <Navbar/>
      {isMobile ? (
        <div className='grid grid-cols-1 m-3'>
          <button
            className='bg-green-200 p-2 rounded border'
            onClick={() => setIsOpen(!isOpen)}
          >
            {consultclick ? 'Consultation (click to change)' : testclick ? 'Test and Diagnosis (click to change)' : healthclick ? 'Health Checkups (click to change)' : 'Select an Option'}
          </button>
          {isOpen && (
            <div className='absolute bg-white border rounded mt-1 w-48'>
              <div
                className={`p-2 border-t border-gray-300 cursor-pointer hover:bg-green-300 ${
                consultclick ? 'bg-green-300' : ''
                }`}
                onClick={handleConsultclick}
              >
                Consultation
              </div>
              <div
                className={`p-2 border-t border-gray-300 cursor-pointer hover:bg-green-300 ${
                testclick ? 'bg-green-300' : ''
                }`}
                onClick={handleTestclick}
              >
                Test and Diagnosis
              </div>
              <div
                className={`p-2 border-t border-gray-300 cursor-pointer hover:bg-green-300 ${
                healthclick ? 'bg-green-300' : ''
                }`}
                onClick={handleHealthclick}
              >
                Full Health Checkups
              </div>
            </div>
      )}
      {consultclick && 
        <div className='grid grid-cols-1 gap-5 mt-5 mx-6'>
        {clinicList.map((value)=>{
          return(
            <div className='border-2 border-green-300 shadow-md rounded'>
                  {docList.map((key)=>{
                    if(value.docid===key.id){
                      return(
                        <div>
                          <h2 className='text-lg md:text-lg font-bold text-center p-2'>Dr. {key.first_name} {key.last_name}</h2>
                        </div>
                      )
                    }
                  })}
                  <h2 className='text-sm md:text-sm p-1'>Address : {value.address}</h2>
                  <h2 className='text-sm md:text-sm p-1'>City : {value.city}</h2>
                  <button className='mx-3 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Details</button>
                  <button className='mx-2 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={()=>handleBookconsultation(value.docid, value.id)}>Book appointment</button>
            </div> 
          )
        })}
      </div>
      }
      {testclick && 
               <div className='grid grid-cols-1 gap-5 mt-5 mx-6'>
                {testcenters.map((value)=>{
                  return(
                    <div className='border-2 border-green-300 shadow-md rounded'>
                          <h2 className='mx-3 md:text-sm p-1'>Center : {value.center_name}</h2>
                          <h2 className='mx-3 md:text-sm p-1'>Address : {value.address}</h2>
                          <button className='mx-3 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Details</button>
                          <button className='mx-2 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={()=>handleBooktest(value._id)}>Book test</button>
                    </div> 
                  )
                })}
              </div>
              }
      </div>
      ) : (
        <div className='md:h-screen md:flex md:flex-col'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:m-8'>
          <div className='md:col-span-1 md:h-screen'>
            <form action="" className='border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-6'>
              {/* <div className='mb-6 bg-green-300 relative top-0 left-0 inset-x-0 w-full rounded-t-lg'>
                <h1 className='text-2xl md:text-2xl p-2'>Book an Appointment</h1>
              </div> */}
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
            </form>
          </div>
          <div className='md:col-span-2'>
            <div className='grid grid-cols-1 md:grid-cols-3'>
              <div className={`border-2 border-green-400 cursor-pointer ${consultclick ? 'border-4 border-green-300 bg-green-300 ' : 'hover:border-green-300'}`}
                onClick={handleConsultclick}
              >
                <h2 className='text-2xl font-bold md:text-sm p-2'>Consultation</h2>
              </div>
              <div className={`border-2 border-green-400 cursor-pointer ${testclick ? 'border-4 border-green-300 bg-green-300 ' : 'hover:border-green-300'}`}
                onClick={handleTestclick}
              >
                <h2 className='text-2xl font-bold md:text-sm p-2'>Test and Diagnosis</h2>
              </div>
              <div className={`border-2 border-green-400 cursor-pointer ${healthclick ? 'border-4 border-green-300 bg-green-300 ' : 'hover:border-green-300'}`}
                onClick={handleHealthclick}
              >
                <h2 className='text-2xl font-bold md:text-sm p-2'>Full Health Checkups</h2>
              </div>
            </div>
              {consultclick && 
               <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:my-8'>
                {clinicList.map((value)=>{
                  return(
                    <div className='border-2 border-green-300 shadow-md rounded'>
                          {docList.map((key)=>{
                            if(value.docid===key.id){
                              return(
                                <div>
                                  <img src='src/assets/medical-5459631.svg' alt='med2' className='h-40'/>
                                  <h2 className='text-2xl md:text-lg font-bold text-center p-2'>Dr. {key.first_name} {key.last_name}</h2>
                                </div>
                              )
                            }
                          })}
                          <h2 className='mx-3 md:text-sm p-1'>Address : {value.address}</h2>
                          <h2 className='mx-3 md:text-sm p-1'>City : {value.city}</h2>
                          <button className='mx-3 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Details</button>
                          <button className='mx-2 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={()=>handleBookconsultation(value.docid,value.id)}>Book appointment</button>
                    </div> 
                  )
                })}
              </div>
              }
              {testclick && 
               <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:my-8'>
                {testcenters.map((value)=>{
                  return(
                    <div className='border-2 border-green-300 shadow-md rounded'>
                          <h2 className='mx-3 md:text-sm p-1'>Center : {value.center_name}</h2>
                          <h2 className='mx-3 md:text-sm p-1'>Address : {value.address}</h2>
                          <button className='mx-3 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Details</button>
                          <button className='mx-2 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={()=>handleBooktest(value._id)}>Book test</button>
                    </div> 
                  )
                })}
              </div>
              }
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

const mapStatetoProps= (state)=>({
  isAuthenticated: state.auth.isAuthenticated
})



export default connect(mapStatetoProps, {logout}, null, {checkauthenticated, load_user}) (Appointmentbook)