import React from 'react'
import { useState, useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const Blogsnav = ({ onSelectCategory }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
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

      const handleClick = (category) =>{
        onSelectCategory(category)
      }
  return (
    <nav className='flex items-center justify-center p-4 bg-green-200'>
        {!isMobile && (
            <div className='hidden md:flex items-center space-x-7 '>
                <div className='text-green-600 font-bold hover:text-black' onClick={() => handleClick('Medicine')}>Medicine</div>
                <div className='text-green-600 font-bold hover:text-black' onClick={() => handleClick('Remedies')}>Remedies</div>
                <div className='text-green-600 font-bold hover:text-black' onClick={() => handleClick('Fitness')}>Fitness</div>
                <div className='text-green-600 font-bold hover:text-black' onClick={() => handleClick('Diet')}>Diet</div>
                <div className="text-green-600 font-bold hover:text-black" onClick={() => handleClick('Diseases')}>Diseases</div>
                <div className="text-green-600 font-bold hover:text-black" onClick={() => handleClick('All')}>All</div>
            </div>
      )}
    </nav>
  )
}

export default Blogsnav