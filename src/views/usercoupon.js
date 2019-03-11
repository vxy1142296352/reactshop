import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import edite from './less/usercoupon.less';
import apis from './api/userapi';
import Loading from './commd/loading';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            normal: [],
            Invalid: [],
            checkid: 0,
            loading: false
        }
    }
    componentDidMount() {
        this._ismounted = true
        this.getcoupon()
    }
    componentWillMount() {
        this._ismounted = false
    }
    getcoupon() {
        var that = this
        apis('discounts/my',{},'GET', function (res) {
            var normal = [],
                Invalid = [];
            if (that._ismounted) {
                that.setState({
                    loading:true
                })
                if(res.data.code===0){
                    for (var i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].status === 0) {
                            normal.push(res.data.data[i])
                        } else {
                            Invalid.push(res.data.data[i])
                        }
                    }
                    that.setState({normal: normal, Invalid: Invalid,})
                }
            }
        }, that)
    }
    check(e) {
        var that = this,
            index = e.currentTarget.getAttribute("data-index");
        that.setState({checkid: index})
    }
    goback() {
        window.history.go(-1);
    }
    render() {
        return (
            <div className="couponApp">
                {!this.state.loading
                    ? <Loading/>
                    : null}
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    我的优惠券
                </header>
                <div className={edite.container+" reactApp"}>
                    <div className={edite.couponTab}>
                        <a
                            href="javascrit:"
                            onClick={this
                            .check
                            .bind(this)}
                            data-index="0"
                            className={Number(this.state.checkid) === 0
                            ? edite.active
                            : " "}>可使用</a>
                        <a
                            href="javascrit:"
                            onClick={this
                            .check
                            .bind(this)}
                            data-index="1"
                            className={Number(this.state.checkid) === 1
                            ? edite.active
                            : " "}>已过期/已使用</a>
                    </div>
                    <div className={edite.couponBox}>
                        {Number(this.state.checkid) === 0
                            ? <div className={edite.couponitem + " " + edite.couponitem1}>
                                    <ul>
                                        {this
                                            .state
                                            .normal
                                            .map(function (item, index) {
                                                return (
                                                    <li key={index}>
                                                        <div className={edite.couponPrice}>￥<span>{item.money}</span>元优惠券</div>
                                                        <p className={edite.couponPice}>满<span>{item.moneyHreshold}</span>元可用</p>
                                                        <p className={edite.couponPice}>有效期:{item
                                                                .dateStart
                                                                .split(" ")[0]}~{item
                                                                .dateEnd
                                                                .split(" ")[0]}</p>
                                                        <div className={edite.couponRight}>
                                                            状态:{item.statusStr}
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        
                                    </ul>
                                    {this.state.normal.length <= 0
                                        ? <div className={edite.Noshop}>
                                                <div className={edite.Empty + " " + edite.img3}></div>
                                                <p>暂无可用优惠券</p>
                                            </div>
                                        : null}
                                </div>
                            : null}
                        {Number(this.state.checkid)=== 1
                            ? <div className={edite.couponitem + " " + edite.couponitem2}>
                                    <ul>
                                        {this
                                            .state
                                            .Invalid
                                            .map(function (item, index) {
                                                return (
                                                    <li key={index}>
                                                        <div className={edite.couponPrice}>￥<span>{item.money}</span>元优惠券</div>
                                                        <p className={edite.couponPice}>满<span>{item.moneyHreshold}</span>元可用</p>
                                                        <p className={edite.couponPice}>有效期:{item.dateStart.split(" ")[0]}~{item.dateEnd.split(" ")[0]}</p>
                                                        <div className={edite.couponRight}>
                                                            状态:{item.statusStr}
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                    </ul>
                                    {this.state.normal.length <= 0 && this.state.Invalid.length <= 0
                                        ? <div className={edite.Noshop}>
                                                <div className={edite.Empty + " " + edite.img3}></div>
                                                <p>无优惠券</p>
                                            </div>
                                        : null}
                                </div>
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
