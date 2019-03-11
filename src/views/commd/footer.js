import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
class footer extends Component {
  render() {
    return (
    <footer className={[this.props.className.footer]+" "+[" footer"]+" "+[this.props.nav?this.props.className.footeractive:" "]} id={this.props.className.footer}>
    <NavLink exact  to="/">
        <i className={this.props.className.img2}></i>首页</NavLink>
    <NavLink to="/cate">
        <i className={this.props.className.img2}></i>分类</NavLink>
    <NavLink to="/car">
        <i className={this.props.className.img2}></i>购物车</NavLink>
    <NavLink to="/user">
        <i className={this.props.className.img2}></i>个人中心</NavLink>
</footer>
    );
  }
}
export default footer;
