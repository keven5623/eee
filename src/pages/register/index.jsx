import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect,Link } from 'react-router-dom';

import logo from '../../assets/imgs/logo.png'
import {reqAddOrUpdateUser} from '../../api'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import './index.css'

class Regiser extends Component {

  
  //添加用戶
  handleSubmit=async()=>{

    //蒐集數據
      const user =this.form.getFieldsValue();
      this.form.resetFields()
      
    //發送請求
    const result = await reqAddOrUpdateUser(user)
    //更新顯示
    if(result.status === 0){
      message.success('註冊成功')

    }
    
  }


  render() {
    const username = memoryUtils.user.username ||memoryUtils.user.displayName || '';
    const form = this.props.form;
    const { getFieldDecorator } = form;
    return (
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt="logo" style={{width:'auto'}}/>
          <h1 style={{marginBottom: 0}}>後臺管理系統</h1>
        </div>
        <div className='login-content'>
          <h2 style={{textAlign:'center',fontSize:30,fontWeight:'bold'}}>註冊</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
                {
                  getFieldDecorator('username',{
                    rules: [
                      { required: true,whitespace:true, message: '請輸入用戶名' },
                      { min: 4, message: '用戶名至少4位' },
                      { max: 12, message: '用戶名最多12位' },
                      { pattern: /^[a-zA-Z0-9_]+$/, message: '用戶名必須是英文，數字，或下划線' }
                    ],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="帳號"
                    />
                  )
                }
            </Form.Item>
            <Form.Item>
            {
                  getFieldDecorator('password',{
                    rules: [
                      { required: true,whitespace:true, message: '請輸入密碼' },
                      { min: 4, message: '密碼至少4位' },
                      { max: 12, message: '密碼最多12位' },
                      { pattern: /^[a-zA-Z0-9_]+$/, message: '密碼必須是英文，數字，或下划線' }
                    ],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="密碼"
                    />
                  )
            }
            </Form.Item>
            <Form.Item>
                {
                  getFieldDecorator('email',{
                    rules: [
                      { required: true,whitespace:true, message: '請輸入信箱' },
                      { pattern: /^[a-z0-9._-]+@[a-z]+\.[a-z]{2,4}$/, message: '信箱格式錯誤' }
                    ],
                  })(
                    <Input
                      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="信箱"
                      style={{width:'65%',marginRight:10}}
                    />
                  )
                }
                <span><Button style={{fontWeight:'bold'}}>發送驗證信</Button></span>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                註冊
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrapLogin = Form.create()(Regiser)
export default WrapLogin
