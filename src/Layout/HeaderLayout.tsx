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

const HeaderLayout = () => {

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  return (
    <div>
    <Header>
      <NavigateMenu />
    </Header>
    </div>
  );
};

export default HeaderLayout;