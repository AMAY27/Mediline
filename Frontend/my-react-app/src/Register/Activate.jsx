import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {verify} from '../actions/auth'

const Activate = ({verify}) => {
  const [verified, setVerified] = useState(false)
  const navigate = useNavigate();
  const routeParams = useParams()

  const handleverify = (e) => {
    const uid = routeParams.uid
    const token = routeParams.token
    verify(uid,token)
    setVerified(true)
  }

  if(verified){
    navigate('/')
  }
  return (
    <div>
      <div className='md:h-screen md:justify-center flex items-center flex-col'>
        <div className='block md:justify-center md:flex md:items-center flex-col'>
          <div className='block m-2'>
            <button 
                className="bg-white-500 hover:bg-green-500 text-black border-2 border-green-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="button"
                onClick={handleverify}
            >
              Verify your account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default connect(null,{verify})(Activate);
