import "./module.css";

import PropTypes from "prop-types";
import { isFunction } from "lodash";

const TagBox = ({ tag, onClick }) => {
  const clickable = isFunction(onClick) ? "clickable" : "";
  const onClickTag = (tag) => {
    if (isFunction(onClick)) {
      onClick(tag);
    }
  };

  return (
    <div
      className={`tag-box ${clickable}`}
      style={{ backgroundColor: tag.hashCode }}
    >
      <div key={tag} onClick={onClickTag}>
        {tag.label}
      </div>
    </div>
  );
};

TagBox.propTypes = {
  tag: PropTypes.object,
  onClick: PropTypes.func,
};

export default TagBox;
