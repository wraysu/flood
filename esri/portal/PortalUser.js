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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/Error","../core/JSONSupport","../core/promiseUtils","../core/accessorSupport/decorators","./PortalFolder","./PortalGroup"],(function(r,t,e,o,n,p,l,u,i,a){return function(t){function p(){var r=t.call(this)||this;return r.access=null,r.created=null,r.culture=null,r.description=null,r.email=null,r.fullName=null,r.modified=null,r.orgId=null,r.portal=null,r.preferredView=null,r.privileges=null,r.region=null,r.role=null,r.roleId=null,r.sourceJSON=null,r.units=null,r.username=null,r.userType=null,r}var s;return e(p,t),s=p,Object.defineProperty(p.prototype,"thumbnailUrl",{get:function(){var r=this.url,t=this.thumbnail;return r&&t?this.portal._normalizeUrl(r+"/info/"+t+"?f=json"):null},enumerable:!0,configurable:!0}),Object.defineProperty(p.prototype,"userContentUrl",{get:function(){var r=this.get("portal.restUrl");return r?r+"/content/users/"+this.username:null},enumerable:!0,configurable:!0}),Object.defineProperty(p.prototype,"url",{get:function(){var r=this.get("portal.restUrl");return r?r+"/community/users/"+this.username:null},enumerable:!0,configurable:!0}),p.prototype.addItem=function(r){var t=this,e=r&&r.item,o=r&&r.data,n=r&&r.folder,p={method:"post"};e&&(p.query=e.createPostQuery(),null!=o&&("string"==typeof o?p.query.text=o:"object"==typeof o&&(p.query.text=JSON.stringify(o))));var l=this.userContentUrl;return n&&(l+="/"+("string"==typeof n?n:n.id)),this.portal._request(l+"/addItem",p).then((function(r){return e.id=r.id,e.portal=t.portal,e.loaded?e.reload():e.load()}))},p.prototype.deleteItem=function(r){var t=this.userContentUrl;return r.ownerFolder&&(t+="/"+r.ownerFolder),this.portal._request(t+"/items/"+r.id+"/delete",{method:"post"}).then((function(){r.id=null,r.portal=null}))},p.prototype.deleteItems=function(r){var t=this.userContentUrl+"/deleteItems",e=r.map((function(r){return r.id}));if(e.length){var o={method:"post",query:{items:e.join(",")}};return this.portal._request(t,o).then((function(){r.forEach((function(r){r.id=null,r.portal=null}))}))}return l.resolve(void 0)},p.prototype.fetchFolders=function(){var r=this;return this.portal._request(this.userContentUrl,{query:{num:1}}).then((function(t){return t&&t.folders?t.folders.map((function(t){var e=i.fromJSON(t);return e.portal=r.portal,e})):[]}))},p.prototype.fetchGroups=function(){var r=this;return this.portal._request(this.url).then((function(t){return t&&t.groups?t.groups.map((function(t){var e=a.fromJSON(t);return e.portal=r.portal,e})):[]}))},p.prototype.fetchItems=function(t){var e=this;t||(t={});var o,n=this.userContentUrl;return t.folder&&(n+="/"+t.folder.id),l.create((function(t){return r(["./PortalItem"],t)})).then((function(r){o=r;var p={folders:!1,num:t.num||10,start:t.start||1,sortField:t.sortField||"created",sortOrder:t.sortOrder||"asc"};return e.portal._request(n,{query:p})})).then((function(r){var t;return r&&r.items?(t=r.items.map((function(r){var t=o.fromJSON(r);return t.portal=e.portal,t})),l.all(t.map((function(r){return r.load()}))).catch((function(r){return r})).then((function(){return{items:t,nextStart:r.nextStart,total:r.total}}))):{items:[],nextStart:-1,total:0}}))},p.prototype.fetchTags=function(){return this.portal._request(this.url+"/tags").then((function(r){return r.tags}))},p.prototype.getThumbnailUrl=function(r){var t=this.thumbnailUrl;return t&&r&&(t+="&w="+r),t},p.prototype.queryFavorites=function(r){return this.favGroupId?(this._favGroup||(this._favGroup=new a({id:this.favGroupId,portal:this.portal})),this._favGroup.queryItems(r)):l.reject(new n("internal:unknown","Unknown internal error",{internalError:"Unknown favGroupId"}))},p.prototype.toJSON=function(){throw new n("internal:not-yet-implemented","PortalGroup.toJSON is not yet implemented")},p.fromJSON=function(r){if(!r)return null;if(r.declaredClass)throw new Error("JSON object is already hydrated");var t=new s;return t.sourceJSON=r,t.read(r),t},o([u.property()],p.prototype,"access",void 0),o([u.property({type:Date})],p.prototype,"created",void 0),o([u.property()],p.prototype,"culture",void 0),o([u.property()],p.prototype,"description",void 0),o([u.property()],p.prototype,"email",void 0),o([u.property()],p.prototype,"favGroupId",void 0),o([u.property()],p.prototype,"fullName",void 0),o([u.property({type:Date})],p.prototype,"modified",void 0),o([u.property()],p.prototype,"orgId",void 0),o([u.property()],p.prototype,"portal",void 0),o([u.property()],p.prototype,"preferredView",void 0),o([u.property()],p.prototype,"privileges",void 0),o([u.property()],p.prototype,"region",void 0),o([u.property()],p.prototype,"role",void 0),o([u.property()],p.prototype,"roleId",void 0),o([u.property()],p.prototype,"sourceJSON",void 0),o([u.property()],p.prototype,"thumbnail",void 0),o([u.property({dependsOn:["url","thumbnail","portal.credential.token"],readOnly:!0})],p.prototype,"thumbnailUrl",null),o([u.property()],p.prototype,"units",void 0),o([u.property({dependsOn:["portal.restUrl"],readOnly:!0})],p.prototype,"userContentUrl",null),o([u.property({dependsOn:["portal.restUrl"],readOnly:!0})],p.prototype,"url",null),o([u.property()],p.prototype,"username",void 0),o([u.property()],p.prototype,"userType",void 0),p=s=o([u.subclass("esri.portal.PortalUser")],p)}(u.declared(p.JSONSupport))}));