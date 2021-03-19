/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["./bidiEngineTables"],(function(t){"use strict";let r=function(){function r(){this.inputFormat="ILYNN",this.outputFormat="VLNNN",this.sourceToTarget=[],this.targetToSource=[],this.levels=[]}var o=r.prototype;return o.bidiTransform=function(r,n,o){if(this.sourceToTarget=[],this.targetToSource=[],!r)return"";if(function(t,r,e){F=[],p=[];for(let n=0;n<e;n++)t[n]=n,r[n]=n,F[n]=n}(this.sourceToTarget,this.targetToSource,r.length),!this.checkParameters(n,o))return r;n=this.inputFormat,o=this.outputFormat;let i=r;const a=R,u=b(n.charAt(1)),T=b(o.charAt(1)),A=("I"===n.charAt(0)?"L":n.charAt(0))+u,h=("I"===o.charAt(0)?"L":o.charAt(0))+T,S=n.charAt(2)+o.charAt(2);a.defInFormat=A,a.defOutFormat=h,a.defSwap=S;const E=e(r,A,h,S,a);let w=!1;return"R"===o.charAt(1)?w=!0:"C"!==o.charAt(1)&&"D"!==o.charAt(1)||(w="rtl"===this.checkContextual(E)),this.sourceToTarget=F,this.targetToSource=function(t){const r=new Array(t.length);for(let e=0;e<t.length;e++)r[t[e]]=e;return r}(this.sourceToTarget),N=this.targetToSource,i=n.charAt(3)===o.charAt(3)?E:"S"===o.charAt(3)?function(r,e,n){if(0===e.length)return"";void 0===r&&(r=!0);void 0===n&&(n=!0);const o=(e=String(e)).split("");let i=0,a=1,u=o.length;r||(i=o.length-1,a=-1,u=1);const T=function(r,e,n,o,i){let a=0;const u=[];let s=0;for(let T=e;T*n<o;T+=n)if(l(r[T])||_(r[T])){if("ل"===r[T]&&c(r,T+n,n,o)){r[T]=g(r[T+n],0===a?t.LamAlefInialTableFE:t.LamAlefMedialTableFE),T+=n,m(r,T,n,o),i&&(u[s]=T,s++),a=0;continue}const e=r[T];1===a?r[T]=f(r,T+n,n,o)?U(r[T]):L(r[T],t.FinalForm):!0===f(r,T+n,n,o)?r[T]=L(r[T],t.InitialForm):r[T]=L(r[T],t.IsolatedForm),_(e)||(a=1),!0===B(e)&&(a=0)}else a=0;return u}(o,i,a,u,n);let A="";for(let t=0;t<o.length;t++)n&&s(T,T.length,t)>-1?(d(N,t,!r,-1),F.splice(t,1)):A+=o[t];return A}(w,E,!0):function(r,e,n){if(0===r.length)return"";void 0===n&&(n=!0);void 0===e&&(e=!0);r=String(r);let o="";const i=r.split("");for(let a=0;a<r.length;a++){let u=!1;if(i[a]>="ﹰ"&&i[a]<"\ufeff"){const s=r.charCodeAt(a);i[a]>="ﻵ"&&i[a]<="ﻼ"?(e?(a>0&&n&&" "===i[a-1]?o=o.substring(0,o.length-1)+"ل":(o+="ل",u=!0),o+=t.AlefTable[(s-65269)/2]):(o+=t.AlefTable[(s-65269)/2],o+="ل",a+1<r.length&&n&&" "===i[a+1]?a++:u=!0),u&&(d(N,a,!0,1),F.splice(a,0,F[a]))):o+=t.FETo06Table[s-65136]}else o+=i[a]}return o}(E,w,!0),this.sourceToTarget=F,this.targetToSource=N,this.levels=p,i},o._inputFormatSetter=function(t){if(!O.test(t))throw new Error("dojox/string/BidiEngine: the bidi layout string is wrong!");this.inputFormat=t},o._outputFormatSetter=function(t){if(!O.test(t))throw new Error("dojox/string/BidiEngine: the bidi layout string is wrong!");this.outputFormat=t},o.checkParameters=function(t,r){return t?this._inputFormatSetter(t):t=this.inputFormat,r?this._outputFormatSetter(r):r=this.outputFormat,t!==r},o.checkContextual=function(t){let r=n(t);if("ltr"!==r&&"rtl"!==r){try{r=document.dir.toLowerCase()}catch(t){}"ltr"!==r&&"rtl"!==r&&(r="ltr")}return r},o.hasBidiChar=function(t){return C.test(t)},r}();function e(t,r,i,a,s){const l=function(t,r,e){void 0===r.inFormat&&(r.inFormat=e.defInFormat);void 0===r.outFormat&&(r.outFormat=e.defOutFormat);void 0===r.swap&&(r.swap=e.defSwap);if(r.inFormat===r.outFormat)return r;const o=r.inFormat.substring(0,1),i=r.outFormat.substring(0,1);let a,u=r.inFormat.substring(1,4),s=r.outFormat.substring(1,4);"C"===u.charAt(0)&&(a=n(t),u="ltr"===a||"rtl"===a?a.toUpperCase():"L"===r.inFormat.charAt(2)?"LTR":"RTL",r.inFormat=o+u);"C"===s.charAt(0)&&(a=n(t),"rtl"===a?s="RTL":"ltr"===a?(a=function(t){const r=t.split("");return r.reverse(),n(r.join(""))}(t),s=a.toUpperCase()):s="L"===r.outFormat.charAt(2)?"LTR":"RTL",r.outFormat=i+s);return r}(t,{inFormat:r,outFormat:i,swap:a},s);if(l.inFormat===l.outFormat)return t;r=l.inFormat,i=l.outFormat,a=l.swap;const f=r.substring(0,1),c=r.substring(1,4),T=i.substring(0,1),A=i.substring(1,4);if(s.inFormat=r,s.outFormat=i,s.swap=a,"L"===f&&"VLTR"===i){if("LTR"===c)return s.dir=w,o(t,s);if("RTL"===c)return s.dir=v,o(t,s)}if("V"===f&&"V"===T)return s.dir="RTL"===c?v:w,u(t,s);if("L"===f&&"VRTL"===i)return"LTR"===c?(s.dir=w,t=o(t,s)):(s.dir=v,t=o(t,s)),u(t);if("VLTR"===r&&"LLTR"===i)return s.dir=w,o(t,s);if("V"===f&&"L"===T&&c!==A)return t=u(t),"RTL"===c?e(t,"LLTR","VLTR",a,s):e(t,"LRTL","VRTL",a,s);if("VRTL"===r&&"LRTL"===i)return e(t,"LRTL","VRTL",a,s);if("L"===f&&"L"===T){const r=s.swap;return s.swap=r.substr(0,1)+"N","RTL"===c?(s.dir=v,t=o(t,s),s.swap="N"+r.substr(1,2),s.dir=w,t=o(t,s)):(s.dir=w,t=o(t,s),s.swap="N"+r.substr(1,2),t=e(t,"VLTR","LRTL",s.swap,s)),t}return t}function n(t){const r=/[A-Za-z\u05d0-\u065f\u066a-\u06ef\u06fa-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/.exec(t);return r?r[0]<="z"?"ltr":"rtl":""}function o(t,r){const e=t.split(""),n=[];return i(e,n,r),function(t,r,e){if(0===e.hiLevel||e.swap.substr(0,1)===e.swap.substr(1,2))return;for(let e=0;e<t.length;e++)1===r[e]&&(t[e]=h(t[e]))}(e,n,r),T(2,e,n,r),T(1,e,n,r),p=n,e.join("")}function i(r,e,n){const o=r.length,i=n.dir?t.impTabRtl:t.impTabLtr;let u=0,s=-1;const l=[],f=[];n.hiLevel=n.dir,n.lastArabic=!1,n.hasUbatAl=!1,n.hasUbatB=!1,n.hasUbatS=!1;for(let t=0;t<o;t++)l[t]=a(r[t]);for(let a=0;a<o;a++){const o=u,c=A(r,l,f,a,n);f[a]=c,u=i[o][c];const T=240&u;u&=15;const h=i[u][S];if(e[a]=h,T>0)if(16===T){for(let t=s;t<a;t++)e[t]=1;s=-1}else s=-1;if(i[u][E])-1===s&&(s=a);else if(s>-1){for(let t=s;t<a;t++)e[t]=h;s=-1}l[a]===t.UBAT_B&&(e[a]=0),n.hiLevel|=h}n.hasUbatS&&function(r,e,n,o){for(let i=0;i<n;i++)if(r[i]===t.UBAT_S){e[i]=o.dir;for(let n=i-1;n>=0&&r[n]===t.UBAT_WS;n--)e[n]=o.dir}}(l,e,o,n)}function a(r){const e=r.charCodeAt(0),n=t.PrimaryTable[e>>8];return n<t.TBBASE?n:t.UnicodeTable[n-t.TBBASE][255&e]}function u(t,r){const e=t.split("");if(r){const t=[];i(e,t,r),p=t}return e.reverse(),F.reverse(),e.join("")}function s(t,r,e){for(let n=0;n<r;n++)if(t[n]===e)return n;return-1}function l(r){for(let e=0;e<t.ArabicAlefBetIntervalsBegine.length;e++)if(r>=t.ArabicAlefBetIntervalsBegine[e]&&r<=t.ArabicAlefBetIntervalsEnd[e])return!0;return!1}function f(t,r,e,n){for(;r*e<n&&_(t[r]);)r+=e;return!!(r*e<n&&l(t[r]))}function c(r,e,n,o){for(;e*n<o&&_(r[e]);)e+=n;let i=" ";if(!(e*n<o))return!1;i=r[e];for(let r=0;r<t.AlefTable.length;r++)if(t.AlefTable[r]===i)return!0;return!1}function T(t,r,e,n){if(n.hiLevel<t)return;if(1===t&&n.dir===v&&!n.hasUbatB)return r.reverse(),void F.reverse();const o=r.length;let i,a,u,s,l,f=0;for(;f<o;){if(e[f]>=t){for(i=f+1;i<o&&e[i]>=t;)i++;for(a=f,u=i-1;a<u;a++,u--)s=r[a],r[a]=r[u],r[u]=s,l=F[a],F[a]=F[u],F[u]=l;f=i}f++}}function A(r,e,n,o,i){const a=e[o];return{UBAT_L:()=>(i.lastArabic=!1,t.UBAT_L),UBAT_R:()=>(i.lastArabic=!1,t.UBAT_R),UBAT_ON:()=>t.UBAT_ON,UBAT_AN:()=>t.UBAT_AN,UBAT_EN:()=>i.lastArabic?t.UBAT_AN:t.UBAT_EN,UBAT_AL:()=>(i.lastArabic=!0,i.hasUbatAl=!0,t.UBAT_R),UBAT_WS:()=>t.UBAT_ON,UBAT_CS:()=>{let r,a;return o<1||o+1>=e.length||(r=n[o-1])!==t.UBAT_EN&&r!==t.UBAT_AN||(a=e[o+1])!==t.UBAT_EN&&a!==t.UBAT_AN?t.UBAT_ON:(i.lastArabic&&(a=t.UBAT_AN),a===r?a:t.UBAT_ON)},UBAT_ES:()=>(o>0?n[o-1]:t.UBAT_B)===t.UBAT_EN&&o+1<e.length&&e[o+1]===t.UBAT_EN?t.UBAT_EN:t.UBAT_ON,UBAT_ET:()=>{if(o>0&&n[o-1]===t.UBAT_EN)return t.UBAT_EN;if(i.lastArabic)return t.UBAT_ON;let r=o+1;const a=e.length;for(;r<a&&e[r]===t.UBAT_ET;)r++;return r<a&&e[r]===t.UBAT_EN?t.UBAT_EN:t.UBAT_ON},UBAT_NSM:()=>{if("VLTR"===i.inFormat){const n=e.length;let i=o+1;for(;i<n&&e[i]===t.UBAT_NSM;)i++;if(i<n){const n=r[o].charCodeAt[0],a=n>=1425&&n<=2303||64286===n,u=e[i];if(a&&(u===t.UBAT_R||u===t.UBAT_AL))return t.UBAT_R}}return o<1||e[o-1]===t.UBAT_B?t.UBAT_ON:n[o-1]},UBAT_B:()=>(i.lastArabic=!0,i.hasUbatB=!0,i.dir),UBAT_S:()=>(i.hasUbatS=!0,t.UBAT_ON),UBAT_LRE:()=>(i.lastArabic=!1,t.UBAT_ON),UBAT_RLE:()=>(i.lastArabic=!1,t.UBAT_ON),UBAT_LRO:()=>(i.lastArabic=!1,t.UBAT_ON),UBAT_RLO:()=>(i.lastArabic=!1,t.UBAT_ON),UBAT_PDF:()=>(i.lastArabic=!1,t.UBAT_ON),UBAT_BN:()=>t.UBAT_ON}[t.TYPES_NAMES[a]]()}function h(r){let e,n=0,o=t.SwapTable.length-1;for(;n<=o;)if(e=Math.floor((n+o)/2),r<t.SwapTable[e][0])o=e-1;else{if(!(r>t.SwapTable[e][0]))return t.SwapTable[e][1];n=e+1}return r}function B(r){for(let e=0;e<t.StandAlonForm.length;e++)if(t.StandAlonForm[e]===r)return!0;return!1}function U(r){for(let e=0;e<t.BaseForm.length;e++)if(r===t.BaseForm[e])return t.MedialForm[e];return r}function L(r,e){for(let n=0;n<t.BaseForm.length;n++)if(r===t.BaseForm[n])return e[n];return r}function _(t){return t>="ً"&&t<="ٕ"}function b(t){return"L"===t?"LTR":"R"===t?"RTL":"C"===t?"CLR":"D"===t?"CRL":""}function m(t,r,e,n){for(;r*e<n&&_(t[r]);)r+=e;return r*e<n&&(t[r]=" ",!0)}function g(r,e){for(let n=0;n<t.AlefTable.length;n++)if(r===t.AlefTable[n])return e[n];return r}function d(t,r,e,n){for(let o=0;o<t.length;o++)(t[o]>r||!e&&t[o]===r)&&(t[o]+=n)}let F=[],N=[],p=[];const R={dir:0,defInFormat:"LLTR",defoutFormat:"VLTR",defSwap:"YN",inFormat:"LLTR",outFormat:"VLTR",swap:"YN",hiLevel:0,lastArabic:!1,hasUbatAl:!1,hasBlockSep:!1,hasSegSep:!1,defOutFormat:""},S=5,E=6,w=0,v=1,O=/^[(I|V)][(L|R|C|D)][(Y|N)][(S|N)][N]$/,C=/[\u0591-\u06ff\ufb1d-\ufefc]/;return r}));
