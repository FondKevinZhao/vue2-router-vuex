(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-070c8cc0"],{"440f":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("h2",[t._v("新闻界面")]),e("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:"要闻",name:"1"}},[e("ul",{staticClass:"list"},t._l(t.yaowenList,(function(a){return e("li",{key:a.docid},[e("img",{attrs:{src:a.imgsrc,alt:""}}),e("div",{staticClass:"info"},[e("div",{staticClass:"title"},[t._v(t._s(a.title))])]),e("div",{staticClass:"news-bottom"},[e("div",{attrs:{clsss:"news-source"}},[t._v("来源："+t._s(a.source))]),e("div",{staticClass:"news-time"},[t._v("时间："+t._s(a.ptime))]),e("div",{staticClass:"news-comment"},[t._v("评论数"+t._s(a.commentCount))])])])})),0),e("MyPagination",{attrs:{pageSize:t.pageSize,total:t.total},on:{getPage:t.getPage}})],1),e("el-tab-pane",{attrs:{label:"国内",name:"2"}},[t._v("配置管理")]),e("el-tab-pane",{attrs:{label:"国际",name:"3"}},[t._v("角色管理")])],1)],1)},i=[],n=a("a01c"),c=a("6d26"),l={data(){return{activeName:"1",yaowenList:[],total:10,pageSize:1}},components:{MyPagination:c["a"]},methods:{handleClick(t,e){},getPage(t){this.$api.getNews(n["b"],t).then(t=>{this.yaowenList=t,document.documentElement.scrollTop=0})}},created(){this.$api.getNews(n["b"],1).then(t=>{this.yaowenList=t}),this.$api.getNews(n["a"],1).then(t=>{})}},o=l,r=(a("7278"),a("2877")),u=Object(r["a"])(o,s,i,!1,null,"4f17a134",null);e["default"]=u.exports},7278:function(t,e,a){"use strict";a("9b88")},"9b88":function(t,e,a){}}]);
//# sourceMappingURL=chunk-070c8cc0.8c314873.js.map