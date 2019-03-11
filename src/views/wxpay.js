import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import edite from './less/paychose.less';
import Total from './commd/toast';
import apis from './api/api';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state={
            
        }
    }
    componentDidMount(){
        this._ismounted = true
        if(window.location.href.split("?orderid=")[1]){
            var id=window.location.href.split("?orderid=")[1].split("accestoken?=")[0]
            var token=window.location.href.split("accestoken?=")[1]
            this.setState({
                token:token,
                id:id
            })
            this.getOrder(id,token)
        }
        else{
            Total.error("错误请求",1500)
            this.props.history.replace("/404")
        }
    }
    getOrder(id,token){
        var that=this
        apis('order/detail',{
            params: {
                token:token,
                id: id
            }
        }, "GET", function (res) {
            if(res.data.code===0&&res.data.data.orderInfo.status===0){
                that.setState({
                    amountReal:res.data.data.orderInfo.amountReal,
                    orderNumber:res.data.data.orderInfo.orderNumber
                })
            }
            else{
                Total.error("请求错误",1500)
                that.props.history.replace("/user/orderdetails/"+ id)
            }
        },this)
    }
    render() {
        return (
            <div className="paymoneyApp reactApp">
                <header className={edite.carheader+" "+edite.wxPayheader}>
                    在线转账
                </header>
                <div className={edite.realmoney}>
                    实际转账金额
                    <span>￥{this.state.amountReal}</span>
                    <p>订单号:{this.state.orderNumber}</p>
                </div>
                <div className={edite.container}>
                    <div className={edite.paymoneyBox}>
                        <p>注意:转账请备注订单号</p>
                        <p>已付款?请加微信客服13530650725核对订单</p>
                        <img src={require('../views/img/paymoney.png')} alt=""/>
                        <a href={"#/user/orderdetails/"+this.state.id}>已付款?查看订单</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
