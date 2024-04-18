import React from 'react'

const AppointmentDetails = ({appDetails, isOpen, onClose}) => {
    if(!isOpen) return null
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white rounded-lg relative z-50 space-y-8 w-4/5 h-4/5 overflow-auto'>
            <h2 className='text-xl'>Appointment Details</h2>
            <p>Date : {appDetails.appointment_date}</p>
            <button className='p-2 border-2 border-green-500' onClick={onClose}>Close</button>
        </div>
    </div>
  )
}

export default AppointmentDetails