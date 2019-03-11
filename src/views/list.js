import React, {Component} from 'react';
import list from './less/list.less';
import apis from './api/api';
import Loading from './commd/loading';
import Tloader from './commd/refresh/loader_more';
// import Scorll from './commd/scroll';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catename: "",
            prolist: [],
            loading: false,
            active: [
                {
                    'active': true
                }, {
                    'active': false
                }, {
                    'active': false
                }, {
                    'active': false
                }
            ],
            price: "priceUp",
            ornumber: "ordersUp",
            ordertime: 'addedUp',
            ismore: true
        }
    }
    componentDidMount() { //组件挂载
        this._isMounted = true
        this.getlist("")
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    getlist(orderBy){
        var that = this
        var url = 'shop/goods/list'
        var data = {}
        data.params = {}
        data.params.orderBy = orderBy
        data.params.categoryId = this.props.match.params.id
        var utlname = ""
        if (Number(this.props.match.params.id) === 0) {
            utlname = "所有商品"
        } else {
            utlname = window
                .location
                .href
                .split("?name=")[1]
        }
        that.setState({catename: utlname})
        apis(url, data, "GET", function (res) {
            if (that._isMounted && res.data.code === 0) {
                that.setState({prolist: res.data.data, loading: true})
            } else {
                that.setState({prolist: [], loading: true})
            }
        })
    }
    defaulist(e) { //综合
        var index = e
            .currentTarget
            .getAttribute('data-index')
        this.getlist()
        this.deactive(index)
    }
    changeprice(e) { //价格
        var index = e
                .currentTarget
                .getAttribute('data-index'),
            that = this,
            price = e
                .currentTarget
                .getAttribute('data-price');
        if (price === "priceUp") {
            that.setState({price: "priceDown"})
        } else {
            that.setState({price: "priceUp"})
        }
        that.deactive(index)
        that.getlist(price)
    }
    changesale(e) {
        var index = e
                .currentTarget
                .getAttribute('data-index'),
            that = this,
            ornumber = e
                .currentTarget
                .getAttribute('data-ornumber');
        if (ornumber === "ordersUp") {
            that.setState({ornumber: "ordersDown"})
        } else {
            that.setState({ornumber: "ordersUp"})
        }
        that.getlist(ornumber)
        that.deactive(index)
    }
    changetime(e) {
        var index = e
                .currentTarget
                .getAttribute('data-index'),
            that = this,
            chantime = e
                .currentTarget
                .getAttribute('data-ordertime');
        if (chantime === "addedUp") {
            that.setState({ordertime: "addedDown"})
        } else {
            that.setState({ordertime: "addedUp"})
        }
        that.getlist(chantime)
        this.deactive(index)
    }
    deactive(index) {
        var that = this,
            dactive = that.state.active;
        for (var i = 0; i < dactive.length; i++) {
            dactive[i].active = false
            dactive[index].active = true
        }
        that.setState({active: dactive})
    }
    goback() {
        this.props.history.goBack()
    }
    refresh = (resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2e3);
    }
    loadMore = (resolve) => {
        var that=this
        setTimeout(() => {
            resolve(
                that.setState({
                    ismore:false
                })
            );
        }, 2e3);
    }
    render() {
        if (this.state.prolist.length === 0) {
            var nolist = <div className={list.Noshop}>
                <div className={list.Empty + " " + list.img3}></div>
                <p>此分类下无商品</p>
            </div>
        }
        return (
            <div className={list.listApp + " view"}>
                {!this.state.loading
                    ? <Loading/>
                    : null}
                <Tloader
                    className="main"
                    onRefresh={this.refresh}
                    onLoadMore={this.loadMore}
                    hasMore={this.state.prolist.length>=4?true:false}
                    ismore={this.state.ismore}>
                    <header className={list.carheader}>
                        <a href="javascrit:" className={list.carback} onClick={() => this.goback()}>
                        </a>
                        {decodeURI(this.state.catename)}
                    </header>

                    <div className={list.container + " reactApp"}>
                        {this.state.prolist.length
                            ? <div className={list.listdesc}>
                                    <a
                                        href="javascrit:"
                                        data-index='0'
                                        className={this.state.active[0].active
                                        ? list.active
                                        : " "}
                                        onClick={this
                                        .defaulist
                                        .bind(this)}>综合</a>
                                    <a
                                        href="javascrit:"
                                        className={this.state.active[1].active
                                        ? list.active
                                        : " "}
                                        data-price={this.state.price}
                                        data-index='1'
                                        onClick={this
                                        .changeprice
                                        .bind(this)}>价格
                                        <i
                                            className={this.state.price === "priceUp"
                                            ? " "
                                            : list.check}></i>
                                    </a>
                                    <a
                                        href="javascrit:"
                                        className={this.state.active[2].active
                                        ? list.active
                                        : " "}
                                        data-ornumber={this.state.ornumber}
                                        data-index='2'
                                        onClick={this
                                        .changesale
                                        .bind(this)}>销量
                                        <i
                                            className={this.state.ornumber === "ordersUp"
                                            ? " "
                                            : list.check}></i>
                                    </a>
                                    <a
                                        href="javascrit:"
                                        className={this.state.active[3].active
                                        ? list.active
                                        : " "}
                                        data-ordertime={this.state.ordertime}
                                        data-index='3'
                                        onClick={this
                                        .changetime
                                        .bind(this)}>新品
                                        <i
                                            className={this.state.ordertime === "addedUp"
                                            ? " "
                                            : list.check}></i>
                                    </a>
                                </div>
                            : null}
                        <div className={list.searchbox}>
                            <ul className={list.indexProduct}>
                                {this
                                    .state
                                    .prolist
                                    .map(function (item, index) {
                                        return (
                                            <li key={index}>
                                                <a href={'#/details/' + item.id}>
                                                    <div className={list.proIcon + " " + list.img2}></div>
                                                    <img src={item.pic} alt={item.characteristic}/>
                                                    <h3>{item.name}</h3>
                                                    <span className={list.price}>¥{item.minPrice}
                                                        <del>¥{item.originalPrice}</del>
                                                    </span>
                                                </a>
                                            </li>
                                        )
                                    })}
                            </ul>
                            {nolist}
                        </div>
                        <div className={list.bottom}></div>
                    </div>
                </Tloader>
            </div>
        );
    }
}
export default App;
// <Scorll details={list}/> <div className={list.screenBox}
// style={{display:'none'}}>   <a href="javascrit:" className={list.listclose}>
// </a>   <div className={list.screenContent}>     <dl>       <dt>口味</dt> <dd>
// <a href="javascrit:" className={list.active}>甜甜口味</a>         <a
// href="javascrit:">甜辣口味</a>       </dd>     </dl>     <dl> <dt>折扣与服务</dt> <dd>
//         <a href="javascrit:" className={list.active}>包邮</a>         <a
// href="javascrit:">七天退货</a> </dd>     </dl>   </div>   <div
// className={list.screenBottom}>     <a href="javascrit:"
// className={list.lleft}>重置</a>     <a href="javascrit:">保存</a>   </div> </div>