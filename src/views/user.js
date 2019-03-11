import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import user from './less/user.less';
import Footer from './commd/footer';
import apis from './api/userapi';
import userimg from '../views/img/28.png';
import Total from './commd/toast';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userimg: userimg
        }
    }
    componentDidMount() { //组件挂载
        this._isMounted = true
        this.getuser()
        this.getorder()
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    getuser() {
        var that = this
        apis('user/detail',{},'GET',function (res) {
            if (that._isMounted){
                if(res.data.code===0){
                    if(res.data.data.base.avatarUrl){
                        that.setState({
                            userimg:res.data.data.base.avatarUrl
                        })
                    }
                    else{
                        that.setState({
                            userImg:userimg
                        })
                    }
                    that.setState({nick: res.data.data.base.nick, mobile: res.data.data.base.mobile})
                }
                else{
                    Total.error("查询用户失败",1500)
                    that.setState({nick:"游客"+new Date().getHours(),mobile:"150xxxxxxxx",userImg:userimg})
                 }
            }
        },that)
    }
    getorder() {
        var that = this;
        apis("order/statistics",{},"GET",function (res) {
            if (that._isMounted) {
                if(res.data.code===0){
                  that.setState({witepay: res.data.data.count_id_no_pay, waitgoods: res.data.data.count_id_no_transfer, waitcogoods: res.data.data.count_id_no_confirm, waitevote: res.data.data.count_id_no_reputation})
                }
                else{
                    Total.error("查询订单失败",1500)
                }
             }
        }, that)
    }
    render() {
        var witepay = this.state.witepay > 0
                ? <span>{this.state.witepay}</span>
                : null,
            waitgoods = this.state.waitgoods > 0
                ? <span>{this.state.waitgoods}</span>
                : null,
            waitcogoods = this.state.waitcogoods > 0
                ? <span>{this.state.waitcogoods}</span>
                : null,
            waitevote = this.state.waitevote > 0
                ? <span>{this.state.waitevote}</span>
                : null;
        return (
            <div className="userApp  ">
                <div className={user.container+" reactApp"}>
                    <div className={user.userTop}>
                        <a href="#/user/setting" className={user.setting}>
                        </a>
                        <div className={user.userImg}>
                            <a href="#/usercenter" className={user.userLef}>
                                <img src={this.state.userimg} alt=""/>
                                <span>{this.state.nick}
                                    <em>{this.state.mobile}</em>
                                </span>
                            </a>
                            <a href="javascrit:" className={user.userRight}>
                                <div className={user.userLeve}>
                                    <i></i>
                                    普通会员
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className={user.userOrder}>
                        <div className={user.OrderTop}>
                            <a href="#/user/order">
                                我的订单
                                <img src={require("./images/searchback.jpg")} alt=""/>
                            </a>
                        </div>
                        <div className={user.OrderBottom}>
                            <a href="#/user/order?id=1">
                                <i></i>
                                {witepay}
                                待支付
                            </a>
                            <a href="#/user/order?id=2">
                                <i></i>
                                {waitgoods}
                                待发货
                            </a>
                            <a href="#/user/order?id=3">
                                <i></i>
                                待收货 {waitcogoods}
                            </a>
                            <a href="#/user/order?id=4">
                                <i></i>
                                {waitevote}
                                待评价
                            </a>
                            <a href="#/user/order">
                                <i></i>
                                售后
                            </a>
                        </div>
                    </div>
                    <div className={user.userOrder + " " + user.userOrderBottom}>
                        <div className={user.OrderTop}>
                            我的服务
                            <img src={require("./images/searchback.jpg")} alt=""/>
                        </div>
                        <div className={user.userItem}>
                            <a href="#/user/wallet">
                                <i></i>积分</a>
                            <a href="#/user/point">
                                <i></i>签到</a>
                            <a href="#/user/coupon">
                                <i></i>优惠券</a>
                            <a href="#/user/address">
                                <i></i>地址</a>
                            <a href="#/user/collection">
                                <i></i>收藏</a>
                            <a href="#/user/wallet">
                                <i></i>钱包</a>
                            <a href="#/user/userevote">
                                <i></i>评价</a>
                        </div>
                    </div>
                    <div className={user.bottom}></div>
                </div>
                <Footer className={user}/>
            </div>
        );
    }
}
export default withRouter(App);