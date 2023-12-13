import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Doctordashboard = () => {
    const [appointmentList, setAppointmentList] = useState([])
    
    useEffect(()=>{
        loadAppointments()
    },[])

    

    async function loadAppointments(){
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        }
        const res = await axios.get('http://127.0.0.1:8000/api/doctorappointments/?docid=1&date=2023-09-28',config)
        setAppointmentList(res.data) 
    }
  return (
   <>
    <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='md:col-span-2'>
            <h2 className='text-lg md:text-xl font-bold'>
                Today's Appointments
            </h2>
            <div>
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
    </div>
   </>
  )
}

export default Doctordashboard