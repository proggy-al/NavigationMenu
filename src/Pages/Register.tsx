import React, { ReactNode, useState } from 'react';
import { useRegisterUserMutation } from "../Api/authApi"
import { inputHelper, toastNotify } from '../Helper';
import { useNavigate } from "react-router-dom";
import apiResponse from '../Interfaces/apiResponse';
import { Button, Col, Form, Input, Select, SelectProps } from 'antd';
import MainLoader from './MainLoader';
import SelectWithIcon from '../Components/SelectWithIcon';
import { UserOutlined, SettingOutlined, XOutlined, FullscreenOutlined } from '@ant-design/icons';
import { finished } from 'stream';

/*const enum SD_Roles {
  ADMIN = "admin",
  CUSTOMER = "customer",
}*/



function Register() {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    role: "",
    name: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper (e, userInput);
    console.log(tempData);
    setUserInput (tempData);
  }

  const handleUserSelect = (val: string) => {    
    console.log(val);
    userInput.role = val;    
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //e.preventDefault();
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
      setError(response.error.data.errorMessages[0]);
      toastNotify(response.error.data.errorMessages[0], "error");
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <MainLoader />}
      <Form method='POST' onFinish={handleSubmit}>
        <h1>Register</h1>
        <div>
          <Col sm={{ span: 6, offset: 3 }} xs={12}>
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
                name="userName"
                placeholder="Enter a userName"
                required
                value={userInput.userName}
                onChange={handleUserInput}>
              </Input>
            </Form.Item>
          </Col>
          <Col sm={{ span: 6, offset: 3 }} xs={12}>
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
                name="name"
                placeholder="Enter a name"
                required
                value={userInput.name}
                onChange={handleUserInput} />
            </Form.Item>
          </Col>
          <Col sm={{ span: 6, offset: 3 }} xs={12}>
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
                name="password"
                required
                value={userInput.password}
                onChange={handleUserInput} />
            </Form.Item>
          </Col>
          <Col sm={{ span: 6, offset: 3 }} xs={12}>
            <Form.Item                                   
              style={{ margin: 0 }}
              rules={[
                {
                  required: true,
                  message: `Введите Role!`,
                },
              ]}>
              <SelectWithIcon  
                prefixIcon= {<UserOutlined/>}
                placeholder="Select role"
                onChange={(e: string) => handleUserSelect(e)} name={'role'}>
                <Select.Option
                  value="admin">
                    Admin
                  </Select.Option>
                <Select.Option 
                  value="customer">
                    Customer
                </Select.Option>                
              </SelectWithIcon>                                                                                                                   
          </Form.Item>
        </Col>
    </div><div>  
        {error && <p> {error}</p>}
        <Button type="primary" htmlType="submit">Register</Button>
      </div>
        </Form>
    </div>
  )
}
export default Register;