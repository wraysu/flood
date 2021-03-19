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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/compilerUtils","../../core/Error","../../core/JSONSupport","../../core/lang","../../core/Logger","../../core/accessorSupport/decorators"],(function(t,e,i,s,r,a,o,l,n,h){var p=n.getLogger("esri.layers.support.PixelBlock");return function(t){function e(e){var i=t.call(this,e)||this;return i.width=null,i.height=null,i.pixelType="f32",i.validPixelCount=null,i.mask=null,i.maskIsAlpha=!1,i.pixels=null,i.statistics=null,i}var o;return i(e,t),o=e,e.createEmptyBand=function(t,e){return new(o.getPixelArrayConstructor(t))(e)},e.getPixelArrayConstructor=function(t){var e;switch(t){case"u1":case"u2":case"u4":case"u8":e=Uint8Array;break;case"u16":e=Uint16Array;break;case"u32":e=Uint32Array;break;case"s8":e=Int8Array;break;case"s16":e=Int16Array;break;case"s32":e=Int32Array;break;case"u32":e=Uint32Array;break;case"f32":e=Float32Array;break;case"f64":e=Float64Array;break;case"c64":case"c128":case"unknown":e=Float32Array;break;default:r.neverReached(t)}return e},e.prototype.castPixelType=function(t){if(!t)return"f32";var e=t.toLowerCase();return["u1","u2","u4"].indexOf(e)>-1?e="u8":-1===["unknown","u8","s8","u16","s16","u32","s32","f32","f64"].indexOf(e)&&(e="f32"),e},e.prototype.getPlaneCount=function(){return this.pixels&&this.pixels.length},e.prototype.addData=function(t){if(!t.pixels||t.pixels.length!==this.width*this.height)throw new a("pixelblock:invalid-or-missing-pixels","add data requires valid pixels array that has same length defined by pixel block width * height");this.pixels||(this.pixels=[]),this.statistics||(this.statistics=[]),this.pixels.push(t.pixels),this.statistics.push(t.statistics||{minValue:null,maxValue:null})},e.prototype.getAsRGBA=function(){var t=new ArrayBuffer(this.width*this.height*4);switch(this.pixelType){case"s8":case"s16":case"u16":case"s32":case"u32":case"f32":case"f64":this._fillFromNon8Bit(t);break;default:this._fillFrom8Bit(t)}return new Uint8ClampedArray(t)},e.prototype.getAsRGBAFloat=function(){var t=new Float32Array(this.width*this.height*4);return this._fillFrom32Bit(t),t},e.prototype.updateStatistics=function(){var t=this;this.statistics=this.pixels.map((function(e){return t._calculateBandStatistics(e,t.mask)}));var e=this.mask,i=0;if(e)for(var s=0;s<e.length;s++)e[s]&&i++;else i=this.width*this.height;this.validPixelCount=i},e.prototype.clamp=function(t){if(t&&"f64"!==t&&"f32"!==t){var e;switch(t){case"u8":e=[0,255];break;case"u16":e=[0,65535];break;case"u32":e=[0,4294967295];break;case"s8":e=[-128,127];break;case"s16":e=[-32768,32767];break;case"s32":e=[-2147483648,2147483647];break;default:e=[-34e38,34e38]}for(var i,s,r,a=e[0],l=e[1],n=this.pixels,h=this.width*this.height,p=n.length,c=[],u=0;u<p;u++){r=o.createEmptyBand(t,h),i=n[u];for(var f=0;f<h;f++)s=i[f],r[f]=s>l?l:s<a?a:s;c.push(r)}this.pixels=c,this.pixelType=t}},e.prototype.clone=function(){var t,e=new o({width:this.width,height:this.height,pixelType:this.pixelType,maskIsAlpha:this.maskIsAlpha,validPixelCount:this.validPixelCount});this.mask&&(this.mask instanceof Uint8Array?e.mask=new Uint8Array(this.mask):e.mask=this.mask.slice(0));var i=o.getPixelArrayConstructor(this.pixelType);if(this.pixels&&this.pixels.length>0){e.pixels=[];var s=this.pixels[0].slice;for(t=0;t<this.pixels.length;t++)e.pixels[t]=s?this.pixels[t].slice(0,this.pixels[t].length):new i(this.pixels[t])}if(this.statistics)for(e.statistics=[],t=0;t<this.statistics.length;t++)e.statistics[t]=l.clone(this.statistics[t]);return e},e.prototype._fillFrom8Bit=function(t){var e=this.mask,i=this.maskIsAlpha,s=this.pixels;if(t&&s&&s.length){var r,a,o,l;r=a=o=s[0],s.length>=3?(a=s[1],o=s[2]):2===s.length&&(a=s[1]);var n=new Uint32Array(t),h=this.width*this.height;if(r.length===h)if(e&&e.length===h)if(i)for(l=0;l<h;l++)e[l]&&(n[l]=e[l]<<24|o[l]<<16|a[l]<<8|r[l]);else for(l=0;l<h;l++)e[l]&&(n[l]=255<<24|o[l]<<16|a[l]<<8|r[l]);else for(l=0;l<h;l++)n[l]=255<<24|o[l]<<16|a[l]<<8|r[l];else p.error("getAsRGBA()","Unable to convert to RGBA. The pixelblock is invalid.")}else p.error("getAsRGBA()","Unable to convert to RGBA. The input pixel block is empty.")},e.prototype._fillFromNon8Bit=function(t){var e=this.pixels,i=this.mask,s=this.statistics;if(t&&e&&e.length){var r=this.pixelType,a=1,o=0;if(s&&s.length>0)o=s.map((function(t){return t.minValue})).reduce((function(t,e){return Math.min(t,e)})),a=255/s.map((function(t){return t.maxValue-t.minValue})).reduce((function(t,e){return Math.max(t,e)}));else{var l=255;"s8"===r?(o=-128,l=127):"u16"===r?l=65535:"s16"===r?(o=-32768,l=32767):"u32"===r?l=4294967295:"s32"===r?(o=-2147483648,l=2147483647):"f32"===r?(o=-34e38,l=34e38):"f64"===r&&(o=-Number.MAX_VALUE,l=Number.MAX_VALUE),a=255/(l-o)}var n,h,c,u,f,y=new Uint32Array(t),x=this.width*this.height;if((n=h=c=e[0]).length!==x)return p.error("getAsRGBA()","Unable to convert to RGBA. The pixelblock is invalid.");if(e.length>=2)if(h=e[1],e.length>=3&&(c=e[2]),i&&i.length===x)for(u=0;u<x;u++)i[u]&&(y[u]=255<<24|(c[u]-o)*a<<16|(h[u]-o)*a<<8|(n[u]-o)*a);else for(u=0;u<x;u++)y[u]=255<<24|(c[u]-o)*a<<16|(h[u]-o)*a<<8|(n[u]-o)*a;else if(i&&i.length===x)for(u=0;u<x;u++)f=(n[u]-o)*a,i[u]&&(y[u]=255<<24|f<<16|f<<8|f);else for(u=0;u<x;u++)f=(n[u]-o)*a,y[u]=255<<24|f<<16|f<<8|f}else p.error("getAsRGBA()","Unable to convert to RGBA. The input pixel block is empty.")},e.prototype._fillFrom32Bit=function(t){var e,i,s,r,a=this.pixels,o=this.mask;if(!t||!a||!a.length)return p.error("getAsRGBAFloat()","Unable to convert to RGBA. The input pixel block is empty.");e=i=s=a[0],a.length>=3?(i=a[1],s=a[2]):2===a.length&&(i=a[1]);var l=this.width*this.height;if(e.length!==l)return p.error("getAsRGBAFloat()","Unable to convert to RGBA. The pixelblock is invalid.");var n=0;if(o&&o.length===l)for(r=0;r<l;r++)t[n++]=e[r],t[n++]=i[r],t[n++]=s[r],t[n++]=1&o[r];else for(r=0;r<l;r++)t[n++]=e[r],t[n++]=i[r],t[n++]=s[r],t[n++]=1},e.prototype._calculateBandStatistics=function(t,e){var i,s=1/0,r=-1/0,a=t.length,o=0;if(e)for(i=0;i<a;i++)e[i]&&(s=(o=t[i])<s?o:s,r=o>r?o:r);else for(i=0;i<a;i++)s=(o=t[i])<s?o:s,r=o>r?o:r;return{minValue:s,maxValue:r}},s([h.property({json:{write:!0}})],e.prototype,"width",void 0),s([h.property({json:{write:!0}})],e.prototype,"height",void 0),s([h.property({json:{write:!0}})],e.prototype,"pixelType",void 0),s([h.cast("pixelType")],e.prototype,"castPixelType",null),s([h.property({json:{write:!0}})],e.prototype,"validPixelCount",void 0),s([h.property({json:{write:!0}})],e.prototype,"mask",void 0),s([h.property({json:{write:!0}})],e.prototype,"maskIsAlpha",void 0),s([h.property({json:{write:!0}})],e.prototype,"pixels",void 0),s([h.property({json:{write:!0}})],e.prototype,"statistics",void 0),e=o=s([h.subclass("esri.layers.support.PixelBlock")],e)}(h.declared(o.JSONSupport))}));