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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","@dojo/framework/shim/array","../../core/Error","../../core/maybe","../../core/object","../../core/promiseUtils","../../core/SetUtils","./domains","../../support/arcadeOnDemand"],(function(e,n,i,r,t,l,a,u,o,s,d,c,f){function g(e,n,i){if(e)for(var r=0,t=e;r<t.length;r++){var l=t[r],a=o.getDeepValue(l,n),u=a&&"function"!=typeof a&&h(i,a);u&&o.setDeepValue(l,u.name,n)}}Object.defineProperty(n,"__esModule",{value:!0}),n.rendererFields=["field","field2","field3","normalizationField","rotationInfo.field","proportionalSymbolInfo.field","proportionalSymbolInfo.normalizationField","colorInfo.field","colorInfo.normalizationField"],n.visualVariableFields=["field","normalizationField"],n.fixRendererFields=function(e,i){if(null!=e&&null!=i)for(var r=0,t=Array.isArray(e)?e:[e];r<t.length;r++){var l=t[r];if(g(n.rendererFields,l,i),"visualVariables"in l&&l.visualVariables)for(var a=0,u=l.visualVariables;a<u.length;a++){var o=u[a];g(n.visualVariableFields,o,i)}}},n.fixTimeInfoFields=function(e,n){if(null!=e&&null!=n)if("startField"in e){var i=h(n,e.startField),r=h(n,e.endField);e.startField=i&&i.name||null,e.endField=r&&r.name||null}else{var t=h(n,e.startTimeField),l=h(n,e.endTimeField);e.startTimeField=t&&t.name||null,e.endTimeField=l&&l.name||null}};var m=new Set;function p(e,n){return e&&n?(m.clear(),F(m,e,n),d.valuesOfSet(m).sort()):[]}function F(e,n,i){if(i)if(n&&n.length)if(l.includes(i,"*"))for(var r=0,t=n;r<t.length;r++){var a=t[r].name;e.add(a)}else for(var u=0,o=i;u<o.length;u++){v(e,n,c=o[u])}else{if(l.includes(i,"*"))return e.clear(),void e.add("*");for(var s=0,d=i;s<d.length;s++){var c=d[s];e.add(c)}}}function v(e,n,i){if(n&&n.length){var r=h(n,i);r&&e.add(r.name)}else"string"==typeof i&&e.add(i)}function h(e,n){if("string"!=typeof n)return null;if(null!=e){n=n.toLowerCase();for(var i=0,r=e;i<r.length;i++){var t=r[i];if(t&&t.name.toLowerCase()===n)return t}}return null}function y(e,n,i){return t(this,void 0,void 0,(function(){var t,l,a,u,o;return r(this,(function(r){switch(r.label){case 0:return i?[4,f.loadArcade()]:[2];case 1:for(t=r.sent().arcadeUtils,l=t.extractFieldNames(i),a=0,u=l;a<u.length;a++)o=u[a],v(e,n,o);return[2]}}))}))}function b(e,n){for(var i=0,r=e;i<r.length;i++){var t=r[i];if(t&&t.valueType&&t.valueType===n)return t.name}return null}function I(e,n){return t(this,void 0,void 0,(function(){var i,t;return r(this,(function(r){return n?(i=n.fields,(t=o.getDeepValue("elevationInfo.featureExpressionInfo",n))?[2,t.collectRequiredFields(e,i)]:[2]):[2]}))}))}function T(e,n){return t(this,void 0,void 0,(function(){var i,l;return r(this,(function(a){switch(a.label){case 0:return i=n.labelingInfo,l=n.fields,i&&i.length?[4,s.all(i.map((function(n){return function(e,n,i){return t(this,void 0,void 0,(function(){var t,l,a,u,o;return r(this,(function(r){switch(r.label){case 0:return i?(t=i.getLabelExpression(),l=i.where,"arcade"!==t.type?[3,2]:[4,y(e,n,t.expression)]):[2];case 1:return r.sent(),[3,3];case 2:(a=t.expression.match(/{[^}]*}/g))&&a.forEach((function(i){v(e,n,i.slice(1,-1))})),r.label=3;case 3:return u=/['"]+/g,l&&(3===(o=l.split(" ")).length&&v(e,n,o[0].replace(u,"")),7===o.length&&(v(e,n,o[0].replace(u,"")),v(e,n,o[4].replace(u,"")))),[2]}}))}))}(e,l,n)})))]:[2];case 1:return a.sent(),[2]}}))}))}function V(e){return"number"==typeof e&&!isNaN(e)&&isFinite(e)}function N(e){return null===e||V(e)}n.fixFields=p,n.collectFields=F,n.collectField=v,n.unpackFieldNames=function(e,n){return n&&e?l.includes(n,"*")?e.map((function(e){return e.name})):n:[]},n.packFields=function(e,n,i){if(void 0===i&&(i=1),!n||!e)return[];if(l.includes(n,"*"))return["*"];var r=p(e,n);return r.length/e.length>=i?["*"]:r},n.getField=h,n.hasField=function(e,n){if(!e||!n||"string"!=typeof n)return!1;n=n.toLowerCase();for(var i=0,r=e;i<r.length;i++){var t=r[i];if(t&&t.name.toLowerCase()===n)return!0}return!1},n.collectArcadeFieldNames=y,n.getDisplayFieldName=function(e){var n=e.displayField,i=e.fields;return n||(i&&i.length?b(i,"name-or-title")||b(i,"unique-identifier")||b(i,"type-or-category")||function(e){for(var n=0,i=e;n<i.length;n++){var r=i[n];if(r&&r.name){var t=r.name.toLowerCase();if(t.indexOf("name")>-1||t.indexOf("title")>-1)return r.name}}return null}(i):null)},n.getElevationFields=function(e){return t(this,void 0,void 0,(function(){var n;return r(this,(function(i){switch(i.label){case 0:return e?[4,I(n=new Set,e)]:[2,[]];case 1:return i.sent(),[2,d.valuesOfSet(n).sort()]}}))}))},n.collectElevationFields=I,n.collectFilterFields=function(n,i,l){return t(this,void 0,void 0,(function(){var t,u;return r(this,(function(r){switch(r.label){case 0:return i&&l&&(l.where&&"1=1"!==l.where||l.timeExtent)?(i.timeInfo&&l.timeExtent&&F(n,i.fields,[i.timeInfo.startField,i.timeInfo.endField]),l.where?[4,s.create((function(n){e(["../../core/sql/WhereClause"],n)}))]:[3,2]):[2];case 1:if(t=r.sent(),!(u=t.WhereClause.create(l.where,i.fieldsIndex)).isStandardized)throw new a("fieldUtils:collectFilterFields","Where clause is not standardized");F(n,i.fields,u.fieldNames),r.label=2;case 2:return[2]}}))}))},n.getTimeFields=function(e){return t(this,void 0,void 0,(function(){var n;return r(this,(function(i){return e&&(n="timeInfo"in e&&e.timeInfo)?[2,p(e.fields,[e.trackIdField,n.startField,n.endField])]:[2,[]]}))}))},n.getFeatureEditFields=function(e){if(!e)return[];var n="editFieldsInfo"in e&&e.editFieldsInfo;return n?p(e.fields,[n&&n.creatorField,n&&n.creationDateField,n&&n.editorField,n&&n.editDateField]):[]},n.getFeatureGeometryFields=function(e){if(!e)return[];var n="geometryProperties"in e&&e.geometryProperties;return n?p(e.fields,[n&&n.shapeAreaFieldName,n&&n.shapeLengthFieldName]):[]},n.getLabelingFields=function(e){return t(this,void 0,void 0,(function(){var n;return r(this,(function(i){switch(i.label){case 0:return e?[4,T(n=new Set,e)]:[2,[]];case 1:return i.sent(),[2,d.valuesOfSet(n).sort()]}}))}))},n.collectLabelingFields=T,n.getFieldDefaultValue=function(e){var n=e.defaultValue;return void 0!==n&&R(e,n)?n:e.nullable?null:void 0};var S="isInteger"in Number?Number.isInteger:function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e};function E(e){return null===e||S(e)}function w(e){return null!=e&&"string"==typeof e}function x(e){return null===e||w(e)}function D(){return!0}function R(e,n){var i;switch(e.type){case"date":case"integer":case"long":case"small-integer":case"esriFieldTypeDate":case"esriFieldTypeInteger":case"esriFieldTypeLong":case"esriFieldTypeSmallInteger":i=e.nullable?E:S;break;case"double":case"single":case"esriFieldTypeSingle":case"esriFieldTypeDouble":i=e.nullable?N:V;break;case"string":case"esriFieldTypeString":i=e.nullable?x:w;break;default:i=D}return 1===arguments.length?i:i(n)}n.isValueMatchingFieldType=R,n.numericTypes=["integer","small-integer","single","double"];var A,O,L=d.createSetFromValues(n.numericTypes.concat(["esriFieldTypeInteger","esriFieldTypeSmallInteger","esriFieldTypeSingle","esriFieldTypeDouble"]));function _(e){return null!=e&&L.has(e.type)}function U(e,n){return e.nullable&&null===n?null:_(e)&&!k(e.type,Number(n))?A.OUT_OF_RANGE:R(e,n)?e.domain?c.validateDomainValue(e.domain,n):null:O.INVALID_TYPE}function k(e,n){var i="string"==typeof e?C(e):e;return!!i&&(i.isInteger?S(n)&&n>=i.min&&n<=i.max:n>=i.min&&n<=i.max)}function C(e){switch(e){case"esriFieldTypeSmallInteger":case"small-integer":return n.smallIntegerRange;case"esriFieldTypeInteger":case"integer":return n.integerRange;case"esriFieldTypeSingle":case"single":return n.singleRange;case"esriFieldTypeDouble":case"double":return n.doubleRange}}function z(e,n,i){if(!n||!n.attributes||!e){if(u.isSome(i))for(var r=0,t=e;r<t.length;r++){var l=t[r];i.add(l)}return!0}for(var a=n.attributes,o=!1,s=0,d=e;s<d.length;s++){if(!((l=d[s])in a)){if(o=!0,!u.isSome(i))break;i.add(l)}}return o}n.isNumericField=_,n.isStringField=function(e){return null!=e&&("string"===e.type||"esriFieldTypeString"===e.type)},n.isDateField=function(e){return null!=e&&("date"===e.type||"esriFieldTypeDate"===e.type)},n.isValidFieldValue=function(e,n){return null===U(e,n)},function(e){e.OUT_OF_RANGE="numeric-range-validation-error::out-of-range"}(A=n.NumericRangeValidationError||(n.NumericRangeValidationError={})),function(e){e.INVALID_TYPE="type-validation-error::invalid-type"}(O=n.TypeValidationError||(n.TypeValidationError={})),n.sanitizeNullFieldValue=function(e){return null==e||"number"==typeof e&&isNaN(e)?null:e},n.validateFieldValue=U,n.isNumberInRange=k,n.getFieldRange=function(e){var n=c.getDomainRange(e.domain);return n||(_(e)?C(e.type):void 0)},n.getNumericTypeForValue=function(e){if(!V(e))return null;if(S(e)){if(e>=n.smallIntegerRange.min&&e<=n.smallIntegerRange.max)return"esriFieldTypeSmallInteger";if(e>=n.integerRange.min&&e<=n.integerRange.max)return"esriFieldTypeInteger"}return e>=n.singleRange.min&&e<=n.singleRange.max?"esriFieldTypeSingle":"esriFieldTypeDouble"},n.smallIntegerRange={min:-32768,max:32767,isInteger:!0},n.integerRange={min:-2147483648,max:2147483647,isInteger:!0},n.singleRange={min:-34e37,max:12e37,isInteger:!1},n.doubleRange={min:-Number.MAX_VALUE,max:Number.MAX_VALUE,isInteger:!1},n.validationErrorToString=function(e,n,i){switch(e){case c.DomainValidationError.INVALID_CODED_VALUE:return"Value "+i+" is not in the coded domain - field: "+n.name+", domain: "+JSON.stringify(n.domain);case c.DomainValidationError.VALUE_OUT_OF_RANGE:return"Value "+i+" is out of the range of valid values - field: "+n.name+", domain: "+JSON.stringify(n.domain);case O.INVALID_TYPE:return"Value "+i+" is not a valid value for the field type - field: "+n.name+", type: "+n.type+", nullable: "+n.nullable;case A.OUT_OF_RANGE:var r=C(n.type),t=r.min,l=r.max;return"Value "+i+" is out of range for the number type - field: "+n.name+", type: "+n.type+", value range is "+t+" to "+l}},n.featureHasFields=function(e,n){return!z(e,n,null)},n.populateMissingFields=z,n.getExpressionFields=function(e,n){return t(this,void 0,void 0,(function(){var i,t,l,a;return r(this,(function(r){switch(r.label){case 0:i=new Set,t=0,l=n,r.label=1;case 1:return t<l.length?(a=l[t],[4,y(i,e.fields,a)]):[3,4];case 2:r.sent(),r.label=3;case 3:return t++,[3,1];case 4:return[2,d.valuesOfSet(i).sort()]}}))}))}}));