import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Avatar, Button  } from 'antd';
import { UserOutlined, ExportOutlined,CloseOutlined  } from '@ant-design/icons';
import './index.css'
import {admainRoute} from '../../routes'
import {withRouter} from "react-router-dom"

const { Header, Content, Sider } = Layout;
const menu = admainRoute.filter(route=>route.isNav === true)

class index extends Component { 
    handleMenu = ({key})=>{   
      this.props.history.push(key)
  }
    handleMenuItem(newtitle){
      // console.log(newtitle)
      localStorage.setItem("state",newtitle)
      this.setState({
        title:localStorage.getItem("state")
      })
    }
    onExit=()=>{
      this.props.history.push('/login')
      localStorage.clear()
    }
    render() {
      const title = localStorage.getItem("state")
      const username = localStorage.getItem("username")
      // console.log(getTile)
        let selectedKeysArr = this.props.location.pathname.split("/")
        selectedKeysArr.length = 3
        return (
          <Layout>
            <Header className="header">
              <div className="logo">
                佰泰订单后台管理系统
              </div>
              <div className="avatar">
                <Avatar size={50} icon={<UserOutlined />} />
                <span style={{cursor:"pointer"}}>{username}</span>
                <ExportOutlined style={{fontSize: '24px'}}/>
                <span style={{cursor:"pointer"}} onClick={this.onExit}>退出</span>
              </div>
            </Header>
            <Layout>
              <Sider width={200} className="site-layout-background">
                <Menu
                  mode="inline"
                  defaultSelectedKeys={[menu[0].pathname]}
                  selectedKeys={[selectedKeysArr.join("/")]}
                  style={{ height: '100%', borderRight: 0 }}
                  onClick = {this.handleMenu}
                >
                  {
                            menu.map((route)=>{
                                return (
                                    <Menu.Item key={route.pathname} onClick={this.handleMenuItem.bind(this,route.title)}>
                                        {route.icon}
                                        {route.title}
                                    </Menu.Item>
                                )
                            })
                        }
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>
                    <Button
                      type="primary"
                      onClick={() => this.props.history.push('/admin/dashboard')}
                    >
                      {title}<CloseOutlined />
                    </Button>
                  </Breadcrumb.Item>  
                </Breadcrumb>
                <Content
                  className="site-layout-background"
                  style={{minHeight: 280,}}
                >
                  {this.props.children}
                </Content>
              </Layout>
              </Layout>
          </Layout>
        )
    }
}
export default withRouter(index)