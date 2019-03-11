import axios from 'axios'
import Toast from '../commd/toast'
function api(geturl, data, methods, callback, that) {
    var url = window.location.origin + "/api/"
    // var url="http://115.126.98.17/api/"
    if (methods === "GET") {
        axios.get(url + geturl, data, {
                timeout: 10000
            })
            .then(function (res) {
                callback(res)
            })
            .catch(function(error) {
                Toast.error("网络错误", 1500)
            })
    }
    if (methods === "POST") {
        axios.post(url+geturl,data,{
            },{
                timeout: 10000
            })
            .then(function (res) {
                callback(res)
            })
            .catch(function (error) {
                Toast.error("网络错误", 1500)
            })
    }
}
export default api