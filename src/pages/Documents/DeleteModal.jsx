import React from "react";
import PropTypes from "prop-types";

import ModalBox from "@/components/ModalBox";

const DeleteModal = ({
  openModal,
  deleteMode,
  selectedDocument,
  onClose,
  onSubmit,
}) => {
  if (!openModal) {
    return null;
  }

  return (
    <ModalBox
      deleteMode={deleteMode}
      title='Delete Document'
      onClose={() => onClose()}
      onSubmit={() => onSubmit()}
    >
      <p className='danger-text'>
        Do you want to delete this document({selectedDocument.document})?
      </p>
    </ModalBox>
  );
};

DeleteModal.propTypes = {
  openModal: PropTypes.bool,
  deleteMode: PropTypes.bool,
  selectedDocument: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default DeleteModal;
