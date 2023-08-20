import React from 'react'

const Registeruser = () => {
  return (
    <div>
      <Navbar/>
      <div className='md:h-screen md:justify-center flex items-center'>
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
          <form action="" className='border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label htmlFor="name" className='block text-gray-700 text-sm font-bold mb-2'>Full Name</label>
              <input type='text' placeholder='Name' name='name' className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> 
            </div>
            <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
              <input type='email' placeholder='email' name='email' className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
            </div>
            <div className='mb-6'>
              <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
              <input type='text' placeholder='password' name='password' className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> 
            </div>
            <div class="flex items-center justify-between">
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registeruser