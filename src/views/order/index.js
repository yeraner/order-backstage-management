import React, { Component } from 'react'
import { Table, Card, Button, Modal, Typography, message } from 'antd';
import {getOrder,deleteById} from '../../request'
import {FormOutlined,DeleteOutlined} from '@ant-design/icons';
const ButtonGroup = Button.Group
const {Text} = Typography
const titleDisplayMap = {
    id:"ID",
    name:"姓名",
    phone:"手机号码",
    address:"地址",
    price:"应付金额",
    ordernum:"订单编号",
    date:"下单时间"
}
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
            isDeleteModelShow:false,
            deleteLoding:false,
            deleteOrderId:"",
            isEditOrderModelShow:false,
            editOrderLoding:false,
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
                            <Button onClick={this.editOrder.bind(this,record)} size="small" type="primary" icon={<FormOutlined />}>编辑</Button>
                            <Button onClick={this.deleteOrder.bind(this,record)} size="small" type="danger" icon={<DeleteOutlined />}>删除</Button>
                        </ButtonGroup>
                    </div>
                )
            }
        })
        return columns
    }
    getData =()=>{
        this.setState({loading:true})
        getOrder(this.state.limited,this.state.offset).then(res=>{
            // console.log(res)
            const columnsKey = Object.keys(res.orderlist[0])
            const columns =this.createColumns(columnsKey)
            this.setState({
                total:res.total,
                columns,
                dataSource:res.orderlist,
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
    deleteOrder=(record)=>{
        // console.log(record)
        this.setState({
            isDeleteModelShow:true,
            deleteOrderId:record.id
        })
    }
    //点击取消删除
    onCancel=()=>{
        this.setState({
            isDeleteModelShow:false,
        })
    }
    //删除订单
    onOkDelte=()=>{
        this.setState({deleteLoding:true})
        deleteById(this.state.deleteOrderId).then(res=>{
            // console.log(res)
            message.success(res.msg)
        }).finally(()=>{
            this.setState({
                deleteLoding:false,
                isDeleteModelShow:false,
            },()=>{
                this.getData()
            })
        })
    }
    //点击编辑
    editOrder=(record)=>{
        // console.log(record)
        this.props.history.push({
            pathname:`/admin/order/orderedit/${record.id}`,
            state:{
                name:record.name,
                phone:record.phone,
                address:record.address,
                price:record.price,
                ordernum:record.ordernum,
                date:record.date
            }
        })  
        localStorage.setItem("orderstate",JSON.stringify(record))    
    }
    componentDidMount(){
        this.getData()
    }
    render() {
        return (
        <Card title="后台订单管理列表" extra={<Button type="primary">more</Button>}>
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
                    visible={this.state.isDeleteModelShow}
                    onCancel={this.onCancel}
                    confirmLoading={this.state.deleteLoding}
                    onOk={this.onOkDelte}
                    centered={true}
                    maskClosable={false}
                >
                    <><Text type="danger">确定要删除此信息？</Text></>
                </Modal>
            </Card>
        )
    }
}
