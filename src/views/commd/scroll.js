import React, { Component } from 'react';
class footer extends Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
    componentDidMount(){
        window.addEventListener('scroll',this.scrollHandler);
    }
    scrollHandler(){
        const t = document.documentElement.scrollTop || document.body.scrollTop;
        const top_view = document.getElementById('top_view');
        if(top_view !== null){
            top_view.style.display = t >= 160 ? 'block' : 'none';
        }
    }
    scrollToTop = () => {
        // window.scrollTo(0, 0);
        var  t = document.documentElement.scrollTop || document.body.scrollTop;
        var tim=setInterval(function(){
            t=t-40
            if(t<=0){
                t=0
                clearInterval(tim)
            }
            else{
               if(t<40){
                   t=0
               }
                window.scrollTo(0,t);
            }
        },1)
    };
  render() {
    return (
        <div className={this.props.details.gotop} style={{display:"none"}} id="top_view" onClick={this.scrollToTop}></div>
    );
  }
}
export default footer;
