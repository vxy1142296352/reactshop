import React, {Component} from 'react';
import faild from './less/login.less';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {      
        }
    }
    goback() {
        this.props.history.goBack()
    }
    render() {
        return (
            <div className="faildApp reactApp">
                <header className={faild.carheader}>
					<a href="javascrit:" className={faild.carback} onClick={() => this.goback()}>
					</a>
                    找回密码
                </header>
                <section className={faild.container}>
                    <div className={faild.loginBox + " " + faild.findpwdBox}>
                        <div className={faild.login}>
                            <div className={faild.loginitem + " " + faild.logintel}>
                                <i className={faild.img}></i>
                                <input type="text" placeholder="输入手机号码"/>
                            </div>
                            <div className={faild.loginitem + " " + faild.logincode}>
                                <i className={faild.img}></i>
                                <input type="text" placeholder="输入验证码"/>
                                <button className={faild.regbtn}>获取验证码</button>
                            </div>
                            <div className={faild.loginBtn}>立即找回</div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default App;
