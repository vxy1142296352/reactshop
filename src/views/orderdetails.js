import React, {
    Component
} from 'react';
import {
    withRouter
} from 'react-router-dom';
import edite from './less/userorder.less';
import apis from './api/userapi';
import Loading from './commd/loading';
import Modal from './commd/modal';
import Total from './commd/toast';
import Token from "./redux/token/reducers/index";
import initReactFastclick from 'react-fastclick';
initReactFastclick();
const confirm = Modal
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: [],
            token: Token.getState().token.token,
            loading: false,
            isaddress: true
        }
    }
    componentDidMount() { //组件挂载
        this._isMounted = true
        if (this.props.match.params.id) {
            this.details()
        } else {
            Total.error("错误请求", 1500)
            this.props.history.push("/404")
        }
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    details() {
        var that = this,
            id = this.props.match.params.id;
        apis('order/detail', {
            id: id
        }, "POST", function (res) {
            if (that._isMounted) {
                if (res.data.code === 0) {
                    if (res.data.data.logistics) {
                        that.setState({
                            isaddress: true,
                            address: res.data.data.logistics.provinceStr + res.data.data.logistics.cityStr + res.data.data.logistics.areaStr + res.data.data.logistics.address,
                            username: res.data.data.logistics.linkMan,
                            mobile: res.data.data.logistics.mobile,
                            trackingNumber: res.data.data.logistics.trackingNumber,
                            shipperName: res.data.data.logistics.shipperName
                        })
                    } else {
                        that.setState({
                            isaddress: false
                        })
                    }
                    that.setState({
                        orderNumber: res.data.data.orderInfo.orderNumber,
                        statusStr: res.data.data.orderInfo.statusStr,
                        amount: res.data.data.orderInfo.amount,
                        amountReal: res.data.data.orderInfo.amountReal,
                        amountLogistics: res.data.data.orderInfo.amountLogistics,
                        goodsNumber: res.data.data.orderInfo.goodsNumber,
                        goods: res.data.data.goods,
                        isPay: res.data.data.orderInfo.isPay,
                        ordertime: res.data.data.logs[0].dateAdd,
                        status: res.data.data.orderInfo.status,
                        orderId: res.data.data.orderInfo.id,
                        loading: true,

                    })
                } else {
                    Total.error("错误请求", 1500)
                    that.props.history.replace("/404")
                }
            }
        }, that)
    }
    qxorder(e) { //取消订单
        var id = e
            .currentTarget
            .getAttribute("data-id")
        var that = this
        confirm.confirm({
            contentText: '确定要取消订单吗？',
            onOk() {
                that.Aqorder(id)
            },
            onCancel() {}
        })
    }
    Aqorder(orderId) { //取消订单API
        var that = this;
        apis("order/close", {
            orderId: orderId
        }, "POST", function (res) {
            if (res.data.code === 0) {
                Total.success("取消成功", 1500)
                that.details()
            } else {
                Total.error("取消失败", 1500)
            }
        }, that)
    }
    saveshop(e) { //确认收货
        var id = e
            .currentTarget
            .getAttribute("data-id")
        var that = this
        confirm.confirm({
            contentText: '确定要确认要收货吗',
            onOk() {
                that.Saveshop(id)
            },
            onCancel() {}
        })
    }
    Saveshop(orderId) { //确认收货API
        var that = this;
        apis("order/delivery", {
            orderId: orderId
        }, "POST", function (res) {
            if (res.data.code === 0) {
                Total.success("收货成功", 1500)
                that.details()
            } else {
                Total.error("收货失败", 1500)
            }
        }, that)
    }
    orderdetailsbtn(status, id, ordernumber, trackingNumber,expressname) {
        switch (status) {
            case 0:
                return (
                    <div className={edite.orderIdBtn}>
                        <a
                            href={"/#/paychose/onlinepay?orderid=" + id + "accestoken?=" + this.state.token}>去付款</a>
                        <a
                            href="javascrit:"
                            data-id={id}
                            onClick={this
                            .qxorder
                            .bind(this)}>取消订单</a>
                    </div>
                );
            case 1:
                return (
                    <div className={edite.orderIdBtn}>
                        <a
                            href="javascrit:"
                            onClick={this
                            .tipsgoods
                            .bind(this)}>提醒发货</a>
                        <a href={"#/user/aftersale?ordernumber=" + ordernumber + "?id=" + id}>售后服务</a>
                    </div>
                )
            case 2:
                return (
                    <div className={edite.orderIdBtn}>
                        <a
                            href="javascrit:"
                            data-id={id}
                            onClick={this
                            .saveshop
                            .bind(this)}>确认收货</a>
                        <a
                            href={trackingNumber !== undefined
                            ? "#/user/express?expressname="+expressname+"?id=" + trackingNumber
                            : "javascrit:"}>{trackingNumber !== undefined
                                ? "查看物流"
                                : "无需物流"}</a>
                        <a href={"#/user/aftersale?ordernumber=" + ordernumber + "?id=" + id}>售后服务</a>
                    </div>
                )
            case 3:
                return (
                    <div className={edite.orderIdBtn}>
                    <a href={"#/user/evote?ordernumber=" + ordernumber + "?id=" + id}>评价商品</a>
                    <a href={"#/user/aftersale?ordernumber=" + ordernumber + "?id=" + id}>售后服务</a>
                    </div>
                )
            default:
                return null
        }
    }
    tipsgoods() {
        Total.success("提醒发货成功", 1500)
    }
    goback() {
        window.history.go(-1);
    }
    reFresh() {
        window.location.reload()
    }
    render() {
        return (
            <div className="orderdetailsApp">
                {!this.state.loading
                    ? <Loading/>
                    : null}
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    订单详情
                    <span
                        className={edite.caredite}
                        onClick={this
                        .reFresh
                        .bind(this)}>刷新</span>
                </header>
                <div className={edite.container+" reactApp"}>
                    <div className={edite.orderListContent}>
                        <div className={edite.choseAddress}>
                            <span className={edite.addtips}>配送地址</span>
                            {this.state.isaddress
                                ? <div className={edite.chosecon}>
                                        <div className={edite.addname}>{this.state.username}
                                            <span>{this.state.mobile}</span>
                                        </div>
                                        <p>{this.state.address}</p>
                                    </div>
                                : <div className={edite.chosecon}>
                                    <p>
                                        无需配送地址</p>
                                </div>}
                        </div>
                        <div className={edite.carlist}>
                            <div className={edite.userorderTOPbOX}>
                                <span>订单号:{this.state.orderNumber}</span>
                                <div className={edite.orderdist}>状态:
                                    <span>{this.state.statusStr}</span>
                                </div>
                            </div>
                            <ul>
                                {this
                                    .state
                                    .goods
                                    .map(function (item, index) {
                                        return (
                                            <li key={index}>
                                                <div className={edite.carimg}>
                                                    <a href="/">
                                                        <img src={item.pic} alt=""/>
                                                    </a>
                                                </div>
                                                <div className={edite.carname}>
                                                    <a href={"#/details/" + item.goodsId}>
                                                        <h2>{item.goodsName}</h2>
                                                        <span>规格:{item.property}
                                                            <em>x{item.number}</em>
                                                        </span>
                                                    </a>
                                                    <span className={edite.carprice}>¥{item.amount}</span>
                                                </div>
                                            </li>
                                        )
                                    })}
                            </ul>
                            <div className={edite.orderIDbottom}>
                                共
                                <span>{this.state.goodsNumber}</span>件商品 合计
                                <span>￥{this.state.amountReal}</span>
                            </div>
                            <div className={edite.orderContent}>
                                <div className={edite.contentitem}>下单日期:<span>{this.state.ordertime}</span>
                                </div>
                                <div className={edite.contentitem}>是否付款:<span>{this.state.isPay
                                            ? "已付款"
                                            : "未付款"}</span>
                                </div>
                                <div className={edite.contentitem}>订单金额:<span className={edite.price}>￥{this.state.amount}</span>
                                </div>
                                <div className={edite.contentitem}>运费:<span className={edite.price}>￥{this.state.amountLogistics}</span>
                                </div>
                                <div className={edite.contentitem}>实际支付金额:<span className={edite.price}>￥{this.state.amountReal}</span>
                                </div>
                            </div>
                            {this.orderdetailsbtn(this.state.status, this.state.orderId, this.state.orderNumber, this.state.trackingNumber,this.state.shipperName)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
