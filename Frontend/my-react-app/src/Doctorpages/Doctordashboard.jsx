import React, { useEffect, useState } from 'react'
import { checkauthenticated, load_user, logout } from '../actions/auth';
import axios from 'axios'
import Navbar from '../DoctorComponents/Navbar';
import { connect } from 'react-redux';
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';


const Doctordashboard = ({isAuthenticated}) => {
    const [appointmentList , setAppointmentList] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(checkauthenticated())
        getDoctorData()
    },[])
    useEffect(()=>{
      console.log(appointmentList)
    },[appointmentList])
  
    const getDoctorData = async() =>{
    
    }
    if(!isAuthenticated){
        navigate('/doc/login')
      }
  return (
   <>
   <Navbar/>
    <div className='md:grid grid-cols-4 bg-green-100'>
        <div></div>
    </div>
   </>
  )
}

const mapStatetoProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatetoProps, {logout}, null,{checkauthenticated,load_user})(Doctordashboard);