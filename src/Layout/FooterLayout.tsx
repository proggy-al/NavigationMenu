import { Footer } from "antd/es/layout/layout";
import  './layout.css';


const FooterLayout: React.FC = () => {
  return (    
      <Footer style =
      {{textAlign: 'center',
        color: '#b82121',
        backgroundColor: '#1f3861'
        }}>
        &copy; Made by Home {new Date().getFullYear()}
      </Footer>    
  )
}

export default FooterLayout;