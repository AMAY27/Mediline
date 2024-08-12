import React, { useState } from 'react'; 
import Navbar from '../DoctorComponents/Navbar'
import { IoMdAdd, IoMdClose  } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";


const Appointment = () => {
    const [showMiniDiv, setShowMiniDiv] = useState(false);
    const [prescriptionType, setPrescriptionType] = useState("")
    const [medicationList, setMedicationList] = useState([])
    const [testList, setTestList] = useState([])
    const [medicationDetails, setMedicationDetails] = useState({
        name : "",
    })
    const [testName, setTestName] = useState("")
    const [isAddButtonClicked, setIsAddButtonClicked] = useState(false)

    const handleMedicationChange = (e) => {
        setMedicationDetails(p => ({...p, [e.target.name] : e.target.value}))
    }

    const handleTestChange = (e) => {
        setTestName(e.target.value)
    }

    const addMedication = (e) => {
        e.preventDefault()
        setIsAddButtonClicked(true)
        const isMedicationAlreadyAdded = medicationList.some(
            (medication) => medication.name === medicationDetails.name
        );
        if (isMedicationAlreadyAdded) {
            alert("Medication already added");
        } else {
            setMedicationList([...medicationList, medicationDetails]);
        }
        setMedicationDetails({name : ""})
        setIsAddButtonClicked(false)
    }

    const addTest = (e) => {
        e.preventDefault()
        setIsAddButtonClicked(true)
        const isTestAlreadyAdded = testList.some(
            (test) => test === testName
        );
        if (isTestAlreadyAdded) {
            alert("Test already added");
        } else {
            setTestList([...testList, testName]);
        }
        setTestName("")
        setIsAddButtonClicked(false)
    }


    const toggleMiniDiv = () => {
      setShowMiniDiv(!showMiniDiv);
    };

    const handlePrescriptionTypeToggle = (type) => {
        setPrescriptionType(type)
        setShowMiniDiv(!showMiniDiv);
    }
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
                <div className='md:col-span-2 bg-white rounded-xl relative'>
                    <div className='flex justify-between items-center p-8 border-b-2 border-green-600'>
                        <h2 className='text-2xl text-green-600 font-bold'>Test office for Doctor One</h2>
                        <div>
                            <h2 className='text-xl text-green-600 font-bold'>Digital Prescriptions</h2>
                            <p>By Mediline</p>
                        </div>
                    </div>
                    <div className='flex justify-end px-8 py-4 relative'>
                        <IoMdAdd 
                            className='bg-green-600 shadow-full text-white p-1 text-3xl cursor-pointer rounded-full'
                            onClick={toggleMiniDiv}
                        />
                        {showMiniDiv && (
                            <div className='absolute top-full right-0 border-2 border-green-600 bg-white shadow-full p-4 rounded-md w-64 z-10'>
                              <ul>
                                <li 
                                    className='cursor-pointer hover:bg-green-100 p-2 rounded' 
                                    onClick={()=>handlePrescriptionTypeToggle("medication")}
                                >
                                        Medication
                                    </li>
                                <li 
                                    className='cursor-pointer hover:bg-green-100 p-2 rounded'
                                    onClick={()=>handlePrescriptionTypeToggle("test")}
                                >
                                        Test and diagnostics
                                    </li>
                              </ul>
                            </div>
                        )}
                    </div>
                    {prescriptionType === "medication" && (
                        <div>
                            <div className='p-4 bg-gray-100 shadow-full'>
                                <div className="flex justify-between items-center">
                                    <h2 className='text-green-600 font-bold text-xl'>
                                        Add Medication
                                    </h2>
                                    <IoMdClose 
                                        className='text-2xl text-gray-400 cursor-pointer rounded-full'
                                        onClick={() => setPrescriptionType("")}
                                    />
                                </div>
                                <form action="" className='mt-2' onSubmit={addMedication}>
                                    <div>
                                        <label htmlFor="">Medication Name</label>
                                        <input
                                            name='name' 
                                            type="text"
                                            className='ml-2 p-2 bg-white shadow-full rounded-xl' 
                                            placeholder='medication'
                                            onChange={handleMedicationChange}
                                            required = "true"
                                            value={medicationDetails.name}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button 
                                            className='bg-transparent hover:bg-green-600 hover:text-white border-2 border-green-600 rounded-xl shadow-full p-2'
                                            type='submit'
                                            disabled={isAddButtonClicked}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {prescriptionType === "test" && (
                        <div>
                            <div className='p-4 bg-gray-100 shadow-full'>
                                <div className="flex justify-between items-center">
                                    <h2 className='text-green-600 font-bold text-xl'>
                                        Add Test and diagnosotics
                                    </h2>
                                    <IoMdClose 
                                        className='text-2xl text-gray-400 cursor-pointer rounded-full'
                                        onClick={() => setPrescriptionType("")}
                                    />
                                </div>
                                <form action="" className='mt-2' onSubmit={addTest}>
                                    <div>
                                        <label htmlFor="">Test Name</label>
                                        <input 
                                            type="text"
                                            className='ml-2 p-2 bg-white shadow-full rounded-xl' 
                                            placeholder='test and diagnostics'
                                            required='true'
                                            value={testName}
                                            onChange={handleTestChange}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button 
                                            className='bg-transparent hover:bg-green-600 hover:text-white border-2 border-green-600 rounded-xl shadow-full p-2'
                                            type='submit'
                                        >
                                            Add
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    <div className='m-4'>
                        <h2
                            className='text-green-600 font-bold text-xl'
                        >
                            Prescribed Medications
                        </h2>
                        {medicationList.map((medication)=> (
                            <div className='bg-gray-100 p-2 shadow-full mx-6 my-4 flex justify-between rounded-xl'>
                                <h2>{medication.name}</h2>
                                <MdDeleteOutline className='text-2xl p-1 cursor-pointer rounded-full bg-green-500 text-white'/>
                            </div>
                        ))}
                    </div>
                    <div className='m-4'>
                        <h2
                            className='text-green-600 font-bold text-xl'
                        >
                            Prescribed Tests and Diagnostics
                        </h2>
                        {testList.map((test)=> (
                            <div className='bg-gray-100 p-2 shadow-full mx-6 my-4 flex justify-between rounded-xl'>
                                <h2>{test}</h2>
                                <MdDeleteOutline className='text-2xl p-1 cursor-pointer rounded-full bg-green-500 text-white'/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Appointment