import React, { Component } from 'react'
import { Card,  Form, Input, message,Button, Spin } from 'antd';
import {saveOrderById} from '../../request'
// import moment from 'moment'
const layout = {
    labelCol:{
        xs:{span:24},
        sm:{span:4}
    },
    wrapperCol:{
        xs:{span:24},
        sm:{span:16}
    }
}
const tailLayout = {
    wrapperCol: { offset:4, span: 16 },
};
export default class orderedit extends Component {
    constructor(){
        super()
        this.state={
            isLoading:false
        }
    }
    componentDidMount(){
        if(!this.props.location.state && !localStorage.getItem("orderstate")){
            this.props.history.push("/admin/order")
        }
    }
    onFinish = values => {
        this.setState({isLoading:true})
        saveOrderById(this.props.match.params.id,values).then(res=>{
            message.success(res.msg)
         }).finally(()=>{
            this.setState({isLoading:false})
            this.props.history.push("/admin/order")
        })
    };
    back =()=>{
        this.props.history.push("/admin/order")
    }
    render() {
        const state = this.props.location.state || JSON.parse(localStorage.getItem("orderstate"))
        return (
            <Card title="订单编辑" extra={<Button type="primary" onClick={this.back}>返回</Button>}>
                <Spin spinning={this.state.isLoading}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            name:state.name,
                            phone:state.phone,
                            address:state.address,
                            price:state.price,
                            ordernum:state.ordernum,
                            date:state.date
                        }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item shouldUpdate
                            label="姓名"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input autoFocus/>
                        </Form.Item>

                        <Form.Item
                            label="手机号"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="地址"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="应付金额"
                            name="price"
                            rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="订单编号"
                            name="ordernum"
                            rules={[{ required: true, message: 'Please input your ordernum!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="下单时间"
                            name="date"
                            rules={[{ required: true, message: 'Please input your date!' }]}
                        >
                            {/* <DatePicker/> */}
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        )
    }
}
