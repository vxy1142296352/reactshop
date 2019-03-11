import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import edite from './less/userexpress.less';
import Total from './commd/toast';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
class App extends Component {
    constructor(props){
        super(props)
        this.state={
            expressnumber:""
        }
    }
    componentDidMount(){
        if(window.location.href.split("?id=")){
            Total.warning("正在开发中")
            this.setState({
                expressnumber:window.location.href.split("?id=")[1]
            })
        }
        else{
            Total.warning("请求错误",1500)
            this.props.history.replace("/404")
        }
    }
    goback() {
        window.history.go(-1);
    }
    render() {
        return (
            <div className="expresApp  reactApp">
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    物流信息
                    <span className={edite.caredite}>刷新</span>
                </header>
                <div className={edite.container}>
                    <div className={edite.expresslist}>
                        <div className={edite.expressListtop}>
                            运单号:{window.location.href.split("?id=")[1]}
                            <a href="javascrit:">复制运单号</a>
                        </div>
                        <ul>

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
// <li>
// <span>
//     2018.08.02.23.34.56
// </span>
// <p>
//     布吉东站派件员正在派件
// </p>
// </li>
// <li>
// <span>
//     2018.08.02.23.34.56
// </span>
// <p>
//     布吉东站派件员正在派件
// </p>
// </li>
// <li>
// <span>
//     2018.08.02.23.34.56
// </span>
// <p>
//     布吉东站派件员正在派件
// </p>
// </li>
// <li>
// <span>
//     2018.08.02.23.34.56
// </span>
// <p>
//     布吉东站派件员正在派件
// </p>
// </li>