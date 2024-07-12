import React, { useState } from 'react';
import { useLoginUserMutation } from '../Api/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { jwtDecode } from "jwt-decode";
import { inputHelper, toastNotify } from '../Helper';
import userModel from '../Interfaces/userModel';
import MainLoader from './MainLoader';
import { Button, Col, Input } from 'antd';
import Form from 'antd/es/form/Form';
import apiResponse from '../Interfaces/apiResponse';

function Login() {
  const [error, setError] = useState("");
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const tempData = inputHelper (e, userInput);
      setUserInput (tempData);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    const response: apiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    });
    if (response.data) {
      const { token } = response.data.result;
      const { fullName, id, email, role }: userModel = jwtDecode(token);
      localStorage.setItem("token", token);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
      navigate("/");
      toastNotify("Login successful!");
    } else if (response.error) {
      console.log(response.data);
      toastNotify("Login failed!");
      setError(response.error.data.errorMessages[0]);
      toastNotify(response.error.data.errorMessages[0], "error");
    }
    setLoading(false);
  };

    return (
      <div>
        {loading && <MainLoader/>}
        <Form method='POST' onFinish={handleSubmit}>
          <h1>Login</h1>
          <div>
            <Col sm={{ span: 6, offset: 3 }} xs={12}>
              <Input type="text" placeholder="Enter a name" required
              name = "userName"
              value={userInput.userName}
              onChange={handleUserInput} />
            </Col>
            <Col sm={{ span: 6, offset: 3 }} xs={12}>
              <Input type="text" placeholder="Enter password" required
               name = "password"
               value={userInput.password}
               onChange={handleUserInput}  />
            </Col>
          </div>
          <div>
            {error && <p> {error}</p>}
            <Button type="primary" htmlType="submit">Login</Button>
          </div>
        </Form>
      </div>
    );
  };
  
  export default Login;



