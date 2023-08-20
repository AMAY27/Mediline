import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {connect, useDispatch} from 'react-redux'
import {reset_password_confirm} from '../actions/auth'

const Resetpassconfirm = ({match, reset_password_confirm}) => {
  const [requestSent, setRequestSent] = useState(false)
  const routeParams = useParams()
  const[values,setValues] = useState({
    new_pass: '',
    re_new_pass: ''
  })

  const navigate = useNavigate();
  //const [isAuthenticated, setisAuthenticated] = useState(false)
  const handleChange = (e) => {
    setValues(p=>({...p,[e.target.name] : e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()  
    const uid = routeParams.uid
    const token = routeParams.token
    reset_password_confirm(uid, token, values.new_pass, values.re_new_pass);
    setRequestSent(true)
  }

  if(requestSent){
    navigate('/loginuser')
  }
  return (
    <div>
      <div className='md:h-screen md:justify-center flex items-center flex-col'>
        <div className='block md:justify-center md:flex md:items-center flex-col'>
          <div className='block m-2'>
            <h2>Reset Password Request</h2>
          </div>
        </div>
        <div className='block'>
          <form action="" className='border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
              <input
                type='text'
                placeholder='New password'
                name='new_pass'
                onChange={handleChange}
                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> 
            </div>
            <div className='mb-6'>
              <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
              <input
                type='text'
                placeholder='Confirm new password'
                name='re_new_pass'
                onChange={handleChange}
                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> 
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default connect(null, {reset_password_confirm})(Resetpassconfirm)