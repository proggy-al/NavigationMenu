import { Button, Drawer, Form, Input, Space } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../Api/authApi';
import apiResponse from '../Interfaces/apiResponse';
import userModel from '../Interfaces/userModel';
import { jwtDecode } from 'jwt-decode';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { inputHelper, toastNotify } from '../Helper';
import MainLoader from '../Pages/MainLoader';

interface Props {
    handleCancel: () => void;
    IsLoginOpen: boolean;
}

export const DrawerLogin = ({
    handleCancel,
    IsLoginOpen
}: Props) => {
    const [loginUser] = useLoginUserMutation();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        login: "",
        password: "",
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper (e, userInput);
        setUserInput (tempData);
    }
    
    const handleOk = async () => {
        setLoading(true);
        const response: apiResponse = await loginUser({
            userName: userInput.login,
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
            toastNotify(response.error.data.errorMessages[0], "error");
        }
        setLoading(false);
    };

    return (
            <Drawer
                title="SignIn"
                width={300}
                onClose={handleCancel}
                open={IsLoginOpen}
                styles={{
                    body: {
                        paddingBottom: 20,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleOk} type="primary">
                            Ok
                        </Button>
                    </Space>
                }>
                {loading && <MainLoader/>}
                <Form layout="vertical">
                    <Form.Item
                        name="login"
                        label="Login"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Login',
                            },
                        ]}>
                        <Input
                            placeholder="Please enter user login"
                            value={userInput.login}
                            onChange={handleUserInput} 
                            required/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter Password',
                            },
                        ]}>
                        <Input
                            placeholder="Please enter user password"
                            value={userInput.password}
                            onChange={handleUserInput} 
                            required/>
                    </Form.Item>
                </Form>
            </Drawer>
    )
}

