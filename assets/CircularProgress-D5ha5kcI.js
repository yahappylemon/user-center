import{Dt as e,Ft as t,It as n,Kt as r,Lt as i,Ot as a,U as o,Wt as s,at as c,ft as l,it as u,kt as d,ot as f,rt as p}from"./index-CXZSlWY2.js";var m=r(s());function h(e){return a(`MuiCircularProgress`,e)}e(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`circle`,`circleDeterminate`,`circleIndeterminate`,`circleDisableShrink`]);var g=i(),_=44,v=t`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,y=t`
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
`,b=typeof v==`string`?null:n`
        animation: ${v} 1.4s linear infinite;
      `,x=typeof y==`string`?null:n`
        animation: ${y} 1.4s ease-in-out infinite;
      `,S=e=>{let{classes:t,variant:n,color:r,disableShrink:i}=e,a={root:[`root`,n,`color${c(r)}`],svg:[`svg`],circle:[`circle`,`circle${c(n)}`,i&&`circleDisableShrink`]};return l(a,h,t)},C=f(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${c(n.color)}`]]}})(u(({theme:e})=>({display:`inline-block`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`transform`)}},{props:{variant:`indeterminate`},style:b||{animation:`${v} 1.4s linear infinite`}},...Object.entries(e.palette).filter(o()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),w=f(`svg`,{name:`MuiCircularProgress`,slot:`Svg`,overridesResolver:(e,t)=>t.svg})({display:`block`}),T=f(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,t[`circle${c(n.variant)}`],n.disableShrink&&t.circleDisableShrink]}})(u(({theme:e})=>({stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:x||{animation:`${y} 1.4s ease-in-out infinite`}}]}))),E=m.forwardRef(function(e,t){let n=p({props:e,name:`MuiCircularProgress`}),{className:r,color:i=`primary`,disableShrink:a=!1,size:o=40,style:s,thickness:c=3.6,value:l=0,variant:u=`indeterminate`,...f}=n,m={...n,color:i,disableShrink:a,size:o,thickness:c,value:l,variant:u},h=S(m),v={},y={},b={};if(u===`determinate`){let e=2*Math.PI*((_-c)/2);v.strokeDasharray=e.toFixed(3),b[`aria-valuenow`]=Math.round(l),v.strokeDashoffset=`${((100-l)/100*e).toFixed(3)}px`,y.transform=`rotate(-90deg)`}return(0,g.jsx)(C,{className:d(h.root,r),style:{width:o,height:o,...y,...s},ownerState:m,ref:t,role:`progressbar`,...b,...f,children:(0,g.jsx)(w,{className:h.svg,ownerState:m,viewBox:`${_/2} ${_/2} ${_} ${_}`,children:(0,g.jsx)(T,{className:h.circle,style:v,ownerState:m,cx:_,cy:_,r:(_-c)/2,fill:`none`,strokeWidth:c})})})});export{E as t};