import { Menu, Image, MenuProps, Divider, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from "react";

let logoPic = require("../Assets/Images/photo_2024-02-28_23-38-55.jpg");

const NavigateMenu: React.FC = () => {
    const [current, setCurrent] = useState('home');
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <div >
            <div style={{
                float: 'left',
                width: '80px',
                height: '61px',
                
                background: 'rgba(255, 255, 255, 0.3)'
            }} >
                <a href="/"> <Image src={logoPic} alt="logo" preview = {false} height= '61px'/>
                </a>
            </div>
            <Layout>
            <Menu
                onClick={onClick} selectedKeys={[current]} mode="horizontal" overflowedIndicator={<AppstoreOutlined />} >
                <Menu.Item
                    title='AdminPanel'
                    key="adminPanel"
                    icon={<MailOutlined />} >
                    <Link to="/finances"> AdminPanel </Link>
                </Menu.Item>
                <Menu.Item key="game1" icon={<SettingOutlined />}>
                    <Link to="/game1">  Game1 </Link>
                </Menu.Item>
                <Menu.Item key="game2" icon={<SettingOutlined />}>
                    <Link to="/game2">   Game2 </Link>
                </Menu.Item>
                <Menu.Item key="game3" icon={<SettingOutlined />}>
                    Game3
                </Menu.Item>
            </Menu>
            </Layout>

            <Layout>
            <Menu
                onClick={onClick} selectedKeys={[current]} mode="horizontal" overflowedIndicator={<AppstoreOutlined />} >
                <Menu.Item
                    title='Login'
                    key="login"
                    icon={<MailOutlined />} >
                    <Link to="/finances"> Login </Link>
                </Menu.Item>
                <Menu.Item key="game1" icon={<SettingOutlined />}>
                    <Link to="/game1">  Register </Link>
                </Menu.Item>                
            </Menu>

            </Layout>

        </div>
    )
}

export default NavigateMenu;