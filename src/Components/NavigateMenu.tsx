import { Menu, Image, MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, SettingOutlined, XOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyUserState, setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import userModel from "../Interfaces/userModel";
import { RootState } from "../Storage/Redux/store";

let logoPic = require("../Assets/Images/123.jpg");

const NavigateMenu: React.FC = () => {
    const [currentMenuGames, setCurrentMenuGames] = useState('');
    const [currentMenuAdminAndUser, setCurrentMenuAdminAndUser] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData: userModel = useSelector(
        (state: RootState) => state.userAuthStore
    );

    type MenuItemAdminAndUser = Required<MenuProps>['items'][number];

    type MenuItemGame = Required<MenuProps>['items'][number];

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(setLoggedInUser({ ...emptyUserState }));
        navigate("/");
    };

    const itemsAdminAndUser: MenuItemAdminAndUser[] = [
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
        {
            label: 'User',
            key: 'user',
            icon: <UserOutlined />,           
            children: 
            userData.id ? [
                { label: "Выход", key: 'logout' },
            ] : 
            [
                {
                    label: (<Link to={"/login"}>Вход</Link>),
                    key: 'login'
                },
                {
                    label: (<Link to={"/register"}>Регистрация</Link>),
                    key: 'register'
                }
            ],
        }
    ];

    const itemsGame: MenuItemGame[] = [
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

    const onClickMenuGames: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrentMenuGames(e.key);
        setCurrentMenuAdminAndUser('');
    };

    const onClickMenuAdminAndUser: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrentMenuAdminAndUser(e.key);
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
            {/* this is for Admin and User*/}
            <div style={{
                float: 'left',
                minWidth: 200
            }}>
                <Menu
                    onClick={onClickMenuAdminAndUser}
                    selectedKeys={[currentMenuAdminAndUser]}
                    mode="horizontal"
                    items={itemsAdminAndUser}
                    theme="dark"
                    style={{ fontWeight: 'bold' }}>
                </Menu>
            </div>
            
            {/* this is for Games */}
            <div>
                <Menu
                    onClick={onClickMenuGames}
                    selectedKeys={[currentMenuGames]}
                    mode="horizontal"
                    items={itemsGame}
                    theme="dark"
                    overflowedIndicator={<FullscreenOutlined />}
                    style={{ fontWeight: 'bold',justifyContent: 'center'
                    }}>
                </Menu>
            </div>
        </div>
    )
}

export default NavigateMenu;