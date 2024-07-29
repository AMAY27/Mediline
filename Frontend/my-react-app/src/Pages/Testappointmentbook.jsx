import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { checkauthenticated, load_user, logout } from '../actions/auth';
import { useDispatch, connect } from 'react-redux';
import Navbar from '../extras/Navbar';
import { FaHospital } from "react-icons/fa";
import Calendar from '../Components/Calendar';
import { FaPlus } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";



const Testappointmentbook = ({isAuthenticated}) => {
    const [testcenterData , setTestcenterData] = useState({})
    const testcenterid = localStorage.getItem('testcenter_id')
    const dispatch = useDispatch()
    const user_id = localStorage.getItem('userid')
    const [selectedDate, setSelectedDate] = useState(null);
    const [testData, setTestdata] = useState([]);
    const [selectedTests, setSelectedTests] = useState([]);
    const [patientname, setPatientname] = useState('')
    const status = "active"



    useEffect(()=>{
        dispatch(checkauthenticated())
        dispatch(load_user())
        loadTestdata();
    },[])

    const toggleTestSelection = (testName, testCost) => {
        const newTest = {
            name : testName,
            cost : testCost,
        }
        if (selectedTests.find(test=>test.name === testName)) {
          setSelectedTests(selectedTests.filter(test => test.name !== testName));
        } else {
          setSelectedTests([...selectedTests, newTest]);
          console.log(selectedTests);
        }
      };
    
    const removeSelectedTest = (testName) => {
        setSelectedTests(selectedTests.filter(test => test.name !== testName));
    };

    const handleChange = (e)=>{
        e.preventDefault()
        setPatientname(e.target.value)
    }

    async function loadTestdata(){
        const config = {
            headers : {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            }
        }
        const res = await axios.get(`http://127.0.0.1:3000/testcenter/?centerid=${testcenterid}`,config)
        setTestcenterData(res.data.center)
        const testsdata = res.data.center.tests
        setTestdata(testsdata)
    }

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    async function handleSubmit(e){
        e.preventDefault();
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const body = JSON.stringify({
            test_names : selectedTests,
            patient_name : patientname,
            appointment_date : selectedDate,
            status : status,
            userid : user_id,
            center_id : testcenterid,
            cost : selectedTests.reduce((sum, test) => sum + test.cost, 0)
        })
        const res = await axios.post('http://localhost:3000/appointment/book',body,config)
        console.log(values);
    }

    const dateSelect = (selectedDateFromCalendar, selectedDay) =>{
        setTimeslot("")
        const formattedDate = format(selectedDateFromCalendar, "yyyy-MM-dd");
        setSelectedDate(selectedDateFromCalendar);

        // const bookedCount = bookedAppointments.reduce((acc, { appointment_date, time_slot }) => {
        //     if (appointment_date === formattedDate) {
        //         acc[time_slot] = (acc[time_slot] || 0) + 1;
        //     }
        //     return acc;
        // }, {});
    
        // const availableSlots = availabilityData
        //     .filter(elem => elem.weekday === selectedDay)
        //     .flatMap(elem => 
        //         elem.time_slots
        //             .filter(({ slot, max_patients }) => (bookedCount[slot] || 0) < max_patients)
        //             .map(({ slot }) => slot)
        //     );
    
        // setAvailableTimeSlots(availableSlots);
    }

    // if(!isAuthenticated){
    //     navigate('/loginuser')
    //   }

  return (
    <div>
        <Navbar/>
        <div className='mx-4 sm:mx-20 md:mx-30 my-4 sm:my-10'>
            <div className='pb-4 border-b-2 text-green-500 border-green-500'>
                <h2 className='text-lg sm:text-[2rem] md:text-[3rem] font-bols flex items-center'><FaHospital className='mr-2'/>{testcenterData.center_name}</h2>
            </div>
            <div className='md:grid grid-cols-3 pt-4'>
                <div className='md:col-span-1'>
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
                        <div className='p-2 border-2 rounded-xl mx-4'>
                            <div className="border-b-2">
                                <h2 className='text-lg text-gray-500 mx-4'>Select date</h2>
                            </div>
                            <Calendar availableWeekdays={[1,2,3,4,5]} dateClicked={dateSelect}/>
                        </div>
                    </form>
                </div>
                <div className='md:col-span-1'>
                    <div className='md:h-[70%] overflow-y-auto'>
                        <div className='flex justify-center mb-4'>
                            <h2 className='text-lg text-green-500'>Select Tests or diagnostics</h2>
                        </div>
                        {/* <input 
                            type="text" 
                            className='bg-gray-100 appearance-none rounded-lg sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-full mx-4' 
                            placeholder='Search for test and diagnostics' 
                            // onChange={handleSearchClinicChange}
                        /> */}
                        {testData.map((value) => {
                            return(
                                <div key={value.test_name} className='flex items-center justify-between p-4 mb-2 shadow-full rounded-xl'>
                                    <h2 className='mx-3 md:text-sm p-1 font-bold'>{value.test_name}</h2>
                                    <div className='flex items-center space-x-2'>
                                        <p>{value.cost}</p>
                                        <div 
                                            className={`p-1 rounded-full cursor-pointer ${selectedTests.find(test => test.name === value.test_name) ? 'bg-red-500' : 'bg-green-500'}`}
                                            onClick={() => toggleTestSelection(value.test_name, value.cost)}
                                        >
                                            {selectedTests.find(test => test.name === value.test_name) ? 
                                                <IoMdClose className='text-white text-xl'/> : 
                                                <FaPlus className='text-white text-xl'/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="md:col-span-1 px-4">
                    <div className="flex items-center justify-center mb-4">
                        <h2 className='text-lg text-green-500'>Booking Summary</h2>
                    </div>
                    {selectedTests.length !== 0 ? 
                        <>
                            {selectedTests.map((test,index) => (
                                <div key={index} className='flex items-center justify-between px-4 py-2 mb-2 shadow-full rounded-xl'>
                                    <h2>{test.name} : Rs.{test.cost}</h2>
                                    {/* <button 
                                        onClick={() => removeSelectedTest(test.name)}
                                        className='hover:bg-red-700 rounded-full cursor-pointer text-white font-bold p-1 bg-red-500'
                                    >
                                            <IoMdClose/>
                                    </button> */}
                                </div>
                            ))} 
                            <div className="flex justify-end font-bold text-lg text-green-500">
                                <p>Total Cost: {selectedTests.reduce((sum, test) => sum + test.cost, 0)}</p>   
                            </div>
                            <div>
                                <button
                                    className={`w-full mx-2 my-2 border-2 border-green-500 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded-md`}
                                    type='submit'
                                >
                                    Complete Booking
                                </button>
                                
                            </div>     
                        </>: 
                        <div className='p-4 bg-gray-100 rounded-xl'>
                            <h2 className='text-lg'>No Tests added</h2>
                        </div>
                    }
                </div>
            </div>
        </div>
        {/* <div className='md:h-screen md:justify-center flex items-center flex-col'>
            <div className='md:w-3/4 h-auto md:h-auto border-2 border-green-300 grid grid-cols-1 md:grid-cols-4 gap-4 py-12 px-6'>
                <div className='md:col-span-1'>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='mb-4 mx-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Enter Name</label>
                            <input 
                                type='text' 
                                placeholder='Patient Name' 
                                name='name' 
                                onChange={handleChange}
                                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>  
                        <div className='mb-4 mx-4'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Select Date:</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy/MM/dd"
                                minDate={new Date()}
                                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div> 
                        <button
                                className={`mx-2 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                type='submit'
                            >
                                Complete Booking
                            </button>            
                    </form>
                </div>
                <div className='md:col-span-1'>
                    <div>
                        <h2 className='font-bold text-md'>Selected Tests:</h2>
                        <ul>
                            {selectedTests.map((test,index) => (
                                <li key={index}>
                                    {test.name} : Rs.{test.cost}
                                    <button 
                                        onClick={() => removeSelectedTest(test.name)}
                                        className='mx-2 my-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  bg-red-500'
                                    >
                                            Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <p>Total Cost: {selectedTests.reduce((sum, test) => sum + test.cost, 0)}</p>
                    </div>
                </div>
                <div className='md:col-span-1 max-h-[auto] overflow-y-scroll'>
                {testData.map((value) => {
                    return(
                        <div key={value.test_name} className='border-2 border-green-300 shadow-md rounded'>
                            <h2 className='mx-3 md:text-sm p-1 font-bold'>{value.test_name} : Rs. {value.cost}</h2>
                            <button
                                className={`mx-2 my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${selectedTests.includes(value.test_name) ? 'bg-red-500' : ''}`}
                                onClick={() => toggleTestSelection(value.test_name, value.cost)}
                            >
                                {selectedTests.find(test => test.name === value.test_name) ? 'Remove' : 'Add to Booking'}
                            </button>
                        </div>
                    )
                })}
                </div>
            </div>
        </div> */}
    </div>
  )
}

const mapStatetoProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated
  })

export default connect(mapStatetoProps, {logout}, null, {checkauthenticated,load_user}) (Testappointmentbook)