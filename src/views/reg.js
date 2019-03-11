import React, {Component} from 'react';
import edite from './less/login.less';
import userimg from '../views/img/28.png';
import Total from './commd/toast';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
// import apis from './api/api';
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nick: "",
            mobile: "",
            pwd: "",
            code: "",
            img: userimg,
            postJsonString: {},
            codeName: "获取验证码"
        }
    }
    regbtn() {
        // var  params = new URLSearchParams(); var
        // userimg=JSON.stringify({userimg:"http://localhost:3000/static/media/28.7b18cad
        // 9.png"}) params.append("mobile","13500000000")
        // params.append("pwd","cgy1028926") params.append("code","2354353")
        // params.append("nick","晴天") params.append("postJsonString",userimg)
        // apis('user/m/register',params,'POST',function(res){   console.log(res) })
    }
    goback() {
        this.props.history.goBack()
    }
    setNickname(e) { //设置昵称
        var that = this
        that.setState({nick: e.target.value})
    }
    setTel(e) { //设置手机号码
        var that = this
        that.setState({mobile: e.target.value})
    }
    setPwd(e) { //设置密码
        var that = this
        that.setState({pwd: e.target.value})
    }
    setTelcode(e) {
        var that = this
        that.setState({code: e.target.value})
    }
    getTelcode() {
        var that = this
        if (that.state.mobile === "") {
            Total.warning("输入手机号码", 1500)

        } else {
            var time = 60
            that.setState({
                codeName: time + "s重新获取"
            })
            var timne = setInterval(() => {
                time--
                that.setState({
                    codeName: time + "s重新获取"
                })
                if (time === 0) {
                    clearInterval(timne)
                    that.setState({codeName: "获取验证码"})
                }
            }, 1000)
        }
    }
    userImag(e) {
        var base=""
        var that = this
        var excelFile = document.getElementById("LoadImg").files[0];
        if (excelFile) {
            if (excelFile.size > 1000000) {
                Total.error("大小不能超过1M", 1500)
                return
            } else {
                var FR = new FileReader();
                FR.addEventListener("load", function (e) {
                    base = e.target.result
                    that.setState({img: base})
                });
                FR.readAsDataURL(excelFile);
            }
        }
    }
    getCode() {
        if (this.state.mobile === "") {
            return true
        } else if (this.state.codeName !== "获取验证码") {
            return true
        } else {
            return false
        }
    }
    render() {
        var that = this
        return (
            <div
                className="regApp reactApp"
                style={{
                height: "100%",
                background: "#fff"
            }}>
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    注册
                </header>
                <section className={edite.container}>
                    <div className={edite.loginBox}>
                        <div className={edite.regSet2}>
                            <div className={edite.regSet2img}>
                                <img src={this.state.img} alt=""/>
                                <input
                                    type="file"
                                    onChange={this
                                    .userImag
                                    .bind(this)}
                                    accept="image/gif,image/jpeg,image/png"
                                    id="LoadImg"/>
                                <div className={edite.regSet2name}>
                                    <p>设置图像</p>
                                </div>
                            </div>
                        </div>
                        <div className={edite.login}>
                            <div className={edite.loginitem + " " + edite.loginuser}>
                                <i className={edite.img3}></i>
                                <input
                                    type="text"
                                    placeholder="输入昵称"
                                    onChange={this
                                    .setNickname
                                    .bind(this)}/>
                            </div>
                            <div className={edite.loginitem + " " + edite.logintel}>
                                <i className={edite.img}></i>
                                <input
                                    type="text"
                                    placeholder="输入手机号码"
                                    onChange={this
                                    .setTel
                                    .bind(this)}/>
                            </div>
                            <div className={edite.loginitem + " " + edite.loginpwd}>
                                <i className={edite.img}></i>
                                <input
                                    type="password"
                                    placeholder="输入密码"
                                    onChange={this
                                    .setPwd
                                    .bind(this)}/>
                            </div>
                            <div className={edite.loginitem + " " + edite.logincode}>
                                <i className={edite.img}></i>
                                <input
                                    type="text"
                                    placeholder="输入验证码"
                                    onChange={this
                                    .setTelcode
                                    .bind(this)}/>
                                <button
                                    disabled={that.getCode()}
                                    className={edite.regbtn}
                                    onClick={this
                                    .getTelcode
                                    .bind(this)}>{this.state.mobile === ""
                                        ? "输入手机号"
                                        : this.state.codeName}</button>
                            </div>
                            <div className={edite.loginregiter}>
                                <a href="#/login">已注册?登录</a>
                            </div>
                            <button
                                className={edite.loginBtn}
                                disabled={this.state.nick === "" || this.state.mobile === "" || this.state.pwd === "" || this.state.code === ""
                                ? true
                                : false}
                                onClick={this
                                .regbtn
                                .bind(this)}>{this.state.nick === "" || this.state.mobile === "" || this.state.pwd === "" || this.state.code === ""
                                    ? "请填写用户信息"
                                    : "立即注册"}</button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default App;
