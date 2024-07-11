import { Menu, Image, MenuProps, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, SettingOutlined, XOutlined, FullscreenOutlined,HomeFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyUserState, setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import userModel from "../Interfaces/userModel";
import { RootState } from "../Storage/Redux/store";
import './index.css';
import Register from "../Pages/Register";
import Title from "antd/es/skeleton/Title";

let logoPic = require("../Assets/Images/123.jpg");

const NavigateMenu: React.FC = () => {
    const [currentMenuMain, setCurrentMenuMain] = useState('');
    const [currentMenuRight, setCurrentMenuRight] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData: userModel = useSelector(
        (state: RootState) => state.userAuthStore
    );

    type MenuItemRight = Required<MenuProps>['items'][number];

    type MenuItemMain = Required<MenuProps>['items'][number];

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(setLoggedInUser({ ...emptyUserState }));
        navigate("/");
    };

    const itemsAdmin: MenuItemMain[] = [
        {
            label: 'Admin',
            key: 'admin',
            icon: <SettingOutlined />,
            disabled: userData.role?.valueOf() === "admin",
            children: [
                { label: (<Link to={"/info"}>Новости</Link>), key: 'info' },
                { label: (<Link to={"/country"}>Страны</Link>), key: 'country' },
                { label: (<Link to={"/player"}>Игроки</Link>), key: 'player' },
                { label: (<Link to={"/team"}>Команды</Link>), key: 'team' },
                { label: (<Link to={"/tournament"}>Турниры</Link>), key: 'tournament' },
            ],
        },
    ];

    const itemsGame: MenuItemMain[] = [
        {
            label: (<Link to={"/game1"}>Game 1</Link>),
            key: 'game1',
            icon: <XOutlined />,
        },
        {
            label: (<Link to={"/game2"}>Game 2</Link>),
            key: 'game2',
            icon: <XOutlined />,
        },
        {
            label: (<Link to={"/game3"}>Game 3</Link>),
            key: 'game3',
            icon: <XOutlined />,
        },
        {
            label: (<Link to={"/game4"}>Game 4</Link>),
            key: 'game4',
            icon: <XOutlined />,
        },
        {
            label: (<Link to={"/game5"}>Game 5</Link>),
            key: 'game5',
            icon: <XOutlined />,
        },
    ];

    const LoginM: MenuItemRight = 
    {
        label: 'Login',
            key: 'login',
            icon: <UserOutlined />
    }

    const LogoutM: MenuItemRight = 
    {
        label: 'Logout',
            key: 'logout',
            icon: <UserOutlined />
    }

    const RgisterM: MenuItemRight = 
    {
        label: 'Register',
            key: 'register',
            icon: <UserOutlined />
    }

    const itemsRight: MenuItemRight[] = 
    !userData.id ? 
    [
        LoginM, RgisterM ]:
        [LogoutM]; 

    const itemsMain: MenuItemMain[] = [
        ...itemsAdmin,
        ...itemsGame,
      ];


    const onClickMenuMain: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrentMenuMain(e.key);
        setCurrentMenuRight('');
    };

    const onClickMenuRight: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrentMenuRight(e.key);
        setCurrentMenuMain('');
    };

const logoHome = {HomeFilled }

    return (
        <div>
            <div style={{float:'left'}}>
                <Image ></Image>
            </div>
            <div style={{float:'left'}}>
                {/* <a href="/Home">
                    <Image
                        src={logoPic}
                        alt="logo"
                        style={{display: 'inline-block',width: '150px'}}
                        preview={false}
                    />
                </a> */}
            {/* Main Menu */}
                <Menu
                    onClick={onClickMenuMain}
                    selectedKeys={[currentMenuMain]}
                    mode="horizontal"
                    items={itemsMain}
                    theme="dark"
                    style={{ fontWeight: 'bold'}}
                    overflowedIndicator={<UserOutlined />}
                    >
                </Menu>
            </div>
            
            {/* Right Menu*/}
            <div style={{float:'right'}}>
                <Menu
                    onClick={onClickMenuRight}
                    selectedKeys={[currentMenuRight]}
                    mode="horizontal"
                    items={itemsRight}
                    theme="dark"
                    overflowedIndicator={<UserOutlined />}
                    style={{ fontWeight: 'bold',backgroundColor:'blue'
                    }}>
                </Menu>
            </div>
        </div>
    )
}

export default NavigateMenu;