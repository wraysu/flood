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

define(["require","exports","../MultiOriginJSONSupport"],(function(i,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.updateOrigins=function(i){i&&i.writtenProperties&&i.writtenProperties.forEach((function(i){var e=i.target;i.newOrigin&&i.oldOrigin!==i.newOrigin&&r.isMultiOriginJSONMixin(e)&&e.updateOrigin(i.propName,i.newOrigin)}))}}));