/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.21/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../geometry","../../Graphic","../../core/jsonMap","../../core/JSONSupport","../../core/maybe","../../core/accessorSupport/decorators/property","../../core/has","../../core/accessorSupport/ensureType","../../core/Logger","../../core/accessorSupport/decorators/reader","../../core/accessorSupport/decorators/subclass","../../core/accessorSupport/decorators/writer","../../geometry/SpatialReference","../../geometry/support/jsonUtils","../../layers/support/Field"],(function(e,t,r,o,n,i,s,p,a,l,y,c,u,f,m,d,g){"use strict";const h=new n.JSONMap({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryEnvelope:"extent",mesh:"mesh","":null});let _=function(t){function r(e){var r;return(r=t.call(this,e)||this).displayFieldName=null,r.exceededTransferLimit=!1,r.features=[],r.fields=null,r.geometryType=null,r.hasM=!1,r.hasZ=!1,r.queryGeometry=null,r.spatialReference=null,r}e._inheritsLoose(r,t);var n=r.prototype;return n.readFeatures=function(e,t){const r=m.fromJSON(t.spatialReference),n=[];for(let i=0;i<e.length;i++){const t=e[i],p=o.fromJSON(t),a=t.geometry&&t.geometry.spatialReference;s.isSome(p.geometry)&&!a&&(p.geometry.spatialReference=r),n.push(p)}return n},n.writeGeometryType=function(e,t,r,o){if(e)return void h.write(e,t,r,o);const{features:n}=this;if(n)for(const i of n)if(i&&s.isSome(i.geometry))return void h.write(i.geometry.type,t,r,o)},n.readQueryGeometry=function(e,t){if(!e)return null;const r=!!e.spatialReference,o=d.fromJSON(e);return!r&&t.spatialReference&&(o.spatialReference=m.fromJSON(t.spatialReference)),o},n.writeSpatialReference=function(e,t){if(e)return void(t.spatialReference=e.toJSON());const{features:r}=this;if(r)for(const o of r)if(o&&s.isSome(o.geometry)&&o.geometry.spatialReference)return void(t.spatialReference=o.geometry.spatialReference.toJSON())},n.toJSON=function(e){const t=this.write(null);if(t.features&&Array.isArray(e)&&e.length>0)for(let r=0;r<t.features.length;r++){const o=t.features[r];if(o.geometry){const t=e&&e[r];o.geometry=t&&t.toJSON()||o.geometry}}return t},n.quantize=function(e){const{scale:[t,r],translate:[o,n]}=e,i=e=>Math.round((e-o)/t),p=e=>Math.round((n-e)/r),a=this.features,l=this._getQuantizationFunction(this.geometryType,i,p);for(let y=0,c=a.length;y<c;y++)l(s.unwrap(a[y].geometry))||(a.splice(y,1),y--,c--);return this.transform=e,this},n.unquantize=function(){const{geometryType:e,features:t,transform:r}=this;if(!r)return this;const{translate:[o,n],scale:[i,p]}=r,a=e=>e*i+o,l=e=>n-e*p,y=this._getHydrationFunction(e,a,l);for(const{geometry:c}of t)s.isSome(c)&&y(c);return this.transform=null,this},n._quantizePoints=function(e,t,r){let o,n;const i=[];for(let s=0,p=e.length;s<p;s++){const p=e[s];if(s>0){const e=t(p[0]),s=r(p[1]);e===o&&s===n||(i.push([e-o,s-n]),o=e,n=s)}else o=t(p[0]),n=r(p[1]),i.push([o,n])}return i.length>0?i:null},n._getQuantizationFunction=function(e,t,r){return"point"===e?e=>(e.x=t(e.x),e.y=r(e.y),e):"polyline"===e||"polygon"===e?e=>{const o=d.isPolygon(e)?e.rings:e.paths,n=[];for(let i=0,s=o.length;i<s;i++){const e=o[i],s=this._quantizePoints(e,t,r);s&&n.push(s)}return n.length>0?(d.isPolygon(e)?e.rings=n:e.paths=n,e):null}:"multipoint"===e?e=>{const o=this._quantizePoints(e.points,t,r);return o.length>0?(e.points=o,e):null}:"extent"===e?e=>e:null},n._getHydrationFunction=function(e,t,r){return"point"===e?e=>{e.x=t(e.x),e.y=r(e.y)}:"polyline"===e||"polygon"===e?e=>{const o=d.isPolygon(e)?e.rings:e.paths;let n,i;for(let s=0,p=o.length;s<p;s++){const e=o[s];for(let o=0,s=e.length;o<s;o++){const s=e[o];o>0?(n+=s[0],i+=s[1]):(n=s[0],i=s[1]),s[0]=t(n),s[1]=r(i)}}}:"extent"===e?e=>{e.xmin=t(e.xmin),e.ymin=r(e.ymin),e.xmax=t(e.xmax),e.ymax=r(e.ymax)}:"multipoint"===e?e=>{const o=e.points;let n,i;for(let s=0,p=o.length;s<p;s++){const e=o[s];s>0?(n+=e[0],i+=e[1]):(n=e[0],i=e[1]),e[0]=t(n),e[1]=r(i)}}:void 0},r}(i.JSONSupport);return t.__decorate([p.property({type:String,json:{write:!0}})],_.prototype,"displayFieldName",void 0),t.__decorate([p.property({type:Boolean,json:{write:{overridePolicy:e=>({enabled:e})}}})],_.prototype,"exceededTransferLimit",void 0),t.__decorate([p.property({type:[o],json:{write:!0}})],_.prototype,"features",void 0),t.__decorate([c.reader("features")],_.prototype,"readFeatures",null),t.__decorate([p.property({type:[g],json:{write:!0}})],_.prototype,"fields",void 0),t.__decorate([p.property({type:["point","multipoint","polyline","polygon","extent","mesh"],json:{read:{reader:h.read}}})],_.prototype,"geometryType",void 0),t.__decorate([f.writer("geometryType")],_.prototype,"writeGeometryType",null),t.__decorate([p.property({type:Boolean,json:{write:{overridePolicy:e=>({enabled:e})}}})],_.prototype,"hasM",void 0),t.__decorate([p.property({type:Boolean,json:{write:{overridePolicy:e=>({enabled:e})}}})],_.prototype,"hasZ",void 0),t.__decorate([p.property({types:r.geometryTypes,json:{write:!0}})],_.prototype,"queryGeometry",void 0),t.__decorate([c.reader("queryGeometry")],_.prototype,"readQueryGeometry",null),t.__decorate([p.property({type:m,json:{write:!0}})],_.prototype,"spatialReference",void 0),t.__decorate([f.writer("spatialReference")],_.prototype,"writeSpatialReference",null),t.__decorate([p.property({json:{write:!0}})],_.prototype,"transform",void 0),_=t.__decorate([u.subclass("esri.rest.support.FeatureSet")],_),_.prototype.toJSON.isDefaultToJSON=!0,_||(_={}),_}));