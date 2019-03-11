import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import edite from './less/userorder.less';
import apis from './api/userapi';
import Loading from './commd/loading';
import Modal from './commd/modal';
import Total from './commd/toast';
import Token from './redux/token/reducers/index'
import initReactFastclick from'react-fastclick';
initReactFastclick();
const confirm = Modal
function Goods(props) { //商品组件
    return (props.goodslist.map(function (item2, index2) {
        return (
            <li key={item2.id}>
                <div className={edite.carimg}>
                    <a href={"#/details/" + item2.goodsId}>
                        <img src={item2.pic} alt=""/>
                    </a>
                </div>
                <div className={edite.carname}>
                    <a href={"#/details/" + item2.goodsId}>
                        <h2>{item2.goodsName}</h2>
                        <span>规格:{item2.property}
                            <em>x{item2.number}</em>
                        </span>
                    </a>
                    <span className={edite.carprice}>¥{item2.amount}</span>
                </div>
            </li>
        )
    }))
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: [],
            waitepay: [],
            waitgoods: [],
            waitcogoods: [],
            waitevote: [],
            cateid: 0,
            loading: false,
            token:Token.getState().token.token,
            catecheck: [
                {
                    id: 0,
                    name: "全部",
                    active: true
                }, {
                    id: 1,
                    name: "待支付",
                    active: false
                }, {
                    id: 2,
                    name: "待发货",
                    active: false
                }, {
                    id: 3,
                    name: "待收货",
                    active: false
                }, {
                    id: 4,
                    name: "待评价",
                    active: false
                }
            ]
        }
    }
    componentDidMount() { //组件挂载
        this._isMounted = true
        var that = this,
            oid =window.location.href.split("?id=")[1],
            check = this.state.catecheck;
        if (oid === undefined) {
            check[0].active = true
        } else {
            check[0].active = false
            check[oid].active = true
            that.setState({cateid: oid})
        }
        this.getorder()
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    getorder(){
        var that = this;
        apis("order/list",{},"GET", function (res) {
            that.setState({loading: true})
            if (that._isMounted) {
                if (res.data.code === 0) {
                    var goods = res.data.data.orderList,
                        waitepay = [],
                        waitgoods = [],
                        waitcogoods = [],
                        waitevote = [];
                    for (var i = 0; i < goods.length; i++) {
                        goods[i].goodsmap = []
                        goods[i].address = []
                        goods[i]
                            .goodsmap
                            .push(res.data.data.goodsMap[goods[i].id])
                        goods[i]
                            .address
                            .push(res.data.data.logisticsMap[goods[i].id])
                        switch (goods[i].status) {
                            default:
                            case 0:
                                waitepay.push(goods[i])
                                break
                            case 1:
                                waitgoods.push(goods[i])
                                break
                            case 2:
                                waitcogoods.push(goods[i])
                                break
                            case 3:
                                waitevote.push(goods[i])
                        }
                    }

                    that.setState({goods: goods, waitepay: waitepay, waitgoods: waitgoods, waitcogoods: waitcogoods, waitevote: waitevote})
                }
            }
        }, that)
    }
    orderbtn(item, id, ordernumber, expressnumber, expressname) {
        switch(item){
            case 0:
            return (
                <div className={edite.orderIdBtn}>
                    <a
                        href="javascrit:"
                        data-id={id}
                        data-number={ordernumber}
                        onClick={this
                        .paymoney
                        .bind(this)}>去付款</a>
                    <a
                        href="javascrit:"
                        data-id={id}
                        data-number={ordernumber}
                        onClick={this
                        .qxorder
                        .bind(this)}>取消订单</a>
                </div>
            )
            case 1:
            return (
                <div className={edite.orderIdBtn}>
                    <a href={"#/user/aftersale?ordernumber=" + ordernumber + "?id=" + id}>售后服务</a>
                    <a
                        href="javascrit:"
                        data-id={id}
                        data-number={ordernumber}
                        onClick={this
                        .tipshop
                        .bind(this)}>提醒发货</a>
                </div>
            )
            case 2:
            return (
                <div className={edite.orderIdBtn}>
                    <a href={"#/user/aftersale?ordernumber=" + ordernumber + "?id=" + id}>售后服务</a>
                    <a
                        href="javascrit:"
                        data-id={id}
                        onClick={this
                        .saveshop
                        .bind(this)}>确认收货</a>
                    <a
                        href={expressnumber !== "" || expressnumber !== undefined
                        ? "#/user/express?expressname="+expressname+"?id=" + expressnumber
                        : "javascrit:"}
                        data-id={expressnumber}
                        data-name={expressname}>{expressnumber !== undefined || expressnumber !== ""
                            ? "查看物流"
                            : "无需物流:"}</a>
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
            break;
        }
    }
    paymoney(e) {
        //付款
        this.props.history.push("/paychose/onlinepay?orderid=" + e.target.getAttribute("data-id") + "accestoken?=" + this.state.token)
    }
    qxorder(e) { //取消订单
        var id = e.target.getAttribute("data-id")
        var that = this
        confirm.confirm({
            contentText: '确定要取消订单吗？',
            onOk() {
                that.Aqorder(id)
            },
            onCancel() {}
        })
    }
    Aqorder(orderId) {
        var that = this;
        apis("order/close", {
            orderId: orderId
        }, "POST", function (res) {
            if (res.data.code === 0) {
                Total.success("取消成功", 1500)
                that.getorder()
            } else {
                Total.error("取消失败", 1500)
            }
        }, that)
    }
    saveshop(e) { //确认收货
        var id = e.target.getAttribute("data-id")
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
                that.getorder()
            } else {
                Total.error("收货失败", 1500)
            }
        }, that)
    }
    tipshop(e) { //提醒发货
        Total.success("提醒发货成功", 1500)
    }
    tab(e) { //选项卡切换
        var that = this,
            id = e.target.getAttribute("data-id"),
            check = this.state.catecheck;
        for (var i = 0; i < check.length; i++) {
            check[i].active = false
            check[e.target.getAttribute("data-index")].active = true
        }
        that.setState({
            cateid: id,
            catecheck: check
        })
    }
    Refresh() {
        window.location.reload()
    }
    goback() {
        window.history.go(-1);
    }
    render() {
        var that = this
        return (
            <div className="userorderApp">
                {!this.state.loading
                    ? <Loading/>
                    : null}
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    我的订单
                    <span
                        className={edite.caredite}
                        onClick={this
                        .Refresh
                        .bind(this)}>刷新</span>
                </header>
                <div className={edite.container+" reactApp"}>
                    {this.state.goods.length > 0
                        ? <div className={edite.uiseroderTab}>
                                {this
                                    .state
                                    .catecheck
                                    .map(function (item, index) {
                                        return (
                                            <a
                                                href="javasrit:"
                                                onClick={that
                                                .tab
                                                .bind(that)}
                                                data-index={index}
                                                data-id={item.id}
                                                className={item.active
                                                ? edite.active
                                                : " "}
                                                key={index}>{item.name}</a>
                                        )
                                    })}</div>
                        : null}
                    <div className={edite.orderListContent}>
                        <div
                            style={Number(that.state.cateid) === 0
                            ? {
                                display: "block"
                            }
                            : {
                                display: "none"
                            }}>
                            {this.state.goods.map(function (item, index) {
                                    return (
                                        <div className={edite.carlist} key={index}>
                                            <a href={"#/user/orderdetails/" + item.id} className={edite.userorderTOPbOX}>
                                                <span>订单号:{item.orderNumber}</span>
                                                <div className={edite.orderdist}>状态:<span>{item.statusStr}</span>
                                                </div>
                                            </a>
                                            <ul>
                                                <Goods goodslist={item.goodsmap[0]}/>
                                            </ul>
                                            <div className={edite.orderIDbottom}>
                                                共
                                                <span>{item.goodsNumber}</span>件商品 合计
                                                <span>￥{item.amountReal}</span>
                                            </div>
                                            {item.address[0] !== undefined
                                                ? that.orderbtn(item.status, item.id, item.orderNumber, item.address[0].trackingNumber, item.address[0].shipperName, item.goodsmap[0])
                                                : that.orderbtn(item.status, item.id, item.orderNumber, "", "", item.goodsmap[0])}
                                        </div>
                                    )
                                })}
                            {this.state.goods.length <= 0
                                ? <div className={edite.Noshop}>
                                        <div className={edite.Empty + " " + edite.img3}></div>
                                        <p>无任何订单</p>
                                    </div>
                                : null}
                        </div>
                        <div
                            style={Number(that.state.cateid) === 1
                            ? {
                                display: "block"
                            }
                            : {
                                display: "none"
                            }}>
                            {this.state.waitepay.map(function (item, index) {
                                    return (
                                        <div className={edite.carlist} key={index}>
                                            <a href={"#/user/orderdetails/" + item.id} className={edite.userorderTOPbOX}>
                                                <span>订单号:{item.orderNumber}</span>
                                                <div className={edite.orderdist}>状态:<span>{item.statusStr}</span>
                                                </div>
                                            </a>
                                            <ul>
                                                <Goods goodslist={item.goodsmap[0]}/>
                                            </ul>
                                            <div className={edite.orderIDbottom}>
                                                共
                                                <span>{item.goodsNumber}</span>件商品 合计
                                                <span>￥{item.amountReal}</span>
                                            </div>
                                            {item.address[0] !== undefined
                                                ? that.orderbtn(item.status, item.id, item.orderNumber, item.address[0].trackingNumber, item.address[0].shipperName, item.goodsmap[0])
                                                : that.orderbtn(item.status, item.id, item.orderNumber, "", "", item.goodsmap[0])}
                                        </div>
                                    )
                                })}
                            {this.state.waitepay.length <= 0
                                ? <div className={edite.Noshop}>
                                        <div className={edite.Empty + " " + edite.img3}></div>
                                        <p>无待支付订单</p>
                                    </div>
                                : null}
                        </div>
                        <div
                            style={Number(that.state.cateid) === 2
                            ? {
                                display: "block"
                            }
                            : {
                                display: "none"
                            }}>
                            {this.state.waitgoods.map(function (item, index) {
                                    return (
                                        <div className={edite.carlist} key={index}>
                                            <a href={"#/user/orderdetails/" + item.id} className={edite.userorderTOPbOX}>
                                                <span>订单号:{item.orderNumber}</span>
                                                <div className={edite.orderdist}>状态:<span>{item.statusStr}</span>
                                                </div>
                                            </a>
                                            <ul>
                                                <Goods goodslist={item.goodsmap[0]}/>
                                            </ul>
                                            <div className={edite.orderIDbottom}>
                                                共
                                                <span>{item.goodsNumber}</span>件商品 合计
                                                <span>￥{item.amountReal}</span>
                                            </div>
                                            {item.address[0] !== undefined
                                                ? that.orderbtn(item.status, item.id, item.orderNumber, item.address[0].trackingNumber, item.address[0].shipperName, item.goodsmap[0])
                                                : that.orderbtn(item.status, item.id, item.orderNumber, "", "", item.goodsmap[0])}
                                        </div>
                                    )
                                })}
                            {this.state.waitgoods.length <= 0
                                ? <div className={edite.Noshop}>
                                        <div className={edite.Empty + " " + edite.img3}></div>
                                        <p>无待发货订单</p>
                                    </div>
                                : null}
                        </div>
                        <div
                            style={Number(that.state.cateid) === 3
                            ? {
                                display: "block"
                            }
                            : {
                                display: "none"
                            }}>
                            {this.state.waitcogoods.map(function (item, index) {
                                    return (
                                        <div className={edite.carlist} key={index}>
                                            <a href={"#/user/orderdetails/" + item.id} className={edite.userorderTOPbOX}>
                                                <span>订单号:{item.orderNumber}</span>
                                                <div className={edite.orderdist}>状态:<span>{item.statusStr}</span>
                                                </div>
                                            </a>
                                            <ul>
                                                <Goods goodslist={item.goodsmap[0]}/>
                                            </ul>
                                            <div className={edite.orderIDbottom}>
                                                共
                                                <span>{item.goodsNumber}</span>件商品 合计
                                                <span>￥{item.amountReal}</span>
                                            </div>
                                            {item.address[0] !== undefined
                                                ? that.orderbtn(item.status, item.id, item.orderNumber, item.address[0].trackingNumber, item.address[0].shipperName, item.goodsmap[0])
                                                : that.orderbtn(item.status, item.id, item.orderNumber, "", "", item.goodsmap[0])}
                                        </div>
                                    )
                                })}
                            {this.state.waitcogoods.length <= 0
                                ? <div className={edite.Noshop}>
                                        <div className={edite.Empty + " " + edite.img3}></div>
                                        <p>无待收货订单</p>
                                    </div>
                                : null}
                        </div>
                        <div
                            style={Number(that.state.cateid) === 4
                            ? {
                                display: "block"
                            }
                            : {
                                display: "none"
                            }}>
                            {this.state.waitevote.map(function (item, index) {
                                    return (
                                        <div className={edite.carlist} key={index}>
                                            <a href={"#/user/orderdetails/" + item.id} className={edite.userorderTOPbOX}>
                                                <span>订单号:{item.orderNumber}</span>
                                                <div className={edite.orderdist}>状态:<span>{item.statusStr}</span>
                                                </div>
                                            </a>
                                            <ul>
                                                <Goods goodslist={item.goodsmap[0]}/>
                                            </ul>
                                            <div className={edite.orderIDbottom}>
                                                共
                                                <span>{item.goodsNumber}</span>件商品 合计
                                                <span>￥{item.amountReal}</span>
                                            </div>
                                            {item.address[0] !== undefined
                                                ? that.orderbtn(item.status, item.id, item.orderNumber, item.address[0].trackingNumber, item.address[0].shipperName, item.goodsmap[0])
                                                : that.orderbtn(item.status, item.id, item.orderNumber, "", "", item.goodsmap[0])}
                                        </div>
                                    )
                                })}
                            {this.state.waitevote.length <= 0
                                ? <div className={edite.Noshop}>
                                        <div className={edite.Empty + " " + edite.img3}></div>
                                        <p>无待评价订单</p>
                                    </div>
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
