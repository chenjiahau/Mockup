import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ModalBox from "@/components/ModalBox";
import FormGroup from "@/components/FormGroup";
import FormLabel from "@/components/FormLabel";
import ElementGroup from "@/components/ElementGroup";
import InputBox from "@/components/InputBox";
import RadioBox from "@/components/RadioBox";

const CategoryModal = ({ openModal, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {}, []);

  if (!openModal) {
    return null;
  }

  return (
    <ModalBox
      title='Add Category'
      onClose={() => onClose()}
      onSubmit={() => onSubmit()}
    >
      <FormGroup>
        <FormGroup>
          <FormLabel forName='name'>Name</FormLabel>
          <InputBox
            type='text'
            id='name'
            name='name'
            placeholder='Category Name'
            value={name}
            onChange={(value) => setName(value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel forName='name'>Status</FormLabel>
          <ElementGroup>
            <RadioBox checked={status} onChange={() => setStatus(true)}>
              Enable
            </RadioBox>
            <RadioBox checked={!status} onChange={() => setStatus(false)}>
              Disable
            </RadioBox>
          </ElementGroup>
        </FormGroup>
      </FormGroup>
    </ModalBox>
  );
};

CategoryModal.propTypes = {
  openModal: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default CategoryModal;
