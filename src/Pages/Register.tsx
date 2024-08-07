import React, { useState } from 'react';
import { useRegisterUserMutation } from "../Api/authApi"
import { inputHelper, toastNotify } from '../Helper';
import { useNavigate } from "react-router-dom";
import apiResponse from '../Interfaces/apiResponse';
import { Button, Col, Form, Input, Select } from 'antd';
import MainLoader from './MainLoader';

const enum SD_Roles {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

function Register() {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    role: "",
    name: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempData = inputHelper(e, userInput);
    console.log(tempData);
    setUserInput(tempData);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await registerUser({
      userName: userInput.userName,
      password: userInput.password,
      role: userInput.role,
      name: userInput.name,
    });
    if (response.data) {
      toastNotify("Registeration successful! Please login to continue.");
      navigate("/login");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? <MainLoader /> :
        <Form method='POST' onFinish={handleSubmit}>
          <h1 className="mt-5">Register</h1>
          <div className="mt-5">
            <Col sm={{ span: 6, offset: 3 }} xs={12} className="mt-4">
              <Form.Item
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: `Введите userName!`,
                  },
                ]}>
                <Input
                  type="text"
                  placeholder="Enter a userName"
                  required
                  value={userInput.userName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUserInput(e)}>
                </Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 6, offset: 3 }} xs={12} className="mt-4">
              <Form.Item
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: `Введите name!`,
                  },
                ]}>
                <Input
                  type="text"
                  placeholder="Enter a name"
                  required
                  value={userInput.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUserInput(e)}
                />
              </Form.Item>
            </Col>
            <Col sm={{ span: 6, offset: 3 }} xs={12} className="mt-4">
              <Form.Item
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: `Введите password!`,
                  },
                ]}>
                <Input
                  type="text"
                  placeholder="Enter password"
                  required
                  value={userInput.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUserInput(e)}
                />
              </Form.Item>
            </Col>
            <Col sm={{ span: 6, offset: 3 }} xs={12} className="mt-4">
              <Form.Item
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: `Введите Role!`,
                  },
                ]}>
                <Select
                  onChange={handleUserInput}>
                  <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
                  <option value={`${SD_Roles.ADMIN}`}>Admin</option>
                </Select>
              </Form.Item>
            </Col>
          </div>
          <div className="mt-5">
            <Button type="primary">Register</Button>
          </div>
        </Form>
      }
    </div>
  )
}
export default Register;