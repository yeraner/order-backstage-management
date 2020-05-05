import React, { Component } from 'react'
import { Card, Table, Button, Select, Modal, Typography,message  } from 'antd';
import {getList,deleteById,getGoodsById} from '../../request'
import {FormOutlined,DeleteOutlined} from '@ant-design/icons';
const { Option } = Select;
const {Text} = Typography
const ButtonGroup = Button.Group
const titleDisplayMap = {
    id:"ID",
    product:"产品名称",
    dec:"产品描述",
    proprice:"产品价格",
    pronum:"产品型号"
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
            isDeleteGoodModelShow:false,
            deleteGoodId:'',
            deleteGoodLoding:false,
            value:''
        }
    }
    createColumns = columnsKey =>{
        const columns = columnsKey.map(item=>{
            return {
                title: titleDisplayMap[item],
                dataIndex: item,
                key: item,
                ellipsis: true,
            }
        })
        columns.push({
            title:"产品图片",
            key:"img",
            render:(record)=>{
                return (
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1732692405,2057753661&fm=26&gp=0.jpg" alt="" width="100px"/>
                )
            }
        })
        columns.push({
            title:"操作",
            key:"action",
            render:(text,record)=>{
                return (
                    <div>
                        <ButtonGroup>
                            <Button onClick={this.editGood.bind(this,record)} size="small" type="primary" icon={<FormOutlined />}>编辑</Button>
                            <Button onClick={this.deleteGood.bind(this,record)} size="small" type="danger" icon={<DeleteOutlined />}>删除</Button>
                        </ButtonGroup>
                    </div>
                )
            }
        })
        return columns
    }
    //点击每一页切换数据
    handleChange = (page,pageSize) =>{
        this.setState({
            limited:pageSize,
            offset:pageSize * (page-1),
        },()=>{
            // this.getData()
            if(this.state.value){
                this.onChange()
            }else{
                this.getData()
            }
        })
        // console.log(this.state.dataSource)
    }
    deleteGood=(record)=>{
        this.setState({
            isDeleteGoodModelShow:true,
            deleteGoodId:record.id
        })
    }
    onCancel=()=>{
        this.setState({
            isDeleteGoodModelShow:false,
        })
    }
    onOkDelte=()=>{
        this.setState({deleteGoodLoding:true})
        deleteById(this.state.deleteGoodId).then(res=>{
            message.success(res.msg)
        }).finally(()=>{
            this.setState({
                deleteGoodLoding:false,
                isDeleteGoodModelShow:false,
            },()=>{
                this.getData()
            })
        })
    }
    editGood=(record)=>{
        console.log(record)
        this.props.history.push({
            pathname:`/admin/list/listedit/${record.id}`,
            state:{
                product:record.product,
                dec:record.dec,
                address:record.address,
                price:record.price,
                proprice:record.proprice,
                pronum:record.pronum,
            }
        })  
        localStorage.setItem("liststate",JSON.stringify(record))
    }
    onChange=(value)=>{
        // console.log(value)
        getGoodsById(this.state.dataSource.id).then(res=>{
            // console.log(res)
            this.setState({
                value:value,
                dataSource:res.goodlist.filter((item)=>{
                    if(item.product===value){
                        return item
                    }
                })
            })
        })
        
    }
    getData=()=>{
        this.setState({loading:true})
        getList().then(res=>{
            // console.log(res)
            const columnsKey = Object.keys(res.list[0])
            const columns =this.createColumns(columnsKey)
            this.setState({
                total:res.total,
                columns,
                dataSource:res.list,
            })
        }).finally(()=>{
            this.setState({loading:false})
        })

    }
    componentDidMount(){
        this.getData()
    }
    render() {
        return (
            <Card title="后台管理产品列表" extra={<Select
                showSearch
                style={{ width: 200, color:"#000" }}
                placeholder="分类搜索"
                optionFilterProp="children"
                onChange={this.onChange}
              >
                <Option value="实木地板">实木地板</Option>
                <Option value="多层木地板">多层木地板</Option>
                <Option value="强化复合地板">强化复合地板</Option>
                <Option value="防腐木地板">防腐木地板</Option>
              </Select>}>
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
                    visible={this.state.isDeleteGoodModelShow}
                    onCancel={this.onCancel}
                    confirmLoading={this.state.deleteGoodLoding}
                    onOk={this.onOkDelte}
                    centered={true}
                    maskClosable={false}
                >
                    <><Text type="danger">确定要删除此商品？</Text></>
                </Modal>
            </Card>
        )
    }
}
