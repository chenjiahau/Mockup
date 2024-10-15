import "./module.css";
import PropTypes from "prop-types";

const ButtonBox = ({ title, onClick, children }) => {
  return (
    <div className='button-box'>
      <button onClick={onClick}>{children || title}</button>
    </div>
  );
};

ButtonBox.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default ButtonBox;
