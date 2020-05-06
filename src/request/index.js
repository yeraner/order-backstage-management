//使用axios进行异步操作
import axios from "axios"
import {message} from "antd"
message.config({
    top: 200
})
const service = axios.create({
    baseURL:"http://rap2.taobao.org:38080/app/mock/252946/"
})

//axios的拦截器
//请求之前的拦截
//我们可以在发送请求之前，可以在请求头上面携带一些信息例如token，将其转送给后端，进行token验证操作。
service.interceptors.request.use(config=>{
    // console.log("request-config",config)
    //后续authToken值肯定需要从本地存储取出来，然后再去发给后端
    config.data = {...config.data,authToken:localStorage.getItem('token')}
    return config
})




//响应之后的拦截
service.interceptors.response.use(res=>{
    // console.log("response-res",res)
    if(res.data.code === 200){
        return res.data.data
    }else{
        message.error(res.data.errMsg)
    }
})

//登录
export const login=(username,password)=>{
    return axios.post(`http://114.215.128.76:3000/user/login`,{username,password})
}
//查询用户
export const checkname=(username)=>{
    return axios.get(`http://114.215.128.76:3000/user/checkname?username=${username}`)
}

//请求用户管理列表数据
export const getUser = (offset,limited)=>{
    return service.post("/v1/userList",{offset,limited})
}

//删除用户根据id
export const deleteById = id =>{
    return service.post(`/v1/userDelete/${id}`)
}


// //根据id查询 的详情信息
export const getGoodsById = (id) => {
    return service.post(`/v1/goods/${id}`)
}

// //根据id与对应的入参进行用户保存
export const saveUserById = (id,data) =>{
    return service.post(`/v1/userSave/${id}`,data)
}

// //定义获取订单列表数据接口
export const getOrder = (offset,limited,value)=>{
    return service.post(`/v1/orderList`,{offset,limited,value})
}

// //根据id与对应的入参进行点单保存
export const saveOrderById = (id,data) =>{
    console.log(id,data)
    return service.post(`/v1/orderSave/${id}`,data)
}

// //定义获取商品列表数据接口
export const getList = (offset,limited)=>{
    return service.post(`/v1/list`,{offset,limited})
}

// //根据id与对应的入参进行商品保存
export const saveproductById = (id,data) =>{
    return service.post(`/v1/productSave/${id}`,data)
}