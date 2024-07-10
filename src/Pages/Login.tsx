import React, { useState } from 'react';
import { useLoginUserMutation } from '../Api/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { jwtDecode } from "jwt-decode";
import { inputHelper } from '../Helper';
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
    e.preventDefault();
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
    } else if (response.error) {
      setError(response.error.data.errorMessages[0]);
    }
    setLoading(false);
  };


    return (
      <div>
        {loading && <MainLoader/>}
        <Form method='POST' onFinish={handleSubmit}>
          <h1 className="mt-5">Login</h1>
          <div className="mt-5">
            <Col sm={{ span: 6, offset: 3 }} xs={12} className="mt-4">
              <Input type="text" placeholder="Enter a name" required
              name = "userName"
              value={userInput.userName}
              onChange={handleUserInput} />
            </Col>
            <Col sm={{ span: 6, offset: 3 }} xs={12} className="mt-4">
              <Input type="text" placeholder="Enter password" required
               name = "password"
               value={userInput.password}
               onChange={handleUserInput}  />
            </Col>
          </div>
          <div className="mt-2">
            {error && <p className="text-danger"> {error}</p>}
            <Button type="primary">Login</Button>
          </div>
        </Form>
      </div>
    );
  };
  
  export default Login;



