import{d}from"./destination-40551c4f.js";import{r as g,c as u,w as r}from"./index-f29751aa.js";function h(t,o,l,s){const a=g([]),i=u(()=>a.value.filter(e=>!e.parent)),p=u(()=>a.value.filter(e=>t.value[o]==e.parent)),v=u(()=>a.value.filter(e=>t.value[l]==e.parent));return r(()=>t.value[o],(e,n)=>{console.log("选省变化"),t.value[l]="",t.value[s]=""}),r(()=>t.value[l],(e,n)=>{console.log("选市区变化"),t.value[s]=""}),{options1:i,options2:p,options3:v,reqSpareOption:async()=>{let e=await d.getCityList();a.value=e.data},getName:e=>{let n=a.value.find(c=>c.value==e);return n==null?void 0:n.name}}}export{h as u};
