import{a as b,b as y,s as m,c as u,d as F,F as l}from"./q-9bb98aa7.js";import{A as h}from"./q-650288c1.js";import"./q-7440b369.js";const A=async(c,f)=>{const[t,p,s,d,a,o,g]=h();d||(s.response={}),s.submitCount++,s.submitted=!0,s.submitting=!0;try{if(await b(s,o)){const e=y(s,o),[r]=await Promise.all([g||t==null?void 0:t.submit(p?new FormData(f):e),a==null?void 0:a(e,c)]);if(r!=null&&r.value){const{errors:n,response:i}=r.value;m(s,n,{...o,shouldFocus:!1}),Object.keys(i).length?u(s,i,o):F(s,n,o)}}}catch(e){e instanceof l&&m(s,e.errors,{...o,shouldFocus:!1}),(!(e instanceof l)||e.message)&&u(s,{status:"error",message:(e==null?void 0:e.message)||"An unknown error has occurred."},o)}finally{s.submitting=!1}};export{A as s_qmKnyqz75p4};
