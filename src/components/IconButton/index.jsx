import "./module.css";

import PropTypes from "prop-types";

const IconButton = ({ disabled, onClick, children }) => {
  if (disabled) {
    return (
      <button className='icon-button icon-button__disable' disabled>
        {children}
      </button>
    );
  }

  return (
    <button className='icon-button' onClick={onClick}>
      {children}
    </button>
  );
};

IconButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default IconButton;
