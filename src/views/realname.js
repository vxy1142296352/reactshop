import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import user from './less/wallet.less';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        this._ismounted = true
    }
    componentWillMount() {
        this._ismounted = false
    }
    goback() {
        window
            .history
            .go(-1);
    }
    render() {
        return (
            <div className="walletApp reactApp">
                <header className={user.carheader}>
                    <a href="javascrit:" className={user.searchback} onClick={() => this.goback()}>
                    </a>
                    实名认证
                </header>
                <div className={user.container}>
                    <div className={user.realnameBox}>
                        <p className={user.realtoptips}>用户所传身份证照片仅用于实名认证,并对照片打水印,平台保证对用户信息严格保密。</p>
                        <div className={user.realnamepic}>
                            <img src={require('./images/realnamepic1.jpg')} alt=""/>
                            <input type="file"/>
                        </div>
                        <div className={user.realnamepic + " " + user.realnamepic2}>
                            <img src={require('./images/realnamepic2.jpg')} alt=""/>
                            <input type="file"/>
                        </div>
                        <div className={user.realBox}>
                            <div className={user.realinputname}>
                                <span>输入您的姓名:</span>
                                <input type="text" placeholder="输入真实姓名"/>
                            </div>
                            <div className={user.realinputname}>
                                <span>输入身份证号:</span>
                                <input type="text" placeholder="输入对应姓名的18位身份证号码"/>
                            </div>
                            <div className={user.realinputname}>
                                <span>输入手机号码:</span>
                                <input type="text" placeholder="输入您的手机号码"/>
                            </div>
                            <button className={user.realsubmit}>立即认证</button>
                            <div className={user.realnametips}>
                                <span>-温馨提示-</span>
                                <p>请提供真实有效的身份证号码,否则后果自负。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
