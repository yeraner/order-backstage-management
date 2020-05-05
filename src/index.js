import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter as Router,Route,Redirect,Switch} from "react-router-dom"
import {mainRoute} from "./routes"
import "./index.css"
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd"
// import {Provider} from "react-redux"
// import store from "./store"
ReactDOM.render(
    <ConfigProvider locale={zhCN}>
      <Router>
      <Switch>
        <Route path="/admin" component={App}/> 
        {
          mainRoute.map(route=>{
            return <Route  key={route.pathname} path={route.pathname} component={route.component}/>
          })
        }
        <Redirect to={mainRoute[0].pathname} from="/" exact/>
        <Redirect to="/404" />
      </Switch>
    </Router>
    </ConfigProvider>
  ,
  document.getElementById('root')
);

