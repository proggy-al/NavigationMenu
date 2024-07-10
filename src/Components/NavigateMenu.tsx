import { Menu, Image, MenuProps, Divider, Layout, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AppstoreOutlined, UserOutlined, SettingOutlined, XOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useState } from "react";
import SubMenu from "antd/es/menu/SubMenu";

let logoPic = require("../Assets/Images/123.jpg");

const NavigateMenu: React.FC = () => {
    const [current, setCurrent] = useState('home');
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <div>
            {/* this is for Image (logo) */}
            <div style={{
                float: 'left'
            }}>
                <a href="/Home">
                    <Image
                        src={logoPic}
                        alt="logo"
                        style={{
                            float: 'left',
                            marginInline: 0,
                            height: 64,
                            width: 122
                        }}
                        preview={false}
                    />
                </a>
            </div>
            {/* this is for Admin & Login/Register/Logout */}
            <div style={{
                float: 'left'}}>
                <Menu
                    style={{ display: 'block' }}
                    mode="horizontal"
                    theme="dark">
                    <SubMenu
                        style={{
                            fontWeight: 'bold', float: 'left'
                        }}
                        key="admin"
                        icon={<SettingOutlined />}>
                        <Menu.Item
                            style={{
                                fontWeight: 'bold'
                            }}
                            key="avtors">
                            <Link to={"/avtors"}>Avtors</Link>
                        </Menu.Item>
                        <Menu.Item
                            style={{
                                fontWeight: 'bold'
                            }}
                            key="books">
                            <Link to={"/books"}>Books</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="login"
                        icon={< UserOutlined />}>
                        <Menu.Item
                            style={{
                                fontWeight: 'bold'
                            }}
                            key="2">
                            <Link to={"/login"}>Логин</Link>
                        </Menu.Item>
                        <Menu.Item
                            style={{
                                fontWeight: 'bold'
                            }}
                            key="3">
                            <Link to={"/register"}>Регистрация</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
            {/* this is for Games */}
            <div>
                <Menu
                    style={{ marginLeft: 'auto'}}
                    theme="dark"
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    overflowedIndicator={<FullscreenOutlined />} >

                    <Menu.Item
                        title="Game1"
                        style={{
                            fontWeight: 'bold'
                        }}
                        key="game1"
                        icon={<XOutlined />}>
                        <Link to="/game1"> Game4  </Link>
                    </Menu.Item>
                    <Menu.Item
                        title="Game2"
                        style={{
                            fontWeight: 'bold'
                        }}
                        key="game2"
                        icon={<XOutlined />}>
                        <Link to="/game2"> Game3  </Link>
                    </Menu.Item>
                    <Menu.Item
                        title="Game3"
                        style={{
                            fontWeight: 'bold'
                        }}
                        key="game3"
                        icon={<XOutlined />}>
                        <Link to="/game2"> Game2  </Link>
                    </Menu.Item>
                    <Menu.Item
                        title="Game4"
                        style={{
                            fontWeight: 'bold'
                        }}
                        key="game4"
                        icon={<XOutlined />}>
                        <Link to="/game2"> Game1  </Link>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default NavigateMenu;