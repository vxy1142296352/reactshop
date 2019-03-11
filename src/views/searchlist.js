import React, {Component} from 'react';
import list from './less/list.less';
import cookie from 'react-cookies';
import apis from './api/api';
import Loading from './commd/loading';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            goods: [],
            loading: false
        }
    }
    componentDidMount() { //组件挂载
        this.getkey()
        this._ismounted = true
    }
    componentWillMount() { //组件卸载
        this._ismounted = false
    }
    getkey() {
        var searchkey = cookie.load('searchkey') === undefined
                ? []
                : cookie.load('searchkey'),
            that = this,
            name = decodeURI(window.location.href.split("key=")[1]);
        searchkey.push({name: name})
        that.setState({key: name})
        cookie.save("searchkey", this.getarr(searchkey), {path: "/"})
        apis('shop/goods/list', {
            params: {
                nameLike: name
            }
        }, 'GET', function (res) {
            if (that._ismounted) {
                that.setState({loading: true})
                if (res.data.code === 0) {
                    that.setState({goods: res.data.data})
                }
            }
        }, that)
    }
    getarr(arr) { //关键词去重
        var result = [];
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            if (!obj[arr[i].name]) {
                result.push(arr[i]);
                obj[arr[i].name] = true;
            }
        }
        return result
    }
    goback() {
        this
            .props
            .history
            .goBack()
    }
    render() {
        var that = this
        return (
            <div className="listApp">
                {!this.state.loading
                    ? <Loading/>
                    : null}
                <header className={list.carheader}>
                    <a href="javascrit:" className={list.carback} onClick={() => this.goback()}>
                    </a>
                    {this.state.key}
                </header>
                <div className={list.container + " reactApp"}>
                    <div className={list.searchbox}>
                        <ul className={list.indexProduct + " " + list.listproduct}>
                            {this
                                .state
                                .goods
                                .map(function (item, index) {
                                    return (
                                        <li key={index}>
                                            <a href={"#/details/" + item.id}>
                                                <div className={list.proIcon + " " + list.img2}></div>
                                                <img src={item.pic} alt={item.characteristic}/>
                                                <h3>{item
                                                        .name
                                                        .split(that.state.key)[0]}
                                                    <em>{that.state.key}</em>{item
                                                        .name
                                                        .split(that.state.key)[1]}</h3>
                                                <span className={list.price}>¥{item.minPrice}
                                                    <del>¥{item.originalPrice}</del>
                                                </span>
                                            </a>
                                        </li>
                                    )
                                })
}
                        </ul>
                        {this.state.goods.length <= 0
                            ? <div className={list.Noshop}>
                                    <div className={list.Empty + " " + list.img3}></div>
                                    <p>未搜索到相关商品</p>
                                </div>
                            : null}
                    </div>
                    <div className={list.bottom}></div>
                </div>
            </div>
        );
    }
}
export default App;
