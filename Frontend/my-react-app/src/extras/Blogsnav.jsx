import React from 'react'
import { useState, useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const Blogsnav = ({ onSelectCategory }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isClicked, setIsclicked] = useState("All")
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
        onSelectCategory(category);
        setIsclicked(category)
      }
  return (
    <nav className='flex items-center justify-center px-4 bg-green-200 sticky top-0 z-10'>
        {!isMobile && (
            <div className='hidden md:flex items-center space-x-7 '>
                <div className={`font-bold hover:text-black p-4 cursor-pointer ${isClicked === "Medicine" ? 'bg-green-400 text-black' : "text-green-600"}`} onClick={() => handleClick('Medicine')}>Medicine</div>
                <div className={`font-bold hover:text-black p-4 cursor-pointer ${isClicked === "Remedies" ? 'bg-green-400 text-black' : "text-green-600"}`} onClick={() => handleClick('Remedies')}>Remedies</div>
                <div className={`font-bold hover:text-black p-4 cursor-pointer ${isClicked === "Fitness" ? 'bg-green-400 text-black' : "text-green-600"}`} onClick={() => handleClick('Fitness')}>Fitness</div>
                <div className={`font-bold hover:text-black p-4 cursor-pointer ${isClicked === "Diet" ? 'bg-green-400 text-black' : "text-green-600"}`} onClick={() => handleClick('Diet')}>Diet</div>
                <div className={`font-bold hover:text-black p-4 cursor-pointer ${isClicked === "Diseases" ? 'bg-green-400 text-black' : "text-green-600"}`} onClick={() => handleClick('Diseases')}>Diseases</div>
                <div className={`font-bold hover:text-black p-4 cursor-pointer ${isClicked === "All" ? 'bg-green-400 text-black' : "text-green-600"}`} onClick={() => handleClick('All')}>All</div>
            </div>
      )}
    </nav>
  )
}

export default Blogsnav