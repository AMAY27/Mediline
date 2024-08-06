import React from 'react'
import Navbar from '../extras/Navbar'
import 'react-datepicker/dist/react-datepicker.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useState, useEffect } from 'react';
import { checkauthenticated, load_user } from '../actions/auth';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getReports, getAllAppointmentsForUser } from '../userServices/api.services'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../actions/auth'
import axios from 'axios';
import AppointmentDetails from '../Components/AppointmentDetails';
import ReportUploadForm from '../Components/ReportUploadForm';
import ReportListingComponents from '../Components/ReportListingComponents';
import PdfViewerComponent from '../Components/PdfViewerComponent';
import { FaFileAlt, FaRegEye, FaFileDownload   } from "react-icons/fa";
import { FaCalendar, FaPlus, FaUserDoctor  } from "react-icons/fa6";

//import { BACKEND_URL } from '../utils/constants';


const Dasboarduser = ({isAuthenticated}) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
    const uid = localStorage.getItem('userId')
    const [appointmentList, setAppointmentList] = useState([]);
    const [reports, setReports] = useState([]);
    const [appDetailsOpen, setAppDetailsOpen] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState()
    const [activeTab, setActiveTab] = useState('appointment');
    const [zindexBool, setZindexBool] = useState(false);
    const z_index = zindexBool ? "z-[-1]" : "z-0";
    const dispatch = useDispatch();
    const [isPdfOpen, setIspdfOpen] = useState(false);
    const [pdf, setPdf] = useState("")
    // useEffect(()=>{
    //     // dispatch(checkauthenticated())
    //     // dispatch(load_user())
    //     // handleGetreports()
    //     // handleGetAppointments()
    // },[])
    useEffect(()=>{
        dispatch(checkauthenticated())
        const getReportsforUser = async() =>  {
            const resp = await getReports(uid);
            setReports(resp);
        }
        getReportsforUser();
    },[])
    useEffect(() => {
        const getAppointments = async() => {
            const resp = await getAllAppointmentsForUser(uid);
            setAppointmentList(resp);
        }
        getAppointments();
    },[])
    useEffect(()=>{
        console.log(appointmentDetails);
    },[appointmentDetails])
    const [msg , setmsg] = useState('')
    const navigate = useNavigate();

    const handleClick = (tab) => {
        setActiveTab(tab);
      };
    

    const handlepdfViewClick =(pdf) => {
        console.log(pdf);
        setIspdfOpen(true)
        setPdf(pdf)
    }
    const handlePdfClose = () => {
        setIspdfOpen(false)
        setPdf('')
    }
    const tabs = [
        { key: 'appointment', label: 'Appointments' },
        { key: 'report', label: 'Reorts and Diagnostics' },
        { key: 'upload', label: 'Upload Reports' }
    ];



  const handleAppointmentDetailsClick = async (appointmentDetails) => {
    setAppointmentDetails(appointmentDetails)
    setZindexBool(true);
    setAppDetailsOpen(true);
  }

  const handleAppointmentDetailsClose = () => {
    setAppDetailsOpen(false);
    setZindexBool(false);
  }

  const changeDateFormat = (date) =>{
    const dateString = new Date(date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = dateString.toLocaleDateString('en-GB', options);
    return formattedDate
  }

  const handleBookAppointmentClicked = () =>{
    navigate('/appointmentbook')
    localStorage.setItem("navTag", "book")
  }

  if(!isAuthenticated){
    navigate('/loginuser')
  }
  return (
    <>
    <PdfViewerComponent isOpen={isPdfOpen} pdf={pdf} onClose={handlePdfClose}/>
    <AppointmentDetails appDetails={appointmentDetails} isOpen={appDetailsOpen} onClose={handleAppointmentDetailsClose} />
      <Navbar/>
        <div className='md:flex md:flex-col h-full bg-green-100' id='dashboard-user'>
            <div className='h-auto lg:h-screen grid grid-cols-1 md:grid-cols-3 gap-4 md:mx-36 md:my-8'>
                <div className='h-fit hidden lg:col-span-1 md:grid grid-cols-3 bg-green-300 rounded-xl'>
                    <div className='col-span-1 items-center pl-4 h-fit'>
                        <h2 className="text-[3rem] text-white font-bold">Welcome,</h2>
                        <h2 className="text-[3rem] text-white font-bold">User</h2>
                    </div>
                    <div className="col-span-2">
                        <img src="assets/doctor-6810751.svg" className="h-80" alt="" />
                    </div>
                </div>
                <div className='md:col-span-2'>
                    <div className='hidden md:flex space-x-2'>
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
                                <h2 className='text-sm sm:text-md font-bold p-2'>{tab.label}</h2>
                            </div>
                        ))}
                    </div>
                    <div className='mx-4 my-2 md:hidden'>
                        <select 
                            className='w-full rounded-md py-2 px-2 border-2 border-green-500'
                            onChange={(e)=>{
                                if(e.target.value === 'appointment'){
                                    handleClick('appointment')
                                } else if(e.target.value === 'report'){
                                    handleClick('report')
                                }
                            }}
                        >
                            {tabs.map((tab)=>(
                                <option value={tab.key}>{tab.label}</option>
                            ))}
                        </select>
                    </div>
                    {/* <div className='bg-white rounded-r-md md:p-8 md:h-[70%] md:overflow-y-scroll'> */}
                        {activeTab === 'appointment' && 
                            <div className="items-center md:h-[70%] bg-white rounded-r-md p-2 md:p-8 md:overflow-y-auto">
                                {/* <div className='flex justify-end mx-2'>
                                    <button className='sm:hidden p-2 mb-4 border-2 border-green-500 hover:bg-green-500 hover:text-white rounded-md' onClick={handleBookAppointmentClicked}><FaPlus/></button>
                                </div> */}
                                <button className='absolute bottom-0 right-0 sm:hidden p-2 mb-12 rounded-full mx-4 border-2 border-green-500 text-white bg-green-500' onClick={handleBookAppointmentClicked}><FaPlus/></button>
                                <div className='sm:hidden mx-2'>
                                    <h2 className='text-lg pb-2 text-green-500 font-bold'>Upcoming Appointments</h2>
                                    {appointmentList.map((appointment)=> (
                                        appointment.is_completed === false &&
                                        <div className='p-4 rounded-xl shadow-full bg-white mb-4'>
                                            <div className="flex justify-between">
                                                <h2 className='font-bold text-lg'>{appointment.patient_name}</h2>
                                                <h2 className='flex items-center'><FaCalendar className='text-green-500 mr-1'/>{appointment.appointment_date}</h2>
                                            </div>
                                            <h2 className='flex items-center'><FaUserDoctor className='text-green-500 mr-1'/>{appointment.doc_name}</h2>
                                            <div className="flex justify-center">
                                                <button className='py-1 px-2 bg-green-500 text-white rounded-md shadow-xl' onClick={() => {handleAppointmentDetailsClick(appointment)}}>
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <h2 className='text-lg mt-4 pb-2 text-green-500 font-bold'>Previous Appointments</h2>
                                    {appointmentList.map((appointment)=> (
                                        appointment.is_completed === true &&
                                        <div className='p-4 rounded-xl shadow-full bg-white mb-4'>
                                            <div className="flex justify-between">
                                                <h2 className='font-bold text-lg'>{appointment.patient_name}</h2>
                                                <h2 className='flex items-center'><FaCalendar className='text-green-500 mr-1'/>{appointment.appointment_date}</h2>
                                            </div>
                                            <h2 className='flex items-center'><FaUserDoctor className='text-green-500 mr-1'/>{appointment.doc_name}</h2>
                                            <div className="flex justify-center">
                                                <button className='py-1 px-2 bg-green-500 text-white rounded-md shadow-xl' onClick={() => {handleAppointmentDetailsClick(appointment)}}>
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className='hidden sm:block p-2 mb-4 border-2 border-green-500 hover:bg-green-500 hover:text-white rounded-md' onClick={handleBookAppointmentClicked}>Book New Appointment</button>
                                <div className='hidden sm:block bg-gray-100 p-4 rounded-xl h-auto'>
                                    <h2 className='text-lg pb-2 text-green-500 font-bold'>Upcoming Appointments</h2>
                                    <table className='w-full h-fit p-2 bg-white md:overflow-y-auto'>
                                        <tbody>
                                            <tr className='border-2 border-gray-200 text-green-500'>
                                                <td className='p-2 font-bold'>Patient Name</td>
                                                <td className='p-2 font-bold'>Doctor</td>
                                                <td className='p-2 font-bold'>Date</td>
                                                {/* <td className='p-2 font-bold'>Details</td> */}
                                            </tr>
                                            {appointmentList.map((appointment) => (
                                                appointment.is_completed === false &&
                                                <tr className='border-2 border-gray-200'>
                                                    <td className='px-2 py-2'>{appointment.patient_name}</td>
                                                    <td className='px-2 py-2'>{appointment.doc_name}</td>
                                                    <td className='px-2 py-2'>{changeDateFormat(appointment.appointment_date)}</td>
                                                    <td className='px-2 py-2 flex justify-center'>
                                                        <button className='py-1 px-2 border-2 border-green-500 hover:bg-green-500 hover:text-white rounded-md' onClick={() => {handleAppointmentDetailsClick(appointment)}}>
                                                            Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <h2 className='text-lg pb-2 text-green-500 font-bold mt-8'>Previous Appointments</h2>
                                    <table className='w-full h-fit p-2 bg-white md:overflow-y-auto'>
                                        <tbody>
                                            <tr className='border-2 border-gray-200 text-green-500'>
                                                <td className='p-2 font-bold'>Patient Name</td>
                                                <td className='p-2 font-bold'>Doctor</td>
                                                <td className='p-2 font-bold'>Date</td>
                                                {/* <td className='p-2 font-bold'>Details</td> */}
                                            </tr>
                                            {appointmentList.map((appointment) => (
                                                appointment.is_completed === true &&
                                                <tr className='border-2 border-gray-200'>
                                                    <td className='px-2 py-2'>{appointment.patient_name}</td>
                                                    <td className='px-2 py-2'>{appointment.doc_name}</td>
                                                    <td className='px-2 py-2'>{changeDateFormat(appointment.appointment_date)}</td>
                                                    <td className='px-2 py-2 flex justify-center'>
                                                        <button className='py-1 px-2 border-2 border-green-500 hover:bg-green-500 hover:text-white rounded-md' onClick={() => {handleAppointmentDetailsClick(appointment)}}>
                                                            Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                        {activeTab === 'upload' &&
                            <div className='items-center md:h-[70%] md:overflow-y-scroll bg-white rounded-r-md md:p-8'>
                                <ReportUploadForm/>
                            </div>
                        }
                        {activeTab === 'report' && 
                            <div className='items-center md:h-[70%] md:overflow-y-scroll bg-white rounded-r-md p-4 md:p-8'>
                                {/* <ReportUploadForm/> */}
                                {reports.map((report) => (
                                    <>
                                        <ReportListingComponents title={report.title} date={report.date} pdfUrl={report.url} handlePdfOpen={handlepdfViewClick}/>
                                    </>
                                ))}
                            </div>  
                        }
                    {/* </div> */}
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
