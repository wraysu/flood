/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","./unitFormatUtils"],(function(t,r){"use strict";t.formatDMS=function(t){if("angle"!==t.measure)throw new Error("quantity is not an angle");return r.formatDMS(t.value,t.unit)},t.formatDecimal=function(t,e,a,n=2,i="abbr"){return r.formatDecimal(t,e.toUnit(a).value,a,n,i)},t.formatImperialArea=function(t,e,a=2,n="abbr"){if("area"!==e.measure)throw new Error("quantity is not an area");return r.formatImperialArea(t,e.value,e.unit,a,n)},t.formatImperialLength=function(t,e,a=2,n="abbr"){if("length"!==e.measure)throw new Error("quantity is not a length");return r.formatImperialLength(t,e.value,e.unit,a,n)},t.formatImperialVerticalLength=function(t,e,a=2,n="abbr"){if("length"!==e.measure)throw new Error("quantity is not a length");return r.formatImperialVerticalLength(t,e.value,e.unit,a,n)},t.formatMetricArea=function(t,e,a=2,n="abbr"){if("area"!==e.measure)throw new Error("quantity is not an area");return r.formatMetricArea(t,e.value,e.unit,a,n)},t.formatMetricLength=function(t,e,a=2,n="abbr"){if("length"!==e.measure)throw new Error("quantity is not a length");return r.formatMetricLength(t,e.value,e.unit,a,n)},t.formatMetricVerticalLength=function(t,e,a=2,n="abbr"){if("length"!==e.measure)throw new Error("quantity is not a length");return r.formatMetricVerticalLength(t,e.value,e.unit,a,n)},Object.defineProperty(t,"__esModule",{value:!0})}));
