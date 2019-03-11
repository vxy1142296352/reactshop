import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import faild from './less/login.less';
import Total from './commd/toast';
import initReactFastclick from 'react-fastclick';
import paystore from './redux/ispay/reducers';
import {addToCart} from './redux/ispay/actions/cart-actions';
initReactFastclick();
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null
        }
    }
    componentDidMount() {
        if (paystore.getState().shoppingCart.cart) {
            if (window.location.href.split("?orderID=")[1]) {
                Total.success("支付成功", 1500)
                this.setState({
                    id:window.location.href.split("?orderID=")[1]
                })
            } else {
                Total.error("错误请求", 1500)
                this.props.history.replace("/404")
            }
            paystore.dispatch(addToCart(false))
        } else {
            Total.error("页面已过期",1500)
            this.props.history.replace("/404")
        }

    }
    backIndex() {
         window.history.go(-1);
    }
    backOrder(){
        this.props.history.replace("/user/orderdetails/" + this.state.id)
    }
    render() {
        return (
            <div className={faild.successApp+" reactApp"}>
                <header className={faild.carheader + " " + faild.payHeader}>
                    支付成功
                </header>
                <section className={faild.container}>
                    <div className={faild.successBox}>
                        <div className={faild.successimg}></div>
                        <p>支付成功</p>
                        <div className={faild.successBtn}>
                            <a
                                href="javascrit:"
                                onClick={this
                                .backIndex
                                .bind(this)}
                                className={faild.fl}>返回首页</a>
                            <a
                                href="javascrit:"
                                onClick={this
                                .backOrder
                                .bind(this)}
                                className={faild.fr}>查看订单</a>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default withRouter(App);
