import{f as y,K as f,u as t,o as n,e as r,c as h,w as u,k as m,j as _,t as i,s as p,S as k,m as w,x as g,U as C,b as N}from"./entry.66bd74e3.js";/* empty css                         */const B={key:0,class:"docs-prev-next"},D={class:"wrapper"},V={key:0,class:"directory"},b={class:"title"},j={key:1},F={class:"wrapper"},I={key:0,class:"directory"},P={class:"title"},S=y({__name:"DocsPrevNext",setup(E){const{prev:e,next:s,navigation:x}=f(),{navDirFromPath:v}=C(),a=l=>{const c=v(l._path,x.value||[]);if(c&&c[0])return c[0]._path;{const o=l.split("/");return(o.length>1?o[o.length-2]:"").split("-").map(k).join(" ")}};return(l,c)=>{const o=w,d=g;return t(e)||t(s)?(n(),r("div",B,[t(e)?(n(),h(d,{key:0,to:t(e)._path,class:"prev"},{default:u(()=>[m(o,{name:"heroicons-outline:arrow-sm-left",class:"icon"}),_("div",D,[a(t(e)._path)?(n(),r("span",V,i(a(t(e)._path)),1)):p("",!0),_("span",b,i(t(e).title),1)])]),_:1},8,["to"])):(n(),r("span",j)),t(s)?(n(),h(d,{key:2,to:t(s)._path,class:"next"},{default:u(()=>[_("div",F,[a(t(s)._path)?(n(),r("span",I,i(a(t(s)._path)),1)):p("",!0),_("span",P,i(t(s).title),1)]),m(o,{name:"heroicons-outline:arrow-sm-right",class:"icon"})]),_:1},8,["to"])):p("",!0)])):p("",!0)}}}),L=N(S,[["__scopeId","data-v-ab0a6253"]]);export{L as default};