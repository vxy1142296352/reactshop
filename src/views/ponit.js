import React, {
    Component
} from 'react';
import {withRouter} from 'react-router-dom';
import user from './less/userpoint.less';
import apis from './api/userapi';
import Loading from './commd/loading';
import Total from './commd/toast';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yearmonth: "", //当前年月
            day: "", //当前月份天数
            firstday: "", //当前月份第一天是星期几,
            point: false, //今天是否签到
            loading: false,
            dataarr: [], //当月签到日期
            prevarr: [], //上月签到日期
            calendar: [], //当月数据
            prevmonth: [], //上月数据
        }
    }
    componentDidMount() { //组件挂载
        this._isMounted = true
        this.days()
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    days() { //是否签到
        var that = this
        apis('score/today-signed', {}, "GET", function (res) {
            if (res.data.code === 0) {
                that.setState({
                    point: true,
                    nowpoint: res.data.data.continuous + "积分"
                })
            } else if (res.data.code === 700) {
                that.setState({
                    point: false,
                    nowpoint: 0
                })
            }
        }, that)
        var days = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(), //当月天数
            firstday = new Date(new Date().setDate(1)).getDay(), //当前月第一天星期几:
            nowmongth = new Date().getMonth() + 1; //当前月份
        if (that._isMounted) {
            that.setState({
                day: days,
                firstday: firstday,
                yearmonth: new Date().getFullYear() + "年" + nowmongth + "月"
            })
            that.pointlist()
        }
    }
    eachday(calendar, prevarr) { //渲染日历
        var res = []
        var prevmonth = []
        var that = this
        var firstday = that.state.firstday
        for (let i = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate() + 1 - firstday; i <= new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate(); i++) { //本月显示上月天数
            prevmonth.push({
                name: i
            })
        }
        for (let i = 1; i <= that.state.day; i++) {
            res.push({
                name: i
            })
        }
        for (let i = 0; i < prevmonth.length; i++) {
            for (let j = 0; j < prevarr.length; j++) {
                if (prevmonth[i].name === Number(prevarr[j])) {
                    prevmonth[i].active = true
                }
            }
        }
        for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < calendar.length; j++) {
                if (this.state.point && res[i].name === new Date().getDate()) {
                    res[i].active = true
                } else if (res[i].name === Number(calendar[j])) {
                    res[i].active = true
                }
            }
        }
        this.setState({
            dataarr: res,
            prevmonth: prevmonth
        })
    }
    pointlist() { //获取签到规则
        var that = this
        apis("score/sign/rules", {}, "GET", function (res) {
            if (that._isMounted) {
                if (res.data.code === 0) {
                    that.setState({
                        signday: res.data.data[res.data.data.length - 1].continuous,
                        signpoint: res.data.data[res.data.data.length - 1].score
                    })
                }
            }
            that.continuity()
        }, that)
    }
    continuity() { //连续签到记录
        var that = this
        var dayarr = []
        var prevarr = []
        apis("score/sign/logs",{},'GET', function (res) {
            if (that._isMounted) {
                if (res.data.code === 0) {
                    for (var i = 0; i < res.data.data.result.length; i++) {
                        if (Number(res.data.data.result[i].dateAdd.split(" 00:00:00")[0].split("-")[1]) === Number(new Date().getMonth() + 1)) {
                            if (res.data.data.result[i].dateAdd.split(" 00:00:00")[0].split("-")[2] < 10) {
                                dayarr.push(res.data.data.result[i].dateAdd.split(" 00:00:00")[0].split("-")[2].split("")[1])
                            } else {
                                dayarr.push(res.data.data.result[i].dateAdd.split(" 00:00:00")[0].split("-")[2])
                            }
                        } else {
                            prevarr.push(res.data.data.result[i].dateAdd.split(" 00:00:00")[0].split("-")[2])
                        }
                    }
                    that.setState({
                        continuity: res.data.data.result[0].continuous,
                        calendar: dayarr,
                        prevarr: prevarr
                    })
                    that.eachday(dayarr, prevarr)
                    that.allpoint()
                } else {
                    that.setState({
                        continuity: 0,
                        calendar: dayarr,
                        prevarr: prevarr
                    })
                    that.eachday(dayarr, prevarr)
                    that.allpoint()
                }
            }
        }, that)
    }
    allpoint() { //获取总积分和当前月份总积分
        var that = this,
            dateAddBegin = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-01",
            dateAddEnd = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
        apis('score/logs', {
            behavior: 0
        }, "POST", function (res) {
            var allpoint = 0
            if (res.data.code === 0) {
                for (let i = 0; i < res.data.data.result.length; i++) {
                    allpoint += res.data.data.result[i].score
                }
            } else {
                allpoint = 0
            }
            that.setState({
                allpoint: allpoint
            })
        }, that)
        apis('score/logs', {
            dateAddBegin: dateAddBegin,
            dateAddEnd: dateAddEnd
        }, "POST", function (res) {
            that.setState({
                loading: true
            })
            if (res.data.code === 0) {
                var monthpoint = 0
                for (let i = 0; i < res.data.data.result.length; i++) {
                    monthpoint += res.data.data.result[i].score
                }
                if (that._isMounted) {
                    that.setState({
                        monthpoint: monthpoint
                    })
                }
            } else {
                that.setState({
                    monthpoint: 0
                })
            }
        }, that)
    }
    commicpoint() { //点击签到
        var that = this
        if (this.state.point) {
            Total.error("您已签过到", 1500)
        } else {
            apis('score/sign', {
                token: ""
            }, 'POST', function (res) {
                if (res.data.code === 0) {
                    that.setState({
                        point: true,
                        nowpoint: res.data.data.continuous + "积分"
                    })
                    Total.success("签到成功", 1500)
                    that.eachday(that.state.calendar, that.state.prevarr)
                    that.continuity()
                } else {
                    Total.error("签到失败", 1500)
                }
            }, that)
        }
    }
    goback() {
        window.history.go(-1);
    }
        render() {
            return (
                <div className={user.pointApp}>
                    {!this.state.loading
                        ? <Loading/>
                        : null}
                    <div className={user.container+" reactApp"}>
                        <div className={user.pointtop}>
                            <a
                                href="javascrit:"
                                className={user.userPoint_back}
                                onClick={() => this.goback()}>
                                </a>
                            <div className={user.pointright + " " + user.fr}>
                                <span>本月已获<em>{this.state.monthpoint}</em>积分</span>
                                <span>累计已获<em>{this.state.allpoint}</em>积分</span>
                            </div>
                            <div
                                className={[user.pointget] + " " + [this.state.point
                                    ? user.pointget2
                                    : " "]}
                                onClick={this
                                .commicpoint
                                .bind(this)}>
                                {this.state.point
                                    ? <div className={user.pointlist}>获得{this.state.nowpoint}</div>
                                    : null}
                            </div>
                            <div className={user.pointbottom}>
                                已连续签到<span>{this.state.continuity}</span>天,连续签到{this.state.signday}天得{this.state.signpoint}积分
                            </div>
                        </div>
                        <div className={user.pointmonth}>
                            <h3>{this.state.yearmonth}签到</h3>
                            <div className={user.pointmonthBox}>
                                <ul>
                                    <li>周日</li>
                                    <li>周一</li>
                                    <li>周二</li>
                                    <li>周三</li>
                                    <li>周四</li>
                                    <li>周五</li>
                                    <li>周六</li>
                                    {this
                                        .state
                                        .prevmonth
                                        .map(function (item, index) {
                                            return (
                                                <li
                                                    key={index}
                                                    className={item.active
                                                    ? user.check
                                                    : " "}>
                                                    {item.name}
                                                </li>
                                            )
                                        })}
                                    {this
                                        .state
                                        .dataarr
                                        .map(function (item, index) {
                                            return (
                                                <li
                                                    key={index}
                                                    className={item.active
                                                    ? user.check
                                                    : " "}>
                                                    {item.name}
                                                </li>
                                            )
                                        })}
                                </ul>
                            </div>
                            <div className={user.pointrules}>
                                <span>签到规则</span>
                                <p>1.用户每日签到可获取积分奖励，连续签到相应天数可额外获得积分奖励；</p>
                                <p>2.签到送积分活动长期有效；</p>
                                <p>3.本活动最终解释权归网站所有。</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
export default withRouter(App);
