import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import edite from './less/userevote.less';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
// import Apis from './api/api'
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
          
        }
    }
    componentDidMount(){
        this.ismount=true
        this.getOrder()
    }
    getOrder(){
       
    }
    goback() {
        window.history.go(-1);
    }
    componentWillUnmount(){
        this.ismount=false
    }
    render() {
        return (
            <div className="evoteApp reactApp">
                <header className={edite.carheader}>
                    <a href="javascrit:" className={edite.carback} onClick={() => this.goback()}>
                    </a>
                    我的评价
                </header>
                <div className={edite.container}>
                    <div className={edite.evotetab}>
                        <a href="javascrit:" className={edite.active}>全部评价</a>
                        <a href="javascrit:">有图评价</a>
                    </div>
                    <div className={edite.Noshop}>
                        <div className={edite.Empty + " " + edite.img3}></div>
                        <p>暂无评价</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(App);
// <div className={edite.evoteContent}>                         <ul>
//                 <li>                                 <div
// className={edite.userEvotebox}>                                     <span
// className={edite.etime}>时间:2018-02-04</span>
//    <span className={edite.echose}>规格:256gx1</span>
//      </div>                                 <div
// className={edite.evoteGooslist}>                                     <ul>
//                                     <li>
//        <a href="/">                                                 <div
// className={edite.evpteGppdsImg}>
//        <img
// src="https://img.alicdn.com/imgextra/i1/880734502/TB2KTruuZyYBuNkSnfoXXcWgVXa
// _ !!880734502.jpg_430x430q90.jpg"
//             alt=""/>                                                 </div>
//                                               <div
// className={edite.evoteGoosBox}>
//       <h2>三只松鼠猪肉铺</h2>
// <span>￥19.99</span>                                                 </div>
//                                          </a>
//         </li>                                     </ul>
//           </div>                                 <div
// className={edite.userContent}>
// <p>猪肉铺口味挺不错的,下次还会光顾</p>                                     <div
// className={edite.userconetnimg}>                                         <div
// className={edite.itembox}>                                             <img
//
// src="https://img.alicdn.com/imgextra/i1/880734502/TB2KTruuZyYBuNkSnfoXXcWgVXa
// _ !!880734502.jpg_430x430q90.jpg"
//     alt=""/>                                         </div>
//                       <div className={edite.itembox}>
//                     <img
// src="https://img.alicdn.com/imgextra/i1/880734502/TB2KTruuZyYBuNkSnfoXXcWgVXa
// _ !!880734502.jpg_430x430q90.jpg"
//     alt=""/>                                         </div>
//                   </div>                                 </div>
//               </li>                         </ul>                     </div>