import React, {Component} from 'react';
import search from './less/search.less';
import Footer from './commd/footer';
import cookie from 'react-cookies';
import Modal from './commd/modal';
import Total from './commd/toast';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
const confirm = Modal
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchkey: [],
            keywords: ""
        }
    }
    componentDidMount() { //组件挂载
        this._ismounted = true
        this.getkey()
    }
    componentWillMount() { //组件卸载
        this._ismounted = false
    }
    getkey() {
        var that = this,
            arr = cookie.load('searchkey')
        if (that._ismounted) {
            if (arr === undefined) {
                that.setState({searchkey: []})
            } else {
                that.setState({searchkey: arr})
            }
        }
    }
    deletekey() {
        var that = this
        confirm.confirm({
            contentText: '确定要删除历史吗？',
            onOk() {
                cookie.remove("searchkey", {path: "/"})
                that.getkey()
                Total.success("删除成功", 1500)
            },
            onCancel() {}
        })
    }
    searchput(e) {
        var that = this
        that.setState({keywords: e.target.value})
    }
    search() {
        var key = this.state.keywords
        if (key === "") {
            Total.warning("关键词不能为空", 1500)
            return
        } else {
            window.location.href = "#/searchlist/?key=" + key
        }
    }
    goback() {
        this
            .props
            .history
            .goBack()
    }
    render() {
        return (
            <div className="searchApp">
                <header className={search.searchheader}>
                    <a
                        href="javascrit:"
                        className={search.searchback}
                        onClick={() => this.goback()}>
                        </a>
                    <input
                        type="text"
                        placeholder="辣条"
                        onChange={this
                        .searchput
                        .bind(this)}
                        className={search.searchInput}/>
                    <div
                        className={search.searchbtn}
                        onClick={this
                        .search
                        .bind(this)}>搜索</div>
                </header>
                <div className={search.container + " reactApp"}>
                    <div className={search.searchkey}>
                        <div className={search.searchTitle}>
                            热门搜索
                        </div>
                        <div className={search.Hotsearch}>
                            <a href="#/searchlist/?key=辣条">辣条</a>
                            <a href="#/searchlist/?key=牛肉干">牛肉干</a>
                            <a href="#/searchlist/?key=夏威夷果">夏威夷果</a>
                        </div>
                        {this.state.searchkey.length > 0
                            ? <div className={search.searchTitle}>
                                    历史搜索
                                    <a
                                        href="javascrit:"
                                        onClick={this
                                        .deletekey
                                        .bind(this)}
                                        className={search.delhistiry + " " + search.img2}>
                                        </a>
                                </div>
                            : null}
                        <div className={search.Hotsearch + " " + search.History}>
                            {this
                                .state
                                .searchkey
                                .map(function (item, index) {
                                    return (
                                        <a key={index} href={"#/searchlist/?key=" + item.name}>{item.name}</a>
                                    )
                                })}
                        </div>
                    </div>
                </div>
                <Footer className={search}/>
            </div>
        );
    }
}
export default App;
