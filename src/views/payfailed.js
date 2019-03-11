import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import faild from './less/login.less';
import initReactFastclick from 'react-fastclick';
import Total from './commd/toast'
import paystore from './redux/ispay/reducers';
import {addToCart} from './redux/ispay/actions/cart-actions';
initReactFastclick();
class App extends Component {
	constructor(props){
		super(props)
		this.state={
		}
	}
	componentDidMount(){
		if(paystore.getState().shoppingCart.cart){
			paystore.dispatch(addToCart(false))
		}
		else{
			Total.error("页面已过期",1500)
			this.props.history.replace("/404")
		 }
	}
	back(){
		window.history.go(-1);
	}
	backIndex(){
		this.props.history.replace("/#/")
	}
  render() {
return (
	<div className={faild.faildApp+" reactApp"}>
	<header className={faild.carheader+" "+faild.payHeader}>
	 支付失败
	</header>
	<section className={faild.container}>
		<div className={faild.successBox}>
			<div className={faild.successimg+" "+faild.faileimg}>
			</div>
			<p>支付失败</p>
			<div className={faild.successBtn}>
				<a href="javascrit:" onClick={this.back.bind(this)} className={faild.fl}>重新支付</a>
				<a href="javascrit:" onClick={this.backIndex.bind(this)} className={faild.fr}>返回首页</a>
			</div>
		</div>
	</section>
    </div>
);
  }
}
export default withRouter(App);
