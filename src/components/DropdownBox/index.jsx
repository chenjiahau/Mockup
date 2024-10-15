import "./module.css";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const DropdownBox = ({ options, onClick, isColor, zIndex }) => {
  isColor = isColor || false;
  zIndex = zIndex || 10;

  const dropdownRef = useRef(null);
  const activeOption = options.find((option) => option.active);
  const [isOpen, setIsOpen] = useState(false);

  const buttonStyle = {
    backgroundColor: isColor ? activeOption.hashCode : "",
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onClick(option);
    setIsOpen(false);
    dropdownRef.current.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='dropdown-box' ref={dropdownRef}>
      <button className='dropdown-button' style={{ ...buttonStyle }}>
        <div className='title' onClick={handleButtonClick}>
          {activeOption.label}
        </div>
        <div className='icon' onClick={handleButtonClick}>
          {isOpen ? (
            <svg
              className='w-5 h-5 ml-2 -mr-1 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          ) : (
            <svg
              className='w-5 h-5 ml-2 -mr-1 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 15l7-7 7 7'
              />
            </svg>
          )}
        </div>
      </button>
      {isOpen && (
        <div className='dropdown-content' style={{ zIndex }}>
          {options.map((option, index) => {
            const optionStyle = {
              backgroundColor: isColor ? option.hashCode : "",
            };

            return (
              <div
                key={index}
                className={`option ${option.active ? "active" : ""}`}
                style={{ ...optionStyle }}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

DropdownBox.propTypes = {
  options: PropTypes.array,
  onClick: PropTypes.func,
  isColor: PropTypes.bool,
  zIndex: PropTypes.number,
};

export default DropdownBox;
