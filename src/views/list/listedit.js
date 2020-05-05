import React, { Component } from 'react'
import { Card,  Form, Input, message,Button, Spin, Upload} from 'antd';
import { UploadOutlined  } from '@ant-design/icons';
import {saveproductById} from '../../request'
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
export default class listedit extends Component {
    constructor(){
        super()
        this.state={
            isLoading:false,
        }
    }
    componentDidMount(){
        if(!this.props.location.state && !localStorage.getItem("liststate")){
            this.props.history.push("/admin/list")
        }
    }
    onChange(info){
        if (info.file.status === 'done') {
        message.success('上传成功');
        } else if (info.file.status === 'error') {
        message.error('上传失败');
        }
    }
    onFinish=values=>{
        saveproductById(this.props.match.params.id,values).then(res=>{
            message.success(res.msg)
         }).finally(()=>{
            this.setState({isLoading:false})
            // this.props.history.push("/admin/list")
        })
    }
    back =()=>{
        this.props.history.push("/admin/list")
    }
    render() {
        // const {props} = this.state.props
        const state = this.props.location.state || JSON.parse(localStorage.getItem("liststate"))
        return (
            <Card title="产品编辑" extra={<Button type="primary" onClick={this.back}>返回</Button>}>
                <Spin spinning={this.state.isLoading}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            product:state.product,
                            dec:state.dec,
                            address:state.address,
                            price:state.price,
                            proprice:state.proprice,
                            pronum:state.pronum,
                        }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item shouldUpdate
                            label="产品名称"
                            name="product"
                            rules={[{ required: true, message: 'Please input your productname!' }]}
                        >
                            <Input autoFocus/>
                        </Form.Item>

                        <Form.Item
                            label="产品描述"
                            name="dec"
                            rules={[{ required: true, message: 'Please input your dec!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="产品价格"
                            name="proprice"
                            rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="产品型号"
                            name="pronum"
                            rules={[{ required: true, message: 'Please input your num!' }]}
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            label="产品图片"
                            name="img"
                            rules={[{ required: true, message: 'Please input your img!' }]}
                        >
                            <Upload 
                                action='http://rap2.taobao.org:38080/app/mock/252946/v1/productSave/:id'
                                listType='picture'
                                onChange={this.onChange}
                            >
                                <Button>
                                    <UploadOutlined /> Upload
                                </Button>
                            </Upload>
                             
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
