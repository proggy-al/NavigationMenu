import { Layout, Menu, MenuProps, Image } from "antd";
import { Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Storage/Redux/store";
import { emptyUserState, setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import userModel from "../Interfaces/userModel";
import { useState } from "react";
import NavigateMenu from "../Components/NavigateMenu";

let logo = require("../Assets/Images/photo_2024-02-28_23-38-55.jpg");

type MenuItem = Required<MenuProps>['items'][number];

const HeaderLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const [current, setCurrent] = useState('home');

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const items: MenuItem[] = [
    {
      label: (
        <Image
          width={40}
          src={logo}
          alt="logo"
          title="Home"                    
        />
      ),
      key: 'home',
    },
    {
      label: 'CyberTechNet',
      key: 'brand',
    },
    {
      label: 'AdminPanel',
      key: 'admin',
      children: [
        {
          label: 'GamesItems',
          key: 'gameitems',
        },
        {
          label: 'Tournament',
          key: 'tournament',
        },
      ],
    },
    {
      label: "Что-то 1",
      key: 'hooks',
    },
    {
      label: 'MUI',
      key: 'mui',
    },
    {
      label: 'Что-то 2',
      key: 'callback',
    },
    {
      label: 'Что-то 3',
      key: 'custom',
    },
  ];
  

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Header style =
    {{textAlign: 'center',
      color: '#c93232',
      backgroundColor: '#1f3861'
      }}>

{/* 
      <Layout>
        <Menu style =
    {{textAlign: 'center',
      color: '#c93232',
      backgroundColor: '#1f3861'}}
          defaultOpenKeys={['1']}
          defaultSelectedKeys={['1']}          
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          theme= "dark"
          items={items}
        />
      </Layout>
      <Layout>
        <Menu style =
    {{textAlign: 'center',
      color: '#c93232',
      backgroundColor: '#1f3861'}}
          defaultOpenKeys={['1']}
          defaultSelectedKeys={['1']}          
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          theme= "dark"
          items={items}
        />
      </Layout> */}

<NavigateMenu/>


    </Header>

  );
};

export default HeaderLayout;