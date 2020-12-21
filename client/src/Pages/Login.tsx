import React, { ChangeEvent, useState, FormEvent, useContext } from "react";
import {
  Grid,
  Image,
  Form,
  Button,
  Header,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../util/auth";
import { loginUser } from "../util/requests";
import "../Css/Register.css";
import loginCover from "../Assets/loginCover.jpg";

const Login: React.FC = (props) => {
  let history = useHistory()
  const [userInput, setUserInput] = useState<UserLoginInput>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState<Boolean>(false);
  const context = useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    const res = await loginUser(userInput);
    setLoader(false);
    if (res.error) {
      setErrors(res.error);
    } else {
      // Execute action in reducer, to login save all user info (token in ls).
      context.login(res);
      history.push(`/u/${res.username}`)
    }
  };
  return (
    <Grid>
      <Grid.Row style={{ height: "630px" }}>
        <Grid.Column computer={8} only="computer">
          <Image id="imgCover" src={loginCover} />
        </Grid.Column>
        <Grid.Column id="registerCover" computer={8} mobile={16}>
          <div className="formContainer formContainerTop">
            {loader && (
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            )}
            <Form noValidate onSubmit={(e) => handleSubmit(e)}>
              <Header as="h1" id="titleForm">
                LogIn
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
                icon="lock"
                iconPosition="left"
                type="password"
                label="Password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
              <Form.Field>
                <a href="/register">
                  <b style={{ color: "#2A2E46" }}>You are new here?</b>
                </a>
              </Form.Field>

              <Button size="large" type="submit" id="btnReg">
                Login
              </Button>
            </Form>

            {Object.keys(errors).length > 0 && (
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
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Login