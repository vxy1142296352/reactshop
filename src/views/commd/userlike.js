import React, { Component } from 'react';
import apis from '../api/api'
class userlike extends Component {
	constructor(props){
		super(props)
		this.state={
			ulike:[],
		}
	}
	getlist(){
		var that=this
		if(that.state.islaod){
			apis("shop/goods/list",{params:{page:1,pageSize:4}},"GET",function(res){
				if(res.data.code===0){
					that.setState({
						ulike:res.data.data
					})
				}
			})
		}
	}
  render() {
		var that=this
    return (
      <div className={this.props.className.likeBox}>
			<div className={this.props.className.likeTitlke}>猜你喜欢</div>
			<ul className={this.props.className.indexProduct}>
			{
				this.state.ulike.map(function(item,index){
					return (
						<li key={index+.02}>
						<a href={"/#/details/"+item.id}>
							<img src={item.pic} alt={item.characteristic} />
							<h3>{item.name}</h3>
							<span className={that.props.className.price}>¥{item.minPrice}
								<del>¥{item.originalPrice}</del>
							</span>
						</a>
					</li>
					)
				})
			}
			</ul>
		</div>
    );
  }
}
export default userlike;