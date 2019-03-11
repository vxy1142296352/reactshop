import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Loadable from 'react-loadable';
import Token from '../redux/token/reducers';
import createHistory from 'history/createBrowserHistory';
var history = createHistory()
const MyLoadingComponent = ({isLoading,error}) => { //路由加载中动画
    if (isLoading) {
        return ''
    } else if (error) {
        return ''
    } else {
        return null;
    }
};
var App = Loadable({ //路由按需加载首页
        loader: () => import ('../index'),
        loading: MyLoadingComponent
    }),
    cate = Loadable({
        loader: () => import ('../cate'),
        loading: MyLoadingComponent
    }),
    err = Loadable({
        loader: () => import ('../error'),
        loading: MyLoadingComponent
    }),
    allevote = Loadable({
        loader: () => import ('../allevote'),
        loading: MyLoadingComponent
    }),
    details = Loadable({
        loader: () => import ('../details'),
        loading: MyLoadingComponent
    }),
    addaddress = Loadable({
        loader: () => import ('../addaddress'),
        loading: MyLoadingComponent
    }),
    car = Loadable({
        loader: () => import ('../car'),
        loading: MyLoadingComponent
    }),
    user = Loadable({
        loader: () => import ('../user'),
        loading: MyLoadingComponent
    }),
    editepwd = Loadable({
        loader: () => import ('../editepwd'),
        loading: MyLoadingComponent
    }),
    evote = Loadable({
        loader: () => import ('../evote'),
        loading: MyLoadingComponent
    }),
    failed = Loadable({
        loader: () => import ('../payfailed'),
        loading: MyLoadingComponent
    }),
    findpwd = Loadable({
        loader: () => import ('../findpwd'),
        loading: MyLoadingComponent
    }),
    list = Loadable({
        loader: () => import ('../list'),
        loading: MyLoadingComponent
    }),
    login = Loadable({
        loader: () => import ('../login'),
        loading: MyLoadingComponent
    }),
    newscontent = Loadable({
        loader: () => import ('../newscontent'),
        loading: MyLoadingComponent
    }),
    news = Loadable({
        loader: () => import ('../news'),
        loading: MyLoadingComponent
    }),
    paychose = Loadable({
        loader: () => import ('../paychose'),
        loading: MyLoadingComponent
    }),
    paymoney = Loadable({
        loader: () => import ('../wxpay'),
        loading: MyLoadingComponent
    }),
    reg = Loadable({
        loader: () => import ('../reg'),
        loading: MyLoadingComponent
    }),
    search = Loadable({
        loader: () => import ('../search'),
        loading: MyLoadingComponent
    }),
    success = Loadable({
        loader: () => import ('../paysuccess'),
        loading: MyLoadingComponent
    }),
    address = Loadable({
        loader: () => import ('../useaddress'),
        loading: MyLoadingComponent
    }),
    aftersale = Loadable({
        loader: () => import ('../aftersale'),
        loading: MyLoadingComponent
    }),
    usercenter = Loadable({
        loader: () => import ('../usercenter'),
        loading: MyLoadingComponent
    }),
    collection = Loadable({
        loader: () => import ('../usercollection'),
        loading: MyLoadingComponent
    }),
    coupon = Loadable({
        loader: () => import ('../usercoupon'),
        loading: MyLoadingComponent
    }),
    userevote = Loadable({
        loader: () => import ('../userevote'),
        loading: MyLoadingComponent
    }),
    express = Loadable({
        loader: () => import ('../express'),
        loading: MyLoadingComponent
    }),
    userorder = Loadable({
        loader: () => import ('../userorder'),
        loading: MyLoadingComponent
    }),
    orderdetails = Loadable({
        loader: () => import ('../orderdetails'),
        loading: MyLoadingComponent
    }),
    point = Loadable({
        loader: () => import ('../ponit'),
        loading: MyLoadingComponent
    }),
    setting = Loadable({
        loader: () => import ('../usersetting'),
        loading: MyLoadingComponent
    }),
    wallet = Loadable({
        loader: () => import ('../wallet'),
        loading: MyLoadingComponent
    }),
    walletlist = Loadable({
        loader: () => import ('../walllist'),
        loading: MyLoadingComponent
    }),
    actives = Loadable({
        loader: () => import ('../active'),
        loading: MyLoadingComponent
    }),
    searchlist = Loadable({
        loader: () => import ('../searchlist'),
        loading: MyLoadingComponent
    }),
    about = Loadable({
        loader: () => import ('../about'),
        loading: MyLoadingComponent
    }),
    putmoney = Loadable({
        loader: () => import ('../putmoney'),
        loading: MyLoadingComponent
    }),
    putmoneylist = Loadable({
        loader: () => import ('../putmoneylist'),
        loading: MyLoadingComponent
    }),
    putdetails = Loadable({
        loader: () => import ('../putdetails'),
        loading: MyLoadingComponent
    }),
    onlinepay = Loadable({
        loader: () => import ('../onlinepay'),
        loading: MyLoadingComponent
    }),
    ceshi = Loadable({
        loader: () => import ('../ceshi'),
        loading: MyLoadingComponent
    }),
    realname = Loadable({
        loader: () => import ('../realname'),
        loading: MyLoadingComponent
    })
