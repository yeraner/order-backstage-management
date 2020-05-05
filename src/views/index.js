import Loadable from 'react-loadable';
import Loading from '../components/loading';
//需要将对外的普通组件需要进行懒加载
const Dashboard = Loadable({
    loader: () => import('./dashboard'),
    loading: Loading,
});
const User = Loadable({
    loader: () => import('./user'),
    loading: Loading,
});
const Order = Loadable({
    loader: () => import('./order'),
    loading: Loading,
});
const OrderEdit = Loadable({
    loader: () => import('./order/orderedit'),
    loading: Loading,
});
const List = Loadable({
    loader: () => import('./list'),
    loading: Loading,
});
const ListEdit = Loadable({
    loader: () => import('./list/listedit'),
    loading: Loading,
});
const Login = Loadable({
    loader:()=>import("./login"),
    loading:Loading
});
const NotFound = Loadable({
    loader:()=>import("./notfound"),
    loading:Loading
})


export  {
    Dashboard,
    User,
    Order,
    OrderEdit,
    List,
    ListEdit,
    Login,
    NotFound
}
