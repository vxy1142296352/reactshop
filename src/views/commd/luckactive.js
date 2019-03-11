import React, { Component } from 'react';
class footer extends Component {
    constructor(props){
        super(props)
        this.state={
            roulate:0,
            Luckdraw:'开始抽奖',
            luck:true,
            luckbox:true
        }
    }
    componentDidMount(){

    }
    componentWillUnmount(){

    }
    closeluck(){
        var that=this
        that.setState({
            luckbox:false
        })
    }
    routeBox(){
        var that=this
        if(this.state.luck){
            var time=Math.round( Math.random()*3600 +3600)+this.state.roulate
            that.setState({
                roulate:time,
                Luckdraw:'正在抽奖',
                luck:false
            })
            setTimeout(()=>{
                that.setState({
                    Luckdraw:'开始抽奖',
                    luck:true
                })
            },3000)
        }
       else{
         return false
       }
    }
  render() {
    return (
       <div>
        {this.state.luckbox? <div style={{width:"5.3333333333rem",position:'fixed',left:"50%",top:'50%',transform:'translate(-50%,-50%)',zIndex:"999"}}>
        <div style={{height:'.8rem'}} onClick={this.closeluck.bind(this)}>
        <a href='javascrit:' style={{float:"right",width:".53333rem",height:".53333rem"}}>
        <img src={require('../images/41.png')} alt=""/>
        </a>
        </div>
        <div style={{position:'relative'}}>
            <div style={{width:'1.1466667rem',height:'1.14666667rem',background:"#cc112b",textAlign:"center",verticalAlign:'middle',color:"#fff",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",fontSize:".4rem",zIndex:"4",borderRadius:"50%",lineHeight:"1.2",paddingTop:".1rem",boxSizing:"border-box"}}  onClick={this.routeBox.bind(this)}>
                {this.state.Luckdraw}
            </div>
            <img src={require('../images/turntable2.png')} alt="" />
            <img style={{width:"2.5466667rem",zIndex:"3",height:"2.5466667rem",position:"absolute",left:"50%",top:'1.39333333rem',marginLeft:"-1.273333335rem",transition:"all 3s",transform:"rotate("+this.state.roulate+"deg)"}} src={require('../images/pointer.png')} onClick={this.routeBox.bind(this)} alt="" />
        </div></div>:null}
       </div>
    );
  }
}
export default footer;