/**
 * @param  {Protected:登陆拦截（函数组建）}
 * @param  {...[type]}
 * @return {还是一个Route组建，这个Route组建使用的是Route三大渲染方式（component、render、children）的render方式}。注意当component和render两种方式共存时，优先使用component方式渲染
 */
const Protected = ({
    component: Comp,
    ...rest
}) => {
    return (
        <Route
            {...rest} 
            render={props => Token.getState().token.token
            ? <Comp history={history}/>
            : <Redirect
                to={{
                pathname: '/login',
                state: {
                    from: props.location.pathname
                }
            }}/>}/>
    )
}
class Router extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={App} exact></Route>
                <Route path="/ceshi" component={ceshi} exact></Route>
                <Route path="/cate" component={cate} exact></Route>
                <Route path="/active" component={actives} exact></Route>
                <Route path="/allevote/:id" component={allevote} exact></Route>
                <Route path="/details/:id" component={details} exact></Route>
                <Protected path="/user/addaddress/:name" component={addaddress} exact></Protected>
                <Route path="/car" component={car} exact></Route>
                <Protected path="/user" component={user} exact></Protected>
                <Protected path="/user/editepwd" component={editepwd} exact></Protected>
                <Protected path="/user/evote" component={evote} exact></Protected>
                <Protected path="/payfailed" component={failed} exact></Protected>
                <Route path="/findpwd" component={findpwd} exact></Route>
                <Route path="/list/:id" component={list} exact></Route>
                <Route path="/login" component={login} exact></Route>
                <Route path="/about" component={about} exact></Route>
                <Route path="/news/content/:id" component={newscontent} exact></Route>
                <Route path="/news" component={news} exact></Route>
                <Protected path="/paychose" component={paychose} exact></Protected>
                <Protected path="/paychose/wxpay" component={paymoney} exact></Protected>
                <Route path="/reg" component={reg} exact></Route>
                <Route path="/search" component={search} exact></Route>
                <Route path="/searchlist" component={searchlist} exact></Route>
                <Protected path="/paysuccess" component={success} exact></Protected>
                <Protected path="/user/address" component={address} exact></Protected>
                <Protected path="/user/aftersale" component={aftersale} exact></Protected>
                <Protected path="/usercenter" component={usercenter} exact></Protected>
                <Protected path="/user/collection" component={collection} exact></Protected>
                <Protected path="/user/coupon" component={coupon} exact></Protected>
                <Protected path="/user/userevote" component={userevote} exact></Protected>
                <Protected path="/user/express" component={express} exact></Protected>
                <Protected path="/user/order" component={userorder} exact></Protected>
                <Protected path="/user/orderdetails/:id" component={orderdetails} exact></Protected>
                <Protected path="/user/point" component={point} exact></Protected>
                <Protected path="/user/setting" component={setting} exact></Protected>
                <Protected path="/user/wallet" component={wallet} exact></Protected>
                <Protected path="/user/wallet/list" component={walletlist} exact></Protected>
                <Protected path="/user/wallet/putmoney" component={putmoney} exact></Protected>
                <Protected path="/user/wallet/putmoneylist" component={putmoneylist} exact></Protected>
                <Protected path="/user/wallet/putdetails" component={putdetails} exact></Protected>
                <Protected path="/paychose/onlinepay" component={onlinepay} exact></Protected>
                <Protected path="/user/realname" component={realname} exact></Protected>
                <Route path="*" component={err} exact></Route>
            </Switch>
        )
    }
}

export default Router;
