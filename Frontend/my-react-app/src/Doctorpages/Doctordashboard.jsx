import React, { useEffect, useState } from 'react'
import { checkauthenticated, load_user, logout } from '../actions/auth';
import axios from 'axios'
import Navbar from '../DoctorComponents/Navbar';
import { connect } from 'react-redux';
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getClinicData } from '../doctorServices/api.docServices';
import { TbReportSearch } from "react-icons/tb";
import { useAppointmentIdContext } from '../context/doctorContext';



const Doctordashboard = ({isAuthenticated}) => {
    const [appointmentList , setAppointmentList] = useState([])
    const [clinics, setClinics] = useState([])
    const docId = localStorage.getItem("docId")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const kpi = [
        {
            title: "Today's Patients",
            data: 1
        },
        {
            title: "Upcoming appointments this month",
            data: 14
        },
        {
            title: "Total Patients this month",
            data: 24
        },
        {
            title: "Consultations with mediline",
            data: 200
        },
        {
            title: "Total consultations at office",
            data: 200
        },
    ]

    useEffect(()=>{
        dispatch(checkauthenticated())
        getDoctorData()
    },[])

    const handleAppointmentDetailsClick = (id) => {
        localStorage.setItem("appointmentId", id)
        window.dispatchEvent(new Event('storage'))
        navigate("/doc/appointment")
    }


    const changeDateFormat = (date) =>{
        const dateString = new Date(date);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = dateString.toLocaleDateString('en-GB', options);
        return formattedDate
    }
  
    const getDoctorData = async() =>{
        try {
            const res = await getClinicData(docId, "2024-07-15")
            if(res.status === 200){
                setAppointmentList(res.data.appointmentData)
                setClinics(res.data.clinicData)
            }
            else{
                alert("Error while fetching details, please try again")
            }
        } catch (error) {
            alert("Error while fetching details, please try again")
        }
    }
    if(!isAuthenticated){
        navigate('/doc/login')
      }
  return (
   <>
    <Navbar/>
    <div className='md:grid grid-cols-4 bg-green-100 h-auto md:h-screen px-4 md:px-10 lg:px-20 py-4 md:py-8 gap-4'>
        <div className='md:col-span-2'>
            <div className='mb-8'>
                {clinics.map((clinic)=> (
                    <div className='shadow-full p-4 bg-green-300 border-b-4 border-green-600 rounded-xl' key={clinic._id}>
                        <h2 className='text-green-600 font-bold text-xl'>{clinic.officename}</h2>
                    </div>
                ))}
            </div>
            <div className='md:h-[70%] bg-white shadow-full rounded-xl p-4'>
                <h2 className='text-lg pb-2 text-green-500 font-bold'>Today's Appointments</h2>
                <table className='w-full h-fit p-2 bg-white md:overflow-y-auto'>
                    <tbody>
                        <tr className='border-2 border-gray-200 text-green-500'>
                            <td className='p-2 font-bold'>Patient Name</td>
                            <td className='p-2 font-bold'>Time slot</td>
                            <td className='p-2 font-bold'>Date</td>
                            {/* <td className='p-2 font-bold'>Details</td> */}
                        </tr>
                        {appointmentList.map((appointment) => (
                            <tr className='border-2 border-gray-200'>
                                <td className='px-2 py-2'>{appointment.patient_name}</td>
                                <td className='px-2 py-2'>{appointment.time_slot}</td>
                                <td className='px-2 py-2'>{changeDateFormat(appointment.appointment_date)}</td>
                                <td className='px-2 py-2 flex justify-center'>
                                    <button 
                                        className='py-1 px-2 border-2 border-green-500 hover:bg-green-500 hover:text-white rounded-md' 
                                        onClick={() => {handleAppointmentDetailsClick(appointment._id)}}
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className='md:col-span-2 mt-4 md:mt-0'>
            <div className='md:grid grid-cols-2 gap-4'>
                {kpi.map((kpi)=>(
                    <div className='border-b-4 border-green-600 shadow-full rounded-xl p-4 md:col-span-1 bg-white mb-4 md:mb-0'>
                        <div className='flex justify-end items-center'>
                            <TbReportSearch className='text-3xl text-green-600'/>
                        </div>
                        <div>
                            <h2 className='text-lg text-green-600'>{kpi.title}</h2>
                            <p className='text-xl font-bold text-green-600'>{kpi.data}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
   </>
  )
}

const mapStatetoProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatetoProps, {logout}, null,{checkauthenticated,load_user})(Doctordashboard);