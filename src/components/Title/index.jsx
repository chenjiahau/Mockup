import "./module.css";

import PropTypes from "prop-types";
import { generateExtraClass } from "../util";

const Title = ({ tag, extraClasses, children, ...props }) => {
  tag = tag || "h1";
  const Tag = tag;
  let extraClassName = generateExtraClass(extraClasses);

  return (
    <Tag className={`${extraClassName}`} {...props}>
      {children}
    </Tag>
  );
};

Title.propTypes = {
  tag: PropTypes.string,
  extraClasses: PropTypes.array,
  children: PropTypes.node.isRequired,
};

export default Title;
