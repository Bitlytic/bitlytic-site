import{ad as p,u as S,ae as D,G as I,af as m,l as c,k as R,j as L,q as u,w as O,ag as V,ah as j,A as k,x as H,ai as Y,t as C,n as M,aj as P,ab as $,h as w,c as q,ak as G}from"./CFUODRKv.js";import{a as W,r as A,h}from"./Cxg5Jy9J.js";import{b as z}from"./CPByfMZ3.js";const B=["touchstart","touchmove"];function F(t){return B.includes(t)}function X(t,e){var r=e==null?"":typeof e=="object"?e+"":e;r!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=r,t.nodeValue=r+"")}function J(t,e){return N(t,e)}function Z(t,e){p(),e.intro=e.intro??!1;const r=e.target,_=w,l=u;try{for(var a=S(r);a&&(a.nodeType!==8||a.data!==D);)a=I(a);if(!a)throw m;c(!0),R(a),L();const d=N(t,{...e,anchor:a});if(u===null||u.nodeType!==8||u.data!==O)throw V(),m;return c(!1),d}catch(d){if(d===m)return e.recover===!1&&j(),p(),k(r),c(!1),J(t,e);throw d}finally{c(_),R(l)}}const i=new Map;function N(t,{target:e,anchor:r,props:_={},events:l,context:a,intro:d=!0}){p();var v=new Set,y=o=>{for(var s=0;s<o.length;s++){var n=o[s];if(!v.has(n)){v.add(n);var f=F(n);e.addEventListener(n,h,{passive:f});var T=i.get(n);T===void 0?(document.addEventListener(n,h,{passive:f}),i.set(n,1)):i.set(n,T+1)}}};y(H(W)),A.add(y);var g=void 0,b=Y(()=>{var o=r??e.appendChild(C());return M(()=>{if(a){P({});var s=$;s.c=a}l&&(_.$$events=l),w&&z(o,null),g=t(o,_)||{},w&&(q.nodes_end=u),a&&G()}),()=>{var f;for(var s of v){e.removeEventListener(s,h);var n=i.get(s);--n===0?(document.removeEventListener(s,h),i.delete(s)):i.set(s,n)}A.delete(y),o!==r&&((f=o.parentNode)==null||f.removeChild(o))}});return E.set(g,b),g}let E=new WeakMap;function x(t,e){const r=E.get(t);return r?(E.delete(t),r(e)):Promise.resolve()}export{Z as h,J as m,X as s,x as u};
