import React, {Component} from 'react';
import moreimg from '../../images/searchback.jpg';
function Evotestar(props) { //评星统计组件
    var score = props.score === 0
        ? 1
        : props.score === 1
            ? 3
            : props.score === 2
                ? 5
                : 0
    var arr = []
    for (let i = 1; i <= score; i++) {
        arr.push(
            <div className={props.class.istar} key={i + "11"}></div>
        )
    }
    for (let i = 1; i <= 5 - score; i++) {
        arr = arr.concat(
            <div className={props.class.istar2} key={i + "22"}></div>
        )
    }
    return arr
}
class evote extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render() {
        var details = this.props.details,
            n = 0,
            allstar = 0;
        for (var i = 0; i < this.props.evote.length; i++) {
            if (this.props.evote[i].goods.goodReputation === 2) {
                this.props.evote[i].goods.star = 5
                n++
            } else if (this.props.evote[i].goods.goodReputation === 1) {
                this.props.evote[i].goods.star = 2
            } else if (this.props.evote[i].goods.goodReputation === 0) {
                this.props.evote[i].goods.star = 1
                n++
            }
            allstar += Number(this.props.evote[i].goods.star)
        }
        allstar = allstar / this.props.evote.length.toFixed(1)
        n = (n / this.props.evote.length).toFixed(2) * 100 + "%"
        return (
            <div>
                <div
                    className={details.detailEvoConetn}
                    style={{
                    background: '#fff'
                }}>
                    <div className={details.evoreContent}>
                        <a
                            href={this.props.page === "details"
                            ? "/#/allevote/" + this.props.goodsID
                            : "javascrit:"}
                            className={details.allevotenumber}>
                            <div className={details.allnumber}>评价(<span style={{
                color: "#ff6700"
            }}>{this.props.evote.length > 300
                                        ? 300 + "+"
                                        : this.props.evote.length}</span>)</div>
                            <div className={details.allstart}>好评度
                                <div className={details.score}>{n}</div>
                            </div>
                            <div className={details.allstart}>综合评分
                                <div className={details.score}>{allstar
                                        ? allstar
                                        : null}</div>分</div>
                            <img src={moreimg} className={details.fr + " " + details.choseright} alt=""/>
                        </a>
                        <div className={details.userEvote + " " + details.detailsEvote}>
                            {this
                                .props
                                .evote
                                .map(function (item, index) {
                                    return (
                                        <div className={details.evoteitem} key={index}>
                                            <div className={details.evoteusername}>
                                                <img
                                                    src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1585427228,3710608263&fm=27&gp=0.jpg"
                                                    alt=""/>
                                                <div className={details.username}>{item.user.nick}</div>
                                                <Evotestar score={item.goods.goodReputation} class={details}/>
                                            </div>
                                            <div className={details.userVoteBox}>
                                                {item.goods.goodReputationRemark}
                                            </div>
                                            <div className={details.userEvoteImg}>
                                                <div className={details.vimg}>
                                                    <img src={item.goods.pic} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default evote;
