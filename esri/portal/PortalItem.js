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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","../core/Error","../core/JSONSupport","../core/lang","../core/Loadable","../core/maybe","../core/promiseUtils","../core/urlUtils","../core/accessorSupport/decorators","../core/accessorSupport/ensureType","../geometry/Extent","./Portal","./PortalRating"],(function(e,t,r,o,i,n,a,p,l,s,c,u,d,y,m,g,h){return function(t){function a(e){var r=t.call(this,e)||this;return r.access=null,r.accessInformation=null,r.applicationProxies=null,r.avgRating=null,r.categories=null,r.created=null,r.culture=null,r.description=null,r.extent=null,r.groupCategories=null,r.id=null,r.itemControl=null,r.licenseInfo=null,r.modified=null,r.name=null,r.numComments=null,r.numRatings=null,r.numViews=null,r.owner=null,r.ownerFolder=null,r.portal=null,r.screenshots=null,r.size=null,r.snippet=null,r.sourceJSON=null,r.tags=null,r.title=null,r.type=null,r.typeKeywords=null,r.url=null,r}var l;return r(a,t),l=a,a.from=function(e){return y.ensureClass(l,e)},Object.defineProperty(a.prototype,"displayName",{get:function(){var e=this.type,t=this.typeKeywords||[],r=e;return"Feature Service"===e||"Feature Collection"===e?r=t.indexOf("Table")>-1?"Table":t.indexOf("Route Layer")>-1?"Route Layer":t.indexOf("Markup")>-1?"Markup":"Feature Layer":"Image Service"===e?r=t.indexOf("Elevation 3D Layer")>-1?"Elevation Layer":"Imagery Layer":"Scene Service"===e?r="Scene Layer":"Scene Package"===e?r="Scene Layer Package":"Stream Service"===e?r="Feature Layer":"Geoprocessing Service"===e&&this.portal&&this.portal.isPortal?r=t.indexOf("Web Tool")>-1?"Tool":"Geoprocessing Service":"Geocoding Service"===e?r="Locator":"Microsoft Powerpoint"===e?r="Microsoft PowerPoint":"GeoJson"===e?r="GeoJSON":"Globe Service"===e?r="Globe Layer":"Vector Tile Service"===e?r="Tile Layer":"netCDF"===e?r="NetCDF":"Map Service"===e?r=-1===t.indexOf("Spatiotemporal")&&(t.indexOf("Hosted Service")>-1||t.indexOf("Tiled")>-1)&&-1===t.indexOf("Relational")?"Tile Layer":"Map Image Layer":e&&e.toLowerCase().indexOf("add in")>-1?r=e.replace(/(add in)/gi,"Add-In"):"datastore catalog service"===e?r="Big Data File Share":"Compact Tile Package"===e&&(r="Tile Package (tpkx)"),r},enumerable:!0,configurable:!0}),a.prototype.readExtent=function(e){return e&&e.length?new m(e[0][0],e[0][1],e[1][0],e[1][1]):null},Object.defineProperty(a.prototype,"iconUrl",{get:function(){var t,r=this.type&&this.type.toLowerCase()||"",o=this.typeKeywords||[],i=!1,n=!1,a=!1,p=!1,l=!1;return r.indexOf("service")>0||"feature collection"===r||"kml"===r||"wms"===r||"wmts"===r||"wfs"===r?(i=o.indexOf("Hosted Service")>-1,"feature service"===r||"feature collection"===r||"kml"===r||"wfs"===r?(n=o.indexOf("Table")>-1,a=o.indexOf("Route Layer")>-1,p=o.indexOf("Markup")>-1,t=(l=-1!==o.indexOf("Spatiotemporal"))&&n?"spatiotemporaltable":n?"table":a?"routelayer":p?"markup":l?"spatiotemporal":i?"featureshosted":"features"):t="map service"===r||"wms"===r||"wmts"===r?i||o.indexOf("Tiled")>-1||"wmts"===r?"maptiles":"mapimages":"scene service"===r?o.indexOf("Line")>-1?"sceneweblayerline":o.indexOf("3DObject")>-1?"sceneweblayermultipatch":o.indexOf("Point")>-1?"sceneweblayerpoint":o.indexOf("IntegratedMesh")>-1?"sceneweblayermesh":o.indexOf("PointCloud")>-1?"sceneweblayerpointcloud":o.indexOf("Polygon")>-1?"sceneweblayerpolygon":o.indexOf("Building")>-1?"sceneweblayerbuilding":"sceneweblayer":"image service"===r?o.indexOf("Elevation 3D Layer")>-1?"elevationlayer":"imagery":"stream service"===r?"streamlayer":"vector tile service"===r?"vectortile":"datastore catalog service"===r?"datastorecollection":"geocoding service"===r?"geocodeservice":"geoprocessing service"===r&&o.indexOf("Web Tool")>-1&&this.portal&&this.portal.isPortal?"tool":"layers"):t="web map"===r||"cityengine web scene"===r?"maps":"web scene"===r?o.indexOf("ViewingMode-Local")>-1?"webscenelocal":"websceneglobal":"web mapping application"===r||"mobile application"===r||"application"===r||"operation view"===r||"desktop application"===r?"apps":"map document"===r||"map package"===r||"published map"===r||"scene document"===r||"globe document"===r||"basemap package"===r||"mobile basemap package"===r||"mobile map package"===r||"project package"===r||"project template"===r||"pro map"===r||"layout"===r||"layer"===r&&o.indexOf("ArcGIS Pro")>-1||"explorer map"===r&&o.indexOf("Explorer Document")?"mapsgray":"service definition"===r||"csv"===r||"shapefile"===r||"cad drawing"===r||"geojson"===r||"360 vr experience"===r||"netcdf"===r?"datafiles":"explorer add in"===r||"desktop add in"===r||"windows viewer add in"===r||"windows viewer configuration"===r?"appsgray":"arcgis pro add in"===r||"arcgis pro configuration"===r?"addindesktop":"rule package"===r||"file geodatabase"===r||"sqlite geodatabase"===r||"csv collection"===r||"kml collection"===r||"windows mobile package"===r||"map template"===r||"desktop application template"===r||"arcpad package"===r||"code sample"===r||"form"===r||"document link"===r||"operations dashboard add in"===r||"rules package"===r||"image"===r||"workflow manager package"===r||"explorer map"===r&&o.indexOf("Explorer Mapping Application")>-1||o.indexOf("Document")>-1?"datafilesgray":"network analysis service"===r||"geoprocessing service"===r||"geodata service"===r||"geometry service"===r||"geoprocessing package"===r||"locator package"===r||"geoprocessing sample"===r||"workflow manager service"===r?"toolsgray":"layer"===r||"layer package"===r||"explorer layer"===r?"layersgray":"scene package"===r?"scenepackage":"mobile scene package"===r?"mobilescenepackage":"tile package"===r||"compact tile package"===r?"tilepackage":"task file"===r?"taskfile":"report template"===r?"report-template":"statistical data collection"===r?"statisticaldatacollection":"insights workbook"===r?"workbook":"insights model"===r?"insightsmodel":"insights page"===r?"insightspage":"insights theme"===r?"insightstheme":"hub initiative"===r?"hubinitiative":"hubpage"===r?"hubpage":"hub site application"===r?"hubsite":"relational database connection"===r?"relationaldatabaseconnection":"big data file share"===r?"datastorecollection":"image collection"===r?"imagecollection":"style"===r?"style":"desktop style"===r?"desktopstyle":"dashboard"===r?"dashboard":"raster function template"===r?"rasterprocessingtemplate":"vector tile package"===r?"vectortilepackage":"ortho mapping project"===r?"orthomappingproject":"ortho mapping template"===r?"orthomappingtemplate":"solution"===r?"solutions":"geopackage"===r?"geopackage":"deep learning package"===r?"deeplearningpackage":"real time analytic"===r?"realtimeanalytics":"big data analytic"===r?"bigdataanalytics":"feed"===r?"feed":"excalibur imagery project"===r?"excaliburimageryproject":"notebook"===r?"notebook":"storymap"===r?"storymap":"survey123 add in"===r?"survey123addin":"mission"===r?"mission":"quickcapture project"===r?"quickcaptureproject":"pro report"===r?"proreport":"urban model"===r?"urbanmodel":"web experience"===r?"experiencebuilder":"web experience template"===r?"webexperiencetemplate":"workflow"===r?"workflow":"insights script"===r?"insightsscript":"kernel gateway connection"===r?"kernelgatewayconnection":"hub initiative template"===r?"hubinitiativetemplate":"maps",t?e.toUrl("../images/portal/"+t+"16.png"):null},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"isLayer",{get:function(){return["Map Service","Feature Service","Feature Collection","Scene Service","Image Service","Stream Service","Vector Tile Service","WMTS","WMS"].indexOf(this.type)>-1},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"itemUrl",{get:function(){var e=this.get("portal.restUrl");return e?e+"/content/items/"+this.id:null},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"thumbnailUrl",{get:function(){var e=this.itemUrl,t=this.thumbnail;return e&&t?this.portal._normalizeUrl(e+"/info/"+t+"?f=json"):null},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"userItemUrl",{get:function(){var e=this.get("portal.restUrl");if(!e)return null;var t=this.owner||this.get("portal.user.username");return t?e+"/content/users/"+(this.ownerFolder?t+"/"+this.ownerFolder:t)+"/items/"+this.id:null},enumerable:!0,configurable:!0}),a.prototype.load=function(e){var t=this;this.portal||(this.portal=g.getDefault());var r=this.portal.load(e).then((function(){return t.sourceJSON?t.sourceJSON:t.id&&t.itemUrl?t.portal._request(t.itemUrl,{signal:s.isSome(e)?e.signal:null}):{}})).then((function(e){t.sourceJSON=e,t.read(e)}));return this.addResolvingPromise(r),c.resolve(this)},a.prototype.addRating=function(e){var t={method:"post",query:{}};return e instanceof h&&(e=e.rating),isNaN(e)||"number"!=typeof e||(t.query.rating=e),this.portal._request(this.itemUrl+"/addRating",t).then((function(){return new h({rating:e,created:new Date})}))},a.prototype.clone=function(){var e={access:this.access,accessInformation:this.accessInformation,applicationProxies:p.clone(this.applicationProxies),avgRating:this.avgRating,categories:p.clone(this.categories),created:p.clone(this.created),culture:this.culture,description:this.description,extent:p.clone(this.extent),groupCategories:p.clone(this.groupCategories),id:this.id,itemControl:this.itemControl,licenseInfo:this.licenseInfo,modified:p.clone(this.modified),name:this.name,numComments:this.numComments,numRatings:this.numRatings,numViews:this.numViews,owner:this.owner,ownerFolder:this.ownerFolder,portal:this.portal,screenshots:p.clone(this.screenshots),size:this.size,snippet:this.snippet,tags:p.clone(this.tags),thumbnail:this.thumbnail,title:this.title,type:this.type,typeKeywords:p.clone(this.typeKeywords),url:this.url};return this.loaded&&(e.loadStatus="loaded"),new l({sourceJSON:this.sourceJSON}).set(e)},a.prototype.createPostQuery=function(){var e=this.toJSON();for(var t in e)"tags"===t&&null!==e[t]&&(e[t]=e[t].join(", ")),"typeKeywords"===t&&null!==e[t]&&(e[t]=e[t].join(", ")),"extent"===t&&e[t]&&(e[t]=JSON.stringify(e[t]));return e},a.prototype.deleteRating=function(){return this.portal._request(this.itemUrl+"/deleteRating",{method:"post"}).then((function(){}))},a.prototype.fetchData=function(e,t){return void 0===e&&(e="json"),this.portal._request(this.itemUrl+"/data",i({responseType:e},t))},a.prototype.fetchRating=function(e){return this.portal._request(this.itemUrl+"/rating",e).then((function(e){return null!=e.rating?(e.created=new Date(e.created),new h(e)):null}))},a.prototype.fetchRelatedItems=function(e,t){return this.portal._requestToTypedArray(this.itemUrl+"/relatedItems",i({query:e},t),"PortalItem")},a.prototype.getThumbnailUrl=function(e){var t=this.thumbnailUrl;return t&&e&&(t+="&w="+e),t},a.prototype.reload=function(){var e=this;return this.portal._request(this.itemUrl,{cacheBust:!0}).then((function(t){return e.sourceJSON=t,e.read(t),e}))},a.prototype.update=function(e){var t=this;return this.id?this.load().then((function(){return t.portal._signIn()})).then((function(){var r=e&&e.data,o={method:"post"};for(var i in o.query=t.createPostQuery(),o.query)null===o.query[i]&&(o.query[i]="");return o.query.clearEmptyFields=!0,null!=r&&("string"==typeof r?o.query.text=r:"object"==typeof r&&(o.query.text=JSON.stringify(r))),t.portal._request(t.userItemUrl+"/update",o).then((function(){return t.reload()}))})):c.reject(new n("portal:item-does-not-exist","The item does not exist yet and cannot be updated"))},a.prototype.updateThumbnail=function(e){var t=this;return this.id?this.load().then((function(){return t.portal._signIn()})).then((function(){var r=e.thumbnail,o=e.filename,i={method:"post"};if("string"==typeof r)u.isDataProtocol(r)?i.query={data:r}:i.query={url:u.makeAbsolute(r)},s.isSome(o)&&(i.query.filename=o);else{var n=new FormData;s.isSome(o)?n.append("file",r,o):n.append("file",r),i.body=n}return t.portal._request(t.userItemUrl+"/updateThumbnail",i).then((function(){return t.reload()}))})):c.reject(new n("portal:item-does-not-exist","The item does not exist yet and cannot be updated"))},a.prototype.toJSON=function(){var e=this.extent,t={created:this.created&&this.created.getTime(),description:this.description,extent:e&&[[e.xmin,e.ymin],[e.xmax,e.ymax]],id:this.id,modified:this.modified&&this.modified.getTime(),name:this.name,owner:this.owner,ownerFolder:this.ownerFolder,snippet:this.snippet,tags:this.tags,thumbnail:this.thumbnail,title:this.title,type:this.type,typeKeywords:this.typeKeywords,url:this.url};return p.fixJson(t)},a.fromJSON=function(e){if(!e)return null;if(e.declaredClass)throw new Error("JSON object is already hydrated");return new l({sourceJSON:e})},a.prototype._getPostQuery=function(){var e=this.toJSON();for(var t in e)"tags"===t&&null!==e[t]&&(e[t]=e[t].join(", ")),"typeKeywords"===t&&null!==e[t]&&(e[t]=e[t].join(", ")),"extent"===t&&e[t]&&(e[t]=JSON.stringify(e[t]));return e},o([d.property()],a.prototype,"access",void 0),o([d.property()],a.prototype,"accessInformation",void 0),o([d.property({json:{read:{source:"appProxies"}}})],a.prototype,"applicationProxies",void 0),o([d.property()],a.prototype,"avgRating",void 0),o([d.property()],a.prototype,"categories",void 0),o([d.property({type:Date})],a.prototype,"created",void 0),o([d.property()],a.prototype,"culture",void 0),o([d.property()],a.prototype,"description",void 0),o([d.property({dependsOn:["type","typeKeywords"],readOnly:!0})],a.prototype,"displayName",null),o([d.property({type:m})],a.prototype,"extent",void 0),o([d.reader("extent")],a.prototype,"readExtent",null),o([d.property()],a.prototype,"groupCategories",void 0),o([d.property({dependsOn:["type","typeKeywords"],readOnly:!0})],a.prototype,"iconUrl",null),o([d.property()],a.prototype,"id",void 0),o([d.property({dependsOn:["type"],readOnly:!0})],a.prototype,"isLayer",null),o([d.property()],a.prototype,"itemControl",void 0),o([d.property({dependsOn:["portal.restUrl","id"],readOnly:!0})],a.prototype,"itemUrl",null),o([d.property()],a.prototype,"licenseInfo",void 0),o([d.property({type:Date})],a.prototype,"modified",void 0),o([d.property()],a.prototype,"name",void 0),o([d.property()],a.prototype,"numComments",void 0),o([d.property()],a.prototype,"numRatings",void 0),o([d.property()],a.prototype,"numViews",void 0),o([d.property()],a.prototype,"owner",void 0),o([d.property()],a.prototype,"ownerFolder",void 0),o([d.property({type:g})],a.prototype,"portal",void 0),o([d.property()],a.prototype,"screenshots",void 0),o([d.property()],a.prototype,"size",void 0),o([d.property()],a.prototype,"snippet",void 0),o([d.property()],a.prototype,"sourceJSON",void 0),o([d.property()],a.prototype,"tags",void 0),o([d.property()],a.prototype,"thumbnail",void 0),o([d.property({dependsOn:["itemUrl","thumbnail","portal.credential.token"],readOnly:!0})],a.prototype,"thumbnailUrl",null),o([d.property()],a.prototype,"title",void 0),o([d.property()],a.prototype,"type",void 0),o([d.property()],a.prototype,"typeKeywords",void 0),o([d.property()],a.prototype,"url",void 0),o([d.property({dependsOn:["portal.restUrl","portal.user.username","owner","ownerFolder","id"],readOnly:!0})],a.prototype,"userItemUrl",null),a=l=o([d.subclass("esri.portal.PortalItem")],a)}(d.declared(a.JSONSupportMixin(l)))}));