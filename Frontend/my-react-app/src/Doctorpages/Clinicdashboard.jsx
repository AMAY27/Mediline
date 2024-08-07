import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../extras/Navbar'
import { getClinicData } from '../doctorServices/api.docServices'

const Clinicdashboard = () => {

  const [appointmentList , setAppointmentList] = useState([])

  useEffect(()=>{
    getClinicappointmentdata()
  },[])
  useEffect(()=>{
    console.log(appointmentList)
  },[appointmentList])

  const getClinicappointmentdata = async() =>{

  }


  return (
    <>
      {/* <Navbar/> */}
      <div className='md:grid grid-cols-4 bg-green-100'>
        <div></div>
      </div>
      {/* <div className=''>
        <div className='flex justify-center items-start h-auto mt-5'>
          <div className='w-3/4'>
            <h2 className='text-2xl font-bold m-3'>Today's Appointments</h2>
            <table className='max-h-80 overflow-y-scroll table-auto border-seperate border border-green-400 w-full'>
              <thead>
                <tr>
                  <th className='border border-green-300 p-4 text-left'>Patient Name</th>
                  <th className='border border-green-300 p-4 text-left'>Time Slot</th>
                  <th className='border border-green-300 p-4 text-left'>Date of Booking</th>
                </tr>
              </thead>
              <tbody>
                {appointmentList.map((value)=>{
                  return(
                    <tr>
                      <td className='border border-green-300 p-2 text-left'>{value.patient_name}</td>
                      <td className='border border-green-300 p-2 text-left'>{value.times_slot}</td>
                      <td className='border border-green-300 p-2 text-left'>{value.appointment_start_date}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Clinicdashboard