(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{253:function(t,e,a){"use strict";a.r(e);var i=a(16),s=a(17),n=a(20),c=a(18),d=a(19),r=a(0),l=a.n(r),o=a(75),h=a(135),u=a.n(h),m=a(70),p=a.n(m),v=a(54),g=a(68),S=a(63);a.n(S)()();var y=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(n.a)(this,Object(c.a)(e).call(this,t))).state={linkMan:"\u8f93\u5165\u6536\u8d27\u4eba\u59d3\u540d",mobile:"\u8f93\u5165\u6536\u8d27\u4eba\u624b\u673a\u53f7\u7801",provinceStr:"\u8bf7\u9009\u62e9",cityStr:"\u8bf7\u9009\u62e9",areaStr:"\u8bf7\u9009\u62e9",code:"\u8f93\u5165\u90ae\u653f\u7f16\u7801",address:"\u8f93\u5165\u8be6\u7ec6\u5730\u5740",provinceId:0,cityId:0,districtId:0,change:!1,list:[],province:[],addedite:null,id:null,isDefault:!0},a}return Object(d.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){if(this._ismounted=!0,this.props.match.params.name){var t=this.props.match.params.name;this.setState({addedite:t}),window.location.href.split("?id=")[1]&&this.getadddetails()}else v.a.error("\u8bf7\u6c42\u9519\u8bef"),this.props.history.replace("/404")}},{key:"componentWillMount",value:function(){this._ismounted=!1}},{key:"getadddetails",value:function(){var t=this;Object(g.a)("user/shipping-address/detail",{id:window.location.href.split("?id=")[1]},"POST",function(e){t._ismounted&&0===e.data.code&&t.setState({linkMan:e.data.data.linkMan,mobile:e.data.data.mobile,provinceStr:e.data.data.provinceStr,cityStr:e.data.data.cityStr,areaStr:e.data.data.areaStr,code:e.data.data.code,address:e.data.data.address,provinceId:e.data.data.provinceId,cityId:e.data.data.cityId,districtId:e.data.data.districtId,id:window.location.href.split("?id=")[1],isDefault:e.data.data.isDefault})},t)}},{key:"changeprovinve",value:function(){var t=this;0===this.state.province.length?this.api("province",{params:{}},"GET",function(e){0===e.data.code&&t.setState({change:!0,list:e.data.data,province:e.data.data})}):t.setState({change:!0,list:this.state.province})}},{key:"closechange",value:function(){this.setState({change:!1})}},{key:"api",value:function(t,e,a,i){"GET"===a&&p.a.get("/add/"+t,e,{timeout:1e4}).then(function(t){i(t)}).catch(function(t){v.a.error("\u7f51\u7edc\u9519\u8bef",1500)})}},{key:"chosename",value:function(t){var e=this,a=t.currentTarget.getAttribute("data-id"),i=t.currentTarget.getAttribute("data-name"),s=t.currentTarget.getAttribute("data-destr");"\u7701\u4efd"===s?(this.setState({provinceStr:i,provinceId:a,cityStr:"\u8bf7\u9009\u62e9",cityId:0,areaStr:"\u8bf7\u9009\u62e9",districtId:0}),this.getchild(a)):"\u57ce\u5e02"===s?(this.setState({cityStr:i,cityId:a,areaStr:"\u8bf7\u9009\u62e9",districtId:0}),this.getchild(a)):"\u533a\u53bf"===s&&(this.setState({areaStr:i,districtId:a}),setTimeout(function(){e.setState({change:!1})},500))}},{key:"changecity",value:function(t){this.setState({change:!0}),this.getchild(t.currentTarget.getAttribute("date-proid"))}},{key:"changeada",value:function(t){this.setState({change:!0}),this.getchild(t.currentTarget.getAttribute("data-disid"))}},{key:"getchild",value:function(t){var e=this;this.api("child",{params:{pid:t}},"GET",function(t){0===t.data.code?e.setState({list:t.data.data}):e.setState({list:[]})})}},{key:"goback",value:function(){localStorage.getItem("addressurl")?this.props.history.replace(localStorage.getItem("addressurl")):this.props.history.goBack()}},{key:"qxsave",value:function(){localStorage.getItem("addressurl")?this.props.history.replace(localStorage.getItem("addressurl")):this.props.history.goBack()}},{key:"changeName",value:function(t){this.setState({linkMan:t.target.value})}},{key:"changeTel",value:function(t){this.setState({mobile:t.target.value})}},{key:"changeCode",value:function(t){this.setState({code:t.target.value})}},{key:"addresTree",value:function(t){this.setState({address:t.target.value})}},{key:"saveAddress",value:function(){var t=this,e={linkMan:this.state.linkMan,mobile:this.state.mobile,provinceStr:this.state.provinceStr,cityStr:this.state.cityStr,areaStr:this.state.areaStr,code:this.state.code,address:this.state.address,provinceId:this.state.provinceId,cityId:this.state.cityId,districtId:this.state.districtId};"update"===this.state.addedite&&(e={id:this.state.id,linkMan:this.state.linkMan,mobile:this.state.mobile,provinceStr:this.state.provinceStr,cityStr:this.state.cityStr,areaStr:this.state.areaStr,code:this.state.code,address:this.state.address,provinceId:this.state.provinceId,cityId:this.state.cityId,districtId:this.state.districtId}),Object(g.a)("user/shipping-address/"+t.state.addedite,e,"POST",function(a){0===a.data.code?(v.a.success("\u4fdd\u5b58\u6210\u529f"),setTimeout(function(){localStorage.getItem("addressurl")?(e.id=a.data.data.id,localStorage.setItem("address",JSON.stringify(e)),t.props.history.replace(localStorage.getItem("addressurl"))):window.history.go(-1)},1501)):v.a.error(a.data.code,1500)})}},{key:"editeDefault",value:function(){this.setState({isDefault:!this.state.isDefault})}},{key:"render",value:function(){var t=this,e=this;return l.a.createElement("div",{className:"addApp"},l.a.createElement("header",{className:u.a.carheader},l.a.createElement("a",{href:"javascrit:",className:u.a.carback,onClick:function(){return t.goback()}}),"\u6dfb\u52a0\u6536\u8d27\u5730\u5740"),l.a.createElement("div",{className:u.a.container+" reactApp"},l.a.createElement("div",{className:u.a.additem},l.a.createElement("span",null,"\u6536\u8d27\u59d3\u540d:"),l.a.createElement("input",{type:"text",onChange:this.changeName.bind(this),placeholder:this.state.linkMan})),l.a.createElement("div",{className:u.a.additem},l.a.createElement("span",null,"\u624b\u673a\u53f7\u7801:"),l.a.createElement("input",{type:"text",onChange:this.changeTel.bind(this),placeholder:this.state.mobile})),l.a.createElement("div",{className:u.a.additem},l.a.createElement("span",null,"\u9009\u62e9\u5730\u533a:"),l.a.createElement("div",{className:u.a.additemstree},l.a.createElement("em",{onClick:this.changeprovinve.bind(this)},this.state.provinceStr),"\u8bf7\u9009\u62e9"!==this.state.provinceStr?l.a.createElement("em",{"date-proid":this.state.provinceId,onClick:this.changecity.bind(this)},this.state.cityStr):null,"\u8bf7\u9009\u62e9"!==this.state.provinceStr&&"\u8bf7\u9009\u62e9"!==this.state.cityStr?l.a.createElement("em",{"data-disid":this.state.cityId,onClick:this.changeada.bind(this)},this.state.areaStr):null)),l.a.createElement("div",{className:u.a.additem},l.a.createElement("span",null,"\u90ae\u653f\u7f16\u7801:"),l.a.createElement("input",{type:"text",onChange:this.changeCode.bind(this),placeholder:this.state.code})),l.a.createElement("div",{className:u.a.additem},l.a.createElement("span",null,"\u9ed8\u8ba4\u5730\u5740:"),l.a.createElement("div",{onClick:this.editeDefault.bind(this),className:[u.a.addisdefault]+" "+[this.state.isDefault?u.a.ondefault:u.a.offdefault]})),l.a.createElement("div",{className:u.a.addressstree},l.a.createElement("textarea",{name:"",id:"",cols:"30",rows:"10",onChange:this.addresTree.bind(this),placeholder:this.state.address})),l.a.createElement("div",{className:u.a.addressstree},l.a.createElement("button",{className:u.a.saveadd+" "+u.a.savemore,onClick:this.saveAddress.bind(this)},"\u4fdd\u5b58"),l.a.createElement("button",{className:u.a.saveadd,onClick:this.qxsave.bind(this)},"\u53d6\u6d88"))),this.state.change?l.a.createElement("div",null,l.a.createElement("div",{className:u.a.back,style:{display:"block"}}),l.a.createElement("div",{className:u.a.choseAddBox,style:{display:"block"}},l.a.createElement("div",{className:u.a.choseAddtop},l.a.createElement("span",null,"\u9009\u62e9\u533a\u57df"),l.a.createElement("div",{className:u.a.choseclo+" "+u.a.fr,onClick:this.closechange.bind(this)})),l.a.createElement("div",{className:u.a.choseAddtab},l.a.createElement("ul",null,l.a.createElement("li",{className:"\u8bf7\u9009\u62e9"===this.state.provinceStr?u.a.active:" ","data-cityid":this.state.cityId,onClick:this.changeprovinve.bind(this)},this.state.provinceStr),"\u8bf7\u9009\u62e9"!==this.state.provinceStr?l.a.createElement("li",{className:"\u8bf7\u9009\u62e9"===this.state.cityStr?u.a.active:" ","date-proid":this.state.provinceId,onClick:this.changecity.bind(this)},this.state.cityStr):null,"\u8bf7\u9009\u62e9"!==this.state.provinceStr&&"\u8bf7\u9009\u62e9"!==this.state.cityStr?l.a.createElement("li",{className:"\u8bf7\u9009\u62e9"===this.state.areaStr?u.a.active:" ","data-disid":this.state.cityId,onClick:this.changeada.bind(this)},this.state.areaStr):null)),l.a.createElement("ul",{className:u.a.choseCityBox},this.state.list.map(function(t,a){return l.a.createElement("li",{key:a,"data-destr":t.depthStr,"data-name":t.name,"data-id":t.id,onClick:e.chosename.bind(e)},t.name)}),this.state.list.length<=0?l.a.createElement("div",{className:u.a.Noshop},l.a.createElement("div",{className:u.a.Empty+" "+u.a.img3}),l.a.createElement("p",null,"\u65e0\u533a\u53bf\u6570\u636e,\u91cd\u65b0\u9009\u62e9\u57ce\u5e02")):null))):null)}}]),e}(r.Component);e.default=Object(o.a)(y)}}]);