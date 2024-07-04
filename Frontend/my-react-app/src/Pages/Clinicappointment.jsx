import React, { useEffect, useState } from 'react'
import Navbar from '../extras/Navbar'
import DatePicker from 'react-datepicker'
import { checkauthenticated, load_user, logout } from '../actions/auth';
import { useDispatch, connect } from 'react-redux';
import axios from 'axios'
import { getDetailsForBookingAppointments } from '../Services/api.services';
import { FaLocationDot } from "react-icons/fa6";
import Calendar from '../Components/Calendar';
//import { BACKEND_URL } from '../utils/constants';

const Clinicappointment = ({isAuthenticated}) => {
    const BACKEND_URL = import.meta.env.VITE_NODE_BACKEND_URL;
    const doctorid = localStorage.getItem('docid')
    const officeid = localStorage.getItem('clinicid')
    const uid = localStorage.getItem('userid')
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    // const [docspecialization, setDocspecialization] = useState([])
    const [specid, setSpecid] = useState([])
    const [availableWeekdays, setAvailableWeekdays] = useState([])
    const [selectableDates, setSelectableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedweekdayforappointment, setSelectedweekdayforappointment] = useState(null)
    const [availabilityData, setAvailabilitydata] = useState([])
    const [timeslotinput ,setTimeslotinput] = useState({
        morning : "",
        evening : ""
    })
    const [timeslot, setTimeslot] = useState(null)
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
    const [professionalDetails, setProfessionalDetails] = useState()

    useEffect(()=>{
        // dispatch(checkauthenticated())
        // dispatch(load_user())
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
        console.log(officeData);
    },[officeData])


    async function loadData(){
        const resp = await getDetailsForBookingAppointments(officeid, doctorid)
        console.log(resp);
        setOfficeData(resp.officeDetails)
        setProfessionalDetails(resp.professional_details)
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

    // async function loadSpeciddata(){
    //     const config = {
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept' : 'application/json'
    //         }
    //     }
    //     const res = await axios.get(`${BACKEND_URL}/api/docspec/?docid=${doctorid}`,config)
    //     console.log(res);
    //     setDocspecialization(res.data)

    // }

    const handleDateChange = date => {
        setSelectedDate(date);
        const selectedWeekday = date.getDay();
        setSelectedweekdayforappointment(selectedWeekday);
        console.log(selectedWeekday); 
        availabilityData.map((key,index)=>{
            if(parseInt(key.weekday)===selectedWeekday){
                setTimeslotinput({
                    morning : key.morning_slot,
                    evening : key.evening_slot
                })
            }
        })

      };
    
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

    // if(!isAuthenticated){
    //     navigate('/loginuser')
    //   }


  return (
    <div>
        <Navbar/>
        <div className='h-screen bg-green-100 md:grid md:grid-cols-3 gap-4 md:px-16 md:py-8'>
            <div className='md:col-span-1 shadow-xl rounded-xl bg-white h-fit p-4 space-y-4'>
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
            <div className='md:col-span-2 bg-white shadow-xl h-[80%] rounded-xl'>
                <Calendar availableWeekdays={availableWeekdays}/>
                <div className=''>
                    <h2 className='flex justify-center border-t-2 border-gray-200 pt-4'>Available Slots</h2>
                    <div className="flex justify-center space-x-2 mt-2">
                        <p className='p-2 border-2 border-green-500 rounded-md'>10:00 am</p>
                        <p className='p-2 border-2 border-green-500 rounded-md'>11:00 am</p>
                        <p className='p-2 border-2 border-green-500 rounded-md'>12:00 am</p>
                        <p className='p-2 border-2 border-green-500 rounded-md'>1:00 pm</p>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className='md:h-screen md:justify-center flex items-center flex-col'>
            <div className='md:w-2/3 h-auto md:h-auto border-2 border-green-300 grid grid-cols-4 py-12 px-6'>
                <div className='col-span-3'>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='mb-4 mx-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Enter Name</label>
                            <input 
                                type='text' 
                                placeholder='Patient Name' 
                                name='name' 
                                onChange={(e)=>setName(e.target.value)}
                                className='shadow appearance-none rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>  
                        <div className='mb-4 mx-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Select Date:</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                maxDate={selectableDates[selectableDates.length - 1]}
                                filterDate={(date)=>{
                                    const isSelectable = selectableDates.some((d) => {
                                        return (
                                          d.getDate() === date.getDate() &&
                                          d.getMonth() === date.getMonth() &&
                                          d.getFullYear() === date.getFullYear()
                                        );
                                      });
                                      return isSelectable;
                                }}
                                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div> 
                        <div className='mb-4 mx-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Time Slot</label>
                            <select name="timeslot"
                                onChange={(e)=>setTimeslot(e.target.value)}
                                className='shadow  appearance-none rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            >
                                <option value="">Click to select available slots</option>
                                {timeslotinput.morning && <option value={timeslotinput.morning}>Morning Slot : {timeslotinput.morning}</option>}
                                {timeslotinput.evening && <option value={timeslotinput.evening}>Evening Slot : {timeslotinput.evening}</option>}
                            </select>
                        </div>
                        <button
                                className={`mx-2 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                type='submit'
                            >
                                Complete Booking
                            </button>            
                    </form>
                </div> 
                <div className="col-span-1 bg-green-100 border-2 border-green-500 py-6 px-4">
                    <h1 className='font-bold flex justify-center items-center text-lg'>Specializations</h1>
                    <ul>
                        {docspecialization.map((ele,index)=>{
                            return(
                                <li key={index}>{ele.specialization_name}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>*/}
    </div>
  )
}
const mapStatetoProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated
  })

export default connect(mapStatetoProps, {logout}, null, {checkauthenticated,load_user}) (Clinicappointment)