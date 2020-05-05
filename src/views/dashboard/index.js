import React, { Component } from 'react'
import { Row,Col,Statistic,Card} from 'antd';
import { DollarCircleTwoTone,ContainerTwoTone} from '@ant-design/icons';
import './index.css'
import ReactEcharts from 'echarts-for-react';

export default class index extends Component {
    getOption =()=> {
        const option = {
            title: {
                text: '往日营业额比对'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['营业额','利润']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '营业额',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [12000, 13200, 10100, 13400, 9000, 23000, 21000],
                    itemStyle: {
                        color: '#00ffff'
                    }
                    
                },
                {
                    name: '利润',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: [4800, 5280, 4040, 5360, 3600, 9200, 8400],
                    itemStyle: {
                        color: '#38b0de'
                    }
                },
                
            ]
        };
        return option
        }
    render() {
        return (
            <div>
                <Row justify="space-around" >
                    <Col span={3} style={{}}>
                    <Statistic title="营业额" value={101700} suffix="￥" prefix={<DollarCircleTwoTone />} valueStyle={{ color: '#999' }}/>
                    </Col>
                    <Col span={3} >
                    <Statistic title="利润" value={40680} suffix="￥" prefix={<DollarCircleTwoTone />} valueStyle={{ color: '#999' }}/>
                    </Col>
                    <Col span={3} >
                    <Statistic title="退货数" value={6} suffix="件" prefix={<ContainerTwoTone />} valueStyle={{ color: '#999' }}/>
                    </Col>
                    <Col span={3} >
                    <Statistic title="订单数 " value={112} suffix="件" prefix={<ContainerTwoTone />} valueStyle={{ color: '#999' }}/>
                    </Col>
                </Row>
                <Card className="echart" bordered={false}>
                    <ReactEcharts option={this.getOption()} style={{height:420}} />
                </Card>
            </div>
        )
    }
}
