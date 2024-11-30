import "./module.css";
import logo from "@/assets/img/brand.png";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import MainTitle from "@/components/MainTitle";
import FormGroup from "@/components/FormGroup";
import FormLabel from "@/components/FormLabel";
import InputBox from "@/components/InputBox";
import ButtonBox from "@/components/ButtonBox";
import LinkButton from "@/components/LinkButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
            <MainTitle extraClasses={["text-general"]}>Sign In</MainTitle>
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

          <FormGroup>
            <FormLabel forName='password'>Password</FormLabel>
            <InputBox
              type={isPasswordVisible ? "text" : "password"}
              id='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(value) => setPassword(value)}
            >
              {
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              }
            </InputBox>
          </FormGroup>
        </div>

        <div className='login-block login-button'>
          <ButtonBox onClick={() => {}} isSave={true}>
            Sign In
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
          <div>Did you forget your password?</div>
          <LinkButton to='/forgot-password' title='Forget Password' />
        </div>

        <div className='login-block login-link'>
          <div>Do you have not an account?</div>
          <LinkButton to='/register' title='Sign Up' />
        </div>

        <div className='login-block login-footer light-primary-shadow'>
          © 2024 Ivan Solutions. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
