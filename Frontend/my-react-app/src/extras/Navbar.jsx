import React from 'react';
import { useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { connect, useDispatch } from 'react-redux'
import { logout } from '../actions/auth'
import { Navigate, useNavigate, Link } from 'react-router-dom'

const Navbar = ({logout, isAuthenticated}) => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate('/loginuser')
  }
  const handleRegisterclick = ()=>{
    navigate('/register')
  }
    const GuestauthLinks = () =>{
      if(isAuthenticated){
        return(
          <div className='hidden md:flex items-center space-x-7'>
            <Link to={'/blogs'}><div className='text-black cursor-pointer hover:text-green-300 hover:font-bold'>Blogs</div></Link>
            <Link to={'/dashboard'}><div className='text-black cursor-pointer hover:text-green-300 hover:font-bold'>Dashboard</div></Link>
            <div className='text-black cursor-pointer hover:text-green-300 hover:font-bold'>Profile</div>
            <div className='text-black cursor-pointer hover:text-green-300 hover:font-bold' onClick={logout}>Logout</div>
            {/* <div className='hidden md:flex items-center space-x-2'>
              <span className='text-black font-bold text-2xl text-green-300'>Welcome, User</span>
            </div> */}
          </div>
        )
      }else{
        return(
          
          <div className='hidden md:flex items-center space-x-2'>
            <Link to={'/'} className='font-bold mx-4 hover:text-green-500 cursor-pointer'>Home</Link>
            <button className='mx-2 my-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleSignIn}>Sign In</button>
            <button className='mx-2 my-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleRegisterclick}>Register</button>
          </div>
        )
      }
    }
    // const handleLogout = () =>{
    //   logout();
    // }
    const [showMenu, setShowMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isClickedsignin, setIsclickedsignin] = useState(false);
    const [showSignop, setShowsignop] = useState(false);
    const Signop = ({ onClose }) =>{
      return (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='flex items-center grid grid-cols-1 bg-white border-2 border-green-300 rounded-lg w-56 h-56'>
            <h2 className='mx-2 my-2 font-bold text-2xl'>Sign In as: </h2>
            <button className="mx-2 my-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClick}>User</button>
            <button className="mx-2 my-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Clinic Manager</button>
            <button className='mt-4 text-black' onClick={onClose}>
                Close
              </button>
          </div>
        </div>
      )
    }
    const NavOverlay = ({ onClose }) => {
      if (isAuthenticated) {
        return (
          <div className='z-10 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
            <div className='bg-white p-4 rounded-lg'>
              <div className='text-black'>Dashboard</div>
              <div className='text-black'>Profile</div>
              <button className='mt-4 text-black' onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )
      }else{
        return (
          <div className='z-10 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
            <div className='bg-white p-4 rounded-lg'>
              <div className='text-black' onClick={handleClick}>Sign In</div>
              <div className="text-black" onClick={handleRegisterclick}>Register</div>
              <button className='mt-4 text-black' onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        );
      }
      };
      useEffect(() => {
        // Disable body scroll when the toggle menu is open
        if (showMenu) {
          disableBodyScroll(document.querySelector('#dashboard-user'));
        } else {
          enableBodyScroll(document.querySelector('#dashboard-user'));
        }
      }, [showMenu]);
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
          setShowMenu(false); // Close the overlay on resize for mobile
        };
    
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleSignIn = () =>{
    setIsclickedsignin(!isClickedsignin)
  }


  return (
    <nav className='flex items-center justify-between p-4'>
      <div className='ml-7 text-black font-bold text-4xl'>Mediline</div>
      <div className='hidden md:flex w-80' />
      <div className='hidden md:flex w-80' />
      <div className='hidden md:flex w-80' />

      {isMobile && (
        <div className='md:hidden cursor-pointer' onClick={handleMenuToggle}>
          <svg className='h-6 w-6 text-black' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
          </svg>
        </div>
      )}

      {!isMobile && (
        <GuestauthLinks/>
        // <div className='hidden md:flex items-center space-x-7'>
        //   <div className='text-black'>Dashboard</div>
        //   <div className='text-black'>Profile</div>
        //   <button className='text-black' onClick={handleSignIn}>Sign In</button>
        //   <button className='text-black'>Register</button>
        // </div>
      )}
      <div className='hidden md:flex w-8' />

      {/* User icon */}
      {/* <div className='hidden md:flex items-center space-x-2'>
        <span className='text-black font-bold text-2xl text-green-300'>Welcome, User</span>
        <div className='hidden md:flex items-center space-x-2'>
          <button className='text-black mx-1' onClick={logout}>Logout</button>
        </div>
      </div> */}

      {/* Show NavOverlay on small screens */}
      {showMenu && isMobile && <NavOverlay onClose={() => setShowMenu(false)} />}
      {isClickedsignin && <Signop onClose={()=>setIsclickedsignin(false)}/>}
    </nav>
  );
  
};
const mapStatetoProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStatetoProps, {logout})(Navbar);





