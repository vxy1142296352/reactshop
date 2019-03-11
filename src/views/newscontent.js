import React, {Component} from 'react';
import edite from './less/news.less';
import apis from './api/api';
import userapi from './api/userapi'
import Loading from './commd/loading';
import Total from './commd/toast';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            evote: [],
            loading: false,
        }
    }
    componentDidMount() {
        this._ismonted = true
        this.getnews()
    }
    componentWillUnmount() {
        this._ismonted = false
    }
    getnews() {
        var that = this
        var id = this.props.match.params.id
        apis('notice/detail', {
            params: {
                id: id
            }
        }, 'GET', function (res) {
            if (that._ismonted) {
                if (res.data.code === 0){
                    that.setState({title: res.data.data.title, id: id, dateAdd: res.data.data.dateAdd, loading: true})
                    document.getElementById("newsContent").innerHTML = res.data.data.content
                    that.getevote()
                }
                else{
                    Total.error("请求错误",1500)
                    that.props.history.replace("/404")
                }
            }
        },that)
    }
    getevote() {
        var that = this
        var id = this.props.match.params.id
        apis("comment/list", {
            params: {
                refId: id
            }
        }, 'GET', function (res) {
            if (that._ismonted) {
                if (res.data.code === 0) {
                    for (var i = 0; i < res.data.data.length; i++) {
                        if (!res.data.data[i].commentUserInfo) {
                            res.data.data[i].commentUserInfo = {}
                            res.data.data[i].commentUserInfo.nick = "匿名用户"
                        }
                    }
                    that.setState({evote: res.data.data})
                }
            }
        }, that)
    }
    evote(e) {
        var that = this
        that.setState({content: e.target.value})
    }
    evotesub() {
        var that = this
        var content = this.state.content;
        var id = this.state.id
        if (content === "") {
            Total.warning("请输入评价内容", 1500)
            return
        } else {
            userapi('comment/add',{
                    refId: id,
                    type: "3",
                    content: content,
            },'POST',function (res) {
                if (res.data.code === 0) {
                    Total.success("评价成功",1500)
                    that.setState({
                        content:""
                    })
                    that.getevote()
                }
            }, that)
        }
    }
    goback() {
        this.props.history.goBack()
    }
    render() {
        return (
            <div className={edite.newstentApp}>
                {!this.state.loading
                    ? <Loading/>
                    : null}
                <header className={edite.carheader+" "+edite.newsHeader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    快报详情
                </header>
                <div className={edite.container+" "+edite.NewsContainer+" reactApp"}>
                    <div className={edite.newCent}>
                        <h1 className={edite.title}>
                            {this.state.title}
                        </h1>
                        <p
                            style={{
                            fontSize: '.32rem',
                            color: "#999"
                        }}>{this.state.dateAdd}</p>
                        <div className={edite.newBoxtent} id="newsContent"></div>
                    </div>
                    <div className={edite.Hoteevote}>
                        <div className={edite.evotetitle}>热门评论</div>
                        <div className={edite.evoteItems}>
                            <ul>
                                {this.state.evote.map(function (item, index) {
                                        return (
                                            <li key={index}>
                                                <div className={edite.evoteuser}>
                                                    <img src={require('./img/28.png')} alt=""/>
                                                    <p>
                                                        <em>{item.commentUserInfo.nick}</em>
                                                    </p>
                                                    <span></span>
                                                </div>
                                                <div className={edite.evoteContetn}>
                                                    {item.content}
                                                </div>
                                            </li>
                                        )
                                    })}
                                {this.state.evote.length <= 0
                                    ? <div className={edite.Noshop}>
                                            <div className={edite.Empty + " " + edite.img3}></div>
                                            <p>暂无评论</p>
                                        </div>
                                    : null}
                            </ul>
                        </div>
                    </div>
                    <div className={edite.messList}>
                        <input
                            type="text"
                            placeholder="评价文章"
                            onChange={this
                            .evote
                            .bind(this)}/>
                        <button
                            onClick={this
                            .evotesub
                            .bind(this)}>发表</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
