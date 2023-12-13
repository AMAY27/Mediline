import React from 'react'

const Login = () => {


    const handleChange = (e) => {
        setValues(p=>({...p,[e.target.name] : e.target.value}))
    }
  return (
    <div className='md:h-screen md:justify-center flex items-center flex-col'>
        <div className='block md:justify-center md:flex md:items-center flex-col'>
        <div className='block'>
          <form action="" className='border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
              <input
               type='email'
               placeholder='email' 
               name='email' 
               onChange={handleChange}
               className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
            </div>
            <div className='mb-6'>
              <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
              <input
                type='text'
                placeholder='password'
                name='password'
                onChange={handleChange}
                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/> 
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign In
              </button>
              <p className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-blue-800">
                <Link to='/reset_password'>Forgot Password?</Link>
              </p>
            </div>
          </form>
        </div>
        </div>
    </div>
  )
}

export default Login