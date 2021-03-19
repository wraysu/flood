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

define(["require","exports","../arrayUtils","../Error","../Logger","./PropertyOrigin","./utils","./extensions/serializableProperty"],(function(r,e,i,t,n,o,a,u){Object.defineProperty(e,"__esModule",{value:!0});var l=n.getLogger("esri.core.accessorSupport.write");function f(r,e,i,t,n){var o={};return e.write.writer.call(r,t,o,i,n),o}function s(r,e,n,a,u,f){if(!a||!a.write)return!1;var s=r.get(n);if(!u&&a.write.overridePolicy){var g=a.write.overridePolicy.call(r,s,n,f);void 0!==g&&(u=g)}if(u||(u=a.write),!u||!1===u.enabled)return!1;if((null===s&&!u.allowNull||void 0===s)&&u.isRequired){var p=new t("web-document-write:property-required","Missing value for required property '"+n+"' on '"+r.declaredClass+"'",{propertyName:n,target:r});return p&&f&&f.messages?f.messages.push(p):p&&!f&&l.error(p.name,p.message),!1}if(void 0===s)return!1;if(null===s&&!u.allowNull)return!1;if(function(r,e,t,n,o){var a=n.default;if(void 0===a)return!1;if("function"==typeof a){if(Array.isArray(o)){var u=a.call(r,e,t);return i.equals(u,o)}return!1}return a===o}(r,n,f,a,s))return!1;if(void 0!==a.default)return!0;if(!u.ignoreOrigin&&f&&f.origin&&e.store.originOf(n)<o.nameToId(f.origin))return!1;return!0}function g(r,e,i){if(r&&"function"==typeof r.toJSON&&(!r.toJSON.isDefaultToJSON||!r.write))return a.merge(e,r.toJSON());var t=a.getProperties(r),n=t.metadatas;for(var l in n){var g=u.originSpecificWritePropertyDefinition(n[l],i);if(s(r,t,l,g,null,i)){var p=r.get(l),d=f(r,g,"string"==typeof g.write.target?g.write.target:l,p,i);Object.keys(d).length>0&&(e=a.merge(e,d),i&&i.writtenProperties&&i.writtenProperties.push({target:r,propName:l,oldOrigin:o.idToReadableName(t.store.originOf(l)),newOrigin:i.origin}))}}return e}e.willPropertyWrite=function(r,e,i,t){var n=a.getProperties(r),o=n.metadatas,l=u.originSpecificWritePropertyDefinition(o[e],t);return!!l&&s(r,n,e,l,i,t)},e.write=g,e.default=g}));