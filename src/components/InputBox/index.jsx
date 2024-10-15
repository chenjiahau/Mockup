import "./module.css";

import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { generateExtraClass } from "../util";
import { isFunction } from "lodash";

const InputBox = ({
  type,
  extraClasses,
  onChange,
  onClose,
  children,
  ...props
}) => {
  type = type || "text";
  let extraClassName = generateExtraClass(extraClasses);
  const inputRef = useRef(null);

  const handleClick = (e) => {
    if (e.key === "Enter" && isFunction(onClose)) {
      e.preventDefault();
      e.stopPropagation();
      onClose(inputRef.current.value);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={`${children ? "input-box-with-icon" : "input-box"}`}>
      <input
        ref={inputRef}
        type={type}
        className={`${extraClassName}`}
        {...props}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleClick}
      />
      {children}
    </div>
  );
};

InputBox.propTypes = {
  type: PropTypes.string,
  extraClasses: PropTypes.array,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default InputBox;
