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

define(["require","exports","./Jpg","./Zlib"],(function(e,r,n,t){return function(){function e(){}return e.decode=function(e){var r=new Uint8Array(e),i=new n;i.parse(r);var a,o=i.width,f=i.height,u=i.numComponents,h=i.eof,s=i.getData(o,f,!0),g=o*f,l=0,w=0,p=0;if(h<r.length-1){var c=new t(r.subarray(h)).getBytes();a=new Uint8Array(g);var d=0;for(l=0;l<c.length;l++)for(p=7;p>=0;p--)a[d++]=c[l]>>p&1}var v,y=null;if(1===u)y=[s,s,s];else{for(y=[],l=0;l<3;l++)v=new Uint8Array(g),y.push(v);for(p=0,w=0;w<g;w++)for(l=0;l<3;l++)y[l][w]=s[p++]}return{width:o,height:f,pixels:y,mask:a}},e}()}));