import React, { Component } from 'react';
import { Table, Card, Button, Modal, Typography, Form, Input,message } from 'antd';
import {FormOutlined,DeleteOutlined} from '@ant-design/icons';
import {getUser,deleteById,saveUserById} from '../../request';
const ButtonGroup = Button.Group
const {Text} = Typography
const titleDisplayMap = {
    id:"ID",
    username:"用户名",
    phone:"手机号码",
    address:"地址"
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

export default class index extends Component {
    constructor(){
        super()
        this.state={
            dataSource:[],
            columns:[],
            total:0,
            loading:false,
            limited:10,
            offset:0,
            isDeleteUserModelShow:false,  //模态窗口默认不显示
            deleteUserLoding:false,
            deleteUserId:"",
            isEditUserModelShow:false,
            usernameValues:"",  //表单初始值
            phoneValues:"",  
            addressValues:"", 
            userId:"",
            editUserLoding:false
    }
    }
    
    //创建列
    createColumns = columnsKey =>{
        const columns = columnsKey.map(item=>{
            return {
                title: titleDisplayMap[item],
                dataIndex: item,
                key: item,
            }
        })
        columns.push({
            title:"操作",
            key:"action",
            render:(text,record)=>{
                return (
                    <div>
                        <ButtonGroup>
                            <Button onClick={this.editUser.bind(this,record)} size="small" type="primary" icon={<FormOutlined />}>编辑</Button>
                            <Button onClick={this.deleteUser.bind(this,record)} size="small" type="danger" icon={<DeleteOutlined />}>删除</Button>
                        </ButtonGroup>
                    </div>
                )
            }
        })
        return columns
    }
    getData=()=>{
        this.setState({loading:true})
        getUser(this.state.limited,this.state.offset).then(res=>{
        // console.log(res)
        const columnsKey = Object.keys(res.userlist[0])
        const columns =this.createColumns(columnsKey)
        this.setState({
            total:res.total,
            columns,
            dataSource:res.userlist,
        })
    }).finally(()=>{
        this.setState({loading:false})
    })
    }
    //点击每一页切换数据
    handleChange = (page,pageSize) =>{
        // console.log(page,pageSize)
        this.setState({
            limited:pageSize,
            offset:pageSize * (page-1)
        },()=>{
            this.getData()
        })
        
    }
    //点击删除
    deleteUser = (record) =>{
        // console.log(record)
        this.setState({
            isDeleteUserModelShow:true,
            deleteUserId:record.id
        })
    }
    //点击取消删除
    onCancel =() =>{
        this.setState({
            isDeleteUserModelShow:false,
        })
    }
    //点击删除确定
    onOkDelte = () =>{
        this.setState({deleteUserLoding:true})
        deleteById(this.state.deleteUserId).then(res=>{
            //删除完毕后，是回到首页呢还是继续停在当前页？
            // this.setState({
            //     offset:0 //回到首页
            // },()=>{
            //     this.getData()
            // })
            message.success(res.msg)
            
        }).finally(()=>{
            this.setState({
                deleteUserLoding:false,
                isDeleteUserModelShow:false
            },()=>{
                this.getData()
            })
        })
    }
    //点击编辑
    editUser = (record) =>{
        console.log(record)
        this.setState({
            isEditUserModelShow:true,
            usernameValues:record.username,
            phoneValues:record.phone,
            addressValues:record.address,
            userId:record.id
        })
    }
    //提交编辑内容
    onOkEdit = () =>{
        this.setState({editUserLoding:true})
        const {usernameValues,phoneValues,addressValues,userId}=this.state
        if(usernameValues && phoneValues && addressValues && userId){   
            saveUserById(userId,{
                username:usernameValues,
                phone:phoneValues,
                address:addressValues
            },).then(res=>{
                message.success(res.msg)
            }).finally(()=>{
                this.setState({
                    editUserLoding:false,
                    isEditUserModelShow:false
                })
            })
        }
       
    }
    onChange = (e) =>{
        // console.log(e.target,e.target.id.split("_")[1])
        let a = { }
        a[e.target.id.split("_")[1]+"Values"]=e.target.value
        this.setState(a);
    }
    //点击取消编辑
    onCancelEdit = () =>{
        this.setState({
            isEditUserModelShow:false,
        })
    }
    componentDidMount(){
        this.getData()
    }
    render() {
        return (
            <Card title="后台用户管理列表"  extra={<Button type="primary">more</Button>}>
                <Table dataSource={this.state.dataSource} columns={this.state.columns}
                    rowKey={record=>record.id} 
                    loading={this.state.loading}
                    pagination={{
                        current: this.state.offset/this.state.limited +1,
                        position:['bottomRight'],  //分页的位置
                        total:this.state.total,
                        hideOnSinglePage:true, //一页的时候不需要显示分页器
                        showQuickJumper:true, //可以跳转到某一页
                        pageSizeOptions:["10","15","20","25"],//可以指定每页显示多少条数据
                        onChange:this.handleChange //点击每一页的时候触发
                    }}
                />
                <Modal
                    title="提示信息"
                    visible={this.state.isDeleteUserModelShow}
                    onCancel={this.onCancel}
                    confirmLoading={this.state.deleteUserLoding}
                    onOk={this.onOkDelte}
                    centered={true}
                    maskClosable={false}
                >
                    <><Text type="danger">确定要删除此信息？</Text></>
                </Modal>
                <Modal
                    title="编辑用户信息"
                    visible={this.state.isEditUserModelShow}
                    confirmLoading={this.state.editUserLoding}
                    onCancel={this.onCancelEdit}
                    onOk={this.onOkEdit}
                >
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            username:this.state.usernameValues,
                            phone:this.state.phoneValues,
                            address:this.state.addressValues
                        }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input onChange={this.onChange} id="1"/>
                        </Form.Item>

                        <Form.Item
                            label="手机号"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input onChange={this.onChange} id="2"/>
                        </Form.Item>
                        <Form.Item
                            label="地址"
                            name="address"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input onChange={this.onChange} id="3"/>
                        </Form.Item>
                        </Form>
                </Modal>
            </Card>
        )
    }
}
