import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import edite from './less/setting.less';
import api from './api/userapi';
import Total from "./commd/toast";
import initReactFastclick from 'react-fastclick';
import cookie from 'react-cookies';
import Token from './redux/token/reducers';
import {addUser} from './redux/token/actions/useraction';
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
    Loginout(){
        var that=this
        api("user/loginout",{},"GET",function(res){
            if(res.data.code===0){
                cookie.remove("accestoken")
                Token.dispatch(addUser(null))
                that.props.history.replace("/login?Redirect="+that.props.location.pathname)
                }
        },that)
    }
    about(){
        Total.warning("开发中",1500)
    }
    render() {
        return (
            <div className="usersettingApp  reactApp">
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    用户设置
                </header>
                <div className={edite.container}>
                    <div className={edite.OrderTop}>
                        <a href="#/user/address">
                            我的收货地址
                            <img src={require("./images/searchback.jpg")} alt=""/>
                        </a>
                    </div>
                    <div className={edite.OrderTop}>
                        <a href="#/user/editepwd">
                            修改登录密码
                            <img src={require("./images/searchback.jpg")} alt=""/>
                        </a>
                    </div>
                    <div className={edite.OrderTop}>
                        <a href="javascrit:" onClick={this.about.bind(this)}>
                            关于我们
                            <img src={require("./images/searchback.jpg")} alt=""/>
                        </a>
                    </div>
                    <div className={edite.OrderTop}>
                        <a href="javascrit:" onClick={this.about.bind(this)}>
                            意见反馈
                            <img src={require("./images/searchback.jpg")} alt=""/>
                        </a>
                    </div>
                    <div onClick={this.Loginout.bind(this)} className={edite.usercebutton}>退出登录</div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
