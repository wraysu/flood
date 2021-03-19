/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../Logger","./utils","./extensions/serializableProperty","../Error","./PropertyOrigin","../arrayUtils","../promiseUtils"],(function(e,r,t,i,n,o,s,u){"use strict";const l=r.getLogger("esri.core.accessorSupport.write");function a(e,r,t,i,n){var o,s;const u={};return null==(o=r.write)||null==(s=o.writer)||s.call(e,i,u,t,n),u}function f(e,r,t,i,u,a){if(!i||!i.write)return!1;const f=e.get(t);if(!u&&i.write.overridePolicy){const r=i.write.overridePolicy.call(e,f,t,a);void 0!==r&&(u=r)}if(u||(u=i.write),!u||!1===u.enabled)return!1;if((null===f&&!u.allowNull||void 0===f)&&u.isRequired){const r=new n("web-document-write:property-required",`Missing value for required property '${t}' on '${e.declaredClass}'`,{propertyName:t,target:e});return r&&a&&a.messages?a.messages.push(r):r&&!a&&l.error(r.name,r.message),!1}if(void 0===f)return!1;if(null===f&&!u.allowNull)return!1;if(function(e,r,t,i,n){const o=i.default;if(void 0===o)return!1;if(null!=i.defaultEquals)return i.defaultEquals(n);if("function"==typeof o){if(Array.isArray(n)){const i=o.call(e,r,t);return s.equals(i,n)}return!1}return o===n}(e,t,a,i,f))return!1;if(void 0!==i.default)return!0;if(!u.ignoreOrigin&&a&&a.origin){if(r.store.originOf(t)<o.nameToId(a.origin))return!1}return!0}function c(e,r,n){if(e&&"function"==typeof e.toJSON&&(!e.toJSON.isDefaultToJSON||!e.write))return t.merge(r,e.toJSON());const s=t.getProperties(e),l=s.metadatas;for(const c in l){const g=i.originSpecificWritePropertyDefinition(l[c],n);if(!f(e,s,c,g,void 0,n))continue;const p=e.get(c),d=a(e,g,g.write&&"string"==typeof g.write.target?g.write.target:c,p,n);Object.keys(d).length>0&&(r=t.merge(r,d),n&&n.resources&&n.resources.pendingOperations&&n.resources.pendingOperations.length&&u.all(n.resources.pendingOperations).then((()=>t.merge(r,d))),n&&n.writtenProperties&&n.writtenProperties.push({target:e,propName:c,oldOrigin:o.idToReadableName(s.store.originOf(c)),newOrigin:n.origin}))}return r}e.default=c,e.willPropertyWrite=function(e,r,n,o){const s=t.getProperties(e),u=s.metadatas,l=i.originSpecificWritePropertyDefinition(u[r],o);return!!l&&f(e,s,r,l,n,o)},e.write=c,Object.defineProperty(e,"__esModule",{value:!0})}));
