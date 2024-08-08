import React from 'react'
import Navbar from '../DoctorComponents/Navbar'

const Appointment = () => {
  return (
    <>
        <Navbar/>
        <div>
            <div className='md:grid grid-cols-4 bg-green-100 h-auto md:h-screen md:px-20 md:pt-10 gap-4'>
                <div className='md:col-span-2'>
                    <div className="mb-4">
                        <h2 className='text-lg text-green-600 font-bold'>Patient Name</h2>
                        <p className='text-2xl text-green-600'>User One</p>
                    </div>
                    <div className='pt-2 border-t-2 border-green-600'>
                        <label htmlFor="" className='text-green-600 font-bold text-2xl'>Diagnostics</label>
                        <div className='w-100'>
                            <textarea
                                className='mt-4 rounded-md shadow-full border-gray-100 border-2 w-full h-60 p-4'
                                placeholder='Patient diagnostics'
                            />
                        </div>
                    </div>
                </div>
                <div className='md:col-span-2 bg-white rounded-xl'>
                    <div className='flex justify-between items-center p-8 border-b-2 border-green-600'>
                        <h2 className='text-2xl text-green-600 font-bold'>Test office for Doctor One</h2>
                        <div>
                            <h2 className='text-xl text-green-600 font-bold'>Digital Prescriptions</h2>
                            <p>By Mediline</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Appointment