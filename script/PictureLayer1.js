
/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define([
    "esri/chunks/_rollupPluginBabelHelpers",
    "esri/chunks/tslib.es6", "esri/core/has",
    "esri/core/maybe", "esri/core/Logger",
    "esri/core/accessorSupport/ensureType",
    "esri/core/accessorSupport/decorators/property",
    "esri/core/accessorSupport/decorators/reader",
    "esri/core/accessorSupport/decorators/subclass",
    "esri/core/accessorSupport/decorators/writer",
    "esri/core/Error",
    "esri/core/urlUtils",
    "esri/core/uuid",
    "esri/core/accessorSupport/PropertyOrigin",
    "esri/portal/support/resourceExtension",
    "esri/core/promiseUtils",
    "esri/geometry/Extent",
    "esri/request",
    "esri/core/loadAll",
    "esri/layers/Layer",
    "esri/TimeExtent",
    "esri/core/MultiOriginJSONSupport",
    "esri/layers/support/commonProperties",
    "esri/layers/mixins/OperationalLayer",
    "esri/layers/mixins/ArcGISService",
    "esri/layers/mixins/BlendLayer",
    "esri/layers/mixins/CustomParametersMixin",
    "esri/layers/mixins/PortalLayer",
    "esri/layers/mixins/RefreshableLayer",
    "esri/layers/mixins/ScaleRangeLayer",
    "esri/layers/mixins/TemporalLayer",
    "esri/core/HandleOwner",
    "esri/geometry/support/scaleUtils",
    "esri/layers/mixins/ArcGISMapService",
    "esri/layers/support/Sublayer",
    "esri/layers/support/sublayerUtils",
    "esri/layers/mixins/SublayersOwner",
    "esri/layers/support/ExportImageParameters"],
    (function (e, r, t, o, a, i, s, n, p, l, c, u, y, d, m, h, g, S, b, f, v, x, _, O, w, L, I, M, E, P, q, R, N, T, A, J, j, U) {
        "use strict";
        let F = function (r) {
            function t(...e) {
                var t;
                return (t = r.call(this, ...e) || this).alwaysRefetch = !1, t.dpi = 96, t.gdbVersion = null, t.imageFormat = "png24", t.imageMaxHeight = 2048, t.imageMaxWidth = 2048, t.imageTransparency = !0, t.labelsVisible = !1, t.isReference = null, t.operationalLayerType = "ArcGISMapServiceLayer", t.sourceJSON = null, t.sublayers = null, t.type = "map-image", t.url = null, t.type = 'map-image', t.url = null, t.pictureExtent = null, t.units = 'esriMeters', t.debounce = 200, t.multiple = 100, t.canvas = document.createElement('canvas'), t.canvasContext = t.canvas.getContext('2d'), t._timer = 0, t._lastImage = null, t._lastImageUTag = null, t._picture = null, t
            }
            e._inheritsLoose(t, r);
            var a = t.prototype;
            return a.normalizeCtorArgs = function (e, r) {
                return "string" == typeof e ? {
                    url: e,
                    ...r
                } : e
            }, a.load = function (e) {
                
                let pl = this;
                this.sourceJSON = this._setupSourceJSON(this.spatialReference, this.pictureExtent, this.units);
                let temp = new Image();
                temp.crossOrigin = 'Anonymous';
                temp.alt = 'map-picture';
                temp.src = this.url;
                temp.onload = function(ev) {
                    pl._picture = temp;
                };
                const r = o.isSome(e) ? e.signal : null;
            //    var b = this, c = h.isSome(a) ? a.signal : null;
                return this.addResolvingPromise(this.loadFromPortal({
                    supportedTypes: ["Map Service"]
                }, e).then((() => this._fetchService(r)), (() => this._fetchService(r)))), h.resolve(this)
            }, a.readImageFormat = function (e, r) {
                const t = r.supportedImageFormatTypes;
                return t && t.indexOf("PNG32") > -1 ? "png32" : "png24"
            }, a.writeSublayers = function (e, r, t, o) {
                if (!this.loaded || !e) return;
                const a = e.slice().reverse().flatten((({
                    sublayers: e
                }) => e && e.toArray().reverse())).toArray();
                let i = !1;
                if (this.capabilities && this.capabilities.operations.supportsExportMap && this.capabilities.exportMap.supportsDynamicLayers) {
                    const e = d.nameToId(o.origin);
                    if (3 === e) {
                        const e = this.createSublayersForOrigin("service").sublayers;
                        i = J.shouldWriteSublayerStructure(a, e, 2)
                    } else if (e > 3) {
                        const e = this.createSublayersForOrigin("portal-item");
                        i = J.shouldWriteSublayerStructure(a, e.sublayers, d.nameToId(e.origin))
                    }
                }
                const s = [],
                    n = {
                        writeSublayerStructure: i,
                        ...o
                    };
                let p = i;
                a.forEach((e => {
                    const r = e.write({}, n);
                    s.push(r), p = p || "user" === e.originOf("visible")
                }));
                s.some((e => Object.keys(e).length > 1)) && (r.layers = s), p && (r.visibleLayers = a.filter((e => e.visible)).map((e => e.id)))
            }, a.createExportImageParameters = function (e, r, t, o) {
                const a = o && o.pixelRatio || 1;
                e && this.version >= 10 && (e = e.clone().shiftCentralMeridian());
                const i = new U.ExportImageParameters({
                    layer: this,
                    scale: N.getScale({
                        extent: e,
                        width: r
                    }) * a
                }),
                    s = i.toJSON();
                i.destroy();
                const n = !o || !o.rotation || this.version < 10.3 ? {} : {
                    rotation: -o.rotation
                },
                    p = e && e.spatialReference,
                    l = p.wkid || JSON.stringify(p.toJSON());
                s.dpi *= a;
                const c = {};
                if (null != o && o.timeExtent) {
                    const {
                        start: e,
                        end: r
                    } = o.timeExtent.toJSON();
                    c.time = e && r && e === r ? "" + e : `${null == e ? "null" : e},${null == r ? "null" : r}`
                } else this.timeInfo && !this.timeInfo.hasLiveData && (c.time = "null,null");
                return {
                    bbox: e && e.xmin + "," + e.ymin + "," + e.xmax + "," + e.ymax,
                    bboxSR: l,
                    imageSR: l,
                    size: r + "," + t,
                    ...s,
                    ...n,
                    ...c
                }
            }, a.fetchImage = async function(a, b, c, d) {
                let start = new Date().getTime();
                let imageUTag = this._generateImageUTag(a, b, c);
                let bbox = a;
                let width = b;
                let height = c;
        
                /**
                 * 做防抖节流处理，
                 * 此处不处理会导致界面卡顿
                 */
                if (d.pixelRatio != 1 || start - this._timer < this.debounce) {
                  return;
                } else {
                  this._timer = start;
                }
        
                return new Promise(((resolve, reject) => {
                  let data = new Image();
                  data.crossOrigin = 'anonymous';
                  data.alt = 'map-picture';
        
                  if (imageUTag === this._lastImageUTag) {
                    data.src = this._lastImage;
                    resolve(data);
                  } else {
                    let overlayCanvas = this.canvas;
                    let ctx = this.canvasContext;
                    overlayCanvas.width = width;
                    overlayCanvas.height = height;
                    let mapBox, pictureBox;
                    mapBox = [bbox.xmin, bbox.ymin, bbox.xmax, bbox.ymax];
                    pictureBox = [this.pictureExtent.xmin, this.pictureExtent.ymin, this.pictureExtent.xmax, this.pictureExtent.ymax];
        
                    if (this.isRectCross(mapBox, pictureBox)) {
                      if (this._picture) {
                        ctx = this.draw(ctx, this._picture, width, height, mapBox, pictureBox);
                        data.src = overlayCanvas.toDataURL('image/png');
                        resolve(data);
                      } else {
                        let pl = this;
                        let temp = new Image();
                        temp.crossOrigin = 'Anonymous';
                        temp.alt = 'map-picture';
                        temp.src = this.url;
                        temp.onload = function(ev) {
                          pl._picture = temp;
                          ctx = pl.draw(ctx, pl._picture, width, height, mapBox, pictureBox);
                          data.src = overlayCanvas.toDataURL('image/png');
                          resolve(data);
                        };
                      }
                    } else {
                      ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
                      data.src = overlayCanvas.toDataURL('image/png');
                      resolve(data);
                    }
                  }
                })).then(data => {
                  this._lastImage = data.src;
                  this._lastImageUTag = imageUTag;
                  return data;
                }).catch(error => {
                  throw  error ;
                });
              }, a.draw = function(ctx, picture, width, height, mapBox, pictureBox) {
                let crossBox = this.crossRect(mapBox, pictureBox);
                let mapDx = width / (mapBox[2] - mapBox[0]);
                let mapDy = height / (mapBox[3] - mapBox[1]);
        
                let mapLeft = Math.ceil(mapDx * (crossBox[0] - mapBox[0]));
                let mapRight = Math.ceil(mapDx * (crossBox[2] - mapBox[0]));
                let mapTop = Math.ceil(mapDy * (mapBox[3] - crossBox[3]));
                let mapBottom = Math.ceil(mapDy * (mapBox[3] - crossBox[1]));
        
                let imgWidth = picture.width;
                let imgHeight = picture.height;
                let imgDx = imgWidth / (pictureBox[2] - pictureBox[0]);
                let imgDy = imgHeight / (pictureBox[3] - pictureBox[1]);
        
                let imgLeft = Math.ceil(imgDx * (crossBox[0] - pictureBox[0]));
                let imgRight = Math.ceil(imgDx * (crossBox[2] - pictureBox[0]));
                let imgTop = Math.ceil(imgDy * (pictureBox[3] - crossBox[3]));
                let imgBottom = Math.ceil(imgDy * (pictureBox[3] - crossBox[1]));
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(picture, imgLeft, imgTop, imgRight - imgLeft, imgBottom - imgTop, mapLeft, mapTop, mapRight - mapLeft, mapBottom - mapTop);
                return ctx;
              }, a.isRectCross = function(a, c) {
                return (a[0] > c[2] || a[2] < c[0] || a[1] > c[3] || a[3] < c[1]) ?
                  false :
                  true;
              }, a.crossRect = function(a, c) {
                let left = Math.max(a[0], c[0]);
                let right = Math.min(a[2], c[2]);
                let top = Math.min(a[3], c[3]);
                let bottom = Math.max(a[1], c[1]);
                return [left, bottom, right, top];
              }, a._generateImageUTag = function(a, b, c) {
                let width = b;
                let height = c;
                let left = Math.ceil(a.xmin / this.multiple) * this.multiple;
                let right = Math.ceil(a.xmax / this.multiple) * this.multiple;
                let top = Math.ceil(a.ymax / this.multiple) * this.multiple;
                let button = Math.ceil(a.ymin / this.multiple) * this.multiple;
                return `${width}_${height}_${left}_${right}_${top}_${button}`;
              }, a._setupSourceJSON = function(spatialReference, extent, units) {
                let json = {
                  currentVersion: '10.7',
                  serviceDescription: '',
                  mapName: 'Layers',
                  description: '',
                  copyrightText: '',
                  supportsDynamicLayers: true,
                  singleFusedMapCache: false,
                  minScale: 0,
                  maxScale: '0',
                  units: units,
                  supportedImageFormatTypes: 'PNG32,PNG24,PNG,JPG',
                  capabilities: 'Map',
                  supportedQueryFormats: 'JSON, AMF, geoJSON',
                  exportTilesAllowed: false,
                  supportsDatumTransformation: true,
                  maxRecordCount: 1000,
                  maxImageHeight: 4096,
                  maxImageWidth: 4096,
                  supportedExtensions: 'KmlServer',
                  layers: [
                    {
                      id: 0,
                      name: '' + (new Date()).valueOf() + '',
                      parentLayerId: -1,
                      subLayerIds: [],
                      minScale: 0,
                      maxScale: 0,
                      type: 'Raster Layer',
                    },
                  ],
                  tables: [],
                  spatialReference: spatialReference,
                  initialExtent: extent,
                  fullExtent: extent,
                  documentInfo: {
                    Title: '',
                    Author: '',
                    Comments: '',
                    Subject: '',
                    Category: '',
                    AntialiasingMode: 'None',
                    TextAntialiasingMode: 'Force',
                    Keywords: '',
                  },
                  datumTransformations: null,
                };
                return json;
              }, a.getImageUrl = function(a, b, c, d) {
                return null;
              }, a.importLayerViewModule = function(a) {
                return k(this, void 0,
                  void 0, function() {
                    return f(this, function(b) {
                      switch (a.type) {
                        case '2d':
                          return [2, g.create(function(a) {
                            return r(['esri/views/2d/layers/MapImageLayerView2D'], a);
                          })];
                        case '3d':
                          return [2, g.create(function(a) {
                            return r(['esri/views/3d/layers/MapImageLayerView3D'], a);
                          })];
                      }
                      return [2];
                    });
                  });
              }, a.fetchRecomputedExtents = async function (e = {}) {
                const r = {
                    ...e,
                    query: {
                        returnUpdates: !0,
                        f: "json"
                    }
                },
                    {
                        data: t
                    } = await S(this.url, r),
                    {
                        extent: o,
                        fullExtent: a,
                        timeExtent: i
                    } = t,
                    s = o || a;
                return {
                    fullExtent: s && g.fromJSON(s),
                    timeExtent: i && v.fromJSON({
                        start: i[0],
                        end: i[1]
                    })
                }
            }, a.loadAll = function () {
                return b.loadAll(this, (e => {
                    e(this.allSublayers)
                }))
            }, a._fetchService = async function (e) {
                if (this.sourceJSON) return void this.read(this.sourceJSON, {
                    origin: "service",
                    url: this.parsedUrl
                });
                const {
                    data: r,
                    ssl: t
                } = await S(this.parsedUrl.path, {
                    query: {
                        f: "json",
                        ...this.parsedUrl.query,
                        ...this.customParameters
                    },
                    signal: e
                });
                t && (this.url = this.url.replace(/^http:/i, "https:")), this.sourceJSON = r, this.read(r, {
                    origin: "service",
                    url: this.parsedUrl
                })
            }, t
        }(L.BlendLayer(q.TemporalLayer(P.ScaleRangeLayer(E.RefreshableLayer(j.SublayersOwner(T.ArcGISMapService(w.ArcGISService(O.OperationalLayer(M.PortalLayer(x.MultiOriginJSONMixin(I.CustomParametersMixin(R.HandleOwnerMixin(f)))))))))))));
        return r.__decorate([s.property()], F.prototype, "alwaysRefetch", void 0), r.__decorate([s.property()], F.prototype, "dpi", void 0), r.__decorate([s.property()], F.prototype, "gdbVersion", void 0), r.__decorate([s.property({
            json: {
                read: !1,
                write: !1
            }
        })], F.prototype, "popupEnabled", void 0), r.__decorate([s.property()], F.prototype, "imageFormat", void 0), r.__decorate([n.reader("imageFormat", ["supportedImageFormatTypes"])], F.prototype, "readImageFormat", null), r.__decorate([s.property({
            json: {
                origins: {
                    service: {
                        read: {
                            source: "maxImageHeight"
                        }
                    }
                }
            }
        })], F.prototype, "imageMaxHeight", void 0), r.__decorate([s.property({
            json: {
                origins: {
                    service: {
                        read: {
                            source: "maxImageWidth"
                        }
                    }
                }
            }
        })], F.prototype, "imageMaxWidth", void 0), r.__decorate([s.property()], F.prototype, "imageTransparency", void 0), r.__decorate([s.property({
            json: {
                read: !1,
                write: !1
            }
        })], F.prototype, "labelsVisible", void 0), r.__decorate([s.property({
            type: Boolean,
            json: {
                read: !1,
                write: {
                    enabled: !0,
                    overridePolicy: () => ({
                        enabled: !1
                    })
                }
            }
        })], F.prototype, "isReference", void 0), r.__decorate([s.property({
            type: ["ArcGISMapServiceLayer"]
        })], F.prototype, "operationalLayerType", void 0), r.__decorate([s.property()], F.prototype, "sourceJSON", void 0), r.__decorate([s.property({
            json: {
                write: {
                    ignoreOrigin: !0
                }
            }
        })], F.prototype, "sublayers", void 0), r.__decorate([l.writer("sublayers", {
            layers: {
                type: [A]
            },
            visibleLayers: {
                type: [i.Integer]
            }
        })], F.prototype, "writeSublayers", null), r.__decorate([s.property({
            type: ["show", "hide", "hide-children"]
        })], F.prototype, "listMode", void 0), r.__decorate([s.property({
            json: {
                read: !1
            },
            readOnly: !0,
            value: "map-image"
        })], F.prototype, "type", void 0), r.__decorate([s.property({})], F.prototype, "getImageUrl", null), r.__decorate([s.property(_.url)], F.prototype, "url", void 0), F = r.__decorate([p.subclass("esri.layers.PictureLayer")], F), F
    }));