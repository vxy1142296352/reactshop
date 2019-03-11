import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import edite from './less/usercollection.less';
import apis from './api/userapi';
import Loading from './commd/loading';
import Modal from './commd/modal';
import Total from './commd/toast';
import Share from './commd/details/share';
import {CSSTransition} from 'react-transition-group';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
const confirm = Modal
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collection: [],
            loading: false,
            share: false,
            sharetrans: false,
            GoodsName: "",
            GoodsID: "",
            GoodsPic: ""
        }
    }
    componentDidMount() {
        this._ismounted = true
        this.getcollection()
    }
    componentWillMount() {
        this._ismounted = false
    }
    getcollection() {
        var that = this
        apis('shop/goods/fav/list', {
        }, 'GET', function (res) {
            if (that._ismounted) {
                var collevtiov = []
                if (res.data.code === 0) {
                    collevtiov = res.data.data
                } else {
                    collevtiov = []
                }
                that.setState({collection: collevtiov, loading: true})
            }
        }, that)
    }
    deleCollec(e) { //删除收藏
        var that = this,
            goodsId =e.currentTarget.getAttribute("data-id");
        confirm.confirm({
            contentText: '确定要删除收藏吗？',
            onOk() {
                apis('shop/goods/fav/delete',{goodsId: goodsId},"POST", function (res) {
                    if (res.data.code === 0) {
                        Total.success("删除成功", 1500)
                        that.getcollection()
                    } else {
                        Total.error("删除失败", 1500)
                    }
                }, that)
            },
            onCancel() {
                
            }
        })
    }
    goback() {
        //返回上一页
        window.history.go(-1);
    }
    shAre(e) { //分享
        this.setState({
            share: true,
            sharetrans: true,
            GoodsName:e.currentTarget.getAttribute("data-name"),
            GoodsID:e.currentTarget.getAttribute("data-id"),
            GoodsPic:e.currentTarget.getAttribute("data-pic"),
            characteristic:e.currentTarget.getAttribute("data-characteristic")
        })
    }
    onClose(e) { //关闭分享
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false;
        }
        var that = this
        that.setState({share: false, GoodsName: "", GoodsID: "", GoodsPic: "", characteristic: ""})
        setTimeout(() => {
            that.setState({sharetrans: false})
        }, 500);
    }
    render() {
        var that = this
        return (
            <div className={edite.usercollectionApp}>
                <CSSTransition in={this.state.share} classNames="share_trans" timeout={0}>
                    <div>
                        {this.state.sharetrans
                            ? <Share
                                    details={edite}
                                    GoodsName={this.state.GoodsName}
                                    GoodsID={this.state.GoodsID}
                                    GoodsPic={this.state.GoodsPic}
                                    characteristic={this.state.characteristic}
                                    onClose={this
                                    .onClose
                                    .bind(this)}/>
                            : null}
                    </div>
                </CSSTransition>
                {!this.state.loading
                    ? <Loading/>
                    : null}
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    我的收藏
                </header>
                <div className={edite.container+" reactApp"}>
                    <div className={edite.evoteGooslist}>
                        <ul>
                            {this
                                .state
                                .collection
                                .map(function (item, index) {
                                    return (
                                        <li key={index}>
                                            <a href={"#/details/" + item.goodsId}>
                                                <div className={edite.evpteGppdsImg}>
                                                    <img src={item.pic} alt={item.goodsName}/>
                                                </div>
                                                <div className={edite.evoteGoosBox}>
                                                    <h2>{item.goodsName}</h2>
                                                    <em className={edite.img2 + " " + edite.evotedelete}></em>
                                                </div>
                                            </a>
                                            <div className={edite.evoteBottom}>
                                                <a
                                                    href="javascrit:"
                                                    data-name={item.goodsName}
                                                    data-id={item.goodsId}
                                                    data-pic={item.pic}
                                                    data-characteristic={item.characteristic}
                                                    className={edite.img + " " + edite.evoteshare}
                                                    onClick={that
                                                    .shAre
                                                    .bind(that)}>
                                                    </a>
                                                <a
                                                    href="javascrit:"
                                                    data-id={item.goodsId}
                                                    className={edite.evotecar}
                                                    onClick={that
                                                    .deleCollec
                                                    .bind(that)}>
                                                    </a>
                                            </div>
                                        </li>
                                    )
                                })}
                        </ul>
                        {this.state.collection.length <= 0
                            ? <div className={edite.Noshop}>
                                    <div className={edite.Empty + " " + edite.img3}></div>
                                    <p>暂无任何收藏商品</p>
                                </div>
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
