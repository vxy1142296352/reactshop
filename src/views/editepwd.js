import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import edite from './less/login.less';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state ={ 
        }
    }
    goback() {
        window.history.go(-1);
    }
    render() {
        return (
            <div className={edite.editepwdApp+" reactApp"}>
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    修改登录密码
                </header>
                <section className={edite.container}>
                    <div className={edite.loginBox + " " + edite.editepwd}>
                        <div className={edite.login}>
                            <div className={edite.loginitem + " " + edite.logintel}>
                                <i className={edite.img}></i>
                                <input type="text" placeholder="输入手机号码"/>
                            </div>
                            <div className={edite.loginitem + " " + edite.logincode}>
                                <i className={edite.img}></i>
                                <input type="text" placeholder="输入验证码"/>
                                <button className={edite.regbtn}>获取验证码</button>
                            </div>
                            <div className={edite.loginitem + " " + edite.loginpwd}>
                                <i className={edite.img}></i>
                                <input type={edite.password} placeholder="输入新密码"/>
                            </div>
                            <div className={edite.loginBtn}>确认修改</div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default withRouter(App);
