import React, {
    Component
} from 'react';
import {withRouter} from 'react-router-dom';
import edite from './less/paychose.less';
import walletjpg from './images/wallet.png';
import ALIPAY from './images/ALIPAY.png';
import WXPAY from './images/WXPAY.png';
import UNIONPAY from './images/UNIONPAY.png';
import Transfer from './images/Transfer accounts.png';
import Total from './commd/toast';
import apis from './api/userapi';
import paystore from './redux/ispay/reducers';
import {addToCart} from './redux/ispay/actions/cart-actions';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paychose: [{
                    name: "钱包余额支付",
                    icon: walletjpg,
                    discot: "如遇问题,联系客服:13530650725",
                    id: 1,
                    active: true
                }, {
                    name: "支付宝支付",
                    icon: ALIPAY,
                    discot: "支付宝支付,支付立减",
                    id: 2,
                    active: false
                }, {
                    name: "微信支付",
                    icon: WXPAY,
                    discot: "",
                    id: 3,
                    active: false
                }, {
                    name: "银联支付",
                    icon: UNIONPAY,
                    discot: "",
                    id: 4,
                    active: false
                },
                {
                    name: "在线转账",
                    icon: Transfer,
                    discot: "如遇问题,联系客服:13530650725",
                    id: 5,
                    active: false
                },
            ],
            ispay: 0,
            id: null
        }
    }
    componentDidMount(){
        this._ismounted = true
        if (window.location.href.split("?orderid=")[1]&&window.location.href.split("accestoken?=")[1]&&window.location.href.split("accestoken?=")[1]!=="undefined"){
            var id = window.location.href.split("?orderid=")[1].split("accestoken?=")[0]
            var token = window.location.href.split("accestoken?=")[1]
            this.setState({
                token: token,
                id: id
            })
            this.getOrder(id, token)
        } else {
            Total.error("错误请求", 1500)
            this.props.history.replace("/404")
        }
    }
    getOrder(id, token) {
        var that = this
        apis('order/detail',{
            id: id
        }, "POST", function (res) {
            if(res.data.code===0&&res.data.data.orderInfo.status===0){
                that.setState({
                    amountReal: res.data.data.orderInfo.amountReal,
                    orderNumber: res.data.data.orderInfo.orderNumber
                })
            }
          else{
                Total.error("请求错误", 1500)
                that.props.history.replace("/404")
            }
        },that)
    }
    componentWillMount(){
        this._ismounted = false
    }
    chosePay(e) {
        var money = this.state.paychose
        for (var i = 0; i < money.length; i++) {
            money[i].active = false
            money[e.currentTarget.getAttribute("data-index")].active = true
        }
        this.setState({
            paychose: money,
            ispay:Number(e.currentTarget.getAttribute("data-index"))
        })
    }
    payMoney() { //确认付款
        var that = this;
            paystore.dispatch(addToCart(true))
        if (this.state.ispay === 0) {
            var hideLoading = Total.loading('支付中...')
            apis('order/pay',{orderId: this.state.id}, "POST", function (res) {
                if(res.data.code === 0){
                    setTimeout(hideLoading, 1500)
                    setTimeout(function (){
                        that.props.history.replace("/paysuccess?orderID=" + that.state.id)
                    },1501)
                }else{
                    setTimeout(hideLoading,500)
                    setTimeout(function(){
                        Total.error(res.data.msg,1000)
                    },1000)
                    setTimeout(function(){
                        that.props.history.push("/payfailed")
                    },2501)
                }
            }, that)
        } else {
            var hideload = Total.loading('处理中...')
            setTimeout(hideload, 1500)
            setTimeout(function () {
                that.props.history.push("/paychose/wxpay?orderid=" + that.state.id + "accestoken?=" + that.state.token)
            }, 1501)
        }
    }
    render() {
        var that=this
        return (
            <div className="paymoneyApp reactApp">
                <header className={edite.carheader + " " + edite.onlineheader}>
                   支付订单
                </header>
                <div className={edite.container}>
                    <div className={edite.realmoney}>
                        实际支付金额
                        <span>￥{this.state.amountReal}</span>
                        <p> 订单号:{this.state.orderNumber}</p>
                    </div>
                    <div className={edite.moneytips}>
                        您的订单已生成,请尽快付款,超过规定的时间将自动取消订单。
                    </div>
                    <div className={edite.paynameBox}>
                        <ul>
                            {this.state.paychose.map(function (item, index) {
                                    return (
                                        <li
                                            className={item.active
                                            ? edite.payactive
                                            : ""}
                                            key={index + .01} data-index={index} onClick={that.chosePay.bind(that)}>
                                            <div className={edite.payimg}>
                                                <img src={item.icon} alt=""/></div>
                                            <div className={edite.payname}>
                                                {item.name}
                                                <p>{item.discot}</p>
                                            </div>
                                            <i></i>
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                    <button className={edite.paysubmit} onClick={this.payMoney.bind(this)}>确认支付</button>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
