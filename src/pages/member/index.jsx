import React, { Component } from 'react'
import {Button,Card,message,Modal,Table} from 'antd'

import {formateDate} from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import {PAGE_SIZE} from '../../utils/constant'
import {reqDeleteUser, reqUser,reqAddOrUpdateUser} from '../../api/index'
import UserForm from './user-form'

export default class Member extends Component {

  state={
    users:[], //所有用戶列表
    roles:[], //所有角色的列表
    isShow:false,
  }

  initColumns = ()=>{
    this.columns=[
      {
        title:'用戶名',
        dataIndex:'username'
      },
      {
        title:'信箱',
        dataIndex:'email'
      },
      {
        title:'註冊時間',
        dataIndex:'create_time',
        render:(create_time)=> formateDate(create_time)
      },
      
      {
        title:'操作',
        render:(user)=>(
          <span>
            <LinkButton onClick={()=>this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={()=>{this.deleteUser(user)}}>刪除</LinkButton>
          </span>
        )
      }
    ]
  }

  //顯示修改頁面
  showUpdate=(user)=>{
    this.user = user;
    this.setState({isShow:true})
  }

  //刪除用戶
  deleteUser=(user)=>{
    Modal.confirm(
      {
        title: `確認刪除${user.username}嗎?`,
        content: 'Some descriptions',
        onOk:async()=> {
          const result = await reqDeleteUser(user._id)
          if(result.status === 0){
            message.success('用戶刪除成功!')
            this.getUsers()
          }
        }
      }
    )
  }

  //添加或更新用戶
  addOrUpdateUser=async()=>{

    this.setState({isShow:false})

    //蒐集數據
      const user =this.form.getFieldsValue();
      this.form.resetFields()
      //如果是更新要給_id
      if(this.user){
        user._id = this.user._id
      }
    //發送請求
    const result = await reqAddOrUpdateUser(user)
    //更新顯示
    if(result.status === 0){
      message.success(`${this.user?'修改':'添加'}用戶成功`)
      this.getUsers()
    }
    
  }

  getUsers=async()=>{
    const result = await reqUser();
    if(result.status === 0){
      const {users,roles} = result.data;
      this.setState({users,roles})
    }
  }

  showAdd=()=>{
    this.user = null
    this.setState({isShow:true})
  }

  componentWillMount(){
    this.initColumns();
  }

  componentDidMount(){
    this.getUsers()
  }

  render() {
    const {users,isShow} = this.state
    const user =this.user || {}
    const title = (
      <Button type='primary' onClick={this.showAdd}>創建用戶</Button>
    )
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{defaultPageSize:PAGE_SIZE}}
        />
        <Modal
          title= {user._id ?'修改用戶':'添加用戶'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={()=>{
            this.form.resetFields()
            this.setState({isShow:false});
          }}
        >
          <UserForm setForm={(form)=>this.form= form} user={user} />
        </Modal>
      </Card>
    )
  }
}
