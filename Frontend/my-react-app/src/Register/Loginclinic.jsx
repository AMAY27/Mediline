import React from 'react'
import {connect, useDispatch} from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {docLogin} from '../actions/auth'
import { checkauthenticated, load_user } from '../actions/auth'
import { useEffect, useState } from 'react';
import './login.css'; 

const Loginclinic = ({docLogin, isAuthenticated}) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(checkauthenticated())
    //dispatch(load_user())
  },[])

  const[values,setValues] = useState({
    email:'',
    password:''
  })

  const navigate = useNavigate();
  //const [isAuthenticated, setisAuthenticated] = useState(false)
  const handleChange = (e) => {
    setValues(p=>({...p,[e.target.name] : e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()  
    docLogin(values.email,values.password);
  }

  if(isAuthenticated){
    navigate('/doc/dashboard')
  }
  return (
    <div>
      {/* <Navbar/> */}
      <div className='h-screen md:justify-center flex items-center flex-col' id='loginParentDiv'>
        <div className=''><h2 className='text-[3rem] font-bold'>Mediline</h2></div>
        <div className='bg-white border-2 border-green-500 rounded-xl p-4 w-full sm:w-[25%]'>
          {/* <div className='block md:justify-center md:flex md:items-center flex-col'>
            <div className='block m-2'>
              <button className="bg-white hover:bg-green-500 hover:text-white text-black border-2 border-green-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Google Sign In
              </button>
            </div>
            <div className='block m-3'>
              <p className='text-gray-500 font-bold'>------Or sign in with Email------</p>
            </div>
          </div> */}
          <div className='block'>
            <form action="" className='px-2 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor="email" className='block text-sm font-bold mb-2'>Email</label>
                <input
                 required='true'
                 type='email'
                 placeholder='email' 
                 name='email' 
                 onChange={handleChange}
                 className='bg-white shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
              </div>
              <div className='mb-6'>
                <label htmlFor="password" className='block text-sm font-bold mb-2'>Password</label>
                <input
                  required='true'
                  type='password'
                  placeholder='password'
                  name='password'
                  onChange={handleChange}
                  className='bg-white shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> 
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-white hover:bg-green-500 hover:text-white text-black border-2 border-green-300 font-bold py-2 px-4 rounded" type="submit">
                  Sign In
                </button>
                <p className="inline-block align-baseline font-bold text-sm hover:text-blue-800">
                  <Link to='/reset_password'>Forgot Password?</Link>
                </p>
              </div>
              <div className='flex items-center justify-between mt-2'>
                <p className="inline-block align-baseline font-bold text-sm hover:text-blue-800">
                  Don't have an account ? <Link to='/register'>Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStatetoProps = (state) =>({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatetoProps,{ docLogin },null,{checkauthenticated,load_user})(Loginclinic);