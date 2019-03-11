import React, { Component } from 'react';
class evote_star extends Component {
    constructor(props) {
        super(props)
        this.state={
            star:[
                {
                    active:true,
                    score:1
                },
                {
                    active:false,
                    score:2
                },
                {
                    active:false,
                    score:3
                },
                {
                    active:false,
                    score:4
                },
                {
                    active:false,
                    score:5
                }
            ],
            score:1,
        }
    }
    componentWillMount(){

    }
    Hanchange(e){
        var evotestar=this.state.star
        for(var i=0;i<evotestar.length;i++){
                evotestar[i].active=false
                if(i<=Number(e.currentTarget.getAttribute("data-index"))){
                    evotestar[i].active=true
                 }
        }
        this.setState({
            star:evotestar,
            score:Number(e.currentTarget.getAttribute("data-index"))+1
        })
        var index=Number(e.currentTarget.getAttribute("goodsindex"))
        var desc=e.currentTarget.getAttribute("desc")
        switch(desc){
            default:
            break;
            case "desc":
            this.props.gooddesc(index,Number(e.currentTarget.getAttribute("data-index"))+1);
            break;
            case "serve":
            this.props.goodserve(index,Number(e.currentTarget.getAttribute("data-index"))+1)
            break;
            case "speed":
            this.props.goodspeed(index,Number(e.currentTarget.getAttribute("data-index"))+1)
            break;
        }
  }
  render(){
    var that=this
    return (
        <div className={this.props.evote.starBox} data-score={this.state.score}>
            {
                this.state.star.map(function(item,index){
                    return (
                    <i desc={that.props.desc} goodsindex={that.props.index} goods={that.props.goodsdesc} key={index+.03} data-index={index} className={item.active?that.props.evote.active:""} onClick={that.Hanchange.bind(that)}>
                    </i>
                    )
                })
            }
            <span>{this.state.score}分</span>
        </div>
    );
  }
}
export default evote_star;
