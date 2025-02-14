import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import "../styles/styles.css";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-[#052F35] border-[3px] border-[#197686] h-[76px] rounded-2xl flex justify-between items-center px-6 md:px-10">
        
        {/* Left: Logo & My Tickets Button in Mobile */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <NavLink to='/'>
            <img src={logo} alt="Logo" className="h-[40px] md:h-[50px]" />
          </NavLink>

          {/* My Tickets Button (Visible in Mobile & Desktop) */}
          <NavLink to='/ticket' className="md:hidden">
            <button className="w-[130px] h-[40px] bg-white rounded-xl text-[14px]">
              My Tickets →
            </button>
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-[JejuMyeongjo] text-[#B3B3B3]">
          <NavLink to="/" className="hover:text-white text-[18px]">Events</NavLink>
          <NavLink to="/ticket" className="hover:text-white text-[18px]">My Tickets</NavLink>
          <NavLink to="/about" className="hover:text-white text-[18px]">About Project</NavLink>
        </ul>

        {/* My Tickets Button (Desktop Only) */}
        <NavLink to='/ticket' className="hidden md:block">
          <button className="w-[169px] h-[52px] bg-white rounded-xl text-[16px]">
            My Tickets →
          </button>
        </NavLink>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white text-2xl">
          ☰
        </button>
      </nav>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#052F35] border-t border-[#197686] shadow-md flex flex-col items-center gap-4 py-4">
          <NavLink to="/" className="text-white text-lg" onClick={() => setIsOpen(false)}>Events</NavLink>
          <NavLink to="/ticket" className="text-white text-lg" onClick={() => setIsOpen(false)}>My Tickets</NavLink>
          <NavLink to="/about" className="text-white text-lg" onClick={() => setIsOpen(false)}>About Project</NavLink>
        </div>
      )}
    </>
  );
};

export default Menu;
