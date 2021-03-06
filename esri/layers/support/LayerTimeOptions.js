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

define(["require","exports","../../core/tsSupport/decorateHelper","../../core/tsSupport/declareExtendsHelper","../../core/JSONSupport","../../core/accessorSupport/decorators"],(function(e,t,r,o,p,i){return function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),r([i.property({type:Boolean,json:{write:!0}})],t.prototype,"timeDataCumulative",void 0),r([i.property({type:Number,json:{write:!0}})],t.prototype,"timeOffset",void 0),r([i.property({type:String,json:{write:!0}})],t.prototype,"timeOffsetUnits",void 0),r([i.property({type:Boolean,json:{write:!0}})],t.prototype,"useTime",void 0),t=r([i.subclass("esri.layers.support.LayerTimeOptions")],t)}(i.declared(p.JSONSupport))}));