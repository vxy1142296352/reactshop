import axios from 'axios';
import Toast from '../commd/toast';
import Store from "../redux/token/reducers";
import {addUser} from '../redux/token/actions/useraction';
import cookie from 'react-cookies';
function api(geturl,data,methods, callback,that) {
    var token=cookie.load('accestoken')
    if(token===null||token===undefined){
        Toast.error("登录过期",500)
        Store.dispatch(addUser(null))
        cookie.remove("accestoken")
        setTimeout(function(){
            that.props.history.replace("/login?Redirect="+that.props.location.pathname)
        },501)
    }
    else{
        Store.dispatch(addUser(token))
        var url = window.location.origin + "/api/"
        // var url="http://115.126.98.17/api/"
        if (methods === "GET") {
            axios.get(url + geturl,{params:{token:token}},{
                    timeout: 10000
                }).then(function (res) {
                    if(res.data.code===2000){
                        Toast.error("登录过期",500)
                        Store.dispatch(addUser(null))
                        cookie.remove("accestoken")
                        setTimeout(function(){
                            that.props.history.replace("/login?Redirect="+that.props.location.pathname)
                        },501)
                    }
                    else if(res.data.code===3000){
                        Toast.error("请求错误",1500)
                    }
                    else{
                        callback(res)
                     }
                })
                .catch(function (error) {
                    Toast.error("网络错误", 1500)
                })
        }
        else if(methods === "POST"){
            var  params = new URLSearchParams();
                 params.append("token",token)
                 for(var key in data){
                    params.append(key,data[key])
                 }
                 axios.post(url + geturl,params,{
                    timeout: 10000
                })
                .then(function (res) {
                    if(res.data.code===2000){
                        Toast.error("登录过期",500)
                        Store.dispatch(addUser(null))
                        cookie.remove("accestoken")
                        setTimeout(function(){
                            that.props.history.replace("/login?Redirect="+that.props.location.pathname)
                        },501)
                    }
                    else if(res.data.code===3000){
                        Toast.error("请求错误",1500)
                    }
                    else{
                        callback(res)
                    }
                })
                .catch(function (error) {
                    Toast.error("网络错误", 1500)
                })
        }
    }
}
export default api