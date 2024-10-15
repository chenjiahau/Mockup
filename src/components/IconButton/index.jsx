import "./module.css";

import PropTypes from "prop-types";

const IconButton = ({ onClick, children }) => {
  return (
    <button className='icon-button' onClick={onClick}>
      {children}
    </button>
  );
};

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default IconButton;
