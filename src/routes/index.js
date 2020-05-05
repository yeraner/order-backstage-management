import  {
    Dashboard,
    User,
    Order,
    OrderEdit,
    List,
    ListEdit,
    Login,
    NotFound
} from "../views"
import React from "react"
//使用antd里面的icon图标
import {
    HomeOutlined,
    UserOutlined,
    FileTextOutlined,
    BarsOutlined,
} from '@ant-design/icons';


export const mainRoute = [
    {
        pathname:"/login",
        component:Login
    },
    {
        pathname:"/404",
        component:NotFound
    }
]


// /admin/XXX   dashboard article articleEdit settings
export const admainRoute = [
    {
        pathname:"/admin/dashboard",
        component:Dashboard,
        title:"首页",
        isNav:true,
        icon:<HomeOutlined />
    },
    {
        pathname:"/admin/user",
        component:User,
        title:"用户管理",
        isNav:true,
        icon:<UserOutlined />
    },
    {
        pathname:"/admin/order",
        component:Order,
        isNav:true,
        exact:true,
        title:"订单管理",
        icon:<FileTextOutlined />
    },
    {
        pathname:"/admin/order/orderedit/:id",
        component:OrderEdit,
    },
    {
        pathname:"/admin/list",
        component:List,
        isNav:true,
        exact:true,
        title:"产品管理",
        icon:<BarsOutlined />
    },
    {
        pathname:"/admin/list/listedit/:id",
        component:ListEdit,
    },
]