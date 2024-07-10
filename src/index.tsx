import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './Storage/Redux/store';
import { ToastContainer} from "react-toastify";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ru_RU from "antd/lib/locale/ru_RU";
import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <Provider store={store}>
  <ConfigProvider locale={ru_RU}>
  <BrowserRouter>
    <ToastContainer />    
    <React.StrictMode>
    <App/>    
    </React.StrictMode>
  </BrowserRouter>
  </ConfigProvider>
</Provider>
);
