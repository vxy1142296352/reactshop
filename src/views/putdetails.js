import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import wallet from './less/wallet.less';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    goback() {
        window.history.go(-1);
    }
    render() {
        return (
            <div className={wallet.successApp+" reactApp"}>
                <header className={wallet.carheader}>
                    <a
                        href="javascrit:"
                        className={wallet.searchback}
												onClick={() => this.goback()}>
												</a>
                    提现详情
                </header>
                <section className={wallet.container}>
                    <div className={wallet.statusBox}>
                        <img alt=" " src={require('./images/waitput.png')}/>
                        <p>正在申请中</p>
                    </div>
                    <div className={wallet.statusBox}>
                        <img alt="" src={require('./images/succewssmoney.png')}/>
                        <p>提现成功</p>
                    </div>
                    <div className={wallet.putdetailsBox}>
                        <p>预计到账时间:
                            <span>2018-11-8 23:59:59</span>
                        </p>
                        <p>提现金额:
                            <span className={wallet.price}>￥50.5</span>
                        </p>
                        <p>到账方式<span>微信</span>
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}
export default withRouter(App);
