import React, {Component} from 'react';
import apis from '../../api/api';
import Total from '../toast'
const wx = require('weixin-js-sdk')
require('../../less/trans.css')
class footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }
    componentDidMount() {
        this.wxreade()
    }
    wxreade() {
        var params = new URLSearchParams();
        params.append("url", window.location.href.split("#")[0])
        apis('/wx/jssdk/sign', params, "POST", function (res) {
            if (res.data.code === 0) {
                localStorage.setItem("wxConfig", JSON.stringify(res.data.data))
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.data.appid, // 必填，公众号的唯一标识
                    timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
                    signature: res.data.data.sign, // 必填，签名
                    jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"] // 必填，需要使用的JS接口列表
                })
                wx.ready(() => {});
                wx.error(function (res) {});
            }
        })
    }
    qqZone(e) {
        var _url = window.location.host + "/#/details/" + this.props.GoodsID;
        var _showcount = 0;
        var _title = "一直专注于吃零食,快来一起吃吧?" + this.props.GoodsName;
        var _width = "600px";
        var _height = "800px";
        var _pic = this.props.GoodsPic;
        var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
        _shareUrl += 'url=' + encodeURIComponent(_url || document.location); //参数url设置分享的内容链接|默认当前页location
        _shareUrl += '&showcount=' + _showcount || 0; //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
        _shareUrl += '&desc=' + encodeURIComponent(this.props.GoodsName); //参数desc设置分享的描述，可选参数
        //_shareUrl += '&summary=' + encodeURIComponent(_summary||'分享摘要');    //参数summary设置分享摘要，可选参数
        _shareUrl += '&title=' + encodeURIComponent(_title || document.title); //参数title设置分享标题，可选参数
        //_shareUrl += '&site=' + encodeURIComponent(_site||'');   //参数site设置分享来源，可选参数
        _shareUrl += '&pics=' + encodeURIComponent(_pic || ''); //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
        window.open(_shareUrl, 'width=' + _width + ',height=' + _height + ',top="30px",left="50px",toolbar=no,menubar=no,scrollbars=no,resizable=1,location' +
                '=no,status=0');
    }
    QQfriend(e) {
        var p = {
            url: window.location.host + "/#/details/" + this.props.GoodsID,
            /*获取URL，可加上来自分享到QQ标识，方便统计*/
            desc: this.props.GoodsName,
            title: "一直专注于吃零食,快来一起吃吧?" + this.props.GoodsName,
            /*分享标题(可选)*/
            summary: '',
            /*分享摘要(可选)*/
            pics: this.props.GoodsPic,
            /*分享图片(可选)*/
            flash: '',
            /*视频地址(可选)*/
            site: "http://127.0.0.1:8099/#/details/" + this.props.GoodsID,
            /*分享来源(可选) 如：QQ分享*/
            style: '203',
            width: 16,
            height: 16
        };
        var s = [];
        for (var i in p) {
            s.push(i + '=' + encodeURIComponent(p[i] || ''));
        }
        var qhref = "http://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
        window.open(qhref)
    }
    Wxfriend(e) { //分享到微信朋友
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false;
        }
        Total.warning("暂不可用", 1000)
        wx.onMenuShareAppMessage({
            title: this.props.GoodsName,
            desc: this.props.characteristic,
            link: window.location.host + "/#/details/" + this.props.GoodsID,
            imgUrl: this.props.GoodsPic,
            success: function () {
                Total.success("分享成功", 1500)
            },
            cancel: function () {}
        });
    }
    WxOpenfriend(e) { //分享到微信朋友圈
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false;
        }
        Total.warning("暂不可用", 1000)
        wx.onMenuShareTimeline({
            title: this.props.GoodsName,
            desc: this.props.characteristic,
            link: window.location.host + "/#/details/" + this.props.GoodsID,
            imgUrl: this.props.GoodsPic,
            success: function () {
                Total.success("分享成功", 1500)
            },
            cancel: function () {}
        })
    }
    Sharesina(e) { //分享到新浪微博
        var desc_ = this.props.GoodsName
        var title = desc_;
        var rLink = window.location.host + "/#/details/" + this.props.GoodsID;
        var pic = this.props.GoodsPic;
        window.open("http://service.weibo.com/share/share.php?pic=" + encodeURIComponent(pic) + "&title=" + encodeURIComponent(title.replace(/ /g, " ").replace(/<br \/>/g, " ")) + "&url=" + encodeURIComponent(rLink), "分享至新浪微博",);
    }
    ShareR(e) { //分享到人人网
        var _url = "http://" + window.location.host + "/#/details/" + this.props.GoodsID;
        var _title = this.props.GoodsName
        var _shareUrl = "http://widget.renren.com/dialog/share?";
        _shareUrl += "resourceUrl=" + encodeURIComponent(_url); //分享的链接
        _shareUrl += "&srcUrl=" + encodeURIComponent(_url);
        _shareUrl += "&title=" + encodeURIComponent(_title || document.title); //分享的标题
        window.open(_shareUrl, "_blank");
    }
    render() {
        return (
            <div>
                <div className={this.props.details.shareBox + " DEtailshareBox"}>
                    <div className={this.props.details.sharetitle}>
                        分享到
                        <a
                            href="javascrit:"
                            className={this.props.details.listclose}
                            onClick={this.props.onClose}>
                            </a>
                    </div>
                    <div className={this.props.details.sharecontent}>
                        <a
                            href='javascrit:'
                            onClick={this
                            .QQfriend
                            .bind(this)}>
                            <i></i>
                            QQ好友
                        </a>
                        <a
                            href='javascrit:'
                            onClick={this
                            .qqZone
                            .bind(this)}>
                            <i></i>
                            QQ空间
                        </a>
                        <a
                            href='javascrit:'
                            onClick={this
                            .Wxfriend
                            .bind(this)}>
                            <i></i>
                            微信好友
                        </a>
                        <a
                            href='javascrit:'
                            onClick={this
                            .WxOpenfriend
                            .bind(this)}>
                            <i></i>
                            朋友圈
                        </a>
                        <a
                            href='javascrit:'
                            onClick={this
                            .Sharesina
                            .bind(this)}>
                            <i></i>
                            新浪微博
                        </a>
                        <a
                            href='javascrit:'
                            onClick={this
                            .ShareR
                            .bind(this)}>
                            <i></i>
                            人人网
                        </a>
                    </div>
                </div>
                <div className={this.props.details.back + " share_Back"}></div>
            </div>
        );
    }
}
export default footer;
