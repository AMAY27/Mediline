import React from 'react'
import Navbar from '../extras/Navbar'
import { Navigate, useNavigate, Link } from 'react-router-dom'

const Home = () => {
  
  return (
    <>
    <Navbar/>
      <div className='login-parent grid grid-cols-1 md:grid-rows-2 md:grid-cols-5 gap-4 md:m-10'>
        <div className='md:justify-center flex items-center rounded-lg mt-5 mx-7 h-40 bg-green-300 ... p-1 md:w-140 md:mx-5 md:mt-6'><h1 className='text-xl font-bold'>Discounts</h1></div>
        <div className='md:justify-center flex items-center rounded-lg mt-7 mx-7 h-100 row-start-1 md:row-span-2 border-2 border-green-300 ... p-1 md:w-140 md:mx-5 md:col-span-2 md:mt-6 '
          style={{
            backgroundImage: "url('src/assets/medical-5459632.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <p className='text-2xl md:text-4xl text-black font-bold'>ALL<br/> your medical needs<br/>At one place.</p>
        </div>
        <div className='md:justify-center flex items-center rounded-lg mt-5 mx-7 bg-green-300 ... p-1 md:w-140 md:mx-5 md:mt-6'><h1 className='text-xl font-bold'>Pharmacy</h1></div>
        <div className='md:justify-center flex items-center rounded-lg mt-5 mx-7 bg-green-300 ... p-1 md:w-140 md:mx-5 md:mt-6'><h1 className='text-xl font-bold'>Tests and Diagnosis</h1></div>
        <div className='md:justify-center flex items-center rounded-lg mt-5 mx-7 bg-green-300 ... p-1 md:w-140 md:mx-5 md:mt-6'><h1 className='text-xl font-bold'>Reports</h1></div>
        <div className='md:justify-center flex items-center rounded-lg mt-5 mx-7 bg-green-300 ... p-1 md:w-140 md:mx-5 md:mt-6'><h1 className='text-xl font-bold'>Health subscriptions</h1></div>
        <div className='md:justify-center flex items-center rounded-lg mt-5 mx-7 bg-green-300 ... p-1 md:w-140 md:mx-5  md:h-40 '><h1 className='text-xl font-bold'>Fitness</h1></div>
      </div>
      <div className='md:h-76 md:my-20 '>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div className='md:flex md:justify-center bg-green-300 place-content-center'
            style={{
              backgroundImage: "url('src/assets/medical-5459661.svg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className='bg-green md:m-10'>
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