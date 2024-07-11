import { Menu, Image, MenuProps, Divider, Layout, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AppstoreOutlined, UserOutlined, SettingOutlined, XOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useState } from "react";
import SubMenu from "antd/es/menu/SubMenu";

let logoPic = require("../Assets/Images/123.jpg");

const NavigateMenu: React.FC = () => {
    const [currentMenu, setCurrentMenu] = useState('');
    const [currentMenuGames, setCurrentMenuGames] = useState('');
    const navigate = useNavigate();

    type MenuItem = Required<MenuProps>['items'][number];

    type MenuItemGame = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        {
            label: 'Панель админа',
            key: 'admin',
            icon: <SettingOutlined />,
            disabled: true,
            children: [
                { label: (<Link to={"/info"}>Новости</Link>), key: 'info' },
                { label: (<Link to={"/country"}>Страны</Link>), key: 'country' },
                { label: (<Link to={"/player"}>Игроки</Link>), key: 'player' },
                { label: (<Link to={"/team"}>Команды</Link>), key: 'team' },
                { label: (<Link to={"/tournament"}>Турниры</Link>), key: 'team' },
            ],
        },
        {
            label: 'Пользователь',
            key: 'user',
            icon: <UserOutlined />,
            children: [
                { label: (<Link to={"/login"}>Вход</Link>), key: 'info' },
                { label: (<Link to={"/register"}>Регистрация</Link>), key: 'country' },
                { label: (<Link to={"/logout"}>Выход</Link>), key: 'player' }
            ],
        },
    ];

    const itemsGame: MenuItemGame[] = [
        {
            label: (<Link to={"/login"}>Game 1</Link>),
            key: 'game1',
            icon: <SettingOutlined />,
        },
        {
            label: (<Link to={"/login"}>Game 2</Link>),
            key: 'game2',
            icon: <XOutlined />,
        },
        {
            label: (<Link to={"/login"}>Game 3</Link>),
            key: 'game3',
            icon: <XOutlined />,
        },
        {
            label: (<Link to={"/login"}>Game 4</Link>),
            key: 'game4',
            icon: <XOutlined />,
        },
        {
            label: (<Link to={"/login"}>Game 5</Link>),
            key: 'game5',
            icon: <XOutlined />,
        },
    ];





    const onClickMenuGames: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrentMenuGames(e.key);
        setCurrentMenu('');
    };

    const onClickMenu: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrentMenu(e.key);
        setCurrentMenuGames('');
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
            {/* this is for Admin & Login/Register/Logout 
            <div style={{
                float: 'left'}}>
                <Menu
                    selectedKeys={[currentMenu]}
                    style={{ display: 'block' }}
                    mode="horizontal"
                    onClick={onClickMenu}
                    theme="dark">
                    <SubMenu
                        style={{
                            fontWeight: 'bold', float: 'left'
                        }}
                        key="admin"
                        icon={<SettingOutlined />}
                        title="Панель админа">
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
            </div>*/}
            <div>
                <Menu onClick={onClickMenu} selectedKeys={[currentMenu]} mode="horizontal" items={items} theme="dark">

                </Menu>
            </div>
            <div>
                <Menu onClick={onClickMenuGames} selectedKeys={[currentMenuGames]} mode="horizontal" items={itemsGame} theme="dark" overflowedIndicator={<FullscreenOutlined />}>

                </Menu>


                {/* this is for Games 
            <div>
                <Menu
                    //style={{ marginLeft: 'auto'}}
                    style={{ 
                        //marginLeft: 'auto',
                        //alignItems: "center",
                        //marginLeft: 'auto',
                        //justifyContent: 'center'
                        }}
                    theme="dark"
                    onClick={onClickMenuGames}
                    selectedKeys={[currentMenuGames]}
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
                        <Link to="/game3"> Game2  </Link>
                    </Menu.Item>
                    <Menu.Item
                        title="Game4"
                        style={{
                            fontWeight: 'bold'
                        }}
                        key="game4"
                        icon={<XOutlined />}>
                        <Link to="/game4"> Game1  </Link>
                    </Menu.Item>
                </Menu>
            </div>*/}
            </div>
        </div>
    )
}

export default NavigateMenu;