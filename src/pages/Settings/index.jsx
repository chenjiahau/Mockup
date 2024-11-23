import "./module.css";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Breadcrumbs from "@/components/Breadcrumbs";
import FormGroup from "@/components/FormGroup";
import FormLabel from "@/components/FormLabel";
import InputBox from "@/components/InputBox";
import ButtonBox from "@/components/ButtonBox";

import CardBox from "@/components/CardBox";
import ConfirmModal from "./ConfirmModal";

const Settings = () => {
  const linkList = [
    { to: "/", label: "Home" },
    { to: "/settings", label: "Settings" },
  ];

  const [currentPassword, setCurrentPassword] = useState("");
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = () => {
    setOpenModal(true);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  const logout = () => {
    // Logout logic here
    setOpenModal(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Breadcrumbs linkList={linkList} />
      <div className='settings-container'>
        <CardBox title='Password'>
          <FormGroup>
            <FormLabel forName='password'>Password</FormLabel>
            <InputBox
              type={isCurrentPasswordVisible ? "text" : "password"}
              id='password'
              name='password'
              placeholder='Password'
              value={currentPassword}
              onChange={(value) => setCurrentPassword(value)}
            >
              {
                <FontAwesomeIcon
                  icon={isCurrentPasswordVisible ? faEyeSlash : faEye}
                  onClick={() =>
                    setIsCurrentPasswordVisible(!isCurrentPasswordVisible)
                  }
                />
              }
            </InputBox>
          </FormGroup>
          <FormGroup>
            <FormLabel forName='new-password'>New Password</FormLabel>
            <InputBox
              type={isNewPasswordVisible ? "text" : "password"}
              id='new-password'
              name='new-password'
              placeholder='New Password'
              value={newPassword}
              onChange={(value) => setNewPassword(value)}
            >
              {
                <FontAwesomeIcon
                  icon={isNewPasswordVisible ? faEyeSlash : faEye}
                  onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                />
              }
            </InputBox>
          </FormGroup>
          <FormGroup>
            <FormLabel forName='confirm-password'>Confirm Password</FormLabel>
            <InputBox
              type={isConfirmPasswordVisible ? "text" : "password"}
              id='confirm-password'
              name='confirm-password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(value) => setConfirmPassword(value)}
            >
              {
                <FontAwesomeIcon
                  icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                />
              }
            </InputBox>
          </FormGroup>
          <div className='footer'>
            <ButtonBox
              onClick={onSubmit}
              isSave={true}
              extraClasses={["primary-shadow"]}
            >
              Save
            </ButtonBox>
            <ButtonBox
              onClick={onClose}
              isClose={true}
              extraClasses={["cancel-shadow"]}
            >
              Cancel
            </ButtonBox>
          </div>
        </CardBox>
      </div>

      <ConfirmModal openModal={openModal} onClose={onClose} onSubmit={logout} />
    </>
  );
};

export default Settings;
