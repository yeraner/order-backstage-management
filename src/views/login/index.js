import React, { Component } from 'react'
import { Form, Input, Button, Checkbox,Card,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {login,checkname} from '../../request'

const layout = {
    labelCol:{
        xs:{span:16},
        sm:{span:16}
    },
    wrapperCol:{
        xs:{span:16},
        sm:{span:16},
        offset: 4
    }
  };

export default class index extends Component {
    info = (text) => {
        message.info(text);
      }
    onFinish=values=>{
        // console.log(values)
        checkname(values.username).then(resn=>{
            // console.log(res)
            if(resn.data.type===0){
                login(values.username,values.password).then(res=>{
                    // console.log(res)
                   if(res.data.type){
                      this.info("登录成功")
                      localStorage.setItem("authorization",res.data.authorization)
                      localStorage.setItem("uid",res.data.datalist.uid)
                      localStorage.setItem("username",res.data.datalist.username)
                      localStorage.setItem("state","首页")
                      this.props.history.push('/admin/dashboard')
                    }else{
                    this.info("登录失败")
                   }
                })
              }else{
                  this.info("")
              }
        })
    }
    render() {
        return (
            <div style={{height:"100%", backgroundImage:"url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588660939894&di=54f5c9b20d9cf1547440ebb6580e45f1&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F17%2F13%2F579c1e7249a1a_610.jpg)"}}>
                <Card title="佰泰订单管理系统" 
                    bordered={false} 
                    style={{ width: 470, position:"absolute", top:"50%",left:"50%", transform:"translate(-50%,-50%)"}} 
                    headStyle={{ background:"#1890ff", color:"#fff",textAlign:"center"}}>
                <Form
                    {...layout}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ 
                        username:18269137161,
                        password:"a123456"
                     }}
                    onFinish={this.onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入帐号" name="username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="请输入密码"
                        name="password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox>Remember me</Checkbox>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft:"80px"}}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                </Card>
            </div>
        )
    }
}
