import { Button, Drawer, Form, Input, Select, Space } from 'antd';
import React, { useState } from 'react'
import MainLoader from '../Pages/MainLoader';
import { useRegisterUserMutation } from '../Api/authApi';
import { inputHelper, toastNotify } from '../Helper';
import apiResponse from '../Interfaces/apiResponse';
import SelectWithIcon from './SelectWithIcon';
import { UserOutlined } from '@ant-design/icons';

interface Props {
    handleCancel: () => void;
    IsRegisterOpen: boolean;
}

export const DrawerRegister = ({
    handleCancel,
    IsRegisterOpen
}: Props) => {
    const [loading, setLoading] = useState(false);
    const [registerUser] = useRegisterUserMutation();
    const [userInput, setUserInput] = useState({
        login: "",
        password: "",
        role: "",
        name: "",
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, userInput);
        console.log(tempData);
        setUserInput(tempData);
    }

    const handleUserSelect = (val: string) => {
        console.log(val);
        userInput.role = val;
    }

    const handleOk = async () => {
        setLoading(true);
        const response: apiResponse = await registerUser({
            login: userInput.login,
            password: userInput.password,
            role: userInput.role,
            name: userInput.name,
        });
        if (response.data) {
            toastNotify("Registeration successful! Please login to continue.");
        } else if (response.error) {
            toastNotify(response.error.data.errorMessages[0], "error");
        }
        setLoading(false);
    };

    return (
        <Drawer
            title="Registration"
            width={400}
            onClose={handleCancel}
            open={IsRegisterOpen}
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
            {loading && <MainLoader />}
            <Form layout="vertical">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter Name',
                        },
                    ]}>
                    <Input
                        placeholder="Please enter user Name"
                        value={userInput.name}
                        onChange={handleUserInput} />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[
                        {
                            required: true,
                            message: 'Please select Role',
                        },
                    ]}>
                    <SelectWithIcon
                        prefixIcon={<UserOutlined />}
                        placeholder="Please select Role"
                        value={userInput.name}
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
                        onChange={handleUserInput} />
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
                        onChange={handleUserInput} />
                </Form.Item>
            </Form>
        </Drawer>
    )
}

