import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { logout } from '../actions/auth'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { MdDashboard } from "react-icons/md";



const Navbar = ({logout, isAuthenticated}) => {
    const [isMenuClicked, setIsMenuClicked] = useState(false)
    const handleMenuClose = () => {
        setIsMenuClicked(false)
    }
    const handleMenuOpen = () => {
        setIsMenuClicked(true)
    }
    const SideNavForMobile = () => {
        if(!isMenuClicked){
            return null
        }
        return (
            <div className='z-20 h-screen'>
                <div className='z-30 h-full inset-0'>
                    <div className='bg-green-200 h-full p-4'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-green-600 font-bold text-4xl'>Mediline</h2>
                            <IoMdClose onClick={handleMenuClose} className='text-2xl text-gray-500'/>
                        </div>
                        <div className='text-xl m-4 text-green-600 space-y-2'>
                            <div className="flex items-center space-x-2">
                                <MdDashboard/>
                                <h2>Dashboard</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
    const NavLinks = () => {
        if(isAuthenticated){
            return(
              <div className='hidden md:flex items-center space-x-7'>
                <div className='px-4 py-4 cursor-pointer text-green-600 font-bold hover:bg-green-200 hover:border-b-4 hover:border-green-400' onClick={logout}>Logout</div>
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
        <SideNavForMobile/>
        <nav className='flex items-center justify-between'>
            <div className='ml-4 md:ml-7 text-black font-bold text-4xl p-4'>Mediline</div>
            <NavLinks/>
            <div className='md:hidden cursor-pointer mr-7' onClick={handleMenuOpen}>
                <svg className='h-6 w-6 text-black' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
                </svg>
            </div>
        </nav>
    </div>
  )
}

const mapStatetoProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
  })
  export default connect(mapStatetoProps, {logout})(Navbar);