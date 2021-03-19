/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../has","../metadata","../extensions"],(function(e,t,r,s,o){"use strict";const a=new Set,n=new Set;function i(e,t){return null==t.get?function(){return this.__accessor__.getterStatic(e)}:function(){return this.__accessor__.getterComputed(e)}}function c(e){const t=e.prototype,r=t.declaredClass,a=s.getOwnClassMetadata(t).properties;o.processClassMetadatas(a,r);const n={};for(const e of Object.getOwnPropertyNames(a)){const t=a[e];n[e]={enumerable:!0,configurable:!0,get:i(e,t),set(r){const s=this.__accessor__;if(void 0!==s){if(!Object.isFrozen(this)){if(s.initialized&&t.readOnly)throw new TypeError(`[accessor] cannot assign to read-only property '${e}' of ${this.declaredClass}`);if(2===s.lifecycle&&t.constructOnly)throw new TypeError(`[accessor] cannot assign to construct-only property '${e}' of ${this.declaredClass}`);s.set(e,r)}}else Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:r})}}}Object.defineProperties(e.prototype,n)}e.processClass=c,e.subclass=function(e){return r=>{r.prototype.declaredClass=e,o.processPrototypeMetadatas(s.getOwnClassMetadata(r.prototype).properties,e),c(r);const i=[],l=[];let p=r.prototype;for(;p;)p.hasOwnProperty("initialize")&&!a.has(p.initialize)&&(a.add(p.initialize),i.push(p.initialize)),p.hasOwnProperty("destroy")&&!n.has(p.destroy)&&(n.add(p.destroy),l.push(p.destroy)),p=Object.getPrototypeOf(p);a.clear(),n.clear();let u=function(e){function r(...s){var o;if((o=e.call(this,...s)||this).constructor===r&&"function"==typeof o.postscript){if(i.length&&Object.defineProperty(t._assertThisInitialized(o),"initialize",{enumerable:!1,configurable:!0,value(){for(let e=i.length-1;e>=0;e--)i[e].call(this)}}),l.length){let e=!1;Object.defineProperty(t._assertThisInitialized(o),"destroy",{enumerable:!1,configurable:!0,value(){if(!e){e=!0;for(let e=0;e<l.length;e++)l[e].call(this)}}})}o.postscript(...s)}return o}return t._inheritsLoose(r,e),r}(r);return u.__accessorMetadata__=s.getOwnClassMetadata(r.prototype),u.prototype.declaredClass=e,u}},Object.defineProperty(e,"__esModule",{value:!0})}));
