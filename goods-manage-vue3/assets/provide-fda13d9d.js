import{E as e}from"./index-5a188929.js";const s=t=>e({url:"/business/outStock/findOutStockList",method:"get",params:t}),u=t=>e({url:"/business/outStock/delete/"+t,method:"get"}),r=t=>e({url:"/business/outStock/remove/"+t,method:"put"}),n=t=>e({url:"/business/outStock/back/"+t,method:"put"}),c=t=>e({url:"/business/outStock/publish/"+t,method:"put"}),l=t=>e({url:"/business/outStock/addOutStock",method:"post",data:t}),i=()=>e({url:"/business/consumer/findAll",method:"get"}),d=(t,o)=>e({url:"/business/outStock/detail/"+t,method:"get",params:{pageNum:o}}),a={getList:s,deleteItem:u,backItem:n,removeItem:r,passItem:c,findAll:i,getProvideStocksDetail:d};export{l as a,i as f,a as p};
