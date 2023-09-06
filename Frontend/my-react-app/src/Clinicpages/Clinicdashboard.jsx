import axios from 'axios'
import React, { useEffect } from 'react'

const Clinicdashboard = () => {

    async function getClinicappointmentdata(){
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const res = await axios.get('http://127.0.0.1:8000/api/clinicappointments/?clinicid=1&date=2023-08-27')
    }

  return (
    <div></div>
  )
}

export default Clinicdashboard