import React, {Component} from 'react';
import edite from './less/login.less';
import api from './api/api';
import Total from './commd/toast';
import initReactFastclick from 'react-fastclick';
import cookie from 'react-cookies';
import Token from './redux/token/reducers';
import {addUser} from './redux/token/actions/useraction';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    componentDidMount() {
        var that = this
        if (Token.getState().token.token !== null && Token.getState().token.token !== undefined) {
            that
                .props
                .history
                .replace("/user")
        }
    }
    putname(e) {
        var that = this
        that.setState({username: e.target.value})
    }
    putpwd(e) {
        var that = this
        that.setState({password: e.target.value})
    }
    login() {
        var that = this
        if (that.state.username === "") {
            Total.warning("用户名不能为空", 1500)
            return
        } else if (that.state.password === "") {
            Total.warning("密码不能为空", 1500)
            return
        } else {
            let deviceId = '';
            let deviceName = "";
            for (let i = 0; i < 8; i++) {
                deviceId += Math.floor(Math.random() * 10);
            }
            for (let i = 0; i < 12; i++) {
                deviceName += Math.floor(Math.random() * 10);
            }
            var username = this.state.username,
                pwd = this.state.password,
                params = new URLSearchParams();
            params.append("mobile", username)
            params.append("pwd", pwd)
            params.append("deviceId", deviceId)
            params.append("deviceName", deviceName)
            api('user/m/login', params, 'POST', function (res) {
                if (res.data.code === 0) {
                    cookie.save('accestoken', res.data.data.token)
                    Token.dispatch(addUser(res.data.data.token))
                    if (that.props.location.state && that.props.location.state.from) {
                        that
                            .props
                            .history
                            .replace(that.props.location.state.from)
                    } else if (window.location.href.split("?Redirect=")[1]) {
                        that.props.history.replace(window.location.href.split("?Redirect=")[1])
                    } else {
                        that
                            .props
                            .history
                            .replace("/user")
                    }
                } else {
                    Total.error("信息填写错误", 1500)
                }
            }, this)
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
            <div className={edite.loginApp + " reactApp"}>
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    登录
                </header>
                <section className={edite.container}>
                    <div className={edite.loginBox}>
                        <img src={require('./img/28.png')} className={edite.logo} alt=""/>
                        <div className={edite.login}>
                            <div className={edite.loginitem + " " + edite.loginuser}>
                                <i className={edite.img3}></i>
                                <input
                                    type="text"
                                    placeholder="手机号/用户名"
                                    onChange={this
                                    .putname
                                    .bind(this)}/>
                            </div>
                            <div className={edite.loginitem + " " + edite.loginpwd}>
                                <i className={edite.img}></i>
                                <input
                                    type="password"
                                    placeholder="输入密码"
                                    onChange={this
                                    .putpwd
                                    .bind(this)}/>
                            </div>
                            <div className={edite.loginregiter}>
                                <a href="#/reg">立即注册</a>
                                <a href="/#/findpwd">忘记密码</a>
                            </div>
                            <button
                                className={edite.loginBtn}
                                disabled={this.state.username === "" || this.state.password === ""
                                ? true
                                : false}
                                onClick={this
                                .login
                                .bind(this)}>{this.state.username === "" || this.state.password === ""
                                    ? "请填写用户信息"
                                    : "登录"}</button>
                            <div className={edite.loginregiter}>
                                <a href="s">
                                    测试账号:18923765361密码:cgy1028926 部分页面功能因其他原因无法实现仅作展示
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default App;
