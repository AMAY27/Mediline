import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {signup} from '../actions/auth'

const Registeruser = ({signup}) => {
  const [userCreated, setuserCreated] = useState(false)
  const navigate = useNavigate()
  const [values , setValues] = useState({
    name:'',
    email:'',
    password:'',
    re_password:''
  })
  const handleChange = (e) => {
    setValues(p=>({...p,[e.target.name] : e.target.value}))
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    if(values.password === values.re_password){
      console.log('submittingb form data');
      signup(values.name,values.email,values.password, values.re_password)
      setuserCreated(true)
    }
  }
  if(userCreated){
    navigate('/loginuser')
  }
  return (
    <div>
      <div className='md:h-screen md:justify-center flex items-center flex-col'>
        <div className='block md:justify-center md:flex md:items-center flex-col'>
          <div className='block m-2'>
            <button className="bg-white-500 hover:bg-green-500 text-black border-2 border-green-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Register with Google
            </button>
          </div>
          <div className='block m-3'>
            <p className='text-gray-500'>------Or Create account with Email------</p>
          </div>
        </div>
        <div>
          <form action="" onSubmit={handleSubmit} className='border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label htmlFor="name" className='block text-gray-700 text-sm font-bold mb-2'>Full Name</label>
              <input type='text' placeholder='Name' name='name' onChange={handleChange} className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> 
            </div>
            <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
              <input type='email' placeholder='email' name='email' onChange={handleChange} className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
            </div>
            <div className='mb-6'>
              <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
              <input type='text' placeholder='password' name='password' onChange={handleChange} className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> 
            </div>
            <div className='mb-6'>
              <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Confirm Password</label>
              <input type='text' placeholder='retype password' name='re_password' onChange={handleChange} className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> 
            </div>
            <div class="flex items-center justify-between">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Register
              </button>
              <p className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-blue-800">
                <Link to='/loginuser'>Already Have an account ? Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default connect(null, {signup})(Registeruser)