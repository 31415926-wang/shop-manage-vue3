import{d as z,q as ee,b as G,r as C,c as J,o as H,$ as Q,N as $,v as n,e as s,f as y,m as l,l as e,u as r,p as le,z as _,P as te,Q as ae,k as g,D as w,F as k,C as oe,t as P,_ as F,S as re,w as ue,g as K}from"./index-d87997da.js";import{g as ne,h as de,f as se,P as ie}from"./shareData-091bd6ed.js";import{u as pe}from"./regionSelect-cc74ac23.js";import{f as ce,a as me}from"./provide-a17b362d.js";import{i as W}from"./info-303b30d4.js";import{i as _e}from"./initCrud-ece9ff1d.js";import"./destination-d7f080d7.js";const fe={key:0},ge={key:1},ve={key:0},be={key:0,class:"tag-box"},ye=z({__name:"baseform",setup(L){let S=ee();const T=G({valueProvince:[{required:!0,message:"请选择省份",trigger:"change"}],valueCity:[{required:!0,message:"请选择城市",trigger:"change"}],valueOrigin:[{required:!0,message:"请选择区县",trigger:"change"}],consumerId:[{required:!0,message:"请选择已知来源",trigger:"change"}],type:[{required:!0,message:"请填写领取类型",trigger:"change"}],priority:[{required:!0,message:"请选择优先级",trigger:"change"}],name:[{required:!0,message:"请填写具体来源",trigger:"blur"}],contact:[{required:!0,message:"请填写联系人",trigger:"blur"}],phone:[{required:!0,message:"请填写电话",trigger:"blur"}],sort:[{required:!0,message:"请填写序号",trigger:"blur"}],remark:[{required:!0,message:"请填写描述",trigger:"blur"}]});let t=C({address:"",province:"",city:"",origin:"",valueProvince:"",valueCity:"",valueOrigin:"",contact:"",name:"",phone:"",remark:"",sort:1,type:ne.government,products:[],priority:de.priority2,consumerId:void 0}),c=C(0),N=J(()=>t.value.products.length),h=C(),v=J(()=>{var u;return(u=h.value)==null?void 0:u.find(a=>a.id==t.value.consumerId)}),d=C(!1),p=C(),{reqSpareOption:V,options1:b,options2:U,options3:A,getName:I}=pe(t,"valueProvince","valueCity","valueOrigin");const B=async()=>{var u;(u=p.value)==null||u.validate().then(()=>{if(t.value.products.length==0){$("info","请选择物资产品");return}if(c.value==0){let{valueCity:a,valueOrigin:f,valueProvince:O}=t.value;t.value.province=I(O),t.value.city=I(a),t.value.origin=I(f),t.value.address=t.value.province+"/"+t.value.city+"/"+t.value.origin,t.value.consumerId=void 0}else{let a=["priority","consumerId","type","consumerId","remark","sort","products"];for(let f in t.value)a.includes(f)||(t.value[f]=void 0)}t.value.products=t.value.products.map((a,f)=>({productId:a.id,productNumber:a.productNumber})),d.value=!0,me(t.value).then(()=>{$("success","物资入库成功"),S.push("/inventory/provide")}).finally(()=>{d.value=!1})}).catch(()=>{})},D=()=>{var u;(u=p.value)==null||u.resetFields(),t.value.address="",t.value.province="",t.value.city="",t.value.origin=""};return H(async()=>{V(),Q.on("listChange",u=>{u.length>0&&u.forEach((a,f)=>{u[f].productNumber=a.productNumber?a.productNumber:1}),t.value.products=JSON.parse(JSON.stringify(u))}),ce().then(u=>{h.value=u.data}).catch(()=>{$("error","获取已知来源失败")})}),(u,a)=>{const f=n("el-radio"),O=n("el-radio-group"),m=n("el-col"),E=n("el-text"),i=n("el-form-item"),q=n("el-option"),R=n("el-select"),M=n("el-row"),x=n("el-input"),X=n("el-input-number"),Y=n("el-tag"),j=n("el-button"),Z=n("el-form");return s(),y(Z,{ref_key:"formRef",ref:p,model:r(t),rules:T,"label-width":"85px"},{default:l(()=>[e(i,{label:"添加方式"},{default:l(()=>[e(m,{lg:12,span:24},{default:l(()=>[e(O,{modelValue:r(c),"onUpdate:modelValue":a[0]||(a[0]=o=>le(c)?c.value=o:c=o)},{default:l(()=>[e(f,{value:0,border:!0},{default:l(()=>[_("新增去向")]),_:1}),e(f,{value:1,border:!0},{default:l(()=>[_("已知去向")]),_:1})]),_:1},8,["modelValue"])]),_:1}),te(e(m,{lg:12,span:24},{default:l(()=>[e(E,{type:"warning"},{default:l(()=>[_(" 注意：新增的去向信息会同步至物资去向")]),_:1})]),_:1},512),[[ae,r(c)==0]])]),_:1}),e(i,{prop:"priority",label:"优先级"},{default:l(()=>[e(O,{modelValue:r(t).priority,"onUpdate:modelValue":a[1]||(a[1]=o=>r(t).priority=o)},{default:l(()=>[(s(!0),g(k,null,w(r(se),o=>(s(),y(f,{label:o.value},{default:l(()=>[_(P(o.label),1)]),_:2},1032,["label"]))),256))]),_:1},8,["modelValue"])]),_:1}),e(i,{prop:"type",label:"领取类型"},{default:l(()=>[e(O,{modelValue:r(t).type,"onUpdate:modelValue":a[2]||(a[2]=o=>r(t).type=o)},{default:l(()=>[(s(!0),g(k,null,w(r(ie),o=>(s(),y(f,{label:o.value},{default:l(()=>[_(P(o.label.replace("领取","")),1)]),_:2},1032,["label"]))),256))]),_:1},8,["modelValue"])]),_:1}),r(c)==0?(s(),g("div",fe,[e(M,{gutter:0},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(i,{prop:"valueProvince",label:"省份"},{default:l(()=>[e(R,{modelValue:r(t).valueProvince,"onUpdate:modelValue":a[3]||(a[3]=o=>r(t).valueProvince=o),placeholder:"请选择省",clearable:""},{default:l(()=>[(s(!0),g(k,null,w(r(b),o=>(s(),y(q,{label:o.name,value:o.value},null,8,["label","value"]))),256))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(m,{lg:8,span:24},{default:l(()=>[e(i,{prop:"valueCity",label:"城市"},{default:l(()=>[e(R,{modelValue:r(t).valueCity,"onUpdate:modelValue":a[4]||(a[4]=o=>r(t).valueCity=o),placeholder:"请选择市",clearable:""},{default:l(()=>[(s(!0),g(k,null,w(r(U),o=>(s(),y(q,{label:o.name,value:o.value},null,8,["label","value"]))),256))]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(m,{lg:8,span:24},{default:l(()=>[e(i,{prop:"valueOrigin",label:"区县"},{default:l(()=>[e(R,{modelValue:r(t).valueOrigin,"onUpdate:modelValue":a[5]||(a[5]=o=>r(t).valueOrigin=o),placeholder:"请选择区县",clearable:""},{default:l(()=>[(s(!0),g(k,null,w(r(A),o=>(s(),y(q,{label:o.name,value:o.value},null,8,["label","value"]))),256))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(i,{prop:"name",label:"具体去向"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(x,{modelValue:r(t).name,"onUpdate:modelValue":a[6]||(a[6]=o=>r(t).name=o),placeholder:"请输入具体去向名称"},null,8,["modelValue"])]),_:1})]),_:1}),e(i,{prop:"contact",label:"联系人"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(x,{modelValue:r(t).contact,"onUpdate:modelValue":a[7]||(a[7]=o=>r(t).contact=o),placeholder:"请输入联系人名称"},null,8,["modelValue"])]),_:1})]),_:1}),e(i,{prop:"phone",label:"电话"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(x,{modelValue:r(t).phone,"onUpdate:modelValue":a[8]||(a[8]=o=>r(t).phone=o),placeholder:"请输入电话"},null,8,["modelValue"])]),_:1})]),_:1})])):(s(),g("div",ge,[e(i,{prop:"consumerId",label:"物资去向"},{default:l(()=>[e(R,{modelValue:r(t).consumerId,"onUpdate:modelValue":a[9]||(a[9]=o=>r(t).consumerId=o),placeholder:"请选择已知去向",clearable:""},{default:l(()=>[(s(!0),g(k,null,w(r(h),o=>(s(),y(q,{label:o.name,value:o.id},null,8,["label","value"]))),256))]),_:1},8,["modelValue"])]),_:1}),r(v)?(s(),g("div",ve,[e(i,{label:"物资地址"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(x,{modelValue:r(v).address,"onUpdate:modelValue":a[10]||(a[10]=o=>r(v).address=o),disabled:""},null,8,["modelValue"])]),_:1})]),_:1}),e(i,{label:"联系方式"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(x,{modelValue:r(v).phone,"onUpdate:modelValue":a[11]||(a[11]=o=>r(v).phone=o),disabled:""},null,8,["modelValue"])]),_:1})]),_:1}),e(i,{label:"联系人员"},{default:l(()=>[e(m,{lg:8,span:24},{default:l(()=>[e(x,{modelValue:r(v).contact,"onUpdate:modelValue":a[12]||(a[12]=o=>r(v).contact=o),disabled:""},null,8,["modelValue"])]),_:1})]),_:1})])):oe("",!0)])),e(M,{gutter:30},{default:l(()=>[e(m,{span:12},{default:l(()=>[e(i,{prop:"sort",label:"排序"},{default:l(()=>[e(X,{modelValue:r(t).sort,"onUpdate:modelValue":a[13]||(a[13]=o=>r(t).sort=o),size:"small",min:1,max:100},null,8,["modelValue"])]),_:1})]),_:1}),e(m,{span:12},{default:l(()=>[e(i,{label:"物资总类"},{default:l(()=>[e(E,{type:"success"},{default:l(()=>[_("已选 "+P(r(N))+" 个",1)]),_:1})]),_:1})]),_:1})]),_:1}),e(i,{label:"物资明细"},{default:l(()=>[r(t).products.length>0?(s(),g("div",be,[(s(!0),g(k,null,w(r(t).products,o=>(s(),y(Y,{type:"warning"},{default:l(()=>[_(P(o.name),1)]),_:2},1024))),256))])):(s(),y(E,{key:1,type:"warning"},{default:l(()=>[_("请在右侧选择物资")]),_:1}))]),_:1}),e(i,{prop:"remark",label:"描述信息"},{default:l(()=>[e(x,{modelValue:r(t).remark,"onUpdate:modelValue":a[14]||(a[14]=o=>r(t).remark=o),type:"textarea",placeholder:"请填写描述信息"},null,8,["modelValue"])]),_:1}),e(i,null,{default:l(()=>[e(j,{type:"primary",loading:r(d),onClick:B},{default:l(()=>[_("立即发放")]),_:1},8,["loading"]),e(j,{onClick:D},{default:l(()=>[_("重置")]),_:1})]),_:1})]),_:1},8,["model","rules"])}}});const he=F(ye,[["__scopeId","data-v-489cf421"]]),Ve={class:"alert-container"},ke=z({__name:"baseTable",setup(L){let S=G([{prop:"name",label:"物资名称",searchType:"input"},{prop:"model",label:"物资规格",rebuild:!0,width:140},{prop:"unit",label:"单位",width:90},{prop:"stock",label:"库存",rebuild:!0,width:90},{prop:"productNumber",label:"入库数量",rebuild:!0,width:160}]);const T=d=>{d.rows.forEach(p=>{p.productNumber=0})};let t=re(W);t.getList=t.findProductStocks;let c=C();_e(c,{title:"物资",apiMethod:t,searchParam:{status:0},pagination:{page:1,size:6}},S,T);let N=C([]),h=C({value:"id",label:"name",expandTrigger:"hover",checkStrictly:!0});const v=(d,p)=>{p.categorys=d.join()};return ue(()=>{var d,p,V,b;return(b=(V=(p=(d=c.value)==null?void 0:d.hookCrudObject)==null?void 0:p.crudInfo)==null?void 0:V.value)==null?void 0:b.selectedItems},(d,p)=>{if(Q.emit("listChange",d),(d==null?void 0:d.length)<(p==null?void 0:p.length)){let V=[];d.forEach(b=>{V.push(b.id)}),p.forEach((b,U)=>{V.includes(b.id)||(p[U].productNumber=0)})}},{deep:!0}),H(async()=>{let d=await W.getCategoryTree();N.value=d.data.rows}),(d,p)=>{const V=n("el-cascader"),b=n("el-form-item"),U=n("el-alert"),A=n("el-text"),I=n("el-tag"),B=n("el-input-number"),D=n("CrudTable");return s(),y(D,{ref_key:"CrudTableRef",ref:c,"default-tool-bt-list":[],dialogWidths:{add:"32%",editor:"32%",detail:"34%"},needIndex:!1,needBatch:!0,hiddenToolSection:!0,rowHeight:"62px",pageSizes:[6,12,18,24]},{"search-custom":l(({scope:u})=>[e(b,{label:"分类查询"},{default:l(()=>[e(V,{modelValue:u.searchParam.categorys,"onUpdate:modelValue":a=>u.searchParam.categorys=a,onChange:a=>{v(a,u.searchParam)},options:r(N),props:r(h),clearable:"",placeholder:"请选择分类查询"},null,8,["modelValue","onUpdate:modelValue","onChange","options","props"])]),_:2},1024)]),batchSlot:l(()=>[K("div",Ve,[e(U,{title:"物资明细：勾选先下方物资后,添加其入库数量",type:"info",closable:!1,"show-icon":"",class:"alert-box"})])]),stockCol:l(({scope:u})=>[e(A,{type:"warning"},{default:l(()=>{var a;return[_(P((a=u.row)==null?void 0:a.stock),1)]}),_:2},1024)]),modelCol:l(({scope:u})=>[e(I,null,{default:l(()=>{var a;return[_(P((a=u.row)==null?void 0:a.model),1)]}),_:2},1024)]),productNumberCol:l(({scope:u})=>[e(B,{modelValue:u.row.productNumber,"onUpdate:modelValue":a=>u.row.productNumber=a,size:"small",min:u.row.productNumber==0?0:1,max:u.row.stock,disabled:u.row.productNumber==0},null,8,["modelValue","onUpdate:modelValue","min","max","disabled"])]),_:1},512)}}});const Ce=F(ke,[["__scopeId","data-v-4802f36d"]]),xe={class:"card-box"},we=z({__name:"index",setup(L){return(S,T)=>{const t=n("DArrowLeft"),c=n("el-icon"),N=n("router-link"),h=n("el-step"),v=n("el-steps"),d=n("el-card");return s(),g(k,null,[e(N,{class:"link",to:"/inventory/provide"},{default:l(()=>[e(c,null,{default:l(()=>[e(t)]),_:1}),_(" 返回发放记录")]),_:1}),K("div",xe,[e(d,{class:"left-card"},{default:l(()=>[e(v,{space:200,active:1,simple:"",class:"steps"},{default:l(()=>[e(h,{title:"填写",icon:"EditPen"}),e(h,{title:"审核",icon:"Postcard"}),e(h,{title:"发放",icon:"Operation"})]),_:1}),e(he)]),_:1}),e(d,{class:"right-card"},{default:l(()=>[e(Ce)]),_:1})])],64)}}});const qe=F(we,[["__scopeId","data-v-0bc56449"]]);export{qe as default};