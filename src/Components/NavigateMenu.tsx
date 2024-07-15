import { Menu, MenuProps, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, SettingOutlined, XOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyUserState, setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import userModel from "../Interfaces/userModel";
import { RootState } from "../Storage/Redux/store";
import { Typography } from 'antd';
import { DrawerLogin } from "./DrawerLogin";
import { DrawerRegister } from "./DrawRegister";

const { Paragraph } = Typography;

const NavigateMenu: React.FC = () => {
    const [currentMenu, setCurrentMenu] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData: userModel = useSelector(
        (state: RootState) => state.userAuthStore
    );
    const [IsLoginOpen, setIsLoginOpen] = useState(false);
    const [IsRegisterOpen, setIsRegisterOpen] = useState(false);

    const onLogin = () => {
        setIsLoginOpen(true);
    }

    const onRegister = () => {
        setIsRegisterOpen(true);
    }

    const onCloseLogin = () => {
        setIsLoginOpen(false);
    };

    const onCloseRegister = () => {
        setIsRegisterOpen(false);
    };

    type MenuItem = Required<MenuProps>['items'][number];

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(setLoggedInUser({ ...emptyUserState }));
        navigate("/");
    };

    {/*Menu for Admin*/ }
    const itemsAdmin: MenuItem[] = [
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
        }
    ];

    {/*Меню для игр - формируется на основе таблицы Виды Игр*/ }
    const itemsGame: MenuItem[] = [
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

    {/*Основное меню*/ }
    const itemsMain: MenuItem[] = [
        ...itemsAdmin,
        ...itemsGame,
    ];

    const onClickMenu: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrentMenu(e.key);
    };

    return (
        <div >
            {/*Главное меню*/}
            <div style={{
                float: 'left',
                width: '80%',
                textAlign: "center",

            }}>
                <Menu
                    onClick={onClickMenu}
                    selectedKeys={[currentMenu]}
                    mode="horizontal"
                    items={itemsMain}
                    theme="dark"
                    style={{ fontWeight: 'bold', justifyContent: 'center' }}
                    overflowedIndicator={<FullscreenOutlined />}>
                </Menu>
            </div>

            {/* Меню для User */}
            <div style={{ textAlign: "right", minWidth: '20%', position: 'relative'}}>
                <Space direction="horizontal">
                    {!(userData.id) &&
                        <Paragraph style={{ fontWeight: 'bold',fontSize:'16px' }} strong><a onClick={onLogin}>Вход</a></Paragraph>
                    }
                    {!(userData.id) && 
                        <Paragraph style={{ fontWeight: 'bold',fontSize:'16px' }} strong><a onClick={onRegister}>Регистрация</a></Paragraph>}

                    {userData.id && 
                        <Paragraph style={{ fontWeight: 'bold',fontSize:'16px' }} strong><a onClick={handleLogout}>Выход</a></Paragraph>}
                    <DrawerLogin
                        IsLoginOpen={IsLoginOpen}
                        handleCancel={onCloseLogin}/>
                    <DrawerRegister
                        IsRegisterOpen={IsRegisterOpen}
                        handleCancel={onCloseRegister}/>
                </Space>
            </div>
        </div>
    )
}

export default NavigateMenu;