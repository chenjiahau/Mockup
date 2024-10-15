import "./module.css";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { generateExtraClass } from "../util";

const LinkButton = ({ extraClasses, to, title, children }) => {
  let extraClassName = generateExtraClass(extraClasses);

  return (
    <Link to={to} className={`link-button ${extraClassName}`}>
      {children || title}
    </Link>
  );
};

LinkButton.propTypes = {
  extraClasses: PropTypes.array,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default LinkButton;
