import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import user from './less/wallet.less';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
        this._ismounted = true
    }
    componentWillMount() {
        this._ismounted = false
    }
    goback(){
        window.history.go(-1);
    }
    render() {
        return (
            <div className={user.walletlistApp+" reactApp"}>
                <header
                    className={user.carheader + " " + user.walletheader + " " + user.moneyheader}>
                    <a href="javascrit:" className={user.carback} onClick={() => this.goback()}>
                    </a>
                    提现
                    <a href="#/user/wallet/putmoneylist" className={user.caredite}>
                        提现记录
                    </a>
                </header>
                <div className={user.container}>
                    <div className={user.moneyfrom}>
                        <i></i>提现到微信
                        <span>暂只支持提现到微信</span>
                    </div>
                    <div className={user.nowmoney}>
                        账户可用余额:100元
                    </div>
                    <div className={user.inputmoney}>
                        <input type="text" placeholder="最低提现100元"/>
                        <span>全部提现</span>
                    </div>
                    <div className={user.nowmoney}>
                        提现手续费:0元
                    </div>
                </div>
                <button className={user.moneApply}>立即申请</button>
            </div>
        );
    }
}
export default withRouter(App);
