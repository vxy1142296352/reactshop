import React, {Component} from 'react';
import details from './less/details.less';
import apis from './api/api';
import Loading from './commd/loading';
import Evote from './commd/details/evote';
import Total from './commd/toast';
import Share from './commd/details/share';
import Token from './redux/token/reducers/index';
import {CSSTransition} from 'react-transition-group';
import Scorll from './commd/scroll';
import Banner from './commd/banner/banner';
import Img from './commd/details/img'
import initReactFastclick from 'react-fastclick';
import Toast from './commd/toast';
initReactFastclick();
function DisplayName(props) { //渲染规格组件
    return props.goods.map(function (item, index) {
            return (
                <a
                    href="jacascrit:"
                    data-mprice={item.minPrice}
                    key={index}
                    data-pindex={props.pindex}
                    data-index={index}
                    data-id={item.propertyId}
                    onClick={props.onClick}
                    className={item.active
                    ? details.active
                    : " "}>
                    {item.name}
                </a>
            )
        })
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banner: [],
            detaiimg: false,
            chose: false, //规格弹框
            properties: [], //规格数组
            propertyname: "", //选中规格名字
            number: 1, //数量
            maxnumber: 0, //库存
            loading: false, //加载
            evote: [], //评价数据,
            share: false,
            collection: false,
            token: Token.getState().token.token,
            sharetrans: false,
            chosesure: false,
            goodsExpress: [], //邮费计算
            goodschoseID: "",
            express: "包邮", //是否包邮
            isfress: true, //是否包邮标记
            logisticsId: "", //运费摸板编号
            Left: 0, //加入购物车动画小球位置
            Top: 0, //加入购物车动画小球位置
            isclick: true, //防止点击过快
            Zindex: 0 //加入购物车动画小球位置
        }
    }
    componentDidMount() { //组件挂载
        this._isMounted = true
        this.details()
        this.collection(this.props.match.params.id)
        this.setState({
            Left: this.refs.addcart.offsetLeft + this.refs.addcart.clientWidth / 2,
            Top: this.refs.carbox.clientHeight / 2
        })
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    runing() {
        var timer
        clearInterval(timer)
        this.setState({
            Zindex: 10000
        })
        var Xwidth = this.refs.carbox.clientWidth
        var XoffLeft = this.refs.carbox.offsetLeft
        var allheight = this.refs.carbox.clientHeight
        var Ywidth = this.refs.addcart.clientWidth
        var YoffLeft = this.refs.addcart.offsetLeft
        var StartX = YoffLeft + Ywidth / 2 //小球运动起始坐标X值
        var EndX = XoffLeft + Xwidth / 2 //小球运动结束坐标X值
        var ballCenterX = (StartX - EndX) / 2 + EndX //小球运动圆心X轴
        var ballCenterY = allheight / 2 //小球运动圆心Y轴坐标
        var carradius = ((YoffLeft + Ywidth / 2) - (XoffLeft + Xwidth / 2)) / 2 //小球运动半径
        var num = 90
        var that = this
        timer = setInterval(function () {
            //每个50ms +1个角度
            num -= 5;
            //计算弧度
            let rad = Math.PI / 180 * num;
            //计算大圆上每一个A的x,y
            let x = Math.sin(rad) * carradius + ballCenterX;
            let y = Math.cos(rad) * carradius + ballCenterY;
            if (num <= -90) {
                clearInterval(timer)
                that.setState({
                    Zindex: 0
                })
                setTimeout(function () {
                    that.setState({
                        Left: that.refs.addcart.offsetLeft + that.refs.addcart.clientWidth / 2,
                        Top: that.refs.carbox.clientHeight / 2
                    })
                }, 10)
            }
            //
            that.setState({
                Left: x,
                Top: y,
            })
        }, 10);
    }
    details() {
        var that = this,
            id = that.props.match.params.id,
            propertyname = '',
            propertyChildIds = '',
            data = {}
        data.params = {}
        data.params.id = id
        apis('shop/goods/detail', data, "GET", function (res) {
            if (res.data.code === 0) {
                var properties = res.data.data.properties
                for (var i = 0; i < properties.length; i++) {
                    properties[i].childsCurGoods[0].active = true
                    propertyname += properties[i].name + ":" + properties[i].childsCurGoods[0].name + "";
                    propertyChildIds += properties[i].id + ":" + properties[i].childsCurGoods[0].id + ","
                }
                that.setState({
                    goodsId: res.data.data.basicInfo.id,
                    goodsName: res.data.data.basicInfo.name,
                    characteristic: res.data.data.basicInfo.characteristic,
                    commission: res.data.data.basicInfo.commission,
                    pic: res.data.data.basicInfo.pic,
                    properties: properties,
                    banner: res.data.data.pics,
                    propertyname: propertyname,
                    goodschoseID: propertyChildIds,
                    logisticsId: res.data.data.basicInfo.logisticsId,
                    imgcontent: res.data.data.content
                })
                that.getprice(propertyChildIds)
                that.evote(id)
                if (res.data.data.logistics) {
                    if (!res.data.data.logistics.isFree) {
                        res.data.data.logistics.details[0].expresName = "普通快递"
                        res.data.data.logistics.details[1].expresName = "邮政EMS"
                        res.data.data.logistics.details[2].expresName = "平邮"
                        that.setState({
                            goodsExpress: res.data.data.logistics.details,
                            express: "选择快递",
                            isfress: false
                        })
                    }
                } else {
                    that.setState({
                        express: "无需物流"
                    })
                }
            } else {
                Total.error("商品已下架", 1500)
                that.props.history.replace("/")
            }
        }, that)
    }
    allimg() { //查看图文详情
        var that = this
        this.setState({
            detaiimg: true
        })
        var n = 0
        var timer = setInterval(function () {
            n += 100
            if (n > Number(that.refs.Detailscrotll.offsetHeight)) {
                clearInterval(timer)
            }
            window.scrollTo(0, n)
        }, 10)
    }
    gobuy(e) { //立即购买
        var chose = e.target.getAttribute("data-chose"),
            that = this;
        if (chose === "true") {
            if (this.state.maxnumber === 0) {
                Total.error("库存不足", 1500)
                return false
            } else {
                if (that.state.token === undefined || that.state.token === null) {
                    Total.warning("请先登录", 1500)
                    setTimeout(function () {
                        that.props.history.push("/login?Redirect=" + that.props.location.pathname)
                    }, 1501)
                } else {
                    var arr = []
                    var goodsIndfo = this.getInfo()
                    arr.push(goodsIndfo)
                    localStorage.setItem("goodsInfo", JSON.stringify(arr))
                    this.props.history.push('/paychose')
                }

            }
        } else {
            that.setState({
                chose: true,
                chosesure: true
            })
        }
    }
    goCar(e) { //加入购物车
        var chose = e.target.getAttribute("data-chose"),
            that = this;
        if (chose === "true") {
            if (this.state.maxnumber === 0) {
                Total.error("库存不足", 1500)
                return false
            } else {
                var arr = []
                var goodsIndfo = this.getInfo()
                if (localStorage.getItem("carlist") && JSON.parse(localStorage.getItem("carlist")).length > 0) {
                    var cararr = JSON.parse(localStorage.getItem("carlist"))
                    cararr.push(goodsIndfo)
                    localStorage.setItem("carlist", JSON.stringify(this.merge(cararr)))
                    Total.success("加入购物车成功", 1500)
                } else {
                    arr.push(goodsIndfo)
                    localStorage.setItem("carlist", JSON.stringify(arr))
                    Total.success("加入购物车成功", 1500)
                }
                this.runing()
            }
        } else {
            that.setState({
                chose: true,
                chosesure: true
            })
        }
    }
    merge(list) { //加入购物车判断相同商品
        var result = []
        var cache = {}
        list.forEach(item => {
            var key = `id:${item.goodsId},title${item.propertyChildIds}`
            var index = cache[key]
            if (index !== undefined) {
                result[index].logisticsId = item.logisticsId
                result[index].maxnumber = item.maxnumber
                result[index].express = item.express
                result[index].checkname = item.checkname
                result[index].goodsExpress = item.goodsExpress
                result[index].price = item.price
                result[index].pic = item.pic
                result[index].goodsname = item.goodsname
                result[index].isfress = item.isfress
                result[index].number += item.number
                if (result[index].number > item.maxnumber) {
                    result[index].number = item.maxnumber
                    Total.error("超出最大购买数量", 1500)
                    return false
                }
            } else {
                result.push(Object.assign({}, item))
                cache[key] = result.length - 1
            }
        })
        return result
    }
    chosecheck() { //选择规格
        var that = this;
        that.setState({
            chose: true,
            chosesure: true
        })
    }
    getInfo() {
        var goodsIndfo = {}
        goodsIndfo.goodsname = this.state.goodsName //商品名称
        goodsIndfo.goodsId = this.state.goodsId //商品ID
        goodsIndfo.propertyChildIds = this.state.goodschoseID //商品选中ID
        goodsIndfo.pic = this.state.pic //商品图片
        goodsIndfo.goodsExpress = this.state.goodsExpress //商品快递
        goodsIndfo.checkname = this.state.propertyname //选中商品规格
        goodsIndfo.maxnumber = this.state.maxnumber //商品库存
        goodsIndfo.number = this.state.number //购买的商品数量
        goodsIndfo.price = this.state.minPrice //商品价格
        goodsIndfo.active = true //购物车选中
        goodsIndfo.express = this.state.express //是否包邮
        goodsIndfo.isfress = this.state.isfress //包邮标记
        goodsIndfo.goodsExpress = this.state.goodsExpress //快递计费规则
        goodsIndfo.logisticsId = this.state.logisticsId //快递摸板编号
        goodsIndfo.allprice = (this.state.minPrice * this.state.number).toFixed(2)
        if (goodsIndfo.goodsExpress.length > 0) {
            goodsIndfo.goodsExpress[0].active = true
        }
        return goodsIndfo
    }
    closechose(e) { //关闭规格
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false;
        }
        var that = this;
        that.setState({
            chose: false
        })
        setTimeout(function () {
            that.setState({
                chosesure: false
            })
        }, 500)
    }
    chosegoods(e) { //选中规格
        if (this.state.isclick) {
            var that = this
            that.setState({
                isclick: false
            })
            var index = e.target.getAttribute("data-index"),
                index2 = e.target.getAttribute("data-pindex"),
                goods = this.state.properties,
                propertyname = '',
                propertyChildIds = '';
            for (var i = 0; i < goods.length; i++) {
                for (var j = 0; j < goods[i].childsCurGoods.length; j++) {
                    if (i === Number(index2)) {
                        goods[i].childsCurGoods[j].active = false
                        goods[i].childsCurGoods[index].active = true
                    }
                    if (goods[i].childsCurGoods[j].active === true && goods[i].id === goods[i].childsCurGoods[j].propertyId) {
                        propertyname += goods[i].name + ":" + goods[i].childsCurGoods[j].name
                        propertyChildIds += goods[i].id + ":" + goods[i].childsCurGoods[j].id + ","
                    }
                }
            }
            that.setState({
                properties: goods,
                propertyname: propertyname,
                goodschoseID: propertyChildIds
            })
            that.getprice(propertyChildIds)
        } else {
            Toast.warning("点击过快", 500)
        }
    }
    reducenumber() { //数量减
        var that = this,
            number = this.state.number
        number--
        if (number <= 1) {
            number = 1
        }
        that.setState({
            number: number
        })
    }
    addnumber() { //数量加
        var that = this,
            number = this.state.number
        number++
        if (number >= this.state.maxnumber) {
            Total.error("超过最大购买数量", 1500)
            number = this.state.maxnumber
        }
        that.setState({
            number: number
        })
    }
    getprice(propertyChildIds) { //点击获取价格
        var that = this
        apis('shop/goods/price', {
            params: {
                goodsId: that.state.goodsId,
                propertyChildIds: propertyChildIds
            }
        }, "GET", function (res) {
            if (that._isMounted) {
                that.setState({
                    loading: true
                })
                setTimeout(function () {
                    that.setState({
                        isclick: true
                    })
                }, 500)
                if (res.data.code === 0) {
                    that.setState({
                        minPrice: res.data.data.price,
                        originalPrice: res.data.data.originalPrice
                    })
                    if (res.data.data.stores === 0) {
                        Total.error("库存不足", 1500)
                        that.setState({
                            number: "无库存",
                            maxnumber: res.data.data.stores
                        })
                        return false
                    } else {
                        that.setState({
                            maxnumber: res.data.data.stores
                        })
                    }
                }
            }
        }, that)
    }
    share() { //分享
        var that = this
        that.setState({
            share: true,
            sharetrans: true
        })
    }
    onClose(e) { //关闭分享
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false;
        }
        var that = this
        that.setState({
            share: false
        })
        setTimeout(() => {
            that.setState({
                sharetrans: false
            })
        }, 500);
    }
    evote(id) { //获取评价
        var that = this
        apis('shop/goods/reputation', {
            params: {
                goodsId: id
            }
        }, "GET", function (res) {
            if (res.data.code === 0) {
                that.setState({
                    evote: res.data.data
                })
            }
        }, that)
    }
    collection(id) { //检测是否加入收藏
        var that = this
        apis('shop/goods/fav/check', {
            params: {
                token: this.state.token,
                goodsId: id
            }
        }, "GET", function (res) {
            if (that._isMounted) {
                var collec = res.data.code === 0 ?
                    true :
                    false
                that.setState({
                    collection: collec
                })
            }
        }, that)
    }
    joincollec() { //收藏操作
        var that = this
        if (that.state.token === undefined || that.state.token === null) {
            Total.warning("请先登录", 1500)
            setTimeout(function () {
                that.props.history.push("/login?Redirect=" + that.props.location.pathname)
            }, 1501)
        } else {
            if (this.state.collection) {
                apis('shop/goods/fav/delete', { //取消收藏
                    params: {
                        token: this.state.token,
                        goodsId: this.state.goodsId
                    }
                }, 'GET', function (res) {
                    if (res.data.code === 0) {
                        that.setState({
                            collection: false
                        })
                        Total.success("取消成功", 1500)
                    } else {
                        Total.error(res.data.msg, 1500)
                    }
                }, that)
            } else {
                apis('shop/goods/fav/add', { //添加
                    params: {
                        token: this.state.token,
                        goodsId: this.state.goodsId
                    }
                }, 'GET', function (res) {
                    if (res.data.code === 0) {
                        that.setState({
                            collection: true
                        })
                        Total.success("收藏成功", 1500)
                    } else {
                        Total.error(res.data.msg, 1500)
                    }
                }, this)
            }
        }

    }
    goback() {
        this.props.history.goBack()
    }
        render() {
            var that = this
            return (
                <div className={details.detailsApp}>
                <div style={{width:".5rem",height:".5rem",position:"fixed",background:"#ff0000",borderRadius:"50%",zIndex:this.state.Zindex,left:this.state.Left+"px",bottom:this.state.Top+"px",textAlign:"center",lineHeight:".5rem",fontSize:".3rem",color:"#fff"}}>{this.state.number}
                </div>
                    {!this.state.loading
                        ? <Loading/>
                        : null}
                    <div className={details.detailsheader}>
                        <a href="javascrit:" className={details.deTopleft} onClick={() => this.goback()}>
                        </a>
                        <a href="/#/" className={details.deToprirht}>
                        </a>
                    </div>
                    <div className={details.container+" reactApp"}>
                        <div className={details.detailsContainer} ref="Detailscrotll">
                            <div className={details.detailsimg}>
                                {this.state.loading
                                    ? <Banner indexless={details} cate="details" banner={this.state.banner}/>
                                    : null}
                            </div>
                            <div className={details.detailscontent}>
                                <h1 className={details.title}>
                                    {this.state.goodsName}
                                    <p className={details.characteristic}>{this.state.characteristic}</p>
                                    <span>¥{this.state.minPrice}
                                        <del>¥{this.state.originalPrice}</del>
                                    </span>
                                    <em
                                        className={details.img2}
                                        onClick={this
                                        .share
                                        .bind(this)}></em>
                                </h1>
                                <div
                                    className={details.choseBox}
                                    onClick={this
                                    .chosecheck
                                    .bind(this)}>
                                    <span className={details.choseName + " " + details.fl}>已选:
                                        <em>{this.state.propertyname}</em>
                                        <i>x{this.state.number}</i>
                                    </span>
                                    <img
                                        src={require('./images/searchback.jpg')}
                                        className={details.fr + " " + details.choseright}
                                        alt=""/>
                                </div>
                                <div className={details.choseBox}>
                                    <span className={details.choseName + " " + details.fl}>积分:
                                        <em>购买送{this.state.commission}积分</em>
                                    </span>
                                </div>
                                <div className={details.choseBox}>
                                    <span className={details.choseName + " " + details.fl}>服务:</span>
                                    <ul className={details.fl}>
                                        <li>正品保证</li>
                                        <li>急速退款</li>
                                        <li>运费险</li>
                                        <li>24H发货</li>
                                    </ul>
                                </div>
                                <div className={details.choseBox}>
                                    <span className={details.choseName + " " + details.fl}>物流:
                                        <em>快递</em>
                                        <em>邮政EMS</em>
                                        <em>平邮</em>
                                        <em>(少数地区只支持EMS)</em>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            {this.state.evote.length > 0
                                ? <Evote
                                        evote={this.state.evote}
                                        goodsID={this.state.goodsId}
                                        page="details"
                                        details={details}/>
                                : null}
                        </div>
                        <div className={details.detailsImgcon}>
                            <div
                                className={details.detsimgtitle}
                                onClick={that
                                .allimg
                                .bind(that)}>点击查看图文详情</div>
                            <div
                                className={details.detailsImgBox}
                                style={this.state.detaiimg
                                ? {
                                    height: "auto"
                                }
                                : {
                                    height: "0"
                                }}>
                                    <Img content={this.state.imgcontent}/>
                                </div>
                        </div>
                    </div>
                    <CSSTransition in={this.state.chose} classNames="share_trans" timeout={0}>
                        <div>
                            {this.state.chosesure
                                ? <div>
                                        <div className={details.back + " share_Back"}></div>
                                        <div className={details.deChoseBox + " DEtailshareBox"}>
                                            <a href="javascrit:" className={details.listclose} onClick={this.closechose.bind(this)}>
                                            </a>
                                            <div className={details.chodeimg}>
                                                <img src={this.state.pic} alt=""/>
                                                <div className={details.choseNameBox}>
                                                    <h2>
                                                        {this.state.goodsName}</h2>
                                                    <div className={details.choseprice}>
                                                        <span>价格:￥ {this.state.minPrice}</span>
                                                        <div className={details.choseti}>
                                                            已选:{this.state.propertyname}
                                                            <em>x{this.state.number}</em>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={details.screenContent}>
                                                {this.state.properties.map(function (item, index) {
                                                        return (
                                                            <dl key={index}>
                                                                <dt>{item.name}</dt>
                                                                <dd>
                                                                    <DisplayName
                                                                        goods={item.childsCurGoods}
                                                                        pindex={index}
                                                                        onClick={that
                                                                        .chosegoods
                                                                        .bind(that)}/>
                                                                </dd>
                                                            </dl>
                                                        )
                                                    })
                                                }
                                                <dl>
                                                    <dt>数量:</dt>
                                                    <dd>
                                                        <div className={details.carnumer}>
                                                            <button
                                                                disabled={this.state.maxnumber === 0
                                                                ? true
                                                                : false}
                                                                onClick={this
                                                                .reducenumber
                                                                .bind(this)}>-</button>
                                                            <input type="text" placeholder={this.state.number} disabled></input>
                                                            <button
                                                                disabled={this.state.maxnumber === 0
                                                                ? true
                                                                : false}
                                                                onClick={this
                                                                .addnumber
                                                                .bind(this)}>+</button>
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                : null}
                        </div>
                    </CSSTransition>
                    <CSSTransition in={this.state.share} classNames="share_trans" timeout={0}>
                        <div>
                            {this.state.sharetrans
                                ? <Share
                                        GoodsName={this.state.goodsName}
                                        GoodsID={this.state.goodsId}
                                        GoodsPic={this.state.pic}
                                        characteristic={this.state.characteristic}
                                        details={details}
                                        onClose={this.onClose.bind(this)}/>
                                : null}
                        </div>
                    </CSSTransition>
                    <div className={details.detaiPayBox}>
                        <div className={details.detilLeft}>
                            <a href="javascrit:">
                                <i></i>客服</a>
                            <a href="javascrit:"
                                className={this.state.collection
                                ? details.scollecActive
                                : details.scollec}
                                onClick={this
                                .joincollec
                                .bind(this)}>
                                <i></i>{this.state.collection
                                    ? "已收藏"
                                    : "收藏"}</a>
                            <a href="/#/car" ref="carbox">
                                <i></i>购物车</a>
                        </div>
                        <div className={details.detaPay}>
                            <a href="javascrit:"
                                data-chose={this.state.chose}
                                onClick={this
                                .goCar
                                .bind(this)} ref="addcart">加入购物车</a>
                            <a href="javascrit:"
                                data-chose={this.state.chose}
                                onClick={this
                                .gobuy
                                .bind(this)}>立即购买</a>
                        </div>
                    </div>
                    <Scorll details={details}/>
                </div>
            );
        }
    }
    export default App;
