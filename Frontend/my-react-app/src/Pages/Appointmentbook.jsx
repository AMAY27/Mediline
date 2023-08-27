import React from 'react'
import { useState } from 'react';
import DatePicker from 'react-datepicker';

const Appointmentbook = () => {
  const timeSlots = ['Select','9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm'];
  const appointmenttype = ['Select','Test', 'Consultation', 'Health Checkup']
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(timeSlots[0]);
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleTimeSlotChange = event => {
    setSelectedTimeSlot(event.target.value);
  };
  return (
    <div>
      <div className='md:h-screen md:justify-center flex items-center flex-col'>
        <div>
          <form action="" className='border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4'>
          <div className=' mb-6 bg-green-300 absolute top-0 left-0 inset-x-0 w-full rounded-t-lg'><h1 className='text-2xl md:text-2xl p-2'>Book an Appointment</h1></div>
                        <div className='mb-4 mt-10'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Appointment for:</label>
                            <select name="appointmenttype"
                                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            >
                                {appointmenttype.map(type =>(
                                    <option value={type} key={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Enter Email</label>
                            <input type='email' placeholder='email' name='email' className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Enter Full Name</label>
                            <input type='text' placeholder='name' name='name' className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Select Date:</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy/MM/dd"
                                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Select Time Slot:</label>
                            <select
                                name='timeSlot'
                                onChange={handleTimeSlotChange}
                                value={selectedTimeSlot}
                                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            >
                                {timeSlots.map(slot => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Appointmentbook