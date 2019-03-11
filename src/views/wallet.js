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
            
        }
    }
    componentDidMount() {
        this._ismounted = true
        this.getwallet()
    }
    componentWillMount() {
        this._ismounted = false
    }
    getwallet() {
        var that = this
        apis('user/amount',{},'GET', function (res) {
            if (that._ismounted) {
               if(res.data.code===0){
                that.setState({usermoney: res.data.data.balance, account: res.data.data.score, freeze: res.data.data.freeze})
               }
               else{
                that.setState({usermoney:0, account:0, freeze:0})
               }
            }
        }, that)
    }
    goback(){
        window.history.go(-1);
    }
    render() {
        return (
            <div className={user.walletApp+"  reactApp"}>
                <header className={user.carheader+" "+user.walletHeader}>
                    <a href="javascrit:" className={user.searchback} onClick={() => this.goback()}>
                    </a>
                    我的钱包
                </header>
                <div className={user.container}>
                    <div className={user.userpoint}>
                        <a href="javascrit:">
                            <span>￥{this.state.usermoney}</span>
                            <em>钱包余额</em>
                        </a>
                        <a href="javascrit:">
                            <span>{this.state.freeze}</span>
                            <em>冻结金额</em>
                        </a>
                        <a href="javascrit:">
                            <span>{this.state.account}</span>
                            <em>用户积分</em>
                        </a>
                        <a href="javascrit:">
                            <span>0</span>
                            <em>奖励积分</em>
                        </a>
                    </div>
                    <div className={user.OrderTop}>
                        我的服务
                        <img src={require('./images/searchback.jpg')} alt=""/>
                    </div>
                    <div className={user.orderWbotom}>
                        <a href="#/user/wallet/list">
                            <span></span>
                            账户明细
                        </a>
                        <a href="#/user/wallet/putmoney">
                            <span></span>
                            提现
                        </a>
                        <a href="#/user/realname">
                            <span></span>
                            实名认证
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
