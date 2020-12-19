import React, { ChangeEvent, useState, FormEvent } from "react";
import { Grid, Image, Form, Button, Header } from "semantic-ui-react";
import {registerUser} from '../util/requests';
import "../Css/Register.css";
import registerCover from "../Assets/registerCover.jpeg";

const Register: React.FC = () => {
  const [userInput, setUserInput] = useState<UserRegisterInput>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInput({...userInput, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await registerUser(userInput)
    if(res.error) console.log(res)
  }

  return (
    <Grid>
      <Grid.Row style={{'height': '630px'}}>
        <Grid.Column computer={8} only="computer">
          <Image id="imgCover" src={registerCover} />
        </Grid.Column>
        <Grid.Column id="registerCover" computer={8} mobile={16}>
          <div className="formContainer">
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
                id="titleForm"
              />
              <Form.Input
                icon="mail"
                iconPosition="left"
                label="Email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                id="titleForm"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                type="password"
                label="Password"
                name='password'
                placeholder="Enter your password"
                onChange={handleChange}
                id="titleForm"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                type="password"
                label="Confirm Password"
                placeholder="Repeat your password"
                name="confirmPassword"
                onChange={handleChange}
                id="titleForm"
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
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Register;
