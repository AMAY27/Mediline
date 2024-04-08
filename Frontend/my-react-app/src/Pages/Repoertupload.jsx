import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../extras/Navbar'
//import { BACKEND_URL } from '../utils/constants'

const Repoertupload = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
    const uid = localStorage.getItem('userid')
    const [values, setValues] = useState({
        type:'',
        name:'',
        details:'',
    })
    const [file, setFile] = useState(null)

    const handleChange = (e)=>{
        e.preventDefault()
        setValues(p=>({...p,[e.target.name] : e.target.value}))
    }

    const handleFileChange = (e) =>{
        e.preventDefault()
        setFile(e.target.files[0])
    }

    async function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append('type', JSON.stringify(values.type));
        formData.append('doc_name', JSON.stringify(values.name));
        formData.append('details', JSON.stringify(values.details));
        formData.append('uid', uid);
        formData.append(
            "pdf",
            file,
            file.name
        );
        const config = {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        }
        try {
            const res = await axios.post(`${BACKEND_URL}/api/files/`,formData,config)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        //console.log('Form Submitted');
    }
  return (
    <>
    <Navbar/>
    <div className='mt-24 mx-44'>
      <div className='flex justify-center items-center mb-12'>
        <h2 className='text-2xl font-bold'>Upload your reports</h2>
      </div>
        <form action="" onSubmit={handleSubmit} className='border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label htmlFor="type" className='block text-gray-700 text-sm font-bold mb-2'>Report Type</label>
              <input type='text' placeholder='File Type' name='type' onChange={handleChange} className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> 
            </div>
            <div className='mb-4'>
              <label htmlFor="name" className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
              <input type='text' placeholder='name' name='name' onChange={handleChange} className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
            </div>
            <div className='mb-6'>
              <label htmlFor="details" className='block text-gray-700 text-sm font-bold mb-2'>Details</label>
              <input type='text' placeholder='Enter details' name='details' onChange={handleChange} className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> 
            </div>
            <div className='mb-6'>
              <label htmlFor="file" className='block text-gray-700 text-sm font-bold mb-2'>Upload File</label>
              <input type='file' placeholder='Upload' name='file' onChange={handleFileChange} className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> 
            </div>
            <div class="flex items-center justify-between">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Submit
              </button>
              <p className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-blue-800">
                <Link to='/loginuser'>Already Have an account ? Log In</Link>
              </p>
            </div>
          </form>
    </div>
    </>
  )
}

export default Repoertupload