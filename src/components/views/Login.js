
import { 
  Form, 
  Button,
  Container
  } from 'react-bootstrap';
import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const Login = () => {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isRedirect, setRedirect] = useState(false);
  const tryLogin = async () => {
    //const response = await axios.post(config.BASE_URL + "login");
    const userId = Math.floor((Math.random() * 10) +10).toString();
    localStorage.setItem("user", userId);
    setRedirect(true);
    //window.Redirect
    // if (response.status != 200) {
    //   console.log(response);
    //   return;
    // }
    // const {data} = response;
    // if (data) {
    //   console.log(data);
    // }
  }

  return (
    <Container>
      {isRedirect ? <Redirect to="/dashboard" /> : null}
      <Form>
    <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit" onClick={() => tryLogin()} >
        Submit
    </Button>
    </Form>
    </Container>
  )
}

export default Login;