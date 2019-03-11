import React, {Component} from 'react';
import allevote from './less/details.less';
import apis from './api/api';
import Evote from './commd/details/evote';
import Loading from './commd/loading';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            more: "加载更多",
            lmore: false,
            evote: [],
            page: 1,
            loading: false
        }
    }
    componentDidMount() { //组件挂载
        this._isMounted = true
        this.evotelist(this.state.page)
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    Lmore() {
        var that = this
        var page = this.state.page
        that.setState({more: "加载中....", lmore: true})
        page++
        this.evotelist(page)
    }
    evotelist(page) {
        var that = this
        apis('shop/goods/reputation', {
            params: {
                goodsId: this.props.match.params.id,
                page: page
            }
        }, "GET", function (res) {
            if (that._isMounted) {
                that.setState({loading: true})
                if (res.data.code === 0) {
                    that.setState({evote: res.data.data, loading: true, lmore: false, more: "加载更多"})
                } else {
                    that.setState({lmore: true, more: "无更多数据了"})
                }
            }
        }, that)
    }
    goback() {
        this.props.history.goBack()
    }
    render() {
        return (
            <div className="allevoteApp reactApp">
                {!this.state.loading
                    ? <Loading/>
                    : null}
                <header className={allevote.carheader}>
                    <a href="javascrit:" className={allevote.carback} onClick={() => this.goback()}>
                    </a>
                    全部评价
                </header>
                <div>
                    {this.state.evote.length > 0
                        ? <Evote
                                evote={this.state.evote}
                                goodsID={"0"}
                                page="allevote"
                                details={allevote}/>
                        : <div className={allevote.Noshop}>
                            <div className={allevote.Empty + " " + allevote.img3}></div>
                            <p>无商品评价数据</p>
                        </div>}
                    {this.state.evote.length > 0
                        ? <button
                                className={allevote.sallevote}
                                disabled={this.state.lmore}
                                style={{
                                display: "block",
                                width: "100%",
                                border: "none",
                                outline: "none"
                                }}
                                onClick={this
                                .Lmore
                                .bind(this)}>{this.state.more}</button>
                        : null}
                </div>
            </div>
        );
    }
}
export default App;
