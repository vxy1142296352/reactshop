import React, {Component} from 'react';
import edite from './less/news.less';
import apis from './api/api';
import Loading from './commd/loading';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newslist: [],
            loading: false
        }
    }
    componentDidMount() {
        this._ismounted = true
        this.getnews()
    }
    componentWillMount() {
        this._ismounted = false
    }
    getnews() {
        var that = this
        apis('notice/list', {}, 'GET', function (res) {
            if (that._ismounted) {
                if (res.data.code === 0) {
                    that.setState({newslist: res.data.data.dataList,loading: true})
                }
            }
        }, that)
    }
    goback() {
        this.props.history.goBack()
    }
    render() {
        return (
            <div className={edite.newsApp}>
                {!this.state.loading
                    ? <Loading/>
                    : null}
                <header className={edite.carheader+" "+edite.newsHeader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    消息快报
                </header>
                <div className={edite.container+" reactApp"}>
                    <div className={edite.newslistBox}>
                        <ul>
                            {this.state.newslist.map(function (item, index) {
                                    return (
                                        <li key={index}>
                                            <a href={"#/news/content/" + item.id}>
                                                <h2>{item.title}</h2>
                                                <p>{item.dateAdd}</p>
                                            </a>
                                        </li>
                                    )
                                })}
                            {this.state.newslist.length <= 0
                                ? <div className={edite.Noshop}>
                                        <div className={edite.Empty + " " + edite.img3}></div>
                                        <p>无消息</p>
                                    </div>
                                : null}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
