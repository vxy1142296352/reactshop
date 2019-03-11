import React, {
    Component
} from 'react';
import {
    withRouter
} from 'react-router-dom';
import evote from './less/evote.less';
import apis from './api/userapi';
import Total from './commd/toast';
import Star from './commd/star/star';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            salse: [],
            evotenum: []
        }
    }
    componentDidMount() {
        this._ismounted = true
        if (window.location.href.split("?ordernumber=")[1]) {
            this.getlist()
        } else {
            var that = this
            Total.error("非法请求", 1500)
            setTimeout(() => {
                that.props.history.replace('/404')
            }, 1500)
        }
    }
    componentWillMount() {
        this._ismounted = false
    }
    getlist() {
        var that = this
        apis('order/detail', {
            id: window.location.href.split("?id=")[1],
            status: 3
        }, 'POST', function (res) {
            if (that._ismounted) {
                if (res.data.code === 0) {
                    that.setState({
                        salse: res.data.data.goods
                    })
                } else {
                    Total.error("错误请求", 1500)
                    setTimeout(() => {
                        that.props.history.replace('/404')
                    }, 1500)
                }
            }
        }, that)
    }
    goback() {
        window.history.go(-1);
    }
    qxEvote() {
        window.history.go(-1);
    }
    reMark(e) { //宝贝评价
        var arr = this.state.salse
        var remarkvalue = e.target.value
        var index = e.currentTarget.getAttribute("data-index")
        arr[index].remark = remarkvalue
        this.setState({
            salse: arr
        })
    }
    Savevote() { //提交评价
        var that = this
        var arr = []
        for (var i = 0; i < this.state.salse.length; i++) {
            var data = {}
            data.id = this.state.salse[i].goodsId
            data.reputation = this.state.evotenum[i].reputation
            if (this.state.salse[i].remark) {
                data.remark = this.state.salse[i].remark
            } else {
                data.remark = ""
            }
            arr.push(data)
        }
        var postJsonString = {}
        postJsonString.token = this.state.token
        postJsonString.reputations = arr
        postJsonString.orderId = window.location.href.split("?id=")[1]
        var hideLoading = Total.loading('处理中...')
        apis('order/reputation', {
            postJsonString: JSON.stringify(postJsonString)
        }, "POST", function (res) {
            if (res.data.code === 0) {
                setTimeout(hideLoading, 1000)
                setTimeout(function () {
                    Total.success("评价成功", 500)
                }, 1001)
                setTimeout(function () {
                    that.history.goBack()
                }, 1501)
            } else {
                setTimeout(hideLoading, 1000)
                setTimeout(function () {
                    Total.error("评价失败", 500)
                }, 1001)
            }
        })
    }
    Onstar(arr) {
        this.setState({
            evotenum: arr
        })
    }
    render() {
        var that=this
        return (
            <div className="evoteApp reactApp">
                <header className={evote.carheader}>
                    <a href="javascrit:" className={evote.carback} onClick={() => this.goback()}>
                    </a>
                    评价商品
                </header>
                <div className={evote.container}>
                    <div className={evote.aftersale+" "+evote.evoteGoods}>
                        {this.state.salse.map(function (item, i) {
                                return (
                                    <ul key={i}>
                                        <li
                                            data-index={i}
                                            data-goodsid={item.goodsId}
                                            data-choseid={item.propertyChildIds}>
                                            <div className={evote.carimg}>
                                                <a href={'#/details/' + item.goodsId}>
                                                    <img src={item.pic} alt={item.goodsName}/>
                                                </a>
                                            </div>
                                            <div className={evote.carname}>
                                                <a href={'#/details/' + item.goodsId}>
                                                    <h2>{item.goodsName}</h2>
                                                    <span>规格:{item.property}
                                                        <em>x{item.number}</em>
                                                    </span>
                                                </a>
                                                <span className={evote.carprice}>¥{item.amount}</span>
                                            </div>
                                        </li>
                                        <Star Onstar={that.Onstar.bind(that)} goodslen={that.state.salse.length} goodsindex={i} data-index={i} evote={evote}/>
                                        <div className={evote.evoteText}>
                                            <textarea name="" id="" cols="30" data-index={i} onChange={that.reMark.bind(that)} rows="10" placeholder="输入对宝贝的评价"></textarea>
                                        </div>
                                    </ul>
                                )
                            })}
                    </div>
                    <div className={evote.addressstree}>
                        <button
                            className={evote.saveadd + " " + evote.savemore}
                            onClick={this.Savevote.bind(this)}>提交</button>
                        <button
                            className={evote.saveadd}
                            onClick={this.qxEvote.bind(this)}>取消</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
