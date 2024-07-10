import { Footer } from "antd/es/layout/layout";
import  './layout.css';


const FooterLayout: React.FC = () => {
  return (    
      <Footer style =
      {{textAlign: 'center',
        color: '#a6adb4',
        fontWeight: 'bold',
        backgroundColor: '#001529'
        }}>
        &copy; Made by Home {new Date().getFullYear()}
      </Footer>    
  )
}

export default FooterLayout;