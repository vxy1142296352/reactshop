import React, {Component} from 'react';
class footer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        var that = this
        this._isMounted = true
        that.TimeDown('2019-10-29 17:00:45')
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    TimeDown(endDateStr) { //显示抢购倒计时
        var that = this;
        var endDate = new Date(endDateStr),
            nowDate = new Date(),
            days,
            modulo,
            hours,
            minutes,
            seconds,
            totalSeconds = parseInt((endDate - nowDate) / 1000),
            back = []
        if (that._isMounted) {
            if (totalSeconds < 0) {
                days = 0
                modulo = 0
                hours = 0
                minutes = 0
                seconds = 0
                that.setState({days: days, hours: hours, minutes: minutes, seconds: seconds, Status: back})
                return false
            } else {
                days = Math.floor(totalSeconds / (60 * 60 * 24));
                modulo = totalSeconds % (60 * 60 * 24);
                hours = Math.floor(modulo / (60 * 60)) < 10
                    ? "0" + Math.floor(modulo / (60 * 60))
                    : Math.floor(modulo / (60 * 60));
                modulo = modulo % (60 * 60);
                minutes = Math.floor(modulo / 60) < 10
                    ? "0" + Math.floor(modulo / 60)
                    : Math.floor(modulo / 60);
                seconds = modulo % 60 < 10
                    ? "0" + modulo % 60
                    : modulo % 60;
                setTimeout(function () {
                    that.TimeDown(endDateStr);
                }, 1000)

                that.setState({days: days, hours: hours, minutes: minutes, seconds: seconds})
            }
        }
    }
    render() {
        return (
            <div id={this.props.indexless.time}>剩余:
                <span>{this.state.days}</span>天
                <span>{this.state.hours}</span>时
                <span>{this.state.minutes}</span>分
                <span>{this.state.seconds}</span>秒
            </div>
        );
    }
}
export default footer;
