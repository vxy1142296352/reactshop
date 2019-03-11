import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import user from './less/wallet.less';
import apis from './api/userapi';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moneylist: [],
            paylist: []
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
        apis('score/logs', {
        },'GET', function (res) {
            if (that._ismounted) {
                that.setState({moneylist: res.data.data.result})
            }
        }, that)
    }
    getpaylist() {
        var that = this
        apis('user/payLogs', {
        },'GET', function (res) {
            if (that._ismounted) {
                that.setState({paylist: res.data.data})
            }
        }, that)
    }
    goback() {
        window.history.go(-1);
    }
    render() {
        return (
            <div className={user.walletlistApp+" reactApp"}>
                <header className={user.carheader + " " + user.walletheader}>
                    <a href="javascrit:" className={user.carback} onClick={() => this.goback()}>
                    </a>
                    提现列表
                </header>
                <div className={user.container}>
                    <ul className={user.putlist}>
                        <li>
                            <a href="#/user/wallet/putdetails">
                                <p className={user.listtop}>提现金额
                                    <span>￥115</span>
                                </p>
                                <p className={user.listtime}>2018-10-11 10:10:60<span>申请中</span>
                                </p>
                            </a>
                        </li>
                        <li>
                            <a href="#/user/wallet/putdetails">
                                <p className={user.listtop}>提现金额
                                    <span>￥115</span>
                                </p>
                                <p className={user.listtime}>2018-10-11 10:10:60<span>申请中</span>
                                </p>
                            </a>
                        </li>
                        <li>
                            <a href="#/user/wallet/putdetails">
                                <p className={user.listtop}>提现金额
                                    <span>￥115</span>
                                </p>
                                <p className={user.listtime}>2018-10-11 10:10:60<span>申请中</span>
                                </p>
                            </a>
                        </li>
                        <li>
                            <a href="#/user/wallet/putdetails">
                                <p className={user.listtop}>提现金额
                                    <span>￥115</span>
                                </p>
                                <p className={user.listtime}>2018-10-11 10:10:60<span>申请中</span>
                                </p>
                            </a>
                        </li>
                        <li>
                            <a href="#/user/wallet/putdetails">
                                <p className={user.listtop}>提现金额
                                    <span>￥115</span>
                                </p>
                                <p className={user.listtime + " " + user.listsuccess}>2018-10-11 10:10:60<span>提现成功</span>
                                </p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
