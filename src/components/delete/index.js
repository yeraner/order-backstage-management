import React, { Component } from 'react'
import {Modal,Typography,} from 'antd'
import {deleteUserById} from '../../request'
const {Text} = Typography
export default class index extends Component {
    constructor(){
        super()
        this.state={
            loading:false,
            isDeleteModelShow:false,  //模态窗口默认不显示
            deleteLoding:false,
            deleteId:"",
    }
    }
        //删除用户
        deleteUser = (record) =>{
            // console.log(record)
            this.setState({
                isDeleteModelShow:true,
                deleteId:record.id
            })
        }
        //点击取消删除
        onCancel =() =>{
            this.setState({
                isDeleteModelShow:false,
            })
        }
        //点击删除确定
        onOkDelte = () =>{
            this.setState({deleteLoding:true})
            deleteUserById(this.state.deleteId).then(res=>{
                //删除完毕后，是回到首页呢还是继续停在当前页？
                this.setState({
                    offset:0 //回到首页
                },()=>{
                    this.getData()
                })
            }).finally(()=>{
                this.setState({
                    deleteLoding:false,
                    isDeleteModelShow:false
                })
            })
        }
    render() {
        return (
            <div>
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
            </div>
        )
    }
}
