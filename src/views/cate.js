import React, {
    Component
} from 'react';
import cate from './less/cate.less';
import Footer from './commd/footer';
import api from './api/api';
import Loading from './commd/loading';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cate: [],
            catelev2: [],
            defaultright: [],
            checkname: '',
            loading: false
        }
    }
    componentDidMount() { //组件挂载
        this._isMounted = true
        this.getcatenav()
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    getcatenav() {
        let cateid = Number(window.location.href.split("?id=")[1]),
            that = this;
        api('shop/goods/category/all', {}, 'GET', function (res) {
            if (res.data.code === 0) {
                let leftcate = [],
                    rightcate = [],
                    defaultright = [],
                    checkname = "";
                for (let i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i].level === 1) {
                        leftcate.push(res.data.data[i])
                    } else {
                        defaultright.push(res.data.data[i])
                        if (!cateid) {
                            if (res.data.data[i].pid === leftcate[0].id) {
                                rightcate.push(res.data.data[i])
                            }
                        } else {
                            if (res.data.data[i].pid === cateid) {
                                rightcate.push(res.data.data[i])
                            }
                        }
                    }
                }
                if (!cateid) {
                    leftcate[0].active = true
                    checkname = leftcate[0].name
                } else {
                    for (let i = 0; i < leftcate.length; i++) {
                        if (leftcate[i].id === cateid) {
                            leftcate[i].active = true
                            checkname = leftcate[i].name
                        }
                    }
                }
                if (that._isMounted) {
                    that.setState({
                        cate: leftcate,
                        catelev2: rightcate,
                        defaultright: defaultright,
                        checkname: checkname,
                        loading: true
                    })
                }
            }
        }, that)
    }
    catechose(e) {
        var arr = [],
            cateleft = this.state.cate,
            index = e.target.getAttribute('data-index'),
            id = e.target.getAttribute('data-id'),
            name = e.target.getAttribute('data-name');
        for (let i = 0; i < cateleft.length; i++) {
            cateleft[i].active = false
            cateleft[index].active = true
        }
        for (let i = 0; i < this.state.defaultright.length; i++) {
            if (this.state.defaultright[i].pid === Number(id)) {
                arr.push(this.state.defaultright[i])
            }
        }
        this.setState({
            cate: cateleft,
            catelev2: arr,
            checkname: name
        })
    }
    goback() {
        this.props.history.goBack()
    }
    render() {
        var that = this
        return (
            <div className="cateApp">
                {!this.state.loading
                    ? <Loading/>
                    : null}
                <header className={cate.cateheader}>
                    <a
                        href="javascrit:"
                        className={cate.goback}
                        onClick={this
                        .goback
						.bind(this)}>
						</a>
                    <a href="#/search" className={cate.searchBNox}>
                        输入搜索关键字
                    </a>
					<a href="/#/list/0" className={cate.cateMOre}>
					</a>
                </header>
                <section className={cate.container + " " + cate.catecontainer}>
                    <div className={cate.cateBoxContent}>
                        <div className={cate.cateLeft+" reactApp"}>
                            <div className={cate.cateLBox}>
                                {this
                                    .state
                                    .cate
                                    .map(function (item, i) {
                                        return (
                                            <a
                                                href="javascrit:"
                                                data-index={i}
                                                data-name={item.name}
                                                data-id={item.id}
                                                className={item.active
                                                ? cate.active
                                                : " "}
                                                key={i}
                                                onClick={that
                                                .catechose
                                                .bind(that)}>
                                                {item.name}
                                            </a>
                                        )
                                    })}
                            </div>
                        </div>
                        <div className={cate.cateRight+" reactApp"}>
                            <div className={cate.cateRBox}>
                                <div className={cate.cateItem}>
                                    <h2>
                                        <span>-</span>
                                        {this.state.checkname}
                                        <span>-</span>
                                    </h2>
                                    <a href="#/cate" className={cate.catebanner}>
                                        <img
                                            src="https://gw.alicdn.com/imgextra/i2/880734502/O1CN011j7xYVgModREXoS_!!880734502.jpg_790x10000Q75.jpg_.webp"
                                            alt=""/>
                                    </a>
                                    <ul>
                                        {this
                                            .state
                                            .catelev2
                                            .map(function (item, index) {
                                                return (
                                                    <li key={index}>
                                                        <a href={"#/list/" + item.id + "?name=" + item.name}>
                                                            <img src={item.icon} alt={item.name}/>{item.name}
                                                        </a>
                                                    </li>
                                                )
                                            })
}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer className={cate}/>
            </div>
        );
    }
}
export default App;
