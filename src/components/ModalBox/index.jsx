import "./module.css";

import { useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { isFunction } from "lodash";

import IconButton from "@/components/IconButton";
import ButtonBox from "@/components/ButtonBox";

const ModalBox = ({
  customWidthClass,
  deleteMode,
  title,
  onClose,
  onSubmit,
  children,
}) => {
  customWidthClass = customWidthClass || "";
  deleteMode = deleteMode || false;
  title = title || "Modal Title";
  onClose = isFunction(onClose) ? onClose : () => {};
  onSubmit = isFunction(onSubmit) ? onSubmit : () => {};

  useEffect(() => {
    const nav = document.querySelector("nav");
    nav.style.zIndex = "0";

    const mainContent = document.querySelector(".main-content");
    mainContent.style.overflow = "hidden";

    return () => {
      nav.style.display = "block";
      mainContent.style.overflow = "auto";
    };
  }, []);

  return (
    <div className='modal-box'>
      <div className={`modal-body ${customWidthClass}`}>
        <div className='modal-header'>
          <h1 className='title'>{title}</h1>
          <IconButton onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
        </div>
        <div className='modal-content'>{children}</div>
        <div className='modal-footer'>
          <ButtonBox
            onClick={onSubmit}
            isSave={true}
            extraClasses={["primary-shadow"]}
          >
            {deleteMode ? "Delete" : "Save"}
          </ButtonBox>
          <ButtonBox
            onClick={onClose}
            isClose={true}
            extraClasses={["cancel-shadow"]}
          >
            Close
          </ButtonBox>
        </div>
      </div>
    </div>
  );
};

ModalBox.propTypes = {
  customWidthClass: PropTypes.string,
  deleteMode: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

export default ModalBox;
