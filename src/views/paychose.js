import React, {
    Component
} from 'react';
import {withRouter} from 'react-router-dom';
import edite from './less/paychose.less';
import Total from './commd/toast';
import Modal from './commd/modal';
import apis from './api/userapi';
import Token from "./redux/token/reducers/index"
import initReactFastclick from 'react-fastclick';
initReactFastclick();
const confirm = Modal
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            goods: [],
            checkex: false, //快递弹框
            checkcoupon: false, //优惠券弹框
            checkindex: null, //快递索引
            couponlist: [], //优惠券数据
            couonname: "未使用优惠券",
            couponPrice: 0, //优惠券面值
            couponId: "", //优惠券编号
            orderall: 0,
            expireMinutes: 30,
            token: Token.getState().token.token,
            remark: "", //下单备注信息
            paymoney: [{
                name: "在线支付",
                active: true,
                disabled: false,
                payOnDelivery: 0
            }, {
                name: "货到付款",
                active: false,
                disabled: true,
                payOnDelivery: 1
            }],
            paychose: false, //选择支付方式信息
            payOnDelivery: 0, //支付方式ID
            payname: "在线支付", //支付方式名称
            address: [] //收货地址
        }
    }
    goback() {
        confirm.confirm({
            contentText: '确定放弃吗,下单有喜哦',
            onOk() {
                localStorage.removeItem("goodsInfo")
                window.history.go(-1);
                localStorage.removeItem("address")
            },
            onCancel() {}
        })
    }
    componentWillMount() {
        if (!localStorage.getItem("goodsInfo") || JSON.parse(localStorage.getItem("goodsInfo")).length <= 0) {
            Total.error("请求错误", 1500)
            this.props.history.replace("/404")
        } else {
            var express = JSON.parse(localStorage.getItem("goodsInfo"))
            for (var i = 0; i < express.length; i++) {
                if (express[i].isfress) {
                    express[i].Exprice = 0
                    express[i].Exname = express[i].express
                    express[i].logisticsType = 0
                } else {
                    for (var j = 0; j < express[i].goodsExpress.length; j++) {
                        if (express[i].goodsExpress[j].active === true) {
                            express[i].Exprice = this.Express(express[i].number, express[i].goodsExpress, j).express
                            express[i].Exname = this.Express(express[i].number, express[i].goodsExpress, j).expressName
                            express[i].logisticsType = this.Express(express[i].number, express[i].goodsExpress, j).type
                        }
                    }
                }
            }
            this.setState({
                goods: express,
                orderall: express[0].allprice
            })
            this.GetallPrice(express)
            this.getCoupon()
            this.getAddress()
        }
    }
    getAddress() {
        var arr = [],
            that = this
        if (localStorage.getItem("address")) {
            arr.push(JSON.parse(localStorage.getItem("address")))
            that.setState({
                address: arr
            })
        } else {
            apis('user/shipping-address/default', {}, "GET", function (res) {
                if (res.data.code === 0) {
                    arr.push(res.data.data)
                    that.setState({
                        address: arr
                    })
                }
            }, that)
        }
        localStorage.removeItem("addressurl")
    }
    remark(e) {
        this.setState({
            remark: e.target.value
        })
    }
    Express(number, Exdetails, index) { //计算运费
        var express = 0
        if (number <= Exdetails[index].firstNumber) {
            express = Exdetails[index].firstAmount
        } else {
            var diffrence = number - Exdetails[index].firstNumber
            express = Exdetails[index].firstAmount + Math.ceil(diffrence / Exdetails[index].addNumber) * Exdetails[index].addAmount
        }
        return {
            express: express,
            expressName: Exdetails[index].expresName,
            type: Exdetails[index].type
        }
    }
    checkExpre(e) { //打开选择快递
        if (this.state.goods[e.currentTarget.getAttribute("data-index")].isfress) {
            return false
        } else {
            this.setState({
                checkindex: e.currentTarget.getAttribute("data-index"),
                checkex: true
            })
        }
    }
    CloseEx() { //关闭快递
        this.setState({
            checkindex: null,
            checkex: false
        })
    }
    ChoseExpress(e) { //选择快递
        var type = e.currentTarget.getAttribute("data-type")
        var goods = this.state.goods
        var index = e.currentTarget.getAttribute("data-index")
        for (var i = 0; i < goods[this.state.checkindex].goodsExpress.length; i++) {
            goods[this.state.checkindex].goodsExpress[i].active = false
            goods[this.state.checkindex].Exname = this.Express(goods[this.state.checkindex].number, goods[this.state.checkindex].goodsExpress, index).expressName
            goods[this.state.checkindex].goodsExpress[index].active = true
            goods[this.state.checkindex].Exprice = this.Express(goods[this.state.checkindex].number, goods[this.state.checkindex].goodsExpress, index).express
            goods[this.state.checkindex].logisticsType = type
        }
        this.setState({
            goods: goods,
            checkindex: null,
            checkex: false
        })
        localStorage.setItem("goodsinfo", goods)
        this.GetallPrice(goods)
    }
    GetallPrice(goods) { //计算价格
        localStorage.setItem("goodsInfo", JSON.stringify(goods))
        var allexprice = 0
        var allnumber = 0
        for (var i = 0; i < goods.length; i++) {
            allexprice += goods[i].Exprice
            allnumber += goods[i].number
        }
        this.setState({
            allprice: Number(goods[0].allprice) + allexprice - this.state.couponPrice,
            allexprice: allexprice,
            allnumber: allnumber
        })
    }
    getCoupon() { //获取优惠券
        var that = this
        apis('discounts/my', {
            token: this.state.token,
            status: 0
        }, "POST", function (res) {
            if (res.data.code === 0) {
                res.data.data.push({
                    money: 0,
                    moneyHreshold: 0,
                    id: "",
                    name: "不使用优惠券",
                    status: 0,
                    type: "不使用优惠券"
                })
                that.setState({
                    couponlist: res.data.data
                })
            }
        }, that)
    }
    ChoseCoupon() { //打开选择优惠券
        if (this.state.couponlist.length <= 0) {
            return false
        } else {
            this.setState({
                checkcoupon: true
            })
            this.GetAllprice()
        }
    }
    GetAllprice() {
        var Couponlist = this.state.couponlist
        for (let i = 0; i < Couponlist.length; i++) {
            if (Couponlist[i].moneyHreshold > this.state.allprice) {
                Couponlist[i].disabled = true
                Couponlist[i].tips = "不可选择满" + Couponlist[i].moneyHreshold + "可用"
            } else {
                for (let j = 0; j < this.state.goods.length; j++) {
                    if (Couponlist[i].refId && Couponlist[i].refId !== this.state.goods[j].goodsId) {
                        Couponlist[i].disabled = true
                        Couponlist[i].tips = "指定商品可用"
                    } else {
                        Couponlist[i].disabled = false
                    }
                }
            }
        }
    }
    CloseCoupon() { //关闭优惠券
        this.setState({
            checkcoupon: false
        })
    }
    choseCkprice(e) { //使用优惠券
        var coupon = this.state.couponlist
        for (var i = 0; i < coupon.length; i++) {
            coupon[i].active = false
            coupon[e.currentTarget.getAttribute("data-index")].active = true
        }
        this.setState({
            couponId: e.currentTarget.getAttribute("data-id"),
            couonname: e.currentTarget.getAttribute("data-name"),
            couponPrice: e.currentTarget.getAttribute("data-price"),
            allprice: this.state.orderall - Number(e.currentTarget.getAttribute("data-price")) + this.state.allexprice,
            checkcoupon: false,
            couponlist: coupon
        })
    }
    Checkmoney() { //打开选择支付
        this.setState({
            paychose: true
        })
    }
    ClosePay() { //关闭选择支付
        this.setState({
            paychose: false
        })
    }
    chosePay(e) { //选择支付方式
        var select = this.state.paymoney
        for (var i = 0; i < select.length; i++) {
            select[i].active = false
            select[e.currentTarget.getAttribute("data-index")].active = true
        }
        this.setState({
            paymoney: select,
            payOnDelivery: select[e.currentTarget.getAttribute("data-index")].payOnDelivery,
            payname: select[e.currentTarget.getAttribute("data-index")].name,
            paychose: false
        })
    }
    choseAddress() { //选择收货地址
        localStorage.setItem("addressurl", this.props.history.location.pathname)
        this.props.history.replace("/user/address")
    }
    createOrder() { //创建订单
        var hideLoading = Total.loading('处理中...')
        var that = this
        apis("order/create", {
            goodsJsonStr: localStorage.getItem("goodsInfo"),
            address: this.state.address[0].address,
            cityId: this.state.address[0].cityId,
            code: this.state.address[0].code,
            couponId: this.state.couponId,
            districtId: this.state.address[0].districtId,
            expireMinutes: 120,
            linkMan: this.state.address[0].linkMan,
            mobile: this.state.address[0].mobile,
            payOnDelivery: this.state.payOnDelivery,
            provinceId: this.state.address[0].provinceId,
            remark: this.state.remark
        }, "POST", function (res) {
            if (res.data.code === 0) {
                setTimeout(hideLoading, 1500)
                localStorage.removeItem("goodsInfo")
                localStorage.removeItem("carlist")
                localStorage.removeItem("address")
                setTimeout(function () {
                    that.props.history.replace("/paychose/onlinepay?orderid=" + res.data.data.id + "accestoken?=" + that.state.token)
                }, 1501)
            } else {
                setTimeout(hideLoading, 100)
                Total.error("创建订单失败", 1500)
            }
        }, that)
    }
    render(){
        var that = this
        return (
            <div className="paychoseApp">
                {this.state.checkex
                    ? <div className={edite.pay_BJ}>
                            <div className={edite.pay_Express}>
                                <div
                                    className={edite.express_Close}
                                    onClick={this
                                    .CloseEx
                                    .bind(this)}></div>
                                <div className={edite.express_chose}>
                                    <div className={edite.payexpress_Tiele}>选择配送方式</div>
                                    {this.state.checkindex !== null
                                        ? this.state.goods[this.state.checkindex].goodsExpress.map(function (item, index) {
                                                return (
                                                    <div key={index + .02}>
                                                        <p
                                                            className={item.active
                                                            ? edite.active
                                                            : ""}
                                                            onClick={that
                                                            .ChoseExpress
                                                            .bind(that)}
                                                            data-type={item.type}
                                                            data-index={index}>{item.expresName}({item.firstNumber}件内{item.firstAmount}元每增加{item.addNumber}件{item.addAmount}元)</p>
                                                    </div>
                                                )
                                            })
                                        : null}
                                </div>
                            </div>
                        </div>
                    :null}
                {this.state.checkcoupon
                    ? <div className={edite.pay_BJ}>
                            <div className={edite.pay_Express}>
                                <div
                                    className={edite.express_Close}
                                    onClick={this
                                    .CloseCoupon
                                    .bind(this)}></div>
                                <div className={edite.express_chose}>
                                    <div className={edite.payexpress_Tiele}>选择优惠券</div>
                                    {this.state.couponlist.map(function (item, index) {
                                            return (
                                                <div key={index + .02}>
                                                    {item.status === 0
                                                        ? <button
                                                                data-index={index}
                                                                onClick={that
                                                                .choseCkprice
                                                                .bind(that)}
                                                                disabled={item.disabled}
                                                                className={item.active
                                                                ? edite.active
                                                                : ""}
                                                                data-id={item.id}
                                                                data-name={item.name}
                                                                data-price={item.money}
                                                                data-max={item.moneyHreshold}>{item.name}满{item.moneyHreshold}{item.disabled
                                                                    ? item.tips
                                                                    : "可用"}</button>
                                                        : null}
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                    : null}
                {this.state.paychose
                    ? <div className={edite.pay_BJ}>
                            <div className={edite.pay_Express}>
                                <div
                                    className={edite.express_Close}
                                    onClick={this
                                    .ClosePay
                                    .bind(this)}></div>
                                <div className={edite.express_chose}>
                                    <div className={edite.payexpress_Tiele}>选择支付方式</div>
                                    {this.state.paymoney.map(function (item, index) {
                                            return (
                                                <div key={index + .02}>
                                                    <button
                                                        data-index={index}
                                                        onClick={that
                                                        .chosePay
                                                        .bind(that)}
                                                        disabled={item.disabled}
                                                        className={item.active
                                                        ? edite.active
                                                        : ""}>{item.disabled
                                                            ? item.name + "(暂不支持此方式)"
                                                            : item.name}</button>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                    : null}
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    确认订单
                </header>
                <div className={edite.container+" "+edite.reactApp}>
                    {this.state.address.map(function (item, index) {
                            return (
                                <div
                                    className={edite.choseAddress}
                                    key={index + .02}
                                    onClick={that
                                    .choseAddress
                                    .bind(that)}>
                                    <a href="javascrit:">
                                        <span className={edite.addtips}>配送地址</span>
                                        <div className={edite.chosecon}>
                                            <div className={edite.addname}>{item.linkMan}
                                                <span>{item.mobile}</span>
                                            </div>
                                            <p>{item.provinceStr}{item.cityStr}{item.areaStr}{item.address}</p>
                                            <img
                                                src={require("../views/images/searchback.jpg")}
                                                className={edite.chosedd}
                                                alt=""/>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                        }
                    {this.state.address.length <= 0
                        ? <div
                                className={edite.choseAddress + " " + edite.chosecon}
                                onClick={that
                                .choseAddress
                                .bind(that)}>
                                <p className={edite.Noaddress}>暂无默认收货地址(点击设置地址)
                                    <img
                                        src={require("../views/images/searchback.jpg")}
                                        className={edite.chosedd}
                                        alt=""/></p>
                            </div>
                        : null}
                    <div className={edite.carlist}>
                        <ul>
                            {this.state.goods.map(function (item, index) {
                                    return (
                                        <li key={index + 0.02}>
                                            <div className={edite.car_Paychose}>
                                                <div className={edite.carimg}>
                                                    <a href={"/#/details/" + item.goodsId}>
                                                        <img alt={item.goodsname} src={item.pic}/>
                                                    </a>
                                                </div>
                                                <div className={edite.carname}>
                                                    <a href={"/#/details/" + item.goodsId}>
                                                        <h2>{item.goodsname}</h2>
                                                        <span>规格:{item.checkname}
                                                            <em>x{item.number}</em>
                                                        </span>
                                                    </a>
                                                    <span className={edite.carprice}>¥{item.price}</span>
                                                </div>
                                            </div>
                                            <div
                                                className={edite.paychoseItem + " " + edite.paychose1}
                                                onClick={that
                                                .checkExpre
                                                .bind(that)}
                                                data-index={index}>
                                                配送方式
                                                <span>{item.Exname}</span>
                                            </div>
                                            <p className={edite.shopprice}>
                                                <em>运费:</em>
                                                <span>￥{item.Exprice}元</span>
                                            </p>
                                            <p className={edite.shopprice}>
                                                <em>商品总价:</em>
                                                <span>￥{(item.price * item.number + item.Exprice).toFixed(2)}元</span>
                                            </p>
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                    <div className={edite.paychoseItem + " " + edite.paychose2}>
                        备注信息
                        <span>
                            <input
                                className={edite.payremark}
                                maxLength="30"
                                onChange={this
                                .remark
                                .bind(this)}
                                type="text"
                                placeholder="输入备注信息(最大30字符)"/>
                        </span>
                    </div>
                    <div
                        className={edite.paychoseItem + " " + edite.paychose2}
                        onClick={this
                        .Checkmoney
                        .bind(this)}>
                        支付方式
                        <span>{this.state.payname}</span>
                    </div>
                    <div
                        className={edite.paychoseItem + " " + edite.paychose2}
                        onClick={this
                        .ChoseCoupon
                        .bind(this)}>
                        优惠券
                        <span>{this.state.couponlist.length === 0
                                ? "无可用优惠券"
                                : this.state.couonname}</span>
                    </div>
                    <div className={edite.paychoseItem + " " + edite.paychose2}>
                        店铺服务
                        <span>正品保证 急速退款 运费险 24H发货</span>
                    </div>
                    <div className={edite.paychoseItem + " " + edite.paychose2}>
                    注意事项
                    <span>订单金额以实际支付金额为准</span>
                </div>
                    <div className={edite.paychoseItem + " " + edite.paychose2}>
                        发票
                        <span>暂不支持发票</span>
                    </div>
                    <div className={edite.Createrorder}>
                        <p>
                            <em>商品数量:</em>
                            <span>{this.state.allnumber}件</span>
                        </p>
                        <p>
                            <em>商品总价:</em>
                            <span>￥{(this.state.allprice).toFixed(2)}元</span>
                        </p>
                        <p>
                            <em>使用优惠券:</em>
                            <span>￥{this.state.couponPrice}元</span>
                        </p>
                        <p>
                            <em>运费:</em>
                            <span>￥{this.state.allexprice}元</span>
                        </p>
                    </div>
                    <div className={edite.createBtom}>
                        {this.state.address.length <= 0
                            ? <a href="javascrit:" className={edite.NOcreateBtn}>
                                    请先选择收货地址
                                </a>
                            : <a href="javascrit:" className={edite.createBtn} onClick={this.createOrder.bind(this)}>
                                创建订单
                            </a>}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);