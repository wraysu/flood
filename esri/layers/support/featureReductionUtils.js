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

define(["require","exports","../../core/Error","../../core/object","./FeatureReduction","./FeatureReductionCluster","./FeatureReductionSelection"],(function(e,t,r,u,n,o,a){function c(e,t,u){return e?"selection"!==e.type?(u.messages&&u.messages.push(new r("featureReduction:unsupported","FeatureReduction of type '"+e.declaredClass+"' are not supported in scenes.",{featureReduction:e,context:u})),null):e.write(t,u):null}Object.defineProperty(t,"__esModule",{value:!0}),t.webSceneFeatureReductionTypes={key:"type",base:n.default,typeMap:{selection:a.default}},t.read=function(e,t){var r=(t=t.layerDefinition||t).featureReduction;if(r)switch(r.type){case"selection":return a.default.fromJSON(r);case"cluster":return o.default.fromJSON(r)}return null},t.writeTarget=function(e,t,r,n){var o=c(e,{},n);o&&u.setDeepValue(r,o,t)},t.write=c}));