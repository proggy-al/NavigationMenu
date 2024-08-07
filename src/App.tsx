import { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from './Storage/Redux/userAuthSlice';
import { jwtDecode } from 'jwt-decode';
import userModel from './Interfaces/userModel';
import HeaderLayout from './Layout/HeaderLayout';
import FooterLayout from './Layout/FooterLayout';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Layout, { Content } from 'antd/es/layout/layout';
import { theme } from 'antd';

const App = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  return (
    <div>
      <Layout>
        <HeaderLayout />

        <Content style={{
          padding: '0 48px',
        }}>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}>
            <Routes>
              <Route path='/' element={<Home />}> </Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/logout' element={<Home />}> </Route>
              <Route path='*' element={<NotFound />}></Route>
            </Routes>
          </div>
        </Content>
        <FooterLayout />
      </Layout>
    </div>
  );
}

export default App;
