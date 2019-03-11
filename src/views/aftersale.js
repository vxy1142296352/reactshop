import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import edite from './less/userafter.less';
import apis from './api/userapi';
import Total from './commd/toast';
import Loading from './commd/loading';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            salse: [],
            after: [
                {
                    type: 0,
                    name: "仅退款",
                    check: true
                }, {
                    type: 1,
                    name: "退货和钱",
                    check: false
                }, {
                    type: 2,
                    name: "换货",
                    check: false
                }
            ],
            logisticsStatus: 0,
            loading: false,
            type: 0, //售后选项
            reason:" ", //退换货原因,
            amount: 0, //退款金额
            allprice: 0,//订单总价
            orderId:null
        }
    }
    componentDidMount() {
        this._ismounted = true
        if (window.location.href.split("?ordernumber=")[1].split("?id=")[1]) {
            this.getsale()
        } else {
            Total.error("错误请求", 1500)
            this.props.history.replace("/404")
        }
    }
    componentWillMount() {
        this._ismounted = false
    }
    getsale() {
        var that = this
        apis('order/detail',{
            token: this.state.token,
            id: window.location.href.split("?ordernumber=")[1].split("?id=")[1]
        }, 'POST', function (res){
            if (res.data.code === 0&&that._ismounted) {
                that.setState({salse: res.data.data.goods, salserel: res.data.data.orderInfo.status, allprice: res.data.data.orderInfo.amount, loading: true,orderId:window.location.href.split("?ordernumber=")[1].split("?id=")[1]})
                that.getMoney(res.data.data.orderInfo.amount, that.state.type, that.state.logisticsStatus)
            } else {
                Total.error("错误请求", 1500)
                that.props.history.replace("/404")
             }
        }, that)
    }
    checkserver(e) {
        var index =e.currentTarget.getAttribute("data-index"),
            type = Number(e.currentTarget.getAttribute("data-type")),
            that = this,
            after = this.state.after;
        for (var i = 0; i < after.length; i++) {
            after[i].check = false
            after[index].check = true
        }
        that.setState({after: after, type: type})
        that.getMoney(that.state.allprice, type, that.state.logisticsStatus)
    }
    chekgoods(e) {
        var that = this;
        that.setState({
            logisticsStatus: Number(e.currentTarget.getAttribute("data-index"))
        })
        that.getMoney(that.state.allprice, that.state.type, Number(e.currentTarget.getAttribute("data-index")))
    }
    goback() {
        window.history.go(-1);
    }
    backGo(){
        window.history.go(-1);
    }
    getMoney(allmoney, serid, Status) {
        if (serid === 0) {
            this.setState({amount: 0})
        } else if (serid === 1 || serid === 2) {
            this.setState({amount: allmoney})
        }
    }
    reasonD(e){
        this.setState({
            reason:e.target.value
        })
    }
    Savesubmit(){
        var that=this
            apis('order/refundApply/apply',{
                amount:this.state.amount,
                logisticsStatus:this.state.logisticsStatus,
                orderId:this.state.orderId,
                reason:this.state.reason,
                type:this.state.type,
            },"POST",function (res) {
                if(res.data.code===0){
                    Total.success("提交成功",1500)
                    setTimeout(function (){
                        that.props.history.goBack()
                    },1501)
                }
                else{
                    Total.error(res.data.msg,1500)
                }
            })
    }
    render() {
        var that = this
        return (
            <div className="saleApp reactApp">
                {!this.state.loading
                    ? <Loading/>
                    : null}
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>

                    </a>
                    售后服务
                </header>
                <div className={edite.container}>
                    <div className={edite.aftersale}>
                        <ul>
                            {this.state.salse.map(function (item, i) {
                                    return (
                                        <li
                                            key={i}
                                            data-index={i}
                                            data-goodsid={item.goodsId}
                                            data-choseid={item.propertyChildIds}
                                            style={{
                                            marginBottom: "0"
                                        }}>
                                            <div className={edite.carimg}>
                                                <a href={'#/details/' + item.goodsId}>
                                                    <img src={item.pic} alt=""/>
                                                </a>
                                            </div>
                                            <div className={edite.carname}>
                                                <a href={'#/details/' + item.goodsId}>
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
                    </div>
                    <div className={edite.evotetips}>
                        <div className={edite.evoteimg}>
                            选择服务:
                        </div>
                        {this.state.after.map(function (item, index) {
                                return (
                                    <span
                                        key={index}
                                        data-index={index}
                                        data-type={item.type}
                                        className={item.check
                                        ? edite.active
                                        : ""}
                                        onClick={that
                                        .checkserver
                                        .bind(that)}>{item.name}</span>
                                )
                            })}
                    </div>
                    <div className={edite.evotetips}>
                        <div className={edite.evoteimg}>
                            是否收到货:
                        </div>
                        <span
                            className={this.state.logisticsStatus === 0
                            ? edite.active
                            : ""}
                            data-index="0"
                            onClick={this
                            .chekgoods
                            .bind(this)}>已收到</span>
                        <span
                            className={this.state.logisticsStatus === 1
                            ? edite.active
                            : ""}
                            data-index="1"
                            onClick={this
                            .chekgoods
                            .bind(this)}>未收到</span>
                    </div>
                    <div className={edite.afterGogds}>
                        退款金额:
                        <input
                            type="text"
                            placeholder={this.state.amount}
                            disabled
                            className={edite.moneyinput}/>
                    </div>
                    <div className={edite.evoteText}>
                        <textarea onChange={this.reasonD.bind(this)} name="" id="" cols="30" rows="10" placeholder="输入退换货原因"></textarea>
                    </div>
                    <div className={edite.addressstree}>
                        <button onClick={this.Savesubmit.bind(this)} className={edite.saveadd + " " + edite.savemore}>提交</button>
                        <button onClick={this.backGo.bind(this)} className={edite.saveadd}>取消</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
