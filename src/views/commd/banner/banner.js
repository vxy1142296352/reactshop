import React, { Component } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
require('swiper/dist/css/swiper.min.css');
class index_Main extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    componentDidMount(){
        this._isMounted =true
        this.bannerswiper()
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    bannerswiper(){ //轮播器
        new Swiper(this.swiperID, {
            loop: true,
            autoplay: { //自动播放，注意：直接给autoplay:true的话，在点击之后不能再自动播放了
                delay: 5000,
                disableOnInteraction: false, //户操作swiper之后，是否禁止autoplay。默认为true：停止。
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true, // 允许点击跳转
            },
            autoHeight:true,
            observer: true
        });
    }
    shouldComponentUpdate(nextProps){
      if(this.ArrayIsEqual(this.props.banner,nextProps.banner)){
          return false
      }
      else{
          return true
      }
    }
    ArrayIsEqual(arr1,arr2){//判断2个数组是否相等
        if(arr1===arr2){//如果2个数组对应的指针相同，那么肯定相等，同时也对比一下类型
            return true;
        }else{
            if(arr1.length!==arr2.length){
                return false;
            }else{//长度相同
                for(let i in arr1){//循环遍历对比每个位置的元素
                    if(arr1[i]!==arr2[i]){//只要出现一次不相等，那么2个数组就不相等
                        return false;
                    }
                }//for循环完成，没有出现不相等的情况，那么2个数组相等
                return true;
            }
        }
    }
  render() {
    var that=this
    return (
        <div className={this.props.indexless.banner} id={this.props.indexless.banner}>
                <div className="swiper-container indexbanner-wrapper"  ref={self => this.swiperID = self}>
                   <div className="swiper-wrapper">
                    {this.props.banner.map(function(item,i){
                        return (
                            <div key={i} className="swiper-slide">
                            {that.props.cate==="index"?<a href={"#/details/"+item.businessId}> <img src={item.picUrl} alt="" /></a>:<img src={item.pic} alt="" />}
                            </div>
                            )
                        })}
                    </div>
            <div className='swiper-pagination'></div>
        </div>
    </div>
    );
  }
}
export default index_Main;
