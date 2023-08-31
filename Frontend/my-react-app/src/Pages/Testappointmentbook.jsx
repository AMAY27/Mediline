import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import Navbar from '../extras/Navbar';

const Testappointmentbook = () => {
    const [testcenterData , setTestcenterData] = useState({})
    const testcenterid = localStorage.getItem('testcenter_id')
    const user_id = localStorage.getItem('userid')
    const [selectedDate, setSelectedDate] = useState(null);
    const [testData, setTestdata] = useState([]);
    const [selectedTests, setSelectedTests] = useState([]);
    const [patientname, setPatientname] = useState('')
    const status = "active"



    useEffect(()=>{
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

    async function handleSubmit(){
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

  return (
    <div>
        <Navbar/>
        <div className='md:h-screen md:justify-center flex items-center flex-col'>
            <div className='md:w-3/4 h-auto md:h-auto bg-green-300 border-2 border-green-300 grid grid-cols-1 md:grid-cols-4 gap-4'>
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
        </div>
    </div>
  )
}

export default Testappointmentbook