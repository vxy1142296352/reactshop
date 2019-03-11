import React, {
    Component
} from 'react';
import {withRouter} from 'react-router-dom';
import edite from './less/usercenter.less';
import userimg from '../views/img/28.png';
import axios from 'axios';
import apis from './api/userapi';
import Total from './commd/toast';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edite: false,
            editename: "",
            nick: "",
            mobile: "",
            userimg: "",
            descore: "无",
            img: userimg,
            formData: "",
        }
    }
    componentDidMount() {
        this.ismounted = true
        this.Userinfo()
    }
    componentWillMount() {
        this.ismounted = false
    }
    Userinfo() {
        var that = this
        apis('user/detail',{},'GET', function (res) {
            if (that.ismounted){
                if(res.data.code===0){
                    if(res.data.data.base.avatarUrl){
                        that.setState({
                            img:res.data.data.base.avatarUrl
                        })
                    }
                    else{
                        that.setState({
                            img:userimg
                        })
                    }
                    that.setState({
                        nick: res.data.data.base.nick,
                        mobile: res.data.data.base.mobile
                    })
                }
                else{
                    Total.error("获取用户信息失败",1500)
                    that.setState({
                        nick:"",
                        mobile:"",
                        img:userimg
                    })
                }
            }
        }, that)
    }
    upimg(e) { //图片上传
        e.preventDefault();
        var base = ''
        var that = this
        var formData = new FormData();
        var excelFile = e.target.files[0]
            if (excelFile){
                if(excelFile.size > 1000000) {
                    Total.error("大小不能超过1M", 1500)
                    return
                }else{
                    var FR = new FileReader();
                    FR.addEventListener("load", function (e) {
                        base = e.target.result
                        that.setState({
                            img: base
                        })
                    });
                    FR.readAsDataURL(excelFile);
                    formData.append('upfile', e.target.files[0])
                    this.setState({
                        formData: formData
                    })
                }
            }
            else{
                Total.error("手机不支持上传", 1500)
            }
    }
    // changname(e) { //修改用户名
    //     this.setState({name: e.target.value})
    // }
    // changtel(e) { //修改电话
    //     this.setState({tel: e.target.value})
    // }
    // changedescore(e) { //修改签名
    //     this.setState({descore: e.target.value})
    // }
    goback() {
        window.history.go(-1);
    }
    Saveuser() {
        var that = this
        var config ={headers:{'Content-Type': 'multipart/form-data'}}
        axios.post("/api/dfs/upload/file",that.state.formData,config)
            .then(function (res){
                if (res.data.code === 0) {
                    that.editeSave(res.data.data.url)
                }
                else{
                    Total.error("图像上传失败",1500)
                }
            })
            .catch(function (error) {
                Total.error("修改异常",1500)
            })
    }
    editeSave(avatarUrl){
        var that=this
        apis("user/modify",{avatarUrl:avatarUrl,city:"",nick:this.state.nick,province:""},"POST",function(res){
            if(res.data.code===0){
                Total.success("修改成功",1500)
                setTimeout(function(){
                    that.props.history.goBack()
                },1501)
            }
        })
    }
    render() {
        return (
            <div className="usercenterApp  reactApp">
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    修改图像(暂只支持修改图像)
                </header>
                <div className={edite.container}>
                    <div className={edite.usercenImg}>
                        图像
                        <div className={edite.userImgup}>
                            <img src={this.state.img} alt="" className="avatar"/>
                            <input
                                type="file"
                                onChange={this.upimg.bind(this)}/>
                        </div>
                    </div>
                    <div className={edite.userItem}>
                        <span className={edite.userIname}>昵称:</span>
                        {this.state.edite
                            ? <input
                                    type="text"
                                    placeholder={this.state.nick}
                                    onChange={this
                                    .changname
                                    .bind(this)}/>
                            : <input
                                type="text"
                                placeholder=""
                                style={{
                                visibility: "hidden"
                            }}/>}
                        <span className={edite.userItemright}>{this.state.nick}</span>
                    </div>
                    <div className={edite.userItem}>
                        <span className={edite.userIname}>手机:</span>
                        {this.state.edite
                            ? <input
                                    type="text"
                                    placeholder={this.state.mobile}
                                    onChange={this.changtel.bind(this)}/>
                            :<input
                                type="text"
                                placeholder=""
                                style={{
                                visibility: "hidden"
                            }}/>}
                        <span className={edite.userItemright}>{this.state.mobile}</span>
                    </div>
                    <div className={edite.userItem}>
                        <span className={edite.userIname}>签名:</span>
                        {this.state.edite
                            ? <input onChange={this.changedescore.bind(this)} type="text" placeholder={this.state.descore}/>
                            : <input
                                type="text"
                                placeholder=""
                                style={{
                                visibility: "hidden"
                            }}/>}
                        <span className={edite.userItemright}>{this.state.descore}</span>
                    </div>
                    <div onClick={this.Saveuser.bind(this)} className={edite.usercebutton}>保存修改</div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);