import React, {
    Component
} from 'react';
import {
    withRouter
} from 'react-router-dom';
import edite from './less/useraddress.less';
import apis from './api/userapi';
import Loading from './commd/loading';
import Modal from './commd/modal';
import Total from './commd/toast';
import Tloader from './commd/refresh/loader_more';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
const confirm = Modal
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: [],
            loading: false,
            deleid: "",
            ismore: true
        }
    }
    refresh = (resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2e3);
    }
    loadMore = (resolve) => {
        var that = this
        setTimeout(() => {
            resolve(that.setState({
                ismore: false
            }));
        }, 2e3);
    }
    componentDidMount() { //组件挂载
        this._isMounted = true
        this.getlist()
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    editefult(e) {
        var index = e
            .currentTarget
            .getAttribute("data-index"),
            that = this;
        apis('user/shipping-address/update', {
            id: that.state.address[index].id,
            isDefault: true
        }, 'POST', function (res) {
            if (res.data.code === 0) {
                Total.success("设置成功", 1500)
                that.getlist()
            }
        }, that)
    }
    delete(e) {
        var that = this
        that.setState({
            deleid: e
                .currentTarget
                .getAttribute("data-index")
        })
        confirm.confirm({
            contentText: '确定要删除此地址吗',
            onOk() {
                that.SureDelete()
            },
            onCancel() {}
        })
    }
    getlist() {
        var that = this
        apis('user/shipping-address/list', {}, "GET", function (res) {
            if (that._isMounted) {
                res.data.code === 0 ?
                    that.setState({
                        address: res.data.data,
                        loading: true
                    }) :
                    that.setState({
                        address: [],
                        loading: true
                    })
                setTimeout(function () {
                    if (that.state.address.length === 0) {
                        localStorage.removeItem("address")
                    }
                }, 5)
            }
        }, that)
    }
    SureDelete() { //确认删除
        var that = this;
        apis('user/shipping-address/delete', {
            id: this.state.deleid
        }, 'POST', function (res) {
            if (res.data.code === 0) {
                that.getlist()
                that.setState({
                    deleid: ""
                })
                Total.success("删除成功", 1500)
                if (localStorage.getItem("address") && JSON.parse(localStorage.getItem("address")).id === that.state.deleid) {
                    localStorage.removeItem("address")
                }
            } else {
                that.setState({
                    deleid: ""
                })
                Total.error(res.data.msg, 1500)
            }
        }, that)
    }
    choseAddress(e) { //点击地址事件
        var index = e.currentTarget.getAttribute("data-index")
        if (localStorage.getItem("addressurl")) {
            this.props.history.replace(localStorage.getItem("addressurl"))
            localStorage.setItem("address", JSON.stringify(this.state.address[index]))
        } else {
            this.props.history.push("/user/addaddress/update?id=" + this.state.address[index].id)
        }
    }
    goback() {
        if (localStorage.getItem("addressurl")) {
            this.props.history.replace(localStorage.getItem("addressurl"))
        } else {
            window.history.go(-1);
        }
    }
    Address() { //添加地址
        if (localStorage.getItem('addressurl')) {
            this.props.history.replace('/user/addaddress/add')
        } else {
            this.props.history.push('/user/addaddress/add')
        }
    }
    render() {
        var noaddress = null,
            that = this;
        if (this.state.address.length <= 0) {
            noaddress = <div className={edite.Noshop}>
                <div className={edite.Empty + " " + edite.img3}></div>
                <p>您暂无收货地址</p>
            </div>
        }
        return (
            <div className="addressApp">
                {!this.state.loading
                    ? <Loading/>
                    : null}
                <div className="view">
                    <Tloader
                        className="main"
                        onRefresh={this.refresh}
                        onLoadMore={this.loadMore}
                        hasMore={this.state.address.length >= 6
                        ? true
                        : false}
                        ismore={this.state.ismore}>
                        <header className={edite.carheader + " " + edite.addressb}>
                            <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                            </a>
                            收货地址
                            <a
                                href="jacascrit:"
                                onClick={this
                                .Address
                                .bind(this)}
                                className={edite.caredite}>＋</a>
                        </header>
                        <div className={edite.container + " reactApp"}>
                            <div className={edite.addresslistBox}>
                                <ul>
                                    {this
                                        .state
                                        .address
                                        .map(function (item, index) {
                                            return (
                                                <li
                                                    className={item.isDefault
                                                    ? edite.addult
                                                    : " "}
                                                    key={index}>
                                                    <a
                                                        href="javascrit:"
                                                        data-index={index}
                                                        onClick={that
                                                        .choseAddress
                                                        .bind(that)}>
                                                        <div className={edite.addressusernme}>
                                                            {item.linkMan}
                                                            <span>{item.mobile}</span>
                                                        </div>
                                                        <p>{item.provinceStr}{item.cityStr}{item.areaStr}{item.address}</p>
                                                    </a>
                                                    <div className={edite.deleadd}>
                                                        <div
                                                            className={[edite.fl + " " + edite.default] + " " + [item.isDefault
                                                                ? edite.isdefault
                                                                : " "]}
                                                            onClick={that
                                                            .editefult
                                                            .bind(that)}data-index={index} >
                                                            <i></i>{item.isDefault
                                                                ? "默认"
                                                                : "设置默认"}
                                                        </div>
                                                        <div
                                                            className={edite.fr + " " + edite.defdelete}
                                                            data-index={item.id}
                                                            onClick={that
                                                            .delete
                                                            .bind(that)}>
                                                            删除
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                </ul>
                                {noaddress}
                            </div>
                        </div>
                    </Tloader>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
