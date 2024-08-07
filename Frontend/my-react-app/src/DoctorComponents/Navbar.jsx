import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { logout } from '../actions/auth'
import { Navigate, useNavigate, Link } from 'react-router-dom'

const Navbar = ({logout, isAuthenticated}) => {
    const NavLinks = () => {
        if(isAuthenticated){
            return(
              <div className='hidden md:flex items-center space-x-7'>
                {/* <Link 
                  to={'/blogs'}
                  onClick={() => handleNavItemClickForBackground("blogs")}
                >
                  <div className={`${activeNavItem === "blogs" ? 'bg-green-200 border-b-4 border-green-400' : ''} px-4 py-4 text-black cursor-pointer text-green-600 font-bold`}>Blogs</div>
                </Link>
                <Link 
                  to={'/dashboard'}
                  onClick={() => handleNavItemClickForBackground("dashboard")}
                >
                  <div className={`${activeNavItem === "dashboard" ? 'bg-green-200 border-b-4 border-green-400' : ''} px-4 py-4 text-black cursor-pointer text-green-600 font-bold`}>Dashboard</div>
                </Link>
                <Link 
                  to={'/appointmentbook'}
                  onClick={() => handleNavItemClickForBackground("book")}
                >
                  <div className={`${activeNavItem === "book" ? 'bg-green-200 border-b-4 border-green-400' : ''} px-4 py-4 text-black cursor-pointer text-green-600 font-bold`}>Book</div>
                </Link>
                <Link
                  onClick={() => handleNavItemClickForBackground("profile")}
                >
                  <div 
                    className={`${activeNavItem === "profile" ? 'bg-green-200 border-b-4 border-green-400' : ''} px-4 py-4 text-black cursor-pointer text-green-600 font-bold`}>Profile</div>
                </Link> */}
                <div className='px-4 py-4 cursor-pointer text-green-600 font-bold hover:bg-green-200 hover:border-b-4 hover:border-green-400' onClick={logout}>Logout</div>
                {/* <div className='hidden md:flex items-center space-x-2'>
                  <span className='text-black font-bold text-2xl text-green-300'>Welcome, User</span>
                </div> */}
              </div>
            )
          }else{
            return(
              
              <div className='hidden md:flex items-center space-x-2'>
                <Link to={'/'} className='font-bold mx-4 hover:text-green-500 cursor-pointer'>Home</Link>
                {/* <button className='mx-2 my-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleSignIn}>Sign In</button> */}
                {/* <button className='mx-2 my-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleRegisterclick}>Register</button> */}
              </div>
            )
          }
    }
  return (
    <div>
        <nav className='flex items-center justify-between'>
            <div className='ml-7 text-black font-bold text-4xl p-4'>Mediline</div>
            <div className='hidden md:flex w-80' />
            <div className='hidden md:flex w-80' />
            <div className='hidden md:flex w-80' />
            <NavLinks/>
        </nav>
    </div>
  )
}

const mapStatetoProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
  })
  export default connect(mapStatetoProps, {logout})(Navbar);