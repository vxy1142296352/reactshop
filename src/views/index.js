import React, {Component} from 'react';
import indexless from './less/index.less';
import Footer from './commd/footer';
import apis from './api/api';
import Loading from './commd/loading';
import Total from './commd/toast';
import Time from './commd/index_commd/index_time';//倒计时插件
import Tloader from './commd/refresh/loader_more';//下拉刷新插件
import Indexmain from './commd/index_commd/index_main';//主要商品
import Token from './redux/token/reducers/index';
import Banner from './commd/banner/banner';
import Coupon from './commd/index_commd/index_coupon';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banner: [],
            nav: false,
            Status: [],
            newsgoods: [],
            hotgoods: [],
            cate: [],
            laoding: false,
            token: Token.getState().token.token,
            scroll:false,
            onck:true,
            ismore: true
        }
    }
    refresh = (resolve, reject) => {
        setTimeout(() => {
            resolve();
        },1500);
    }
    componentDidMount() {
        this._isMounted = true //组件挂载
        this.getbanner()
        this.getprolist()
        this.getlist()
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    getbanner() { //获取banner数据
        var that = this;
        apis('banner/list', {}, "GET", function (res) {
            if (res.data.code === 0&&that._isMounted){
                that.setState({banner: res.data.data})
            }
        }, that)
    }
    getlist() {//获取商品分类
        var that = this
        var cate = []
        apis('shop/goods/category/all',{},'GET',function (res) {
            if (that._isMounted&&res.data.code===0) {
                for (var i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].icon && res.data.data[i].level === 1) {
                        cate.push(res.data.data[i])
                    }
                }
                cate.length = 3
                that.setState({cate: cate})
            }
        }, that)
    }
    getprolist() { //获取商品列表数据
        var that = this;
        var stag = [],
            newg = [],
            hotg = [];
        apis('shop/goods/list', {}, "GET", function (res) {
            if (res.data.code === 0&&that._isMounted) {
                var goods = res.data.data
                for (var i = 0; i < goods.length; i++) {
                    goods[i].recommendStatus === 1
                        ? stag.push(goods[i])
                        : newg.push(goods[i]);
                    hotg.push(goods[i])
                }
                that.setState({Status: stag, newsgoods: newg, hotgoods: hotg})
            }
            that.setState({laoding: true})
        }, that)
    }
    shop() {
        Total.warning("玩命开发中", 1500)
    }
    render() {
        return (
            <div
                className={[indexless.indexApp] + " " + [this.state.nav
                    ? indexless.bodyactive
                    : " "]}>
                <header
                    className={[indexless.indexHeader] + " " + [this.state.nav
                        ? indexless.headeractive
                        : " "]}
                    id="header">
                    <div className={indexless.indexMenu + " " + indexless.menuleft} id="menuleft"></div>
                    <a href="#/search" className={indexless.indextopSearch}><input type="text" placeholder="搜索" className={indexless.searchv}/></a>
                    <a href="#/news" className={indexless.indexMenu + " " + indexless.menuright}>
                    </a>
                </header>
                {!this.state.laoding
                    ? <Loading/>
                    : null}
                <section className={indexless.bodytrans + " reactApp view"} id="bodytrans">
                <Tloader
                className="indexrefresh main"
                onRefresh={this.refresh}
                ismore={this.state.ismore}>
                        <section className={indexless.container}>
                        {this.state.laoding
                            ? <Banner indexless={indexless} cate="index" banner={this.state.banner}/>
                            : null}
                        <div className={indexless.indexIcon}>
                            <a href="#/list/0">
                                <i className={indexless.img}></i>热销</a>
                            <a href="#/user/point">
                                <i className={indexless.img}></i>签到</a>
                            <a
                                href="javascrit:"
                                onClick={this
                                .shop
                                .bind(this)}>
                                <i className={indexless.img}></i>抽奖</a>
                            {this
                                .state
                                .cate
                                .map(function (item, index) {
                                    return (
                                        <a href={"#/cate?id=" + item.id} key={index}>
                                            <img src={item.icon} alt={item.name}/> {item.name}
                                        </a>
                                    )
                                })}
                        </div>
                        <Coupon history={this.props.history} Total={Total} indexless={indexless} token={this.state.token}/>
                        <div className={indexless.indexMain1}>
                            <a href="/#/list/0">
                                <img src={require('./images/1.jpg')} alt="sf"/>
                            </a>
                            <a href="/#/list/0">
                                <img src={require('./images/2.jpg')} alt="sf"/>
                            </a>
                            <a href="/#/list/0" className={indexless.Mainlast}>
                                <img src={require('./images/3.jpg')} alt="sf"/>
                            </a>
                        </div>
                        <div className={indexless.indexmain2 + " " + indexless.indexTime}>
                            <h2>限时抢购
                                <i></i>
                                <Time indexless={indexless}/>
                            </h2>
                            <ul className={indexless.indexTproduct}>
                                {this
                                    .state
                                    .Status
                                    .map(function (item, i) {
                                        return (
                                            <li key={item.id}>
                                                <a href={'#/details/' + item.id}>
                                                    <img src={item.pic} alt={item.characteristic}/>

                                                    <h3>{item.name}</h3>
                                                    <span>限时:
                                                        <em>￥{item.minPrice}</em>
                                                    </span>
                                                </a>
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                        {this.state.laoding
                            ? <Indexmain
                                    newsgoods={this.state.newsgoods}
                                    hotgoods={this.state.hotgoods}
                                    indexless={indexless}/>
                            : null}
                        <div className={indexless.bottom}></div>
                    </section>
                    </Tloader>
                </section>
                <Footer className={indexless} nav={this.state.nav}/>
            </div>
        );
    }
}
export default App;
