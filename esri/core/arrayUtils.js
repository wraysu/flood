// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","@dojo/framework/shim/array","./RandomLCG"],(function(r,n,e,t){Object.defineProperty(n,"__esModule",{value:!0}),n.find=e.find,n.findIndex=e.findIndex,n.includes=e.includes,n.unique=function(r,n){return n?r.filter((function(r,t,i){return e.findIndex(i,n.bind(null,r))===t})):r.filter((function(r,n,e){return e.indexOf(r)===n}))},n.equals=function(r,n,e){if(!r&&!n)return!0;if(!r||!n||r.length!==n.length)return!1;if(e){for(var t=0;t<r.length;t++)if(!e(r[t],n[t]))return!1}else for(t=0;t<r.length;t++)if(r[t]!==n[t])return!1;return!0},n.difference=function(r,n,e){var t,i;return e?(t=n.filter(c.bind(null,r,e)),i=r.filter(c.bind(null,n,e))):(t=n.filter(d.bind(null,r)),i=r.filter(d.bind(null,n))),{added:t,removed:i}},n.intersect=function(r,n,t){return r&&n?t?r.filter((function(r){return e.findIndex(n,(function(n){return t(r,n)}))>-1})):r.filter((function(r){return n.indexOf(r)>-1})):[]};var i=!!Array.prototype.fill;n.constant=function(r,n){if(i)return new Array(r).fill(n);for(var e=new Array(r),t=0;t<r;t++)e[t]=n;return e},n.range=function(r,n){void 0===n&&(n=r,r=0);for(var e=new Array(n-r),t=r;t<n;t++)e[t-r]=t;return e},n.binaryIndexOf=function(r,n,e){for(var t=r.length,i=0,f=t-1;i<f;){var u=i+Math.floor((f-i)/2);n>r[u]?i=u+1:f=u}var o=r[i];return e?n>=r[t-1]?-1:o===n?i:i-1:o===n?i:-1},n.flatten=function(r){return r.reduce((function(r,n){return r.concat(n||[])}),[])};var f=function(){this.last=0};n.PositionHint=f;var u=new f;function o(r,n,e,t){t=t||u;for(var i=Math.max(0,t.last-10),f=i;f<e;++f)if(r[f]===n)return t.last=f,f;var o=Math.min(i,e);for(f=0;f<o;++f)if(r[f]===n)return t.last=f,f;return-1}n.indexOf=o,n.removeUnordered=function(r,n,e,t){var i=null==e?r.length:e,f=o(r,n,i,t);if(-1!==f)return r[f]=r[i-1],null==e&&r.pop(),n};var a=new Set;n.removeUnorderedMany=function(r,n,e,t,i,f){if(void 0===e&&(e=r.length),void 0===t&&(t=n.length),0===t||0===e)return e;a.clear();for(var o=0;o<t;++o)a.add(n[o]);i=i||u;var l=Math.max(0,i.last-10);for(o=l;o<e;++o)if(a.has(r[o])&&(f&&f.push(r[o]),a.delete(r[o]),r[o]=r[e-1],--e,--o,0===a.size||0===e))return a.clear(),e;for(o=0;o<l;++o)if(a.has(r[o])&&(f&&f.push(r[o]),a.delete(r[o]),r[o]=r[e-1],--e,--o,0===a.size||0===e))return a.clear(),e;return a.clear(),e},n.pickRandom=function(r,n,e){var t=r.length;if(n>=t)return r.slice(0);l.seed=e;for(var i=e?function(){return l.getFloat()}:Math.random,f=new Set,u=[];u.length<n;){var o=Math.floor(i()*t);f.has(o)||(f.add(o),u.push(r[o]))}return u},n.shuffle=function(r,n){l.seed=n;for(var e=n?function(){return l.getFloat()}:Math.random,t=r.length-1;t>0;t--){var i=Math.floor(e()*(t+1)),f=r[t];r[t]=r[i],r[i]=f}return r};var l=new t;function d(r,n){return-1===r.indexOf(n)}function c(r,n,e){return!r.some(n.bind(null,e))}function s(r){return r}n.keysOfMap=function(r){var n=new Array(r.size),e=0;return r.forEach((function(r,t){return n[e++]=t})),n},n.keysOfSet=function(r,n){void 0===n&&(n=s);var e=new Array(r.size),t=0;return r.forEach((function(r){return e[t++]=n(r)})),e},n.fromMapValues=function(r){if(Array.from)return Array.from(r.values());var n=new Array(r.size),e=0;return r.forEach((function(r){return n[e++]=r})),n},n.remove=function(r,n){var e=r.indexOf(n);return-1!==e?(r.splice(e,1),n):null}}));