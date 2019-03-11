import React, {Component} from 'react';
import Star from './vote_star.js'
class evote extends Component {
    constructor(props) {
        super(props)
        this.state ={ 
            evote:[]
        }
    }
    componentWillMount(){
        var arr=[]
        for(var i=0;i<this.props.goodslen;i++){
            var evatrr={}
                evatrr.descscore=1
                evatrr.servescore=1
                evatrr.speedscore=1
                arr.push(evatrr)      
        }
        this.setState({
            evote:arr
        })
        this.allevote(arr)
    }
    gooddesc(index,descscore){
        var arr=this.state.evote
        arr[index].descscore=descscore
        this.allevote(arr)
    }
    goodserve(index,servescore){
        var arr=this.state.evote
        arr[index].servescore=servescore
        this.allevote(arr)
    }
    goodspeed(index,speedscore){
        var arr=this.state.evote
        arr[index].speedscore=speedscore
        this.allevote(arr)
    }
    allevote(arr){
       for(var i=0;i<arr.length;i++){
           var num=0
               num=Math.ceil((arr[i].speedscore+arr[i].servescore+arr[i].descscore)/3)
               num<=2?num=0:num<=3?num=1:num=2
               arr[i].reputation=num
       }
       this.setState({
           evote:arr
       })
       this.props.Onstar(arr)
    }
    render(){
        return (
            <div>
                <div className={this.props.evote.evotestar}>
                    <span>商品描述:</span>
                    <Star desc="desc"  gooddesc={this.gooddesc.bind(this)} index={this.props.goodsindex}  evote={this.props.evote}/>
                </div>
                <div className={this.props.evote.evotestar}>
                    <span>卖家服务:</span>
                    <Star desc="serve" goodserve={this.goodserve.bind(this)} index={this.props.goodsindex}   evote={this.props.evote}/>
                </div>
                <div className={this.props.evote.evotestar}>
                    <span>发货速度:</span>
                    <Star desc="speed" goodspeed={this.goodspeed.bind(this)} index={this.props.goodsindex}   evote={this.props.evote}/>
                </div>
            </div>
        );
    }
}
export default evote;
