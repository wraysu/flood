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

define(["require","exports","./maybe","./accessorSupport/utils"],(function(e,n,r,t){function o(e){return{remove:t.once(e||function(){})}}Object.defineProperty(n,"__esModule",{value:!0}),n.handlesGroup=function(e){return o((function(){return e.forEach((function(e){return r.isSome(e)&&e.remove()}))}))},n.makeHandle=o,n.refHandle=function(e){return o((function(){var n=e();r.isSome(n)&&n.remove()}))},n.destroyHandle=function(e){return o((function(){return e.destroy()}))},n.timeoutHandle=function(e,n){var r=setTimeout(e,n);return{remove:function(){return clearTimeout(r)}}}}));