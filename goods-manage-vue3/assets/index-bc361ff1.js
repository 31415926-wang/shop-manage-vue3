import{d as C}from"./index-70a945a4.js";import{i as g}from"./initCrud-08564742.js";import{a as k}from"./validate-dc4b6a83.js";import{d as U,r as p,b as c,f,m as d,u as _,v as t,e as F,l,z as T,t as x}from"./index-f29751aa.js";const R=U({__name:"index",setup(y){let u=p(),m=p(),n=p(),h=c([{prop:"phone",label:"办公电话"},{prop:"name",label:"部门名",searchType:"input"},{prop:"total",label:"人数",rebuild:!0,width:150},{prop:"createTime",label:"创建时间",sortable:!0,searchType:"date"},{prop:"modifiedTime",label:"修改时间"},{prop:"address",label:"办公地址"}]);g(n,{title:"部门",apiMethod:C},h);const s=c({name:[{required:!0,message:"请输入部门名称",trigger:"blur"}],phone:[{required:!0,message:"请输入办公电话",trigger:"blur"},{validator:k,trigger:"blur"}],address:[{required:!0,message:"请输入办公地址",trigger:"blur"},{min:3,max:10,message:"最小长度3-10",trigger:"blur"}]});return(w,v)=>{const b=t("el-tag"),o=t("el-input"),r=t("el-form-item"),i=t("el-form"),V=t("CrudTable");return F(),f(V,{ref_key:"CrudTableRef",ref:n,needOperate:!0,addCheckForm:_(u),editorCheckForm:_(m)},{totalCol:d(({scope:e})=>[l(b,null,{default:d(()=>{var a;return[T(x((a=e.row)==null?void 0:a.total)+" 人",1)]}),_:2},1024)]),addForm:d(({formInfo:e})=>[l(i,{ref_key:"addCheckForm",ref:u,inline:!1,model:e,"label-width":"80px",rules:s},{default:d(()=>[l(r,{label:"部门名称",prop:"name"},{default:d(()=>[l(o,{modelValue:e.name,"onUpdate:modelValue":a=>e.name=a,placeholder:"请输入部门名称"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),l(r,{label:"办公电话",prop:"phone"},{default:d(()=>[l(o,{modelValue:e.phone,"onUpdate:modelValue":a=>e.phone=a,placeholder:"请输入办公电话"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),l(r,{label:"办公地址",prop:"address"},{default:d(()=>[l(o,{modelValue:e.address,"onUpdate:modelValue":a=>e.address=a,placeholder:"请输入办公地址"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1032,["model","rules"])]),editorForm:d(({formInfo:e})=>[l(i,{ref_key:"editorCheckForm",ref:m,inline:!1,model:e,"label-width":"80px",rules:s},{default:d(()=>[l(r,{label:"部门名称",prop:"name"},{default:d(()=>[l(o,{modelValue:e.name,"onUpdate:modelValue":a=>e.name=a,placeholder:"请输入部门名称"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),l(r,{label:"办公电话",prop:"phone"},{default:d(()=>[l(o,{modelValue:e.phone,"onUpdate:modelValue":a=>e.phone=a,placeholder:"请输入办公电话"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),l(r,{label:"办公地址",prop:"address"},{default:d(()=>[l(o,{modelValue:e.address,"onUpdate:modelValue":a=>e.address=a,placeholder:"请输入办公地址"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1032,["model","rules"])]),_:1},8,["addCheckForm","editorCheckForm"])}}});export{R as default};
