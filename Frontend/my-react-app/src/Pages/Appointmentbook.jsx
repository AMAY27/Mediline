import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../extras/Navbar';
import { checkauthenticated, logout, load_user } from '../actions/auth';
import { useDispatch, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Appointmentbook.css";
import api from '../utils/axiosHelper';
import { FaLocationDot } from "react-icons/fa6";
//import { BACKEND_URL } from '../utils/constants';

const Appointmentbook = ({isAuthenticated}) => {
  const BACKEND_URL = import.meta.env.VITE_NODE_BACKEND_URL;
  const dispatch = useDispatch()
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
    // dispatch(load_user())
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
    const res = await api.get(`${BACKEND_URL}/office/fetchAllOffice`,config)
    console.log(res);
    const cliniclist = res.data.office
    setClinicList(cliniclist)
  }

  const handleTestcenterdata = async(e)=>{
    const config = {
      headers : {
        'Content-Type':'application/json',
        'Accept' : 'application/json'
      }
    }
    const res = await api.get(`${BACKEND_URL}/centers`,config)
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
    const res = await api.get(`${BACKEND_URL}/api/doctors/`,config)
    const doclist = res.data
    setDoclist(doclist)
  }

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
  if(!isAuthenticated){
    navigate('/loginuser')
  }

  return (
    <div>
      <Navbar/>
      {/* {isMobile ? (
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
      )} */}
      {/* {consultclick && 
        <div className='grid grid-cols-1 gap-5 mt-5 mx-6'>
        {clinicList.map((value)=>{
          return(
            <div className='border-2 border-green-300 shadow-md rounded'>
              <h2 className='text-lg md:text-lg font-bold text-center p-2'>Dr. {value.docname}</h2>
                  <h2 className='text-sm md:text-sm p-1'>Address : {value.address}</h2>
                  <h2 className='text-sm md:text-sm p-1'>City : {value.city}</h2>
                  <button className='mx-3 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Details</button>
                  <button className='mx-2 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={()=>handleBookconsultation(value.admin_docid, value._id)}>Book appointment</button>
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
      ) : ( */}
      <div className='h-screen md:flex md:flex-col' id='appointmentParentDiv'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:m-8'>
          <div className='hidden md:block md:col-span-1 md:h-screen'>
            <div className='border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-6 bg-white'>
              <h1 className='flex justify-center items-center text-xl font-bold text-green-500'>Clinic and Diagnostic centers</h1>
              <input className='flex justify-center items-center mt-5 p-3 rounded-xl w-full shadow-xl' placeholder='Search filter coming soon'/>
              <div className='rounded-md shadow-md border-2 border-green-300 py-12 px-4 my-4 bg-yellow-100'>Ads and Placcards</div>
              <div className='rounded-md shadow-md border-2 border-green-300 py-12 px-4 my-4 bg-yellow-100'>Ads and Placcards</div>
            </div>
          </div>
          <div className='md:col-span-2'>
            <div className='hidden md:grid grid-cols-1 md:grid-cols-3'>
              <div className={`cursor-pointer rounded-t-2xl p-2 ${consultclick ? 'border-l-4 border-t-4 border-green-300 bg-white text-green-500' : 'hover:border-green-300 bg-green-300'}`}
                onClick={handleConsultclick}
              >
                <h2 className='text-2xl font-bold md:text-sm p-2'>Consultation</h2>
              </div>
              <div className={`cursor-pointer rounded-t-2xl ml-2 p-2 ${testclick ? 'border-l-4 border-t-4 border-green-300 bg-white text-green-500' : 'hover:border-green-300 bg-green-300'}`}
                onClick={handleTestclick}
              >
                <h2 className='text-2xl font-bold md:text-sm p-2'>Test and Diagnosis</h2>
              </div>
              {/* <div className={`cursor-pointer rounded-t-2xl ml-2 p-2 ${healthclick ? 'border-l-4 border-t-4 border-green-300 bg-white text-green-500' : 'hover:border-green-300 bg-green-300'}`}
                onClick={handleHealthclick}
              >
                <h2 className='text-2xl font-bold md:text-sm p-2'>Full Health Checkups</h2>
              </div> */}
            </div>
            <div className='mx-4 my-2 md:hidden'>
              <select 
                className='w-full rounded-md py-2 px-2 border-2 border-green-500'
                onChange={(e)=>{
                  if(e.target.value === "consultation"){
                    handleConsultclick();
                  } else if(e.target.value === "diagnostics"){
                    handleTestclick();
                  }
                }}
              >
                <option value="consultation" onSelect={handleConsultclick}>Consultation</option>
                <option value="diagnostics" onSelect={handleTestclick}>Diagnostics</option>
              </select>
            </div>
              {consultclick && 
               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:py-8 md:px-4 md:overflow-y-scroll md:h-[70%] md:bg-white'>
                {clinicList.map((value)=>{
                  return(
                    <div className='md:shadow-xl mx-4 md:mx-0 rounded-md bg-white border-2 border-green-300'>
                      <img src='assets/medical-5459631.svg' alt='med2' className='h-40'/>
                      <h2 className='text-lg md:text-lg font-bold text-center p-2'>Dr. {value.docname}</h2>
                          {/* {docList.map((key)=>{
                            if(value.docid===key.id){
                              return(
                                <div>
                                  <img src='src/assets/medical-5459631.svg' alt='med2' className='h-40'/>
                                  <h2 className='text-2xl mdv :text-lg font-bold text-center p-2'>Dr. {key.first_name} {key.last_name}</h2>
                                </div>
                              )
                            }
                          })} */}
                      <h2 className='mx-3 md:text-md p-1 flex items-center'><FaLocationDot className='text-red-500 mr-1'/> {value.address}</h2>
                      {/* <h2 className='mx-3 md:text-sm p-1'>City : {value.city}</h2> */}
                      {/* <button className='mx-3 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Details</button> */}
                      <div className='px-2'>
                        <button className='my-2 border-2 border-green-300 hover:bg-green-500 hover:text-white font-bold py-2 rounded w-full' onClick={()=>handleBookconsultation(value.admin_docid, value._id)}>Book appointment</button>
                      </div>
                    </div> 
                  )
                })}
              </div>
              }
              {testclick && 
               <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:py-8 md:px-4 md:overflow-y-scroll md:h-[70%] md:bg-white'>
                {testcenters.map((value)=>{
                  return(
                    <div className='mx-4 md:mx-0 rounded-md bg-white md:border-2 border-green-300 shadow-md rounded h-fit'>
                      <h2 className='mx-3 md:text-lg text-green-500 font-bold p-1'>{value.center_name}</h2>
                      <h2 className='mx-3 md:text-md p-1 flex items-center'><FaLocationDot className='text-red-500 mr-1'/> {value.address}</h2>
                      {/* <button className='mx-3 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Details</button> */}
                      <div className='flex justify-center'>
                        <button className='my-2 border-2 border-green-300 w-100 hover:bg-green-500 hover:text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline' onClick={()=>handleBooktest(value._id)}>Book test</button>
                      </div>
                    </div> 
                  )
                })}
              </div>
              }
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  )
}

const mapStatetoProps= (state)=>({
  isAuthenticated: state.auth.isAuthenticated
})



export default connect(mapStatetoProps, {logout}, null, {checkauthenticated, load_user}) (Appointmentbook)