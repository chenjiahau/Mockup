import "./module.css";
import PropTypes from "prop-types";
import { generateExtraClass } from "../util";

const ButtonBox = ({
  extraClasses,
  isDisabled,
  isClose,
  isModal,
  title,
  onClick,
  children,
}) => {
  let extraClassName = generateExtraClass(extraClasses);
  let disabledClassName = isDisabled ? "disabled-button" : "";
  let closeClassName = isClose ? "close-button" : "";
  let modalClassName = isModal ? "modal-button" : "";

  const handleClick = () => {
    if (isDisabled) return;
    onClick();
  };

  return (
    <div
      className={`button-box dark-primary-shadow ${extraClassName} ${disabledClassName} ${closeClassName} ${modalClassName}`}
      onClick={handleClick}
    >
      <button className={`${disabledClassName}`}>{children || title}</button>
    </div>
  );
};

ButtonBox.propTypes = {
  extraClasses: PropTypes.array,
  isDisabled: PropTypes.bool,
  isClose: PropTypes.bool,
  isModal: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default ButtonBox;
