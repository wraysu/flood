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

define(["require","exports"],(function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),n.wgs84Radius=6378137,n.wgs84InverseFlattening=298.257223563,n.wgs84Flattening=1/n.wgs84InverseFlattening,n.wgs84PolarRadius=n.wgs84Radius*(1-n.wgs84Flattening),n.wgs84Eccentricity=.0818191908426215}));