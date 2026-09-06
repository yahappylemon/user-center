import{Ft as e,Ht as t,Nt as n,Pt as r,Qt as i,Ut as a,Vt as o,Xt as s,Y as c,dt as l,ft as u,lt as d,ut as f,vt as p}from"./index-D0OXieth.js";var m=i(s());function h(e){return r(`MuiCircularProgress`,e)}n(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`circle`,`circleDeterminate`,`circleIndeterminate`,`circleDisableShrink`]);var g=a(),_=44,v=o`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,y=o`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`,b=typeof v==`string`?null:t`
        animation: ${v} 1.4s linear infinite;
      `,x=typeof y==`string`?null:t`
        animation: ${y} 1.4s ease-in-out infinite;
      `,S=e=>{let{classes:t,variant:n,color:r,disableShrink:i}=e,a={root:[`root`,n,`color${l(r)}`],svg:[`svg`],circle:[`circle`,`circle${l(n)}`,i&&`circleDisableShrink`]};return p(a,h,t)},C=u(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${l(n.color)}`]]}})(f(({theme:e})=>({display:`inline-block`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`transform`)}},{props:{variant:`indeterminate`},style:b||{animation:`${v} 1.4s linear infinite`}},...Object.entries(e.palette).filter(c()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),w=u(`svg`,{name:`MuiCircularProgress`,slot:`Svg`,overridesResolver:(e,t)=>t.svg})({display:`block`}),T=u(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,t[`circle${l(n.variant)}`],n.disableShrink&&t.circleDisableShrink]}})(f(({theme:e})=>({stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:x||{animation:`${y} 1.4s ease-in-out infinite`}}]}))),E=m.forwardRef(function(t,n){let r=d({props:t,name:`MuiCircularProgress`}),{className:i,color:a=`primary`,disableShrink:o=!1,size:s=40,style:c,thickness:l=3.6,value:u=0,variant:f=`indeterminate`,...p}=r,m={...r,color:a,disableShrink:o,size:s,thickness:l,value:u,variant:f},h=S(m),v={},y={},b={};if(f===`determinate`){let e=2*Math.PI*((_-l)/2);v.strokeDasharray=e.toFixed(3),b[`aria-valuenow`]=Math.round(u),v.strokeDashoffset=`${((100-u)/100*e).toFixed(3)}px`,y.transform=`rotate(-90deg)`}return(0,g.jsx)(C,{className:e(h.root,i),style:{width:s,height:s,...y,...c},ownerState:m,ref:n,role:`progressbar`,...b,...p,children:(0,g.jsx)(w,{className:h.svg,ownerState:m,viewBox:`${_/2} ${_/2} ${_} ${_}`,children:(0,g.jsx)(T,{className:h.circle,style:v,ownerState:m,cx:_,cy:_,r:(_-l)/2,fill:`none`,strokeWidth:l})})})});export{E as t};