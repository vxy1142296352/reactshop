import React, {Component} from 'react';
import car from './less/car.less';
import Footer from './commd/footer';
// import UserLike from './commd/userlike';
// <UserLike car={this.state.car} className={car}/>
import Modal from './commd/modal';
import Total from './commd/toast';
import Token from './redux/token/reducers/index';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
const confirm =Modal
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            car: [],
            checkall: true,
            checkallname: "反选",
            checknumber: 0,
            allnumber: 0,
            edite: true,
            token:Token.getState().token.token,
            editename: "编辑",
            checkbox: []
        }
    }
    componentDidMount() { //获取默认选中商品价格数量
        this.carlist()
    }
    carlist() {
        var that = this
        if (localStorage.getItem("carlist") && JSON.parse(localStorage.getItem("carlist")).length > 0) {
            this.setState({
                car: JSON.parse(localStorage.getItem("carlist"))
            })
            setTimeout(function () {
                that.getallprice()
            }, 0)
        }
    }
    getallprice() { //获取选中商品价格数量
        var that = this,
            checknum = 0, //选中数量
            allprice = 0, //总价格
            checkcar = [], //选中的商品
            allnum = 0, //总数量
            carlist = that.state.car;
        for (var i = 0; i < carlist.length; i++) {
            allnum += Number(carlist[i].number)
            if (carlist[i].active === true) {
                checkcar.push(carlist[i])
                checknum += Number(carlist[i].number)
                allprice += Number(carlist[i].price * carlist[i].number)
                carlist[0].allprice = allprice.toFixed(2)
            }
        }
        if (checkcar.length === carlist.length) {
            that.setState({checkall: true, checkallname: "反选"})
        } else {
            that.setState({checkall: false, checkallname: "全选"})
        }
        that.setState({
            checknumber: checknum,
            allprice: allprice.toFixed(2),
            allnumber: allnum,
            checkbox: checkcar
        })
        localStorage.setItem("carlist", JSON.stringify(this.state.car))
    }
    check(e) { //单独选择
        var checklist = this.state.car,
            index = e
                .currentTarget
                .getAttribute('data-index');
        checklist[index].active === true
            ? checklist[index].active = false
            : checklist[index].active = true;
        this.setState({car: checklist})
        this.getallprice()
    }
    allchose() { //全选反选
        var list = this.state.car
        for (var i = 0; i < list.length; i++) {
            if (this.state.checkall === true) {
                list[i].active = false
                this.setState({checkall: false, car: list, checkallname: "全选"})
            } else {
                list[i].active = true
                this.setState({checkall: true, car: list, checkallname: "反选"})
            }
        }
        this.getallprice()
    }
    addnumber(e) { //数量加
        var numlist = this.state.car,
            index =e.currentTarget.getAttribute('data-index');
		numlist[Number(index)].number++
		if (numlist[Number(index)].number > numlist[Number(index)].maxnumber) {
            Total.error("超过最大购买数量", 1500)
            numlist[Number(index)].number = numlist[Number(index)].maxnumber
        } else {}
        this.setState({car: numlist})
        this.getallprice()
    }
    reducenumber(e) { //数量减
        var numlist = this.state.car,
            index = e.currentTarget.getAttribute('data-index');
		numlist[Number(index)].number--
		if (numlist[Number(index)].number < 1) {
            Total.error("数量不能小于1", 1500)
            numlist[Number(index)].number = 1
        } else {}
        this.setState({car: numlist})
        this.getallprice()
    }
    editecar() { //编辑
        var that = this
        if (that.state.edite === true) {
            that.setState({edite: false, editename: "完成"})
        } else {
            that.setState({edite: true, editename: "编辑"})
        }
    }
    delete() { //点击删除
        var that = this
        confirm.confirm({
            contentText: '确定要删除商品吗？',
            onOk() {
                that.deleGoods()
            },
            onCancel() {}
        })
    }
    deleGoods() {
        var that = this
        var arr =this.state.car.filter(function (item) {
                return item.active === false
            });
        that.setState({
            comfirm: {
                show: false,
                citle: ""
            },
            car: arr
        })
        Total.success("删除成功", 1500)
        localStorage.setItem("carlist", JSON.stringify(arr))
        if (arr.length === 0) {
            localStorage.removeItem("carlist")
        }
    }
    goback() {
        this.props.history.goBack()
    }
    goPay() {
        var that = this
        if(that.state.token===undefined||that.state.token===null){
            Total.warning("请先登录",1500)
            setTimeout(function(){
                that.props.history.push("/login?Redirect="+that.props.location.pathname)
            },1501)
        }
        else{
        localStorage.setItem("goodsInfo",JSON.stringify(this.state.car))
        setTimeout(function () {
            that.props.history.push("/paychose")
        },500)
        }
    }
    render() {
        var that = this
        return (
            <div className="carApp  ">
                <header className={car.carheader}>
					<a href="javascrit:" className={car.carback} onClick={() => this.goback()}>
					</a>
                    购物车 {this.state.car.length > 0
                        ? <span
                                className={car.caredite}
                                onClick={this
                                .editecar
                                .bind(this)}>{this.state.editename}</span>
                        : null}
                </header>
                <div className={car.container+" reactApp"}>
                    <div className={car.carlist}>
                        <ul>
                            {this.state.car.map(function (item, i) {
                                    return (
                                        <li
                                            key={i}
                                            data-index={i}
                                            data-goodsid={item.goodsId}
                                            data-choseid={item.propertyChildIds}>
                                            <div className={car.carcheck}>
                                                <div
                                                    data-index={i}
                                                    className={[car.check + " " + car.img2] + " " + [item.active
                                                        ? car.ck
                                                        : " "]}
                                                    onClick={that
                                                    .check
                                                    .bind(that)}></div>
                                            </div>
                                            <div className={car.carimg}>
                                                <a href={'#/details/' + item.goodsId}>
                                                    <img src={item.pic} alt=""/>
                                                </a>
                                            </div>
                                            <div className={car.carname}>
                                                <a href={'#/details/' + item.goodsId}>
                                                    <h2>{item.goodsname}</h2>
                                                    <span>规格:{item.checkname}
                                                        <em>x{item.number}</em>
                                                    </span>
                                                </a>
                                                <span className={car.carprice}>¥{item.price}</span>
                                                <div className={car.carnumer}>
                                                    <a
                                                        href="javascrit:"
                                                        data-index={i}
                                                        onClick={that
                                                        .reducenumber
                                                        .bind(that)}>-</a>
                                                    <input type="text" placeholder={item.number} disabled></input>
                                                    <a
                                                        href="javascrit:"
                                                        data-index={i}
                                                        onClick={that
                                                        .addnumber
                                                        .bind(that)}>+</a>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                    {this.state.car.length <= 0
                        ? <div className={car.Noshop}>
                                <div className={car.Empty + " " + car.img3}></div>
                                <p>您的购物车是空的</p></div>
                        : null}
                </div>
                {this.state.car.length > 0
                    ? <div className={car.payfooter}>
                            <div className={car.carcheck}>
                                <div
                                    className={[car.check + " " + car.img2] + " " + [this.state.checkall
                                        ? car.ck
                                        : " "]}
                                    onClick={this
                                    .allchose
                                    .bind(this)}></div>
                            </div>
                            <div className={car.carall}>
                                {this.state.checkallname}
                            </div>
                            <div className={car.carpayright}>
                                {this.state.edite
                                    ? <div className={car.carPaydele}>
                                            <a href="javascrit:">已选
                                                <span className={car.cknumber}>{this.state.checknumber}</span>件共
                                                <span className={car.allnumber}>{this.state.allnumber}</span>件</a>
                                            <a
                                                href="javascrit:"
                                                className={car.goPay}
                                                onClick={this
                                                .goPay
                                                .bind(this)}>去结算
                                                <em>¥ {this.state.allprice}</em>
                                            </a>
                                        </div>
                                    : <div className={car.carPaydele}>
                                        <a href="javascrit:" className={car.cardelete} onClick={this.delete.bind(this)}>删除</a>
                                    </div>}
                            </div>
                        </div>
                    : null}
                <Footer className={car}/>
            </div>
        );
    }
}
export default App;
