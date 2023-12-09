import{U as st,X as it,V as O,y as lt,c as j,Z as f,t as ct,j as ut,v as M,_ as d,a as dt,A as G,d as _t,e as K,f as mt,g as vt,H as pt}from"./q-650288c1.js";import{j as ft,c as yt,C as ht,d as St,D as Et,R as Ct,e as bt,f as gt,h as qt,i as wt,l as W,k as $,m as Dt,r as Lt,n as tt,o as Q,p as et,q as Rt,s as ot,t as R,v as w,w as At,x as It,y as Pt,z as Tt}from"./q-7440b369.js";const kt=y=>{st(M(()=>d(()=>Promise.resolve().then(()=>z),void 0),"s_RPDJAz33WLA"));const n=ft();if(!(n!=null&&n.params))throw new Error("Missing Qwik City Env Data");const h=it("url");if(!h)throw new Error("Missing Qwik URL Env Data");const E=new URL(h),a=O({url:E,params:n.params,isNavigating:!1,prevUrl:void 0},{deep:!1}),C={},i=lt(O(n.response.loaders,{deep:!1})),_=j({type:"initial",dest:E,forceReload:!1,replaceState:!1,scroll:!0}),m=O(yt),b=O({headings:void 0,menu:void 0}),l=j(),o=n.response.action,g=o?n.response.loaders[o]:void 0,u=j(g?{id:o,data:n.response.formData,output:{result:g,status:n.response.status}}:void 0),D=M(()=>d(()=>Promise.resolve().then(()=>z),void 0),"s_fX0bDjeJa0E",[u,C,_,a]);return f(ht,b),f(St,l),f(Et,m),f(Ct,a),f(bt,D),f(gt,i),f(qt,u),f(wt,_),ct(M(()=>d(()=>Promise.resolve().then(()=>z),void 0),"s_02wMImzEAbk",[u,b,l,m,n,D,i,C,y,_,a])),ut(dt,null,3,"qY_0")};const N=()=>d(()=>import("./q-abde3d2b.js"),["build/q-abde3d2b.js","build/q-650288c1.js"]),Ut=()=>d(()=>import("./q-8f746f2d.js"),["build/q-8f746f2d.js","build/q-650288c1.js","build/q-7440b369.js","build/q-9bb98aa7.js","build/q-b0cf33ca.js"]),J=[["/",[()=>d(()=>import("./q-d44458ea.js"),["build/q-d44458ea.js","build/q-650288c1.js","build/q-7440b369.js","build/q-9bb98aa7.js","build/q-b0cf33ca.js"])]],["Dashboard/EventTable/",[N,()=>d(()=>import("./q-a5303de5.js"),["build/q-a5303de5.js","build/q-650288c1.js","build/q-7440b369.js"])]],["Dashboard/UserTable/",[N,Ut,()=>d(()=>import("./q-b47565bc.js"),["build/q-b47565bc.js","build/q-650288c1.js","build/q-7440b369.js"])]],["Dashboard/",[N,()=>d(()=>import("./q-bd0dd111.js"),["build/q-bd0dd111.js","build/q-650288c1.js"])]]],X=[];const B=!0;const Ot=({track:y})=>{const[n,h,E,a,C,i,_,m,b,l,o]=G();async function g(){var F;const[u,D]=y(()=>[l.value,n.value]),nt=_t(""),A=o.url,v=D?"form":u.type,rt=u.replaceState;let r,L,V=null,I;{r=new URL(u.dest,location),r.pathname.endsWith("/")||(r.pathname+="/");let P=W(J,X,B,r.pathname);I=K();const T=L=await $(r,I,!0,D);if(!T){l.untrackedValue={type:v,dest:r};return}const H=T.href,k=new URL(H,r);Dt(k,r)||(r=k,P=W(J,X,B,r.pathname)),V=await P}if(V){const[P,T,H,k]=V,U=H,at=U[U.length-1];o.prevUrl=A,o.url=r,o.params={...T},l.untrackedValue={type:v,dest:r};const q=Lt(L,o,U,nt);h.headings=at.headings,h.menu=k,E.value=mt(U),a.links=q.links,a.meta=q.meta,a.styles=q.styles,a.scripts=q.scripts,a.title=q.title,a.frontmatter=q.frontmatter;{b.viewTransition!==!1&&(document.__q_view_transition__=!0);let Z;v==="popstate"&&(Z=tt()),u.scroll&&(!u.forceReload||!Q(r,A))&&(v==="link"||v==="popstate")&&(document.__q_scroll_restore__=()=>et(v,r,A,Z));const Y=L==null?void 0:L.loaders,t=window;if(Y&&Object.assign(_,Y),Rt.clear(),!t._qCitySPA){if(t._qCitySPA=!0,history.scrollRestoration="manual",t.addEventListener("popstate",()=>{t._qCityScrollEnabled=!1,clearTimeout(t._qCityScrollDebounce),i(location.href,{type:"popstate"})}),t.removeEventListener("popstate",t._qCityInitPopstate),t._qCityInitPopstate=void 0,!t._qCityHistoryPatch){t._qCityHistoryPatch=!0;const s=history.pushState,p=history.replaceState,S=e=>(e===null||typeof e>"u"?e={}:(e==null?void 0:e.constructor)!==Object&&(e={_data:e}),e._qCityScroll=e._qCityScroll||w(document.documentElement),e);history.pushState=(e,c,x)=>(e=S(e),s.call(history,e,c,x)),history.replaceState=(e,c,x)=>(e=S(e),p.call(history,e,c,x))}document.body.addEventListener("click",s=>{if(s.defaultPrevented)return;const p=s.target.closest("a[href]");if(p&&!p.hasAttribute("preventdefault:click")){const S=p.getAttribute("href"),e=new URL(location.href),c=new URL(S,e);if(ot(c,e)&&Q(c,e)){if(s.preventDefault(),!c.hash&&!c.href.endsWith("#")){c.href!==e.href&&history.pushState(null,"",c),t._qCityScrollEnabled=!1,clearTimeout(t._qCityScrollDebounce),R({...w(document.documentElement),x:0,y:0}),location.reload();return}i(p.getAttribute("href"))}}}),document.body.removeEventListener("click",t._qCityInitAnchors),t._qCityInitAnchors=void 0,window.navigation||(document.addEventListener("visibilitychange",()=>{if(t._qCityScrollEnabled&&document.visibilityState==="hidden"){const s=w(document.documentElement);R(s)}},{passive:!0}),document.removeEventListener("visibilitychange",t._qCityInitVisibility),t._qCityInitVisibility=void 0),t.addEventListener("scroll",()=>{t._qCityScrollEnabled&&(clearTimeout(t._qCityScrollDebounce),t._qCityScrollDebounce=setTimeout(()=>{const s=w(document.documentElement);R(s),t._qCityScrollDebounce=void 0},200))},{passive:!0}),removeEventListener("scroll",t._qCityInitScroll),t._qCityInitScroll=void 0,(F=t._qCityBootstrap)==null||F.remove(),t._qCityBootstrap=void 0,At.resolve()}if(v!=="popstate"){t._qCityScrollEnabled=!1,clearTimeout(t._qCityScrollDebounce);const s=w(document.documentElement);R(s)}It(window,v,A,r,rt),vt(I).then(()=>{var S;Pt(I).setAttribute("q:route",P);const p=w(document.documentElement);R(p),t._qCityScrollEnabled=!0,o.isNavigating=!1,(S=m.r)==null||S.call(m)})}}}g()},Vt=async(y,n)=>{const[h,E,a,C]=G(),{type:i="link",forceReload:_=y===void 0,replaceState:m=!1,scroll:b=!0}=typeof n=="object"?n:{forceReload:n},l=a.value.dest,o=y===void 0?l:Tt(y,C.url);if(!ot(o,l)){location.href=o.href;return}if(!_&&Q(o,l)){i==="link"&&o.href!==location.href&&history.pushState(null,"",o),et(i,o,new URL(location.href),tt()),i==="popstate"&&(window._qCityScrollEnabled=!0);return}return a.value={type:i,dest:o,forceReload:_,replaceState:m,scroll:b},$(o,K()),W(J,X,B,o.pathname),h.value=void 0,C.isNavigating=!0,new Promise(g=>{E.r=g})},Ht=":root{view-transition-name:none}",z=Object.freeze(Object.defineProperty({__proto__:null,_hW:pt,s_02wMImzEAbk:Ot,s_RPDJAz33WLA:Ht,s_TxCFOy819ag:kt,s_fX0bDjeJa0E:Vt},Symbol.toStringTag,{value:"Module"}));export{pt as _hW,Ot as s_02wMImzEAbk,Ht as s_RPDJAz33WLA,kt as s_TxCFOy819ag,Vt as s_fX0bDjeJa0E};
