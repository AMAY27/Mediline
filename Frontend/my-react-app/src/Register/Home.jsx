import React from 'react'
import Navbar from '../extras/Navbar'
import { Navigate, useNavigate, Link } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  const handleHeroDivsClick = (path) => {
    navigate(`/${path}`)
  }
  
  return (
    <>
    <Navbar/>
      <div className='md:mx-16 mt-8 mb-16 space-y-8'>
        <p className='text-2xl md:text-[3rem] text-green-500 font-bold opacity-100'>All your healthcare needs </p>
        <p className='text-2xl md:text-[3rem] text-green-500 font-bold opacity-100'>at one place</p>
      </div>
      <div className='login-parent grid grid-cols-1 md:grid-rows-2 md:grid-cols-5 gap-4 md:my-4 md:mx-10 h-svh'>
        <div className='md:justify-center flex items-center rounded-lg mt-5 mx-7 h-40 bg-white-300 ... p-1 md:w-140 md:mx-5 md:mt-6 border-2 border-green-300 hover:bg-green-300'><h1 className='text-xl text-green-700 font-bold'>Discounts</h1></div>
        <div className='md:justify-center flex items-center rounded-lg mt-7 mx-7 h-100 row-start-1 md:row-span-2 border-2 border-green-300 ... p-1 md:w-140 md:mx-5 md:col-span-2 md:mt-6 '
          style={{
            backgroundImage: "url('public/assets/medical-5459632.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </div>
        <div className='md:justify-center flex items-center rounded-lg mt-5 mx-7 bg-white-300 ... p-1 md:w-140 md:mx-5 md:mt-6 border-2 border-green-300 hover:bg-green-300'><h1 className='text-xl font-bold text-green-700'>Pharmacy</h1></div>
        <div onClick={()=>handleHeroDivsClick("appointmentbook")} className='md:justify-center flex items-center rounded-lg mt-5 mx-7 bg-white-300 cursor-pointer p-1 md:w-140 md:mx-5 md:mt-6 border-2 border-green-300 hover:bg-green-300'><h1 className='text-xl font-bold text-green-700'>Tests and Diagnosis</h1></div>
        <div className='md:justify-center flex items-center rounded-lg mt-5 mx-7 bg-white-300 ... p-1 md:w-140 md:mx-5 md:mt-6 border-2 border-green-300 hover:bg-green-300'><h1 className='text-xl font-bold text-green-700'>Reports</h1></div>
        <div className='md:justify-center flex items-center rounded-lg mt-5 mx-7 bg-white-300 ... p-1 md:w-140 md:mx-5 md:mt-6 border-2 border-green-300 hover:bg-green-300'><h1 className='text-xl font-bold text-green-700'>Health subscriptions</h1></div>
        <div onClick={()=>handleHeroDivsClick("blogs")} className='md:justify-center flex items-center rounded-lg mt-5 mx-7 bg-white-300 cursor-pointer p-1 md:w-140 md:mx-5  md:h-40 border-2 border-green-300 hover:bg-green-300'><h1 className='text-xl font-bold text-green-700'>Blogs</h1></div>
      </div>
      <div className='md:h-76 md:my-20 '>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div className='md:flex md:justify-center bg-green-300 place-content-center rounded-2xl mx-10'
            style={{
              backgroundImage: "url('public/assets/medical-5459661.svg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
          </div>
          <div className='bg-green md:m-10'>
            <div className='flex items-center justify-content mb-4'>
              <h2 className='text-3xl font-bold text-green-500'>Revolutionize Healthcare with Mediline</h2>
            </div>
            <p>
            A medical delivery and doctor booking application is a comprehensive platform that aims to revolutionize healthcare 
            accessibility and convenience for users. With this app, patients can easily schedule appointments with healthcare 
            professionals of their choice, eliminating the hassle of long waiting times and ensuring timely access to medical care. 
            The doctor booking feature allows users to browse through a diverse directory of qualified doctors, view their profiles, 
            and read reviews from other patients, empowering them to make informed decisions about their healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home