import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ModalBox from "@/components/ModalBox";
import FormGroup from "@/components/FormGroup";
import FormLabel from "@/components/FormLabel";
import DropdownBox from "@/components/DropdownBox";
import InputBox from "@/components/InputBox";

const MemberModal = ({ openModal, roles, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);

  const handleRoleChange = (option) => {
    const updatedRoleOptions = roleOptions.map((roleOption) => {
      if (roleOption.value === option.value) {
        roleOption.active = true;
      } else {
        roleOption.active = false;
      }

      return roleOption;
    });

    setRoleOptions(updatedRoleOptions);
  };

  useEffect(() => {
    const updatedRoleOptions = roles.map((roleOption) => ({
      value: roleOption.id,
      label: roleOption.label,
      active: false,
    }));

    updatedRoleOptions[0].active = true;
    setRoleOptions(updatedRoleOptions);
  }, [roles]);

  if (!openModal || roleOptions.length === 0) {
    return null;
  }

  return (
    <ModalBox
      title='Add Member'
      onClose={() => onClose()}
      onSubmit={() => onSubmit()}
    >
      <FormGroup>
        <FormLabel forName='name'>Name</FormLabel>
        <InputBox
          type='text'
          id='name'
          name='name'
          placeholder='Name'
          value={name}
          onChange={(value) => setName(value)}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel forName='name'>Roles</FormLabel>
        <DropdownBox
          options={roleOptions}
          onClick={(option) => handleRoleChange(option)}
          zIndex={1}
        />
      </FormGroup>
    </ModalBox>
  );
};

MemberModal.propTypes = {
  openModal: PropTypes.bool,
  selectedMember: PropTypes.object,
  roles: PropTypes.array,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default MemberModal;
