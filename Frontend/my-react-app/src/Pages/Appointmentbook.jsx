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
  const [searchedClinicList, setSerchedCLinicList] = useState([])
  const [searchTermForClinics, setSearchTermForCLinics] = useState("")
  const [testcenters, setTestcenters] = useState([])
  const [testclick, setTestclick ] = useState(false)
  const [consultclick, setConsultclick ] = useState(true)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(checkauthenticated())
  },[])


  useEffect(()=>{
    handleTestcenterdata()
    handleClinicdata()
  },[])

  useEffect(()=>{
    const filteredList = clinicList.filter(term =>
      term.docname.toLowerCase().includes(searchTermForClinics.toLowerCase()) ||
      term.address.toLowerCase().includes(searchTermForClinics.toLowerCase()) ||
      term.service_tags.some(
        keyword => keyword.toLowerCase().includes(searchTermForClinics.toLowerCase())
      )
    )
    setSerchedCLinicList(filteredList)
  },[searchTermForClinics])

  const handleSearchClinicChange = (e) =>{
    e.preventDefault()
    setSearchTermForCLinics(e.target.value)
  }

  const handleTestclick = ()=>{
    setTestclick(true)
    setConsultclick(false)
    setIsOpen(!isOpen)
  }
  const handleConsultclick = ()=>{
    setTestclick(false)
    setConsultclick(true)
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
    setSerchedCLinicList(cliniclist)
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
      <div className='h-screen md:flex md:flex-col' id='appointmentParentDiv'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:m-8'>
          <div className='hidden md:block md:col-span-1 md:h-screen'>
            <div className='flex justify-center items-center border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-6 bg-white'>
              <h1 className='text-xl font-bold text-green-500 text-center'>Clinic and Diagnostic centers @mediline</h1>
              {/* <div className='rounded-md shadow-md border-2 border-green-300 py-12 px-4 my-4 bg-yellow-100'>Ads and Placcards</div> */}
              {/* <div className='rounded-md shadow-md border-2 border-green-300 py-12 px-4 my-4 bg-yellow-100'>Ads and Placcards</div> */}
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
               <div className='md:overflow-y-scroll md:h-[70%] md:bg-white md:py-4'>
                <div className='flex items-center justify-center'>
                  <input 
                    className='bg-gray-100 appearance-none rounded-lg sm:w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-full mx-4' 
                    placeholder='Search for Doctors, speciality and location' 
                    onChange={handleSearchClinicChange}
                  />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:py-4 md:px-4 '>
                  {searchedClinicList.map((value, idx)=>{
                    return(
                      <div 
                        className='md:shadow-xl mx-4 md:mx-0 rounded-md bg-white border-2 border-green-300' 
                        key={idx}
                      >
                        <img src='assets/medical-5459631.svg' alt='med2' className='h-40'/>
                        <h2 className='text-lg md:text-lg font-bold text-center p-2'>Dr. {value.docname}</h2>
                        <h2 className='mx-3 md:text-md p-1 flex items-center'><FaLocationDot className='text-red-500 mr-1'/> {value.address}</h2>
                        <div className='px-2'>
                          <button className='my-2 border-2 border-green-300 hover:bg-green-500 hover:text-white font-bold py-2 rounded w-full' onClick={()=>handleBookconsultation(value.admin_docid, value._id)}>Book appointment</button>
                        </div>
                      </div> 
                    )
                  })}
                </div>
              </div>
              }
              {testclick && 
               <div className='grid grid-cols-1 md:grid-cols-3 gap-5 md:py-8 md:px-4 md:overflow-y-scroll md:h-[70%] md:bg-white'>
                {testcenters.map((value, idx)=>{
                  return(
                    <div 
                      className='mx-4 md:mx-0 rounded-md bg-white md:border-2 border-green-300 shadow-md rounded h-fit'
                      key={idx}
                    >
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
    </div>
  )
}

const mapStatetoProps= (state)=>({
  isAuthenticated: state.auth.isAuthenticated
})



export default connect(mapStatetoProps, {logout}, null, {checkauthenticated})(Appointmentbook)