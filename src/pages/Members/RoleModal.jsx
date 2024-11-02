import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ModalBox from "@/components/ModalBox";
import FormGroup from "@/components/FormGroup";
import FormLabel from "@/components/FormLabel";
import DropdownBox from "@/components/DropdownBox";

const RoleModal = ({ openModal, selectedMember, roles, onClose, onSubmit }) => {
  const [roleOptions, setRoleOptions] = useState([]);
  const modalTitle = selectedMember ? "Edit Role" : "Add Role";

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

    if (selectedMember) {
      const selectedOption = updatedRoleOptions.find(
        (option) => option.value === selectedMember.roleId
      );

      selectedOption.active = true;
    } else {
      updatedRoleOptions[0].active = true;
    }

    setRoleOptions(updatedRoleOptions);
  }, [selectedMember, roles]);

  if (!openModal || roleOptions.length === 0) {
    return null;
  }

  return (
    <ModalBox
      title={modalTitle}
      onClose={() => onClose()}
      onSubmit={() => onSubmit()}
    >
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

RoleModal.propTypes = {
  openModal: PropTypes.bool,
  selectedMember: PropTypes.object,
  roles: PropTypes.array,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default RoleModal;
