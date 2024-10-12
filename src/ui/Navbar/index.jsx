import "./module.css";
import logo from "@/assets/img/brand.png";

import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faPerson,
  faLayerGroup,
  faTag,
  faFile,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className='bg-darkPrimary custom-container'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='text-white text-2xl font-bold bg-primary rounded-[50%] p-2'>
              <a href='#'>
                <img src={logo} className='w-4' />
              </a>
            </div>
            <h1 className='text-white'>Management Information System</h1>
          </div>
          <div className='block md:hidden px-1'>
            <button id='menu-button' className='text-white focus:outline-none'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
            </button>
          </div>
          <div className='hidden md:flex gap-2'>
            <div className='text-white'>Hi, Admin</div>
            <div className='text-white'>|</div>
            <a href='#' className='text-white hover:text-gray-300'>
              Logout
            </a>
          </div>
        </div>
        <div
          id='mobile-menu'
          className={`md:hidden ${menuOpen ? "block" : "hidden"}`}
        >
          <div className='mobile-nav'>
            <Link to='/' className='mobile-nav-item'>
              Dashboard
            </Link>
            <Link to='/members' className='mobile-nav-item'>
              Members
            </Link>
            <Link to='/categories' className='mobile-nav-item'>
              Categories
            </Link>
            <Link to='/tags' className='mobile-nav-item'>
              Tags
            </Link>
            <Link to='/documents' className='mobile-nav-item'>
              Documents
            </Link>
            <Link to='/settings' className='mobile-nav-item'>
              Settings
            </Link>
          </div>
        </div>
      </nav>
      <nav className='nav '>
        <Link to='/' className='nav-item primary-shadow'>
          <FontAwesomeIcon icon={faChartSimple} /> Dashboard
        </Link>
        <Link to='/members' className='nav-item primary-shadow'>
          <FontAwesomeIcon icon={faPerson} /> Members
        </Link>
        <Link to='/categories' className='nav-item primary-shadow'>
          <FontAwesomeIcon icon={faLayerGroup} /> Categories
        </Link>
        <Link to='/tags' className='nav-item primary-shadow'>
          <FontAwesomeIcon icon={faTag} /> Tags
        </Link>
        <Link to='/documents' className='nav-item primary-shadow'>
          <FontAwesomeIcon icon={faFile} /> Documents
        </Link>
        <Link to='/settings' className='nav-item primary-shadow'>
          <FontAwesomeIcon icon={faGear} /> Settings
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
