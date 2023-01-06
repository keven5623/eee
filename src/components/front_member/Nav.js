import React, { Component } from 'react'
import { Modal ,Dropdown,Menu,Icon} from 'antd';
import {Link} from 'react-router-dom'


import logo from "./img/logo.png";
import ss from './img/ss.jpg'
import LinkButton from '../link-button'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'



export default class Nav extends Component{

  

  logout = ()=>{
    Modal.confirm({
      content: '確定登出嗎',
      onOk:()=> {
        //刪除user數據
        storageUtils.removeUser();
        storageUtils.removeWatch();
        memoryUtils.user = {};
        this.setState({})
      }
    })
  }

  

  loginFront=()=>{
    
  }

  render(){
    const username = memoryUtils.user.username ||memoryUtils.user.displayName || '';
    
    const menu = (
      <Menu style={{marginTop:10,textAlign:'center',marginRight:15,backgroundColor:'#4967ff'}}>
        
          <div style={{color:'black',margin:'3px 0'}}>
            {username}
          </div>
        
        <Menu.Item>
          <Link to='/admin'  style={{color:'white'}}>            
            <Icon type="bar-chart" />&nbsp;
              前往後臺
            </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/frontmember'  style={{color:'white'}}>
            <Icon type="user" />&nbsp;
            會員資料
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Icon type="logout" style={{color:'white'}}/>
          <LinkButton style={{color:'white'}} onClick={this.logout}>登出</LinkButton>
        </Menu.Item>
      </Menu>
    );
    return(
      <nav>
        <img src={logo} alt="" style={{margin:'0 10px',width:160}}/>
        <input type="text" placeholder="查股市、查課程" />

        <a href="#" className="firstA">最新資訊</a>
        <a href="#" className="firstA">交易模擬器</a>
        <a href="#" className="firstA">課程列表</a>
        <a href="#" className="firstA">我的課程</a>

        <a href="#">
          <svg
          className="collection"
          width="20"
          height="26"
          viewBox="0 0 20 26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.1429 0H2.85714C1.28571 0 0.014286 1.3 0.014286 2.88889L0 26L10 21.6667L20 26V2.88889C20 1.3 18.7143 0 17.1429 0ZM17.1429 21.6667L10 18.5178L2.85714 21.6667V2.88889H17.1429V21.6667Z" />
          </svg>
        </a>
        <a href="#">
          <svg
            className="shoppingCart"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.2 19.2C5.88 19.2 4.812 20.28 4.812 21.6C4.812 22.92 5.88 24 7.2 24C8.52 24 9.6 22.92 9.6 21.6C9.6 20.28 8.52 19.2 7.2 19.2ZM0 0V2.4H2.4L6.72 11.508L5.1 14.448C4.908 14.784 4.8 15.18 4.8 15.6C4.8 16.92 5.88 18 7.2 18H21.6V15.6H7.704C7.536 15.6 7.404 15.468 7.404 15.3L7.44 15.156L8.52 13.2H17.46C18.36 13.2 19.152 12.708 19.56 11.964L23.856 4.176C23.952 4.008 24 3.804 24 3.6C24 2.94 23.46 2.4 22.8 2.4H5.052L3.924 0H0ZM19.2 19.2C17.88 19.2 16.812 20.28 16.812 21.6C16.812 22.92 17.88 24 19.2 24C20.52 24 21.6 22.92 21.6 21.6C21.6 20.28 20.52 19.2 19.2 19.2Z" />
          </svg>
        </a>
        <a href="#">
          <svg
            className="alert"
            width="21"
            height="24"
            viewBox="0 0 21 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.01143 21.7257C8.01143 22.9829 9.02857 24 10.2857 24C11.5429 24 12.56 22.9829 12.56 21.7257H8.01143ZM18.1486 16.9371V10.2857C18.1486 6.57143 15.5771 3.46286 12.1029 2.64V1.81714C12.1029 0.811428 11.2914 0 10.2857 0C9.28 0 8.46857 0.811428 8.46857 1.81714V2.64C4.99429 3.46286 2.42286 6.57143 2.42286 10.2857V16.9371L0 19.36V20.5714H20.5714V19.36L18.1486 16.9371Z" />
          </svg>
        </a>

        {
          (!!username) ? 
          (<Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <img src={ss} alt="avatorfront"/>
            </a>
          </Dropdown>)
          : 
          (<div className='loginMember' onClick={this.loginFront}>
            登入會員
          </div>)
        }
        
        
      </nav>
    )
  }
    
};

