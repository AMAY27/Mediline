import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { FaCalendar, FaUserDoctor, FaLocationDot, FaClock   } from "react-icons/fa6";



const AppointmentDetails = ({appDetails, isOpen, onClose}) => {
    // const [appointmentDate, setAppointmentDate] = useState("")
    // useEffect(()=>{
    //   const dateString = new Date(appDetails.appointment_date);
    //   const options = { day: 'numeric', month: 'long', year: 'numeric' };
    //   const formattedDate = dateString.toLocaleDateString('en-GB', options);
    //   setAppointmentDate(formattedDate)
    // },[])

    const changeDateFormat = (date) =>{
      const dateString = new Date(date);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = dateString.toLocaleDateString('en-GB', options);
      return formattedDate
    }
    if(!isOpen) return null
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='bg-white sm:rounded-lg relative z-50 w-full space-y-2 h-full sm:w-2/5 w-2/3 sm:h-auto sm:py-4 overflow-auto px-2 sm:px-4'>
        <div className='flex items-center justify-between pb-2 border-b-2 border-green-500'>
          <h2 className='text-2xl font-bold text-green-500'>Appointment Details</h2>
          <h2 className='text-2xl text-gray-500 p-1 hover:bg-green-500 hover:text-white rounded-md cursor-pointer' onClick={onClose}><IoMdClose/></h2>
        </div>
        <h2 className='text-lg'><span className='font-bold text-green-500'>Patient name: </span>{appDetails.patient_name}</h2>
        <div className='sm:flex items-center justify-between'>
          <div>
            <h2 className='flex items-center text-green-500 font-bold text-lg'><FaUserDoctor className='mr-1'/>Dr. {appDetails.doc_name}</h2>
            <h2 className='flex items-center text-md'><FaLocationDot className='mr-1 text-red-500'/>Address</h2>
          </div>
          <div className='flex items-center'>
            <div>
              <h2 className='flex items-center'><FaCalendar className='text-green-500 mr-1'/>{changeDateFormat(appDetails.appointment_date)}</h2>
              <p className='flex items-center'><FaClock className='text-green-500 mr-1'/>{appDetails.time_slot}</p>
            </div>
        </div>
          {/* <h2 className='flex items-center text-green-500 font-bold text-lg'><FaUserDoctor className='mr-1'/>Dr. {appDetails.doc_name}</h2> */}
        </div>
        <div className="bg-gray-200 p-2 rounded-md">
          <div className="flex justify-between">
            <h2 className='font-bold text-green-500 text-lg'>Reports</h2>
          </div>
          {appDetails.reports.length !== 0 ? 
            <h2>Reports</h2>:
            <h2>No Reports added for this appointment</h2>
          }
        </div>
        {/* <p className='mx-4'><span className='font-bold'>Address:</span> {appDetails.clinic_details.address}</p> */}
      </div>
    </div>
  )
}

export default AppointmentDetails