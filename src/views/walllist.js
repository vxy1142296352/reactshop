import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import user from './less/wallet.less';
import apis from './api/userapi';
import initReactFastclick from 'react-fastclick';
import Tloader from './commd/refresh/loader_more';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moneylist: [],
            paylist: [],
            ismore: true,
            isloading:false
        }
    }
    componentDidMount() {
        this._ismounted = true
        this.getpoint()
        this.getpaylist()
    }
    componentWillMount() {
        this._ismounted = false
    }
    getpoint() {
        var that = this;
        apis('score/logs', {}, 'GET', function (res) {
            if (that._ismounted) {
                if (res.data.code === 0) {
                    that.setState({moneylist: res.data.data.result,isloading:true})
                }
            }
        },that)
    }
    getpaylist() {
        var that = this
        apis('user/payLogs', {}, 'GET', function (res) {
            if (that._ismounted) {
                if (res.data.code === 0) {
                    that.setState({paylist: res.data.data})
                }
            }
        },that)
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
    goback() {
        window
            .history
            .go(-1);
    }
    render() {
        return (
            <div className={user.walletlistApp + " reactApp"}>
                <div className="view">
                    <Tloader
                        className="main"
                        onRefresh={this.refresh}
                        onLoadMore={this.loadMore}
                        hasMore={this.state.paylist.length+this.state.moneylist.length>=8?true:false}
                        ismore={this.state.ismore}>
                        <header className={user.carheader + " " + user.walletheader}>
                            <a href="javascrit:" className={user.carback} onClick={() => this.goback()}>
                            </a>
                            账户明细
                        </header>
                        <div className={user.container}>
                            <ul className={user.putlist}>
                                {this
                                    .state
                                    .paylist
                                    .map(function (item, index) {
                                        return (
                                            <li key={index}>
                                                <p className={user.listtop}>{item.remark
                                                        ? item.remark
                                                        : "充值"}
                                                    <span>￥{item.money}</span>
                                                </p>
                                                <p className={user.listtime + " " + user.listsuccess}>{item.dateAdd}
                                                    <span>{item.payGateStr}</span>
                                                </p>
                                            </li>
                                        )
                                    })}
                                {this
                                    .state
                                    .moneylist
                                    .map(function (item, index) {
                                        return (
                                            <li key={index}>
                                                <p className={user.listtop}>{item.typeStr}
                                                    <span>{item.score}积分</span>
                                                </p>
                                                <p className={user.listtime + " " + user.listsuccess}>{item.dateAdd}
                                                    <span>{item.behaviorStr}</span>
                                                </p>
                                            </li>
                                        )
                                    })}
                            </ul>
                            {this.state.paylist <= 0 && this.state.moneylist.length <= 0&&this.state.isloading
                                ? <div className={user.Noshop}>
                                        <div className={user.Empty + " " + user.img3}></div>
                                        <p>暂无任何账户明细</p>
                                    </div>
                                : null}
                        </div>
                    </Tloader>
                </div>

            </div>
        );
    }
}
export default withRouter(App);
