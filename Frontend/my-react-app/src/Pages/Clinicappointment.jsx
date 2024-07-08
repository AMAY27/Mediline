import React, { useEffect, useState } from 'react'
import Navbar from '../extras/Navbar'
import DatePicker from 'react-datepicker'
import { checkauthenticated, load_user, logout } from '../actions/auth';
import { useDispatch, connect } from 'react-redux';
import axios from 'axios'
import { getDetailsForBookingAppointments } from '../Services/api.services';
import { FaLocationDot } from "react-icons/fa6";
import Calendar from '../Components/Calendar';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
//import { BACKEND_URL } from '../utils/constants';

const Clinicappointment = ({isAuthenticated}) => {
    const BACKEND_URL = import.meta.env.VITE_NODE_BACKEND_URL;
    const doctorid = localStorage.getItem('docid')
    const officeid = localStorage.getItem('clinicid')
    const uid = localStorage.getItem('userid')
    const dispatch = useDispatch()
    const [availableWeekdays, setAvailableWeekdays] = useState([])
    const [selectableDates, setSelectableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    // const [selectedweekdayforappointment, setSelectedweekdayforappointment] = useState(null)
    const [availabilityData, setAvailabilitydata] = useState([])
    const [timeslot, setTimeslot] = useState("")
    const [officeData, setOfficeData] = useState({
        _id:'',
        admin_docid :'',
        docname: '',
        officename:'',
        service_tags: [],
        address: '',
        pincode: '',
        inHouseDoctors:[]
    });
    const [professionalDetails, setProfessionalDetails] = useState();
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    useEffect(()=>{
        dispatch(checkauthenticated())
        dispatch(load_user())
        loadData();
    },[])

    useEffect(()=>{
        const currentDate = new Date();
        const endDate = new Date();
        endDate.setDate(currentDate.getDate() + 30);

        const selectable = [];
        while (currentDate <= endDate) {
            if (availableWeekdays.includes(currentDate.getDay())) {
                selectable.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setSelectableDates(selectable);
    },[availableWeekdays])

    useEffect(()=>{
        console.log(availableTimeSlots);
    },[availableTimeSlots])


    async function loadData(){
        const resp = await getDetailsForBookingAppointments(officeid, doctorid)
        console.log(resp);
        setOfficeData(resp.officeDetails)
        setProfessionalDetails(resp.professional_details)
        setBookedAppointments(resp.bookedAppointments)
        const arr = resp.availabilityDetails
        const result = []
        setAvailabilitydata(arr)
        arr.map(element => {
            result.push(element.weekday)
        });
        const weekdays  = result.map((str) => parseInt(str))
        setAvailableWeekdays(weekdays)
        console.log(weekdays);

    }

    const dateSelect = (selectedDateFromCalendar, selectedDay) =>{
        setTimeslot("")
        const formattedDate = format(selectedDateFromCalendar, "yyyy-MM-dd");
        setSelectedDate(selectedDateFromCalendar);

        const bookedCount = bookedAppointments.reduce((acc, { appointment_date, time_slot }) => {
            if (appointment_date === formattedDate) {
                acc[time_slot] = (acc[time_slot] || 0) + 1;
            }
            return acc;
        }, {});
    
        const availableSlots = availabilityData
            .filter(elem => elem.weekday === selectedDay)
            .flatMap(elem => 
                elem.time_slots
                    .filter(({ slot, max_patients }) => (bookedCount[slot] || 0) < max_patients)
                    .map(({ slot }) => slot)
            );
    
        setAvailableTimeSlots(availableSlots);
    }


    const handleSlotClicked = () => {

    }
    
    async function handleSubmit(e){
        e.preventDefault();
        const inputDate = new Date(selectedDate);
        const day = inputDate.getDate();
        const month = inputDate.getMonth() + 1;
        const year = inputDate.getFullYear();
        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        console.log(formattedDate);
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const body = JSON.stringify({
            uid : uid,
            clinicid : clinicid,
            docid : doctorid,
            appointment_status : "active",
            appointment_date : formattedDate,
            times_slot : timeslot
        })
        await axios.post(`${BACKEND_URL}/api/appointment/`,body,config)
    }

    if(!isAuthenticated){
        navigate('/loginuser')
      }


  return (
    <div>
        <Navbar/>
        <div className='h-auto lg:h-screen bg-green-100 lg:grid lg:grid-cols-3 gap-4 md:px-16 md:py-8'>
            <div className='md:col-span-1 shadow-xl bg-white h-fit p-4 space-y-4 mb-2'>
                <div>
                    <h2 className='md:text-2xl font-bold text-green-500'>Dr. {officeData.docname}</h2>
                    <p>{professionalDetails}</p>
                </div>
                <div className="flex space-x-2">
                    {officeData.service_tags && officeData.service_tags.length > 0 ? (
                        officeData.service_tags.map((service, index) => (
                            <p key={index} className='px-2 py-1 border-2 border-green-500 rounded-md'>{service}</p>
                        ))
                    ) : (
                        <p>No services available</p>
                    )}
                </div>
                <img src='assets/medical-5459631.svg' alt='med2' className='h-40'/>
                <div className='flex items-center space-x-2 bg-gray-100 rounded-md p-2'>
                    <FaLocationDot className='text-2xl text-red-500'/>
                    <div >
                        <p>{officeData.address}</p>
                        <p>{officeData.pincode}</p>
                    </div>
                </div>
            </div>
            <div className='lg:col-span-2 lg:grid grid-cols-4 bg-white shadow-xl lg:h-[80%] h-auto'>
                <div className="md:col-span-2 px-4 lg:py-8">
                    {/* <h2 className='flex justify-center text-lg font-bold text-green-500'>Book Consultation</h2> */}
                    <form action="">
                        <div className='mb-4 sm:mx-4'>
                            <label htmlFor="" className='block text-green-500 text-md font-bold mb-2'>Patient Name</label>
                            <input 
                                type='text' 
                                placeholder='Enter Patient Name' 
                                name='name' 
                                onChange={(e)=>setName(e.target.value)}
                                className='border-2 border-gray-200 appearance-none rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        <div className='mb-4 sm:mx-4'>
                            <label htmlFor="" className='block text-green-500 text-md font-bold mb-2'>Contact</label>
                            <input 
                                type='text' 
                                placeholder='Enter Contact Number' 
                                name='name' 
                                onChange={(e)=>setName(e.target.value)}
                                className='border-2 border-gray-200 appearance-none rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        <div className='md:hidden'>
                            <Calendar availableWeekdays={availableWeekdays} dateClicked={dateSelect}/>
                            <div className=''>
                                <h2 className='flex justify-center border-t-2 border-gray-200 pt-4'>Available Slots</h2>
                                <div className="flex justify-center space-x-2 mt-2 mb-4">
                                    {availableTimeSlots.length !==0 ? availableTimeSlots.map((slot) => (
                                        <p className={`${timeslot === slot && 'bg-green-500 text-white'}  p-2 border-2 border-green-500 rounded-md hover:bg-green-500 hover:text-white cursor-pointer`} onClick={()=>setTimeslot(slot)}>{slot}</p>
                                    )) : 
                                    (
                                        <p className='p-4 bg-gray-100 flex justify-center rounded-xl w-full mx-4'>No slots available for this date</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='border-2 border-gray-200 rounded bg-gray-100 p-2 sm:mx-4 mb-4'>
                            <p className='font-bold text-green-500'>Selected Date</p>
                            <p>{format(selectedDate, 'yyyy-MM-dd')}</p>
                            <p className='font-bold text-green-500'>Time Slot</p>
                            <p>{timeslot}</p>
                        </div>
                        <div className='mb-4 sm:mx-4'>
                            <button className='flex items-center justify-center border-2 border-green-500 hover:bg-green-500 hover:text-white p-2 rounded w-full' type='submit'>Book Appointment</button>
                        </div>
                    </form>
                </div>
                <div className='hidden md:block md:col-span-2 pt-4'>
                    <Calendar availableWeekdays={availableWeekdays} dateClicked={dateSelect}/>
                    <div className=''>
                        <h2 className='flex justify-center border-t-2 border-gray-200 pt-4'>Available Slots</h2>
                        <div className="flex justify-center space-x-2 mt-2">
                            {availableTimeSlots.length !==0 ? availableTimeSlots.map((slot) => (
                                <p className={`${timeslot === slot && 'bg-green-500 text-white'}  p-2 border-2 border-green-500 rounded-md hover:bg-green-500 hover:text-white cursor-pointer`} onClick={()=>setTimeslot(slot)}>{slot}</p>
                            )) : 
                            (
                                <p className='p-4 bg-gray-100 flex justify-center rounded-xl w-full mx-4'>No slots available for this date</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
const mapStatetoProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated
  })

export default connect(mapStatetoProps, {logout}, null, {checkauthenticated,load_user}) (Clinicappointment)