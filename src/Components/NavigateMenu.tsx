import { Menu, MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, SettingOutlined, XOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyUserState, setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import userModel from "../Interfaces/userModel";
import { RootState } from "../Storage/Redux/store";

const NavigateMenu: React.FC = () => {
    const [currentMenu, setCurrentMenu] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData: userModel = useSelector(
        (state: RootState) => state.userAuthStore
    );

    type MenuItem = Required<MenuProps>['items'][number];

    type MenuItemUser = Required<MenuProps>['items'][number];   

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(setLoggedInUser({ ...emptyUserState }));
        navigate("/");
    };

    {/*Menu for Admin*/}
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

    {/*Menu for гыук*/}
    const itemsUser: MenuItemUser[] = [
        {
            label: 'User',
            key: 'user',
            icon: <UserOutlined />,           
            children: 
            userData.id ? [
                { label: "Выход", key: 'logout', onClick: handleLogout },
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

    {/*Меню для игр - формируется на основе таблицы Виды Игр*/}
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

    {/*Основное меню*/}
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
            <div >
                <Menu
                    onClick={onClickMenu}
                    selectedKeys={[currentMenu]}
                    mode="horizontal"
                    items={itemsMain}
                    theme="dark"
                    style={{ fontWeight: 'bold' }}>
                </Menu>
            </div>
            
            {/* Меню для User */}
            <div style={{
                float: 'right'
            }}>
                <Menu                                      
                    mode="horizontal"
                    items={itemsUser}
                    selectedKeys={[]}
                    theme="dark"                    
                    style={{ fontWeight: 'bold',justifyContent: 'center'
                    }}>
                </Menu>
            </div>
        </div>
    )
}

export default NavigateMenu;