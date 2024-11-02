import React from "react";
import PropTypes from "prop-types";

import ModalBox from "@/components/ModalBox";

const DeleteModal = ({
  openModal,
  deleteMode,
  selectedMember,
  onClose,
  onSubmit,
}) => {
  if (!openModal) {
    return null;
  }

  return (
    <ModalBox
      deleteMode={deleteMode}
      title='Delete Member'
      onClose={() => onClose()}
      onSubmit={() => onSubmit()}
    >
      <p className='danger-text'>
        Do you want to delete this member({selectedMember.member})?
      </p>
    </ModalBox>
  );
};

DeleteModal.propTypes = {
  openModal: PropTypes.bool,
  deleteMode: PropTypes.bool,
  selectedMember: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default DeleteModal;
