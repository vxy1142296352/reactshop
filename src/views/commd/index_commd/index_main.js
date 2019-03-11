import React, {Component} from 'react';
class index_Main extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        this._isMounted = true
    }
    componentWillUnmount() { //组件卸载
        this._isMounted = false
    }
    shouldComponentUpdate(nextProps) {
        if (this.ArrayIsEqual(this.props.hotgoods, nextProps.hotgoods) && this.ArrayIsEqual(this.props.newsgoods, nextProps.newsgoods)) {
            return false
        } else {
            return true
        }
    }
    ArrayIsEqual(arr1, arr2) { //判断2个数组是否相等
        if (arr1 === arr2) { //如果2个数组对应的指针相同，那么肯定相等，同时也对比一下类型
            return true;
        } else {
            if (arr1.length !== arr2.length) {
                return false;
            } else { //长度相同
                for (let i in arr1) { //循环遍历对比每个位置的元素
                    if (arr1[i] !== arr2[i]) { //只要出现一次不相等，那么2个数组就不相等
                        return false;
                    }
                } //for循环完成，没有出现不相等的情况，那么2个数组相等
                return true;
            }
        }
    }
    render() {
        return (
            <div>
                <div className={this.props.indexless.indexmain2}>
                    <h2>
                        每日新品
                        <a href="#/list/0">更多</a>
                    </h2>
                    <ul className={this.props.indexless.indexProduct}>
                        {this.props.newsgoods.map(function (item, i) {
                                return (
                                    <li key={item.id}>
                                        <a href={'#/details/' + item.id}>

                                            <img src={item.pic} alt={item.characteristic}/>

                                            <h3>{item.name}</h3>
                                            <span className="price">¥{item.minPrice}
                                                <del>¥{item.originalPrice}</del>
                                            </span>
                                        </a>
                                    </li>
                                )
                            })}
                    </ul>
                </div>
                <div
                    className={this.props.indexless.indexmain2 + " " + this.props.indexless.indexMain3}>
                    <h2>
                        人气商品
                        <a href="#/list/0">更多</a>
                    </h2>
                    <ul className={this.props.indexless.indexProduct}>
                        {this.props.hotgoods.map(function (item, i) {
                                return (
                                    <li key={item.id}>
                                        <a href={'#/details/' + item.id}>
                                            <img src={item.pic} alt={item.characteristic}/>
                                            <h3>{item.name}</h3>
                                            <span className="price">¥{item.minPrice}
                                                <del>¥{item.originalPrice}</del>
                                            </span>
                                        </a>
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            </div>
        );
    }
}
export default index_Main;
