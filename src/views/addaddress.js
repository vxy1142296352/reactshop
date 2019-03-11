import React, {
    Component
} from 'react';
import {
    withRouter
} from 'react-router-dom';
import addaddress from './less/useraddress.less';
import axios from 'axios';
import Total from './commd/toast';
import Apis from './api/userapi';
import initReactFastclick from 'react-fastclick';
import Toast from './commd/toast';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linkMan: "输入收货人姓名",
            mobile: "输入收货人手机号码",
            provinceStr: "请选择",
            cityStr: "请选择",
            areaStr: "请选择",
            code: "输入邮政编码",
            address: "输入详细地址",
            provinceId: 0,
            cityId: 0,
            districtId: 0,
            change: false,
            list: [],
            province: [],
            addedite: null,
            id: null,
            isDefault: true,
        }
    }
    componentDidMount() {
        this._ismounted = true
        if (this.props.match.params.name) {
            var addedite = this.props.match.params.name
            this.setState({
                addedite: addedite
            })
            if (window.location.href.split("?id=")[1]) {
                this.getadddetails()
            }
        } else {
            Total.error("请求错误")
            this.props.history.replace("/404")
        }
    }
    componentWillMount() {
        this._ismounted = false
    }
    getadddetails() {
        var that = this
        Apis("user/shipping-address/detail", {
            id: window.location.href.split("?id=")[1],
        }, 'POST', function (res) {
            if (that._ismounted) {
                if (res.data.code === 0) {
                    that.setState({
                        linkMan: res.data.data.linkMan,
                        mobile: res.data.data.mobile,
                        provinceStr: res.data.data.provinceStr,
                        cityStr: res.data.data.cityStr,
                        areaStr: res.data.data.areaStr,
                        code: res.data.data.code,
                        address: res.data.data.address,
                        provinceId: res.data.data.provinceId,
                        cityId: res.data.data.cityId,
                        districtId: res.data.data.districtId,
                        id: window.location.href.split("?id=")[1],
                        isDefault: res.data.data.isDefault
                    })
                }
            }
        }, that)
    }
    changeprovinve() {
        var that = this
        if (this.state.province.length === 0) {
            this.api('province', {
                params: {}
            }, "GET", function (res) {
                if (res.data.code === 0) {
                    that.setState({
                        change: true,
                        list: res.data.data,
                        province: res.data.data
                    })
                }
            })
        } else {
            that.setState({
                change: true,
                list: this.state.province
            })
        }
    }
    closechange() {
        this.setState({
            change: false
        })
    }
    api(geturl, data, methods, callback) {
        // var url = 'http://115.126.98.17/add/'
        var url = '/add/'
        if (methods === "GET") {
            axios.get(url + geturl, data, {
                    timeout: 10000
                })
                .then(function (res) {
                    callback(res)
                })
                .catch(function (error) {
                    Total.error("网络错误", 1500)
                })
        }
    }
    chosename(e) { //选择省份
        var id = e.currentTarget.getAttribute("data-id"),
            name = e.currentTarget.getAttribute("data-name"),
            destr = e.currentTarget.getAttribute("data-destr");
        if (destr === "省份") {
            this.setState({
                provinceStr: name,
                provinceId: id,
                cityStr: "请选择",
                cityId: 0,
                areaStr: "请选择",
                districtId: 0
            })
            this.getchild(id)
        } else if (destr === "城市") {
            this.setState({
                cityStr: name,
                cityId: id,
                areaStr: "请选择",
                districtId: 0
            })
            this.getchild(id)
        } else if (destr === "区县") {
            this.setState({
                areaStr: name,
                districtId: id
            })
            setTimeout(() => {
                this.setState({
                    change: false
                })
            }, 500)
        }
    }
    changecity(e) { //选择城市
        this.setState({
            change: true
        })
        this.getchild(e.currentTarget.getAttribute("date-proid"))
    }
    changeada(e) { //选择区县
        this.setState({
            change: true
        })
        this.getchild(e.currentTarget.getAttribute("data-disid"))
    }
    getchild(id) {
        var that = this
        this.api('child', {
            params: {
                pid: id
            }
        }, "GET", function (res) {
            if (res.data.code === 0) {
                that.setState({
                    list: res.data.data
                })
            } else {
                that.setState({
                    list: []
                })
            }
        })
    }
    goback() {
        if (localStorage.getItem("addressurl")) {
            this.props.history.replace(localStorage.getItem("addressurl"))
        } else {
            this.props.history.goBack()
        }
    }
    qxsave() {
        if (localStorage.getItem("addressurl")) {
            this.props.history.replace(localStorage.getItem("addressurl"))
        } else {
            this.props.history.goBack()
        }
    }
    changeName(e) { //收货人姓名
        this.setState({
            linkMan: e.target.value
        })
    }
    changeTel(e) { //收货人电话
        this.setState({
            mobile: e.target.value
        })
    }
    changeCode(e) { //收货人邮编
        this.setState({
            code: e.target.value
        })
    }
    addresTree(e) { //收货详细地址
        this.setState({
            address: e.target.value
        })
    }
    saveAddress() { //保存数据
        var that = this
        var saveAddress = {
            linkMan: this.state.linkMan,
            mobile: this.state.mobile,
            provinceStr: this.state.provinceStr,
            cityStr: this.state.cityStr,
            areaStr: this.state.areaStr,
            code: this.state.code,
            address: this.state.address,
            provinceId: this.state.provinceId,
            cityId: this.state.cityId,
            districtId: this.state.districtId,
        }
        if (this.state.addedite === "update") {
            saveAddress = {
                id: this.state.id,
                linkMan: this.state.linkMan,
                mobile: this.state.mobile,
                provinceStr: this.state.provinceStr,
                cityStr: this.state.cityStr,
                areaStr: this.state.areaStr,
                code: this.state.code,
                address: this.state.address,
                provinceId: this.state.provinceId,
                cityId: this.state.cityId,
                districtId: this.state.districtId,
            }
        } else {

        }
        Apis("user/shipping-address/"+that.state.addedite,saveAddress,
            "POST",
            function (res) {
                if (res.data.code === 0) {
                    Toast.success("保存成功")
                    setTimeout(function () {
                        if (localStorage.getItem("addressurl")) {
                            saveAddress.id = res.data.data.id
                            localStorage.setItem("address", JSON.stringify(saveAddress))
                            that.props.history.replace(localStorage.getItem("addressurl"))
                        } else {
                            window.history.go(-1);
                        }
                    }, 1501)
                } else {
                    Total.error(res.data.code, 1500)
                }
            })
    }
    editeDefault() { //设置默认地址
        this.setState({
            isDefault: !this.state.isDefault
        })
    }
    render() {
        var that = this
        return (
            <div className="addApp">
                <header className={addaddress.carheader}>
                    <a
                        href="javascrit:"
                        className={addaddress.carback}
						onClick={() => this.goback()}>
						</a>
                    添加收货地址
                </header>
                <div className={addaddress.container+" reactApp"}>
                    <div className={addaddress.additem}>
                        <span>收货姓名:</span>
                        <input type="text" onChange={this.changeName.bind(this)} placeholder={this.state.linkMan}/>
                    </div>
                    <div className={addaddress.additem}>
                        <span>手机号码:</span>
                        <input type="text" onChange={this.changeTel.bind(this)} placeholder={this.state.mobile}/>
                    </div>
                    <div className={addaddress.additem}>
                        <span>选择地区:</span>
                        <div className={addaddress.additemstree}>
                            <em
                                onClick={this.changeprovinve.bind(this)}>{this.state.provinceStr}</em>
                            {this.state.provinceStr !== "请选择"
                                ? <em
                                        date-proid={this.state.provinceId}
                                        onClick={this.changecity.bind(this)}>{this.state.cityStr}</em>
                                : null}
                            {this.state.provinceStr !== "请选择" && this.state.cityStr !== "请选择"
                                ? <em
                                        data-disid={this.state.cityId}
                                        onClick={this.changeada.bind(this)}>{this.state.areaStr}</em>
                                : null}
                        </div>
                    </div>
                    <div className={addaddress.additem}>
                        <span>邮政编码:</span>
                        <input type="text" onChange={this.changeCode.bind(this)}  placeholder={this.state.code}></input>
                    </div>
                    <div className={addaddress.additem}>
                    <span>默认地址:</span>
                    <div onClick={this.editeDefault.bind(this)} className={[addaddress.addisdefault]+" "+[this.state.isDefault?addaddress.ondefault:addaddress.offdefault]}>
                    </div>
                    </div>
                    <div className={addaddress.addressstree}>
                        <textarea name="" id="" cols="30" rows="10"onChange={this.addresTree.bind(this)} placeholder={this.state.address}></textarea>
                    </div>
                    <div className={addaddress.addressstree}>
                        <button className={addaddress.saveadd + " " + addaddress.savemore} onClick={this.saveAddress.bind(this)}>保存</button>
                        <button className={addaddress.saveadd} onClick={this.qxsave.bind(this)}>取消</button>
                    </div>
                </div>
                {this.state.change
                    ? <div>
                            <div
                                className={addaddress.back}
                                style={{
                                display: 'block'
                            }}></div>
                            <div
                                className={addaddress.choseAddBox}
                                style={{
                                display: 'block'
                            }}>
                                <div className={addaddress.choseAddtop}>
                                    <span>选择区域
                                    </span>
                                    <div
                                        className={addaddress.choseclo + " " + addaddress.fr}
                                        onClick={this.closechange.bind(this)}></div>
                                </div>
                                <div className={addaddress.choseAddtab}>
                                    <ul>
                                        <li
                                            className={this.state.provinceStr === "请选择"
                                            ? addaddress.active
                                            : " "}
                                            data-cityid={this.state.cityId}
                                            onClick={this.changeprovinve.bind(this)}>{this.state.provinceStr}</li>
                                        {this.state.provinceStr !== "请选择"
                                            ? <li
                                                    className={this.state.cityStr === "请选择"
                                                    ? addaddress.active
                                                    : " "}
                                                    date-proid={this.state.provinceId}
                                                    onClick={this.changecity.bind(this)}>{this.state.cityStr}</li>
                                            : null}
                                        {this.state.provinceStr !== "请选择" && this.state.cityStr !== "请选择"
                                            ? <li
                                                    className={this.state.areaStr === "请选择"
                                                    ? addaddress.active
                                                    : " "}
                                                    data-disid={this.state.cityId}
                                                    onClick={this
                                                    .changeada
                                                    .bind(this)}>{this.state.areaStr}</li>
                                            : null}
                                    </ul>
                                </div>
                                <ul className={addaddress.choseCityBox}>
                                    {this.state.list.map(function (item, index) {
                                            return (
                                                <li
                                                    key={index}
                                                    data-destr={item.depthStr}
                                                    data-name={item.name}
                                                    data-id={item.id}
                                                    onClick={that
                                                    .chosename
                                                    .bind(that)}>
                                                    {item.name}
                                                </li>
                                            )
                                        })}
                                    {this.state.list.length <= 0
                                        ? <div className={addaddress.Noshop}>
                                                <div className={addaddress.Empty + " " + addaddress.img3}></div>
                                                <p>无区县数据,重新选择城市</p>
                                            </div>
                                        : null}
                                </ul>
                            </div>
                        </div>
                    : null}
            </div>
        );
    }
}
export default withRouter(App);
