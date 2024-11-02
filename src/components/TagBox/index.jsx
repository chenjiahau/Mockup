import "./module.css";

import PropTypes from "prop-types";
import { isFunction } from "lodash";
import { generateExtraClass } from "../util";

const TagBox = ({ extraClasses, tag, onClick }) => {
  tag.hashCode = tag.hashCode ? tag.hashCode : "#000000";
  let extraClassName = generateExtraClass(extraClasses);

  const clickable = isFunction(onClick) ? "clickable" : "unclickable";
  const onClickTag = (tag) => {
    if (isFunction(onClick)) {
      onClick(tag);
    }
  };

  return (
    <div
      className={`tag-box ${clickable} ${extraClassName}`}
      style={{ backgroundColor: tag.hashCode }}
      onClick={onClickTag}
    >
      <div key={tag}>{tag.label}</div>
    </div>
  );
};

TagBox.propTypes = {
  extraClasses: PropTypes.array,
  tag: PropTypes.object,
  onClick: PropTypes.func,
};

export default TagBox;
