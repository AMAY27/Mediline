import React from 'react'

const AppointmentDetails = ({appDetails, isOpen, onClose}) => {
    if(!isOpen) return null
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white rounded-lg relative z-50 space-y-8 md:w-2/5 w-2/3 h-2/5 overflow-auto'>
            <div className='p-2 rounded-lg'>
              <h2 className='text-2xl flex justify-center p-2 font-bold'>Appointment Details</h2>
              <h2 className='text-lg mx-4 my-3'><span className='font-bold'>Patient Name: </span>{appDetails.patient_name}</h2>
              <p className='mx-4'><span className='font-bold'>Date:</span> {appDetails.appointment_date}</p>
              <p className='mx-4'><span className='font-bold'>Address:</span> {appDetails.clinic_details.address}</p>
              <p className='mx-4'>Dr. {appDetails.doctor_details.first_name} {appDetails.doctor_details.last_name}</p>
              <p className='mx-4'><span className='font-bold'>Appointement time slot: </span>{appDetails.times_slot}</p>
              <button className='mx-4 mt-3 px-4 py-2 border-2 border-green-300 hover:bg-green-300 rounded-md' onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
  )
}

export default AppointmentDetails