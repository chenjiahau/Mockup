import "@/pages/Login/module.css";
import logo from "@/assets/img/brand.png";
import { useState } from "react";

import MainTitle from "@/components/MainTitle";
import FormGroup from "@/components/FormGroup";
import FormLabel from "@/components/FormLabel";
import InputBox from "@/components/InputBox";
import ButtonBox from "@/components/ButtonBox";
import LinkButton from "@/components/LinkButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className='login-container'>
      <div className='login-border light-primary-shadow'>
        <div className='login-block login-header light-primary-shadow'>
          <div className='icon'>
            <img src={logo} />
          </div>
          <MainTitle extraClasses={["!mb-0"]}>
            Management Information System
          </MainTitle>
        </div>

        <div className='login-block login-form light-primary-shadow'>
          <FormGroup>
            <MainTitle extraClasses={["text-general"]}>
              Forgot Password
            </MainTitle>
          </FormGroup>
          <FormGroup>
            <FormLabel forName='email'>E-mail</FormLabel>
            <InputBox
              type='text'
              id='email'
              name='email'
              placeholder='E-mail'
              value={email}
              onChange={(value) => setEmail(value)}
            />
          </FormGroup>
        </div>

        <div className='login-block login-button'>
          <ButtonBox onClick={() => {}} isSave={true}>
            Reset Password
          </ButtonBox>
          <ButtonBox
            onClick={() => {}}
            isClose={true}
            extraClasses={["cancel-shadow"]}
          >
            Reset
          </ButtonBox>
        </div>

        <div className='login-block login-link'>
          <div>Do you have an account?</div>
          <LinkButton to='/login' title='Back' />
        </div>

        <div className='login-block login-footer light-primary-shadow'>
          © 2024 Ivan Solutions. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
