import React, { ChangeEvent, useState, FormEvent, useContext } from "react";
import { Grid, Image, Form, Button, Header, Loader, Dimmer } from "semantic-ui-react";
import {registerUser} from '../util/requests';
import {AuthContext} from '../util/auth';

import "../Css/Register.css";
import registerCover from "../Assets/registerCover.jpeg";

const Register: React.FC = () => {
  const [userInput, setUserInput] = useState<UserRegisterInput>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [successMsj, setSuccessMsj] = useState<Boolean>(false)
  const [loader, setLoader] = useState<Boolean>(false)
  const context = useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInput({...userInput, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoader(true)
    const res = await registerUser(userInput)
    setLoader(false)
    if(res.error) {
      setSuccessMsj(false)
      setErrors(res.error)
    } else {
      setSuccessMsj(true)
      // Execute action in reducer, to login save all user info (token in ls).
      context.login(res)
    }
  }

  return (
    <Grid>
      <Grid.Row style={{ height: "630px" }}>
        <Grid.Column computer={8} only="computer">
          <Image id="imgCover" src={registerCover} />
        </Grid.Column>
        <Grid.Column id="registerCover" computer={8} mobile={16}>
          <div className="formContainer">
            {loader && (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            )}
            <Form noValidate onSubmit={(e) => handleSubmit(e)}>
              <Header as="h1" id="titleForm">
                Create Account
              </Header>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="Username"
                placeholder="Enter your username"
                name="username"
                onChange={handleChange}
              />
              <Form.Input
                icon="mail"
                iconPosition="left"
                label="Email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                type="password"
                label="Password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                type="password"
                label="Confirm Password"
                placeholder="Repeat your password"
                name="confirmPassword"
                onChange={handleChange}
              />
              <Form.Field>
                <a href="/login">
                  <b style={{ color: "#2A2E46" }}>Already have an account?</b>
                </a>
              </Form.Field>

              <Button size="large" type="submit" id="btnReg">
                Register
              </Button>
            </Form>

            {Object.keys(errors).length > 0 && !successMsj && (
              <div className="ui error message">
                <ul className="list">
                  {Object.values(errors).map((value: any) => (
                    <li key={value}>
                      <b>{value}</b>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {successMsj && (
              <div className="ui success message">
                <ul className="list">
                  <li>
                    <b>Registration successfull! login to continue.</b>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Register;
