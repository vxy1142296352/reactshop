import React, {Component} from 'react';
import apis from "../../api/api";
class index_Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coupon: [],
            Mycoupon: [],
            token: this.props.token,
            iscoupon:false
        }
    }
    componentWillMount() {
        this._isMounted = true
        this.getcoupon()
    }
    getcoupon() { //获取优惠券
        var that = this;
        apis('discounts/coupons', {}, "GET", function (res) {
            if (that._isMounted && res.data.code === 0) {
                if (res.data.data.length === 1) {
                    res.data.data.push(res.data.data[0])
                    res.data.data.push(res.data.data[0])
                } else if (res.data.data.length === 2) {
                    res.data.data.push(res.data.data[Math.round(Math.random())])
                }
                that.setState({coupon: res.data.data})
                that.Myconpon()
            }
        }, that)
    }
    Myconpon() {
        var that = this
        apis("discounts/my",{
            params: {
                token: that.state.token,
                status: 0
            }
        }, "GET", function (res) {
            if (that._isMounted && res.data.code === 0) {
                that.setState({Mycoupon: res.data.data})
            } else {}
            that.couponlist()
        }, that)
    }
    couponlist() { //判断已领取优惠券
        var that = this,
            allcoupon = that.state.coupon,
            mycoupon = that.state.Mycoupon;
        for (var i = 0; i < allcoupon.length; i++) {
            for (var j = 0; j < mycoupon.length; j++) {
                if (mycoupon[j].pid === allcoupon[i].id) {
                    allcoupon[i].active = true
                }
            }
        }
        if(that._isMounted){
            that.setState({coupon: allcoupon,iscoupon:true})
        }
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    Receive(e) { //领取优惠券
        var id = e
            .currentTarget
            .getAttribute('data-id')
        var that = this
        if (that.state.token === undefined || that.state.token === null) {
            that.props.Total.warning("请先登录", 1500)
            setTimeout(function () {
                that.props.history.push("/login?Redirect=" + that.props.history.location.pathname)
            },1501)
        } else {
            var allcoupon = that.state.coupon
            var params = new URLSearchParams()
            params.append("token", this.state.token)
            params.append("id", id)
            apis('discounts/fetch', params, "POST", function (res) {
                if (res.data.code === 0) {
                    that.props.Total.success("领取成功", 1500)
                    for (var i = 0; i < allcoupon.length; i++) {
                        if (allcoupon[i].id === Number(id)) {
                            allcoupon[i].active = true
                        }
                    }
                    that.setState({coupon: allcoupon})
                } else {
                    that.props.Total.error("领取失败", 1500)
                }
            }, that)
        }
    }
    render() {
        var that = this
        return (
            <div className={this.props.indexless.indexcoupon}>
                {this
                    .state
                    .coupon
                    .map(function (item, index) {
                        return (
                            <button
                                key={index}
                                data-id={item.id}
                                className={[that.props.indexless.couponitem + " " + that.props.indexless.coitem] + " " + [item.active
                                    ? that.props.indexless.coitem2
                                    : " "]}
                                disabled={item.active
                                ? true
                                : false}
                                onClick={that
                                .Receive
                                .bind(that)}>
                                <p className={that.props.indexless.ctext1}>{item.name}</p>
                                <p className={that.props.indexless.ctext2}>满<span className={that.props.indexless.ctext3}>{item.moneyHreshold}</span>可用</p>
                            </button>
                        )
                    })}
                    {this.state.coupon.length<=0&&this.state.iscoupon?<div className={this.props.indexless.Noshop}>
                    <div className={this.props.indexless.Empty + " " + this.props.indexless.img3}></div>
                    <p>暂无优惠券</p>
                </div>:null}
            </div>
        );
    }
}
export default index_Main;
