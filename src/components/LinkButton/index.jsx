import "./module.css";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LinkButton = ({ to, title, children }) => {
  return (
    <Link to={to} className='link-button'>
      {children || title}
    </Link>
  );
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default LinkButton;
