/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.21/esri/copyright.txt for details.
*/
define(["require",
        "esri/chunks/_rollupPluginBabelHelpers",
        "esri/chunks/tslib.es6",
        "esri/PopupTemplate",
        "esri/renderers/ClassBreaksRenderer",
        "esri/renderers/DictionaryRenderer",
        "esri/renderers/DotDensityRenderer",
        "esri/renderers/HeatmapRenderer",
        "esri/renderers/Renderer",
        "esri/renderers/SimpleRenderer",
        "esri/renderers/UniqueValueRenderer",
        "esri/renderers/support/jsonUtils",
        "esri/renderers/support/types",
        "esri/request", "esri/symbols",
        "esri/core/Collection",
        "esri/core/Error",
        "esri/core/Handles",
        "esri/core/has",
        "esri/core/jsonMap",
        "esri/core/Logger",
        "esri/core/maybe",
        "esri/core/MultiOriginJSONSupport",
        "esri/core/object",
        "esri/core/promiseUtils",
        "esri/core/sql",
        "esri/core/urlUtils",
        "esri/core/accessorSupport/decorators/property",
        "esri/core/accessorSupport/decorators/cast",
        "esri/core/accessorSupport/decorators/reader",
        "esri/core/accessorSupport/decorators/subclass",
        "esri/core/accessorSupport/decorators/writer",
        "esri/core/accessorSupport/extensions/serializableProperty/reader",
        "esri/form/FormTemplate", "esri/geometry/Extent",
        "esri/geometry/HeightModelInfo",
        "esri/geometry/SpatialReference",
        "esri/layers/Layer",
        "esri/layers/graphics/sources/MemorySource",
        "esri/layers/mixins/APIKeyMixin",
        "esri/layers/mixins/ArcGISService",
        "esri/layers/mixins/BlendLayer",
        "esri/layers/mixins/CustomParametersMixin",
        "esri/layers/mixins/OperationalLayer",
        "esri/layers/mixins/OrderedLayer",
        "esri/layers/mixins/PortalLayer",
        "esri/layers/mixins/RefreshableLayer",
        "esri/layers/mixins/ScaleRangeLayer",
        "esri/layers/mixins/TemporalLayer",
        "esri/layers/support/arcgisLayerUrl",
        "esri/layers/support/commonProperties",
        "esri/layers/support/FeatureIndex",
        "esri/layers/support/featureReductionUtils",
        "esri/layers/support/FeatureTemplate",
        "esri/layers/support/FeatureType",
        "esri/layers/support/fieldProperties",
        "esri/layers/support/fieldUtils",
        "esri/layers/support/GeometryFieldsInfo",
        "esri/layers/support/LabelClass",
        "esri/layers/support/labelingInfo",
        "esri/layers/support/LayerFloorInfo",
        "esri/layers/support/Relationship",
        "esri/layers/support/TimeInfo",
        "esri/layers/support/source/DataLayerSource",
        "esri/renderers/support/styleUtils",
        "esri/rest/support/AttachmentQuery",
        "esri/rest/support/FeatureSet",
        "esri/rest/support/Query",
        "esri/rest/support/RelationshipQuery",
        "esri/rest/support/TopFeaturesQuery",
        "esri/support/popupUtils"
    ],
    (function (e, t, r, i, o, n, s, a, p, l, u, d, c, y, h, f, m, b, _, g, v, w, I, S, F, T, E, x, D, R, C, L, M, O, P, A, j, q, Q, U, G, V, k, z, B, W, N, J, Z, H, $, K, X, Y, ee, te, re, ie, oe, ne, se, ae, pe, le, ue, de, ce, ye, he, fe, me) {
        "use strict";

        function be(e) {
            return Object.freeze({
                __proto__: null,
                default: e
            })
        }
        const _e = new g.JSONMap({
                esriGeometryPoint: "point",
                esriGeometryMultipoint: "multipoint",
                esriGeometryPolyline: "polyline",
                esriGeometryPolygon: "polygon",
                esriGeometryMultiPatch: "multipatch"
            }),
            ge = {
                name: "supportsName",
                size: "supportsSize",
                contentType: "supportsContentType",
                keywords: "supportsKeywords",
                exifInfo: "supportsExifInfo"
            },
            ve = "FeatureLayer",
            we = v.getLogger("esri.layers.FeatureLayer");

        function Ie(e) {
            return e && e instanceof f
        }

        function Se(e, t, r) {
            return !!(e && e.hasOwnProperty(t) ? e[t] : r)
        }

        function Fe(e, t, r) {
            return e && e.hasOwnProperty(t) ? e[t] : r
        }
        const Te = te.defineFieldProperties();

        function Ee(e, t, r) {
            const i = !(null == r || !r.writeLayerSchema);
            return {
                enabled: i,
                ignoreOrigin: i
            }
        }
        let xe = function (r) {
            function i(...e) {
                var t;
                return (t = r.call(this, ...e) || this)._handles = new b, t.capabilities = null, t.charts = null, t.copyright = null, t.datesInUnknownTimezone = !1, t.displayField = null, t.definitionExpression = null, t.dynamicDataSource = null, t.editFieldsInfo = null, t.editingInfo = null, t.elevationInfo = null, t.featureReduction = null, t.fields = null, t.fieldsIndex = null, t.floorInfo = null, t.formTemplate = null, t.fullExtent = null, t.gdbVersion = null, t.geometryFieldsInfo = null, t.geometryType = null, t.hasM = void 0, t.hasZ = void 0, t.heightModelInfo = null, t.historicMoment = null, t.infoFor3D = null, t.isTable = !1, t.labelsVisible = !0, t.labelingInfo = null, t.layerId = void 0, t.legendEnabled = !0, t.minScale = 0, t.maxScale = 0, t.globalIdField = null, t.objectIdField = null, t.outFields = null, t.path = null, t.popupEnabled = !0, t.popupTemplate = null, t.relationships = null, t.sourceJSON = null, t.returnM = void 0, t.returnZ = void 0, t.screenSizePerspectiveEnabled = !0, t.serviceDefinitionExpression = null, t.spatialReference = j.WGS84, t.subtypeCode = null, t.templates = null, t.timeInfo = null, t.title = null, t.sublayerTitleMode = "item-title", t.trackIdField = null, t.type = "feature", t.typeIdField = null, t.types = null, t.indexes = new(f.ofType(K.FeatureIndex)), t.userIsAdmin = !1, t.version = void 0, t.visible = !0, t
            }
            t._inheritsLoose(i, r);
            var o = i.prototype;
            return o.destroy = function () {
                var e;
                null == (e = this.source) || e.destroy(), this._handles = w.destroyMaybe(this._handles)
            }, o.normalizeCtorArgs = function (e, t) {
                return "string" == typeof e ? {
                    url: e,
                    ...t
                } : e
            }, o.load = function (e) {
                var r = this;
                const i = w.isSome(e) ? e.signal : null;
                if (this.portalItem && this.portalItem.loaded && this.source) return void this.addResolvingPromise(this.createGraphicsSource(i).then((e => this._initLayerProperties(e))));
                const o = this.loadFromPortal({
                    supportedTypes: ["Feature Service", "Feature Collection"]
                }, e).catch(F.throwIfAbortError).then(t._asyncToGenerator((function* () {
                    if (r.url && null == r.layerId && /FeatureServer|MapServer\/*$/i.test(r.url)) {
                        const e = yield r._fetchFirstLayerId(i);
                        null != e && (r.layerId = e)
                    }
                    if (!r.url && !r._hasMemorySource()) throw new m("feature-layer:missing-url-or-source", "Feature layer must be created with either a url or a source");
                    return r._initLayerProperties(yield r.createGraphicsSource(i))
                }))).then((() => this.finishLoadEditablePortalLayer(e)));
                return this.addResolvingPromise(o), Promise.resolve(this)
            }, o.readCapabilities = function (e, t) {
                return t = t.layerDefinition || t, {
                    attachment: this._readAttachmentCapabilities(t.attachmentProperties),
                    data: this._readDataCapabilities(t),
                    metadata: this._readMetadataCapabilities(t),
                    operations: this._readOperationsCapabilities(t.capabilities || e, t),
                    query: this._readQueryCapabilities(t),
                    queryRelated: this._readQueryRelatedCapabilities(t),
                    editing: this._readEditingCapabilities(t)
                }
            }, o.readEditingEnabled = function (e, t) {
                return this._readEditingEnabled(t, !1)
            }, o.readEditingEnabledFromWebMap = function (e, t, r) {
                return this._readEditingEnabled(t, !0, r)
            }, o.writeEditingEnabled = function (e, t) {
                this._writeEditingEnabled(e, t, !1)
            }, o.writeEditingEnabledToWebMap = function (e, t, r, i) {
                this._writeEditingEnabled(e, t, !0, i)
            }, o.readEditingInfo = function (e, t) {
                const {
                    editingInfo: r
                } = t;
                return r ? {
                    lastEditDate: null != r.lastEditDate ? new Date(r.lastEditDate) : null
                } : null
            }, o.readFeatureReduction = function (e, t) {
                return X.read(e, t)
            }, o.writeWebSceneFeatureReduction = function (e, t, r, i) {
                X.writeTarget(e, t, "layerDefinition.featureReduction", i)
            }, o.readIsTable = function (e, t) {
                return "Table" === (t = t && t.layerDefinition || t).type || !t.geometryType
            }, o.writeIsTable = function (e, t, r, i) {
                null != i && i.writeLayerSchema && S.setDeepValue(r, e ? "Table" : "Feature Layer", t)
            }, o.readMinScale = function (e, t) {
                return t.effectiveMinScale || e || 0
            }, o.readMaxScale = function (e, t) {
                return t.effectiveMaxScale || e || 0
            }, o.readGlobalIdFieldFromService = function (e, t) {
                if ((t = t.layerDefinition || t).globalIdField) return t.globalIdField;
                if (t.fields)
                    for (const r of t.fields)
                        if ("esriFieldTypeGlobalID" === r.type) return r.name
            }, o.readObjectIdFieldFromService = function (e, t) {
                if ((t = t.layerDefinition || t).objectIdField) return t.objectIdField;
                if (t.fields)
                    for (const r of t.fields)
                        if ("esriFieldTypeOID" === r.type) return r.name
            }, o.readRenderer = function (e, t, r) {
                const i = (t = t.layerDefinition || t).drawingInfo && t.drawingInfo.renderer || void 0;
                if (i) {
                    const e = d.read(i, t, r) || void 0;
                    return e || we.error("Failed to create renderer", {
                        rendererDefinition: t.drawingInfo.renderer,
                        layer: this,
                        context: r
                    }), e
                }
                if (t.defaultSymbol) return t.types && t.types.length ? new u({
                    defaultSymbol: De(t.defaultSymbol, t, r),
                    field: t.typeIdField,
                    uniqueValueInfos: t.types.map((e => ({
                        id: e.id,
                        symbol: De(e.symbol, e, r)
                    })))
                }) : new l({
                    symbol: De(t.defaultSymbol, t, r)
                })
            }, o.castSource = function (e) {
                return e ? Array.isArray(e) || e instanceof f ? new Q.default({
                    layer: this,
                    items: e
                }) : e : null
            }, o.readSource = function (e, t) {
                const r = ce.fromJSON(t.featureSet);
                return new Q.default({
                    layer: this,
                    items: r && r.features || []
                })
            }, o.readServiceDefinitionExpression = function (e, t) {
                return t.definitionQuery || t.definitionExpression
            }, o.readTemplates = function (e, t) {
                const r = t.editFieldsInfo,
                    i = r && r.creatorField,
                    o = r && r.editorField;
                return e = e && e.map((e => Y.fromJSON(e))), this._fixTemplates(e, i), this._fixTemplates(e, o), e
            }, o.readTitle = function (e, t) {
                const r = t.layerDefinition && t.layerDefinition.name || t.name,
                    i = t.title || t.layerDefinition && t.layerDefinition.title;
                if (r) {
                    const e = this.portalItem && this.portalItem.title;
                    if ("item-title" === this.sublayerTitleMode) return this.url ? H.titleFromUrlAndName(this.url, r) : r;
                    let t = r;
                    if (!t && this.url) {
                        const e = H.parse(this.url);
                        w.isSome(e) && (t = e.title)
                    }
                    if (!t) return;
                    return "item-title-and-service-name" === this.sublayerTitleMode && e && e !== t && (t = e + " - " + t), H.cleanTitle(t)
                }
                if ("item-title" === this.sublayerTitleMode && i) return i
            }, o.readTitleFromWebMap = function (e, t) {
                return t.title || t.layerDefinition && t.layerDefinition.name
            }, o.readTypeIdField = function (e, t) {
                let r = (t = t.layerDefinition || t).typeIdField;
                if (r && t.fields) {
                    r = r.toLowerCase();
                    const e = t.fields.find((e => e.name.toLowerCase() === r));
                    e && (r = e.name)
                }
                return r
            }, o.readTypes = function (e, t) {
                e = (t = t.layerDefinition || t).types;
                const r = t.editFieldsInfo,
                    i = r && r.creatorField,
                    o = r && r.editorField;
                return e && e.map((e => (e = ee.fromJSON(e), this._fixTemplates(e.templates, i), this._fixTemplates(e.templates, o), e)))
            }, o.writeUrl = function (e, t, r, i) {
                H.writeUrlWithLayerId(this, e, null, t, i)
            }, o.readVersion = function (e, t) {
                return t.currentVersion ? t.currentVersion : t.hasOwnProperty("capabilities") || t.hasOwnProperty("drawingInfo") || t.hasOwnProperty("hasAttachments") || t.hasOwnProperty("htmlPopupType") || t.hasOwnProperty("relationships") || t.hasOwnProperty("timeInfo") || t.hasOwnProperty("typeIdField") || t.hasOwnProperty("types") ? 10 : 9.3
            }, o.readVisible = function (e, t) {
                return t.layerDefinition && null != t.layerDefinition.defaultVisibility ? !!t.layerDefinition.defaultVisibility : null != t.visibility ? !!t.visibility : void 0
            }, o.addAttachment = function (e, t) {
                return this.load().then((() => this._checkAttachmentSupport(e))).then((() => {
                    if (!("addAttachment" in this.source)) throw new m(ve, "Layer source does not support addAttachment capability");
                    return this.source.addAttachment(e, t)
                }))
            }, o.updateAttachment = function (e, t, r) {
                return this.load().then((() => this._checkAttachmentSupport(e))).then((() => {
                    if (!("updateAttachment" in this.source)) throw new m(ve, "Layer source does not support updateAttachment capability");
                    return this.source.updateAttachment(e, t, r)
                }))
            }, o.applyEdits = function () {
                var r = t._asyncToGenerator((function* (t, r) {
                    const i = yield new Promise((function (t, r) {
                        e(["esri/layers/graphics/editingSupport"], t, r)
                    }));
                    return yield this.load(), i.applyEdits(this, this.source, t, r)
                }));

                function i(e, t) {
                    return r.apply(this, arguments)
                }
                return i
            }(), o.on = function (e, t) {
                return r.prototype.on.call(this, e, t)
            }, o.createPopupTemplate = function (e) {
                return me.createPopupTemplate(this, e)
            }, o.createGraphicsSource = function () {
                var r = t._asyncToGenerator((function* (t) {
                    if (this._hasMemorySource()) return this.source.load({
                        signal: t
                    });
                    const {
                        default: r
                    } = yield F.whenOrAbort(new Promise((function (t, r) {
                        e(["esri/layers/graphics/sources/FeatureLayerSource"], (function (e) {
                            t(be(e))
                        }), r)
                    })), t);
                    return new r({
                        layer: this
                    }).load({
                        signal: t
                    })
                }));

                function i(e) {
                    return r.apply(this, arguments)
                }
                return i
            }(), o.createQuery = function () {
                const e = new ye,
                    t = this.get("capabilities.data");
                e.dynamicDataSource = this.dynamicDataSource, e.gdbVersion = this.gdbVersion, e.historicMoment = this.historicMoment, e.returnGeometry = !0, t && (t.supportsZ && null != this.returnZ && (e.returnZ = this.returnZ), t.supportsM && null != this.returnM && (e.returnM = this.returnM)), e.outFields = ["*"], e.where = this.definitionExpression || "1=1";
                const {
                    timeOffset: r,
                    timeExtent: i
                } = this;
                return e.timeExtent = null != r && null != i ? i.offset(-r.value, r.unit) : i || null, e.multipatchOption = "multipatch" === this.geometryType ? "xyFootprint" : null, e
            }, o.deleteAttachments = function (e, t) {
                return this.load().then((() => this._checkAttachmentSupport(e))).then((() => {
                    if (!("deleteAttachments" in this.source)) throw new m(ve, "Layer source does not support deleteAttachments capability");
                    return this.source.deleteAttachments(e, t)
                }))
            }, o.fetchRecomputedExtents = function (e) {
                return this.load({
                    signal: null == e ? void 0 : e.signal
                }).then((() => {
                    if (this.source.fetchRecomputedExtents) return this.source.fetchRecomputedExtents(e);
                    throw new m(ve, "Layer source does not support fetchUpdates capability")
                }))
            }, o.getFeatureType = function (e) {
                const {
                    typeIdField: t,
                    types: r
                } = this;
                if (!t || !e) return null;
                const i = e.attributes ? e.attributes[t] : void 0;
                if (null == i) return null;
                let o = null;
                return r.some((e => {
                    const {
                        id: t
                    } = e;
                    return null != t && (t.toString() === i.toString() && (o = e), !!o)
                })), o
            }, o.getFieldDomain = function (e, t) {
                const r = t && t.feature,
                    i = this.getFeatureType(r);
                if (i) {
                    const t = i.domains && i.domains[e];
                    if (t && "inherited" !== t.type) return t
                }
                return this._getLayerDomain(e)
            }, o.getField = function (e) {
                return this.fieldsIndex.get(e)
            }, o.queryAttachments = function (e, t) {
                return e = de.from(e), this.load().then((() => {
                    if (!this.get("capabilities.data.supportsAttachment")) throw new m(ve, "this layer doesn't support attachments");
                    const {
                        attachmentTypes: t,
                        objectIds: r,
                        globalIds: i,
                        num: o,
                        size: n,
                        start: s,
                        where: a
                    } = e;
                    if (!this.get("capabilities.operations.supportsQueryAttachments")) {
                        const p = r && r.length > 1,
                            l = t && t.length,
                            u = i && i.length,
                            d = n && n.length;
                        if (p || l || u || d || o || s || a) throw new m(ve, "when 'supportsQueryAttachments' is false, only objectIds of length 1 are supported", e)
                    }
                    if (!(r && r.length || a)) throw new m(ve, "'objectIds' or 'where' are required to perform attachment query", e);
                    if (!("queryAttachments" in this.source)) throw new m(ve, "Layer source does not support queryAttachments capability", e);
                    return this.source.queryAttachments(e)
                }))
            }, o.queryFeatures = function (e, t) {
                return this.load().then((() => this.source.queryFeatures(ye.from(e) || this.createQuery(), t))).then((e => {
                    if (null != e && e.features)
                        for (const t of e.features) t.layer = t.sourceLayer = this;
                    return e
                }))
            }, o.queryObjectIds = function (e, t) {
                return this.load().then((() => {
                    if (this.source.queryObjectIds) return this.source.queryObjectIds(ye.from(e) || this.createQuery(), t);
                    throw new m(ve, "Layer source does not support queryObjectIds capability")
                }))
            }, o.queryFeatureCount = function (e, t) {
                return this.load().then((() => {
                    if (this.source.queryFeatureCount) return this.source.queryFeatureCount(ye.from(e) || this.createQuery(), t);
                    throw new m(ve, "Layer source does not support queryFeatureCount capability")
                }))
            }, o.queryExtent = function (e, t) {
                return this.load().then((() => {
                    if (this.source.queryExtent) return this.source.queryExtent(ye.from(e) || this.createQuery(), t);
                    throw new m(ve, "Layer source does not support queryExtent capability")
                }))
            }, o.queryRelatedFeatures = function (e, t) {
                return this.load().then((() => {
                    if ("queryRelatedFeatures" in this.source) return this.source.queryRelatedFeatures(he.from(e), t);
                    throw new m(ve, "Layer source does not support queryRelatedFeatures capability")
                }))
            }, o.queryRelatedFeaturesCount = function (e, t) {
                return this.load().then((() => {
                    if ("queryRelatedFeaturesCount" in this.source) return this.source.queryRelatedFeaturesCount(he.from(e), t);
                    throw new m(ve, "Layer source does not support queryRelatedFeaturesCount capability")
                }))
            }, o.queryTopFeatures = function (e, t) {
                return this.load().then((() => {
                    if ("queryTopFeatures" in this.source && this.get("capabilities.query.supportsTopFeaturesQuery")) return this.source.queryTopFeatures(fe.from(e), t).then((e => {
                        if (null != e && e.features)
                            for (const t of e.features) t.layer = t.sourceLayer = this;
                        return e
                    }));
                    throw new m(ve, "Layer source does not support queryTopFeatures capability")
                }))
            }, o.queryTopObjectIds = function (e, t) {
                return this.load().then((() => {
                    if ("queryTopObjectIds" in this.source && this.get("capabilities.query.supportsTopFeaturesQuery")) return this.source.queryTopObjectIds(fe.from(e), t);
                    throw new m(ve, "Layer source does not support queryTopObjectIds capability")
                }))
            }, o.queryTopFeaturesExtent = function (e, t) {
                return this.load().then((() => {
                    if ("queryTopExtents" in this.source && this.get("capabilities.query.supportsTopFeaturesQuery")) return this.source.queryTopExtents(fe.from(e), t);
                    throw new m(ve, "Layer source does not support queryTopExtents capability")
                }))
            }, o.queryTopFeatureCount = function (e, t) {
                return this.load().then((() => {
                    if ("queryTopCount" in this.source && this.get("capabilities.query.supportsTopFeaturesQuery")) return this.source.queryTopCount(fe.from(e), t);
                    throw new m(ve, "Layer source does not support queryFeatureCount capability")
                }))
            }, o.read = function (e, t) {
                const i = e.featureCollection;
                if (i) {
                    const e = i.layers;
                    e && 1 === e.length && (r.prototype.read.call(this, e[0], t), null != i.showLegend && r.prototype.read.call(this, {
                        showLegend: i.showLegend
                    }, t))
                }
                r.prototype.read.call(this, e, t), t && "service" === t.origin && this.revert(["objectIdField", "fields", "timeInfo", "spatialReference"], "service")
            }, o.write = function (e, t) {
                var i, o;
                const n = (t = {
                        ...t,
                        writeLayerSchema: null != (i = null == (o = t) ? void 0 : o.writeLayerSchema) ? i : this._hasMemorySource()
                    }).origin,
                    s = t.layerContainerType,
                    a = t.messages;
                if (this.isTable) {
                    if ("web-scene" === n || "web-map" === n && "tables" !== s) return a && a.push(new m("layer:unsupported", `Layer (${this.title}, ${this.id}) of type '${this.declaredClass}' using a Table source cannot be written to web scenes and web maps`, {
                        layer: this
                    })), null;
                    if (this._hasMemorySource()) return a && a.push(new m("layer:unsupported", `Layer (${this.title}, ${this.id}) of type '${this.declaredClass}' using an in-memory Table source cannot be written to web scenes and web maps`, {
                        layer: this
                    })), null
                } else if (this.loaded && "web-map" === n && "tables" === s) return a && a.push(new m("layer:unsupported", `Layer (${this.title}, ${this.id}) of type '${this.declaredClass}' using a non-table source cannot be written to tables in web maps`, {
                    layer: this
                })), null;
                return r.prototype.write.call(this, e, t)
            }, o._readEditingEnabled = function (e, t, r) {
                var i;
                let o = null == (i = e.layerDefinition) ? void 0 : i.capabilities;
                return o ? this._hasEditingCapability(o) : (o = e.capabilities, t && "web-map" === (null == r ? void 0 : r.origin) && !this._hasMemorySource() && o ? this._hasEditingCapability(o) : void 0)
            }, o._hasEditingCapability = function (e) {
                return e.toLowerCase().split(",").map((e => e.trim())).includes("editing")
            }, o._writeEditingEnabled = function (e, t, r, i) {
                if (!e) {
                    var o, n;
                    const e = null != (o = this.capabilities) && null != (n = o.operations) && n.supportsSync ? "Query,Sync" : "Query";
                    S.setDeepValue("layerDefinition.capabilities", e, t), !r || null != i && i.writeLayerSchema || (t.capabilities = e)
                }
            }, o._checkAttachmentSupport = function (e) {
                const {
                    attributes: t
                } = e, {
                    objectIdField: r
                } = this;
                return this.get("capabilities.data.supportsAttachment") ? e ? t ? t[r] ? void 0 : Promise.reject(new m(ve, `feature is missing the identifying attribute ${r}`)) : Promise.reject(new m(ve, "'attributes' are required on a feature to query attachments")) : Promise.reject(new m(ve, "A feature is required to add/delete/update attachments")) : Promise.reject(new m(ve, "this layer doesn't support attachments"))
            }, o._getLayerDomain = function (e) {
                const t = this.fieldsIndex.get(e);
                return t ? t.domain : null
            }, o._fetchFirstLayerId = function (e) {
                return y(this.url, {
                    query: {
                        f: "json",
                        ...this.customParameters,
                        token: this.apiKey
                    },
                    responseType: "json",
                    signal: e
                }).then((e => {
                    const t = e.data;
                    if (t) return Array.isArray(t.layers) && t.layers.length > 0 ? t.layers[0].id : Array.isArray(t.tables) && t.tables.length > 0 ? t.tables[0].id : void 0
                }))
            }, o._initLayerProperties = function () {
                var e = t._asyncToGenerator((function* (e) {
                    return this._set("source", e), e.sourceJSON && (this.sourceJSON = e.sourceJSON, this.read(e.sourceJSON, {
                        origin: "service",
                        url: this.parsedUrl
                    })), this._verifySource(), this._verifyFields(), re.fixRendererFields(this.renderer, this.fieldsIndex), re.fixTimeInfoFields(this.timeInfo, this.fieldsIndex), ue.loadStyleRenderer(this, {
                        origin: "service"
                    })
                }));

                function r(t) {
                    return e.apply(this, arguments)
                }
                return r
            }(), o.hasDataChanged = function () {
                var e = t._asyncToGenerator((function* () {
                    var e;
                    if (null != (e = this.source) && e.refresh) try {
                        var t;
                        const {
                            hasUpdates: e,
                            updates: r
                        } = yield null == (t = this.source) ? void 0 : t.refresh();
                        if (w.isSome(r) && (this.sourceJSON = {
                                ...this.sourceJSON,
                                ...r
                            }, this.read(r, {
                                origin: "service",
                                url: this.parsedUrl
                            })), e) return !0
                    } catch {}
                    if (this.definitionExpression) try {
                        return (yield T.parseWhereClause(this.definitionExpression, this.fieldsIndex)).hasDateFunctions
                    } catch {}
                    return !1
                }));

                function r() {
                    return e.apply(this, arguments)
                }
                return r
            }(), o._verifyFields = function () {
                const e = this.parsedUrl && this.parsedUrl.path || "undefined";
                this.objectIdField || console.log("FeatureLayer: 'objectIdField' property is not defined (url: " + e + ")"), this.isTable || this._hasMemorySource() || -1 !== e.search(/\/FeatureServer\//i) || this.fields && this.fields.some((function (e) {
                    return "geometry" === e.type
                })) || console.log("FeatureLayer: unable to find field of type 'geometry' in the layer 'fields' list. If you are using a map service layer, features will not have geometry (url: " + e + ")")
            }, o._fixTemplates = function (e, t) {
                e && e.forEach((e => {
                    const r = e.prototype && e.prototype.attributes;
                    r && t && delete r[t]
                }))
            }, o._verifySource = function () {
                if (this._hasMemorySource()) {
                    if (this.url) throw new m("feature-layer:mixed-source-and-url", "FeatureLayer cannot be created with both an in-memory source and a url")
                } else if (!this.url) throw new m("feature-layer:source-or-url-required", "FeatureLayer requires either a url, a valid portal item or a source")
            }, o._initMemorySource = function (e) {
                e.forEach((e => {
                    e.layer = this, e.sourceLayer = this
                })), this._handles.add([e.on("after-add", (e => {
                    e.item.layer = this, e.item.sourceLayer = this
                })), e.on("after-remove", (e => {
                    e.item.layer = null, e.item.sourceLayer = null
                }))], "fl-source")
            }, o._resetMemorySource = function (e) {
                e.forEach((e => {
                    e.layer = null, e.sourceLayer = null
                })), this._handles.remove("fl-source")
            }, o._hasMemorySource = function () {
                return !(this.url || !this.source)
            }, o._readAttachmentCapabilities = function (e) {
                const t = {
                    supportsName: !1,
                    supportsSize: !1,
                    supportsContentType: !1,
                    supportsKeywords: !1,
                    supportsExifInfo: !1
                };
                return e && Array.isArray(e) && e.forEach((e => {
                    const r = ge[e.name];
                    r && (t[r] = !!e.isEnabled)
                })), t
            }, o._readDataCapabilities = function (e) {
                return {
                    isVersioned: Se(e, "isDataVersioned", !1),
                    supportsAttachment: Se(e, "hasAttachments", !1),
                    supportsM: Se(e, "hasM", !1),
                    supportsZ: Se(e, "hasZ", !1)
                }
            }, o._readMetadataCapabilities = function (e) {
                return {
                    supportsAdvancedFieldProperties: Se(e, "supportsFieldDescriptionProperty", !1)
                }
            }, o._readOperationsCapabilities = function (e, t) {
                const r = e ? e.toLowerCase().split(",").map((e => e.trim())) : [],
                    i = r.includes("editing") && !t.datesInUnknownTimezone;
                let o = i && r.includes("create"),
                    n = i && r.includes("delete"),
                    s = i && r.includes("update");
                const a = r.includes("changetracking");
                return i && !(o || n || s) && (o = n = s = !0), {
                    supportsCalculate: Se(t, "supportsCalculate", !1),
                    supportsTruncate: Se(t, "supportsTruncate", !1),
                    supportsValidateSql: Se(t, "supportsValidateSql", !1),
                    supportsAdd: o,
                    supportsDelete: n,
                    supportsEditing: i,
                    supportsChangeTracking: a,
                    supportsQuery: r.includes("query"),
                    supportsQueryAttachments: Se(t.advancedQueryCapabilities, "supportsQueryAttachments", !1),
                    supportsResizeAttachments: Se(t, "supportsAttachmentsResizing", !1),
                    supportsSync: r.includes("sync"),
                    supportsUpdate: s,
                    supportsExceedsLimitStatistics: Se(t, "supportsExceedsLimitStatistics", !1)
                }
            }, o._readQueryCapabilities = function (e) {
                var t;
                const r = e.advancedQueryCapabilities,
                    i = e.ownershipBasedAccessControlForFeatures,
                    o = e.archivingInfo,
                    n = null == (t = this.url) ? void 0 : t.includes("MapServer"),
                    s = !_("mapserver-pbf-enabled") && n && this.version < 10.81,
                    a = (e.supportedQueryFormats || "").split(",").reduce(((e, t) => {
                        const r = t.toLowerCase().trim();
                        return r && e.add(r), e
                    }), new Set);
                return {
                    supportsStatistics: Se(r, "supportsStatistics", e.supportsStatistics),
                    supportsPercentileStatistics: Se(r, "supportsPercentileStatistics", !1),
                    supportsCentroid: Se(r, "supportsReturningGeometryCentroid", !1),
                    supportsDistance: Se(r, "supportsQueryWithDistance", !1),
                    supportsDistinct: Se(r, "supportsDistinct", e.supportsAdvancedQueries),
                    supportsExtent: Se(r, "supportsReturningQueryExtent", !1),
                    supportsGeometryProperties: Se(r, "supportsReturningGeometryProperties", !1),
                    supportsHavingClause: Se(r, "supportsHavingClause", !1),
                    supportsOrderBy: Se(r, "supportsOrderBy", e.supportsAdvancedQueries),
                    supportsPagination: Se(r, "supportsPagination", !1),
                    supportsQuantization: Se(e, "supportsCoordinatesQuantization", !1),
                    supportsQuantizationEditMode: Se(e, "supportsQuantizationEditMode", !1),
                    supportsQueryGeometry: Se(e, "supportsReturningQueryGeometry", !1),
                    supportsResultType: Se(r, "supportsQueryWithResultType", !1),
                    supportsMaxRecordCountFactor: Se(r, "supportsMaxRecordCountFactor", !1),
                    supportsSqlExpression: Se(r, "supportsSqlExpression", !1),
                    supportsStandardizedQueriesOnly: Se(e, "useStandardizedQueries", !1),
                    supportsTopFeaturesQuery: Se(r, "supportsTopFeaturesQuery", !1),
                    supportsQueryByOthers: Se(i, "allowOthersToQuery", !0),
                    supportsHistoricMoment: Se(o, "supportsQueryWithHistoricMoment", !1),
                    supportsFormatPBF: !s && a.has("pbf"),
                    supportsDisjointSpatialRelationship: Se(r, "supportsDisjointSpatialRel", !1),
                    supportsCacheHint: Se(r, "supportsQueryWithCacheHint", !1),
                    maxRecordCountFactor: Fe(e, "maxRecordCountFactor", void 0),
                    maxRecordCount: Fe(e, "maxRecordCount", void 0),
                    standardMaxRecordCount: Fe(e, "standardMaxRecordCount", void 0),
                    tileMaxRecordCount: Fe(e, "tileMaxRecordCount", void 0)
                }
            }, o._readQueryRelatedCapabilities = function (e) {
                const t = e.advancedQueryCapabilities,
                    r = Se(t, "supportsAdvancedQueryRelated", !1);
                return {
                    supportsPagination: Se(t, "supportsQueryRelatedPagination", !1),
                    supportsCount: r,
                    supportsOrderBy: r
                }
            }, o._readEditingCapabilities = function (e) {
                const t = e.ownershipBasedAccessControlForFeatures;
                return {
                    supportsGeometryUpdate: Se(e, "allowGeometryUpdates", !0),
                    supportsGlobalId: Se(e, "supportsApplyEditsWithGlobalIds", !1),
                    supportsReturnServiceEditsInSourceSpatialReference: Se(e, "supportsReturnServiceEditsInSourceSR", !1),
                    supportsRollbackOnFailure: Se(e, "supportsRollbackOnFailureParameter", !1),
                    supportsUpdateWithoutM: Se(e, "allowUpdateWithoutMValues", !1),
                    supportsUploadWithItemId: Se(e, "supportsAttachmentsByUploadId", !1),
                    supportsDeleteByAnonymous: Se(t, "allowAnonymousToDelete", !0),
                    supportsDeleteByOthers: Se(t, "allowOthersToDelete", !0),
                    supportsUpdateByAnonymous: Se(t, "allowAnonymousToUpdate", !0),
                    supportsUpdateByOthers: Se(t, "allowOthersToUpdate", !0)
                }
            }, t._createClass(i, [{
                key: "createQueryVersion",
                get: function () {
                    return this.commitProperty("definitionExpression"), this.commitProperty("dynamicDataSource"), this.commitProperty("timeExtent"), this.commitProperty("timeOffset"), this.commitProperty("geometryType"), this.commitProperty("gdbVersion"), this.commitProperty("historicMoment"), this.commitProperty("returnZ"), this.commitProperty("capabilities"), this.commitProperty("returnM"), (this._get("createQueryVersion") || 0) + 1
                }
            }, {
                key: "editingEnabled",
                get: function () {
                    return !(this.loaded && !this.capabilities.operations.supportsEditing) && (this._isOverridden("editingEnabled") ? this._get("editingEnabled") : this._hasMemorySource() || this.userHasEditingPrivileges)
                },
                set: function (e) {
                    null != e ? this._override("editingEnabled", e) : this._clearOverride("editingEnabled")
                }
            }, {
                key: "parsedUrl",
                get: function () {
                    const e = this.url ? E.urlToObject(this.url) : null;
                    return null != e && (null != this.dynamicDataSource ? e.path = E.join(e.path, "dynamicLayer") : null != this.layerId && (e.path = E.join(e.path, this.layerId.toString()))), e
                }
            }, {
                key: "defaultPopupTemplate",
                get: function () {
                    return this.createPopupTemplate()
                }
            }, {
                key: "renderer",
                set: function (e) {
                    re.fixRendererFields(e, this.fieldsIndex), this._set("renderer", e)
                }
            }, {
                key: "source",
                set: function (e) {
                    const t = this._get("source");
                    t !== e && (Ie(t) && this._resetMemorySource(t), Ie(e) && this._initMemorySource(e), this._set("source", e))
                }
            }, {
                key: "url",
                set: function (e) {
                    const t = H.sanitizeUrlWithLayerId({
                        layer: this,
                        url: e,
                        nonStandardUrlAllowed: !0,
                        logger: we
                    });
                    this._set("url", t.url), null != t.layerId && this._set("layerId", t.layerId)
                }
            }]), i
        }(V.BlendLayer(B.OrderedLayer(Z.TemporalLayer(J.ScaleRangeLayer(N.RefreshableLayer(G.ArcGISService(z.OperationalLayer(W.PortalLayer(I.MultiOriginJSONMixin(k.CustomParametersMixin(U.APIKeyMixin(q))))))))))));
        r.__decorate([x.property({
            readOnly: !0,
            json: {
                read: !1
            }
        })], xe.prototype, "capabilities", void 0), r.__decorate([R.reader("service", "capabilities", ["advancedQueryCapabilities", "allowGeometryUpdates", "allowUpdateWithoutMValues", "archivingInfo", "capabilities", "datesInUnknownTimezone", "hasAttachments", "hasM", "hasZ", "maxRecordCount", "maxRecordCountFactor", "ownershipBasedAccessControlForFeatures", "standardMaxRecordCount", "supportedQueryFormats", "supportsAdvancedQueries", "supportsApplyEditsWithGlobalIds", "supportsAttachmentsByUploadId", "supportsAttachmentsResizing", "supportsCalculate", "supportsCoordinatesQuantization", "supportsExceedsLimitStatistics", "supportsFieldDescriptionProperty", "supportsQuantizationEditMode", "supportsRollbackOnFailureParameter", "supportsStatistics", "supportsTruncate", "supportsValidateSql", "tileMaxRecordCount", "useStandardizedQueries"])], xe.prototype, "readCapabilities", null), r.__decorate([x.property({
            json: {
                origins: {
                    "portal-item": {
                        write: !0
                    },
                    "web-map": {
                        write: !0
                    }
                }
            }
        })], xe.prototype, "charts", void 0), r.__decorate([x.property({
            readOnly: !0
        })], xe.prototype, "createQueryVersion", null), r.__decorate([x.property({
            type: String,
            json: {
                read: {
                    source: "layerDefinition.copyrightText"
                },
                origins: {
                    service: {
                        read: {
                            source: "copyrightText"
                        }
                    }
                }
            }
        })], xe.prototype, "copyright", void 0), r.__decorate([x.property({
            type: Boolean
        })], xe.prototype, "datesInUnknownTimezone", void 0), r.__decorate([x.property({
            type: String,
            json: {
                read: {
                    source: "layerDefinition.displayField"
                },
                origins: {
                    service: {
                        read: {
                            source: "displayField"
                        }
                    }
                }
            }
        })], xe.prototype, "displayField", void 0), r.__decorate([x.property({
            type: String,
            json: {
                origins: {
                    service: {
                        read: !1,
                        write: !1
                    }
                },
                name: "layerDefinition.definitionExpression",
                write: {
                    enabled: !0,
                    allowNull: !0
                }
            }
        })], xe.prototype, "definitionExpression", void 0), r.__decorate([x.property({
            types: h.symbolTypes,
            readOnly: !0
        })], xe.prototype, "defaultSymbol", void 0), r.__decorate([x.property({
            type: le.DataLayerSource
        })], xe.prototype, "dynamicDataSource", void 0), r.__decorate([x.property({
            readOnly: !0
        })], xe.prototype, "editFieldsInfo", void 0), r.__decorate([x.property({
            type: Boolean
        })], xe.prototype, "editingEnabled", null), r.__decorate([R.reader(["portal-item", "web-scene"], "editingEnabled", ["layerDefinition.capabilities"])], xe.prototype, "readEditingEnabled", null), r.__decorate([R.reader("web-map", "editingEnabled", ["capabilities", "layerDefinition.capabilities"])], xe.prototype, "readEditingEnabledFromWebMap", null), r.__decorate([L.writer(["portal-item", "web-scene"], "editingEnabled", {
            "layerDefinition.capabilities": {
                type: String
            }
        })], xe.prototype, "writeEditingEnabled", null), r.__decorate([L.writer("web-map", "editingEnabled", {
            capabilities: {
                type: String
            },
            "layerDefinition.capabilities": {
                type: String
            }
        })], xe.prototype, "writeEditingEnabledToWebMap", null), r.__decorate([x.property({
            readOnly: !0
        })], xe.prototype, "editingInfo", void 0), r.__decorate([R.reader("editingInfo")], xe.prototype, "readEditingInfo", null), r.__decorate([x.property($.elevationInfo)], xe.prototype, "elevationInfo", void 0), r.__decorate([x.property(X.featureReductionProperty)], xe.prototype, "featureReduction", void 0), r.__decorate([R.reader("featureReduction", ["layerDefinition.featureReduction"])], xe.prototype, "readFeatureReduction", null), r.__decorate([L.writer("web-scene", "featureReduction", {
            "layerDefinition.featureReduction": {
                types: X.webSceneFeatureReductionTypes
            }
        })], xe.prototype, "writeWebSceneFeatureReduction", null), r.__decorate([x.property({
            ...Te.fields,
            json: {
                read: {
                    source: "layerDefinition.fields"
                },
                origins: {
                    service: {
                        read: !0
                    },
                    "web-map": {
                        write: {
                            target: "layerDefinition.fields",
                            overridePolicy: Ee
                        }
                    }
                }
            }
        })], xe.prototype, "fields", void 0), r.__decorate([x.property(Te.fieldsIndex)], xe.prototype, "fieldsIndex", void 0), r.__decorate([x.property({
            type: se,
            json: {
                read: {
                    source: "layerDefinition.floorInfo"
                },
                write: {
                    target: "layerDefinition.floorInfo"
                }
            }
        })], xe.prototype, "floorInfo", void 0), r.__decorate([x.property({
            type: O,
            json: {
                name: "formInfo",
                write: !0,
                origins: {
                    "web-scene": {
                        read: !1,
                        write: !1
                    }
                }
            }
        })], xe.prototype, "formTemplate", void 0), r.__decorate([x.property({
            type: P,
            json: {
                origins: {
                    service: {
                        read: {
                            source: "extent"
                        }
                    }
                },
                read: {
                    source: "layerDefinition.extent"
                }
            }
        })], xe.prototype, "fullExtent", void 0), r.__decorate([x.property()], xe.prototype, "gdbVersion", void 0), r.__decorate([x.property({
            readOnly: !0,
            type: ie,
            json: {
                read: {
                    source: "geometryProperties"
                }
            }
        })], xe.prototype, "geometryFieldsInfo", void 0), r.__decorate([x.property({
            type: ["point", "polygon", "polyline", "multipoint", "multipatch", "mesh"],
            json: {
                origins: {
                    service: {
                        read: _e.read
                    },
                    "web-map": {
                        write: {
                            target: "layerDefinition.geometryType",
                            overridePolicy: Ee,
                            writer(e, t, r) {
                                const i = e ? _e.toJSON(e) : null;
                                i && S.setDeepValue(r, i, t)
                            }
                        }
                    }
                },
                read: {
                    source: "layerDefinition.geometryType",
                    reader: _e.read
                }
            }
        })], xe.prototype, "geometryType", void 0), r.__decorate([x.property({
            type: Boolean,
            json: {
                origins: {
                    service: {
                        read: !0
                    }
                },
                read: {
                    source: "layerDefinition.hasM"
                }
            }
        })], xe.prototype, "hasM", void 0), r.__decorate([x.property({
            type: Boolean,
            json: {
                origins: {
                    service: {
                        read: !0
                    }
                },
                read: {
                    source: "layerDefinition.hasZ"
                }
            }
        })], xe.prototype, "hasZ", void 0), r.__decorate([x.property({
            readOnly: !0,
            type: A
        })], xe.prototype, "heightModelInfo", void 0), r.__decorate([x.property({
            type: Date
        })], xe.prototype, "historicMoment", void 0), r.__decorate([x.property($.id)], xe.prototype, "id", void 0), r.__decorate([x.property({
            readOnly: !0,
            json: {
                origins: {
                    service: {
                        read: !0
                    }
                },
                read: !1
            }
        })], xe.prototype, "infoFor3D", void 0), r.__decorate([x.property({
            readOnly: !0,
            json: {
                origins: {
                    "web-map": {
                        write: {
                            target: "layerDefinition.type"
                        }
                    }
                }
            }
        })], xe.prototype, "isTable", void 0), r.__decorate([R.reader("service", "isTable", ["type", "geometryType"]), R.reader("isTable", ["layerDefinition.type", "layerDefinition.geometryType"])], xe.prototype, "readIsTable", null), r.__decorate([L.writer("web-map", "isTable")], xe.prototype, "writeIsTable", null), r.__decorate([x.property($.labelsVisible)], xe.prototype, "labelsVisible", void 0), r.__decorate([x.property({
            type: [oe],
            json: {
                origins: {
                    service: {
                        read: {
                            source: "drawingInfo.labelingInfo",
                            reader: ne.reader
                        },
                        write: {
                            target: "drawingInfo.labelingInfo",
                            enabled: !1
                        }
                    }
                },
                read: {
                    source: "layerDefinition.drawingInfo.labelingInfo",
                    reader: ne.reader
                },
                write: {
                    target: "layerDefinition.drawingInfo.labelingInfo"
                }
            }
        })], xe.prototype, "labelingInfo", void 0), r.__decorate([x.property($.opacityDrawingInfo)], xe.prototype, "opacity", void 0), r.__decorate([x.property({
            type: Number,
            json: {
                origins: {
                    service: {
                        read: {
                            source: "id"
                        }
                    }
                },
                read: !1
            }
        })], xe.prototype, "layerId", void 0), r.__decorate([x.property($.legendEnabled)], xe.prototype, "legendEnabled", void 0), r.__decorate([x.property({
            type: ["show", "hide"]
        })], xe.prototype, "listMode", void 0), r.__decorate([x.property($.minScale)], xe.prototype, "minScale", void 0), r.__decorate([R.reader("service", "minScale", ["minScale", "effectiveMinScale"])], xe.prototype, "readMinScale", null), r.__decorate([x.property($.maxScale)], xe.prototype, "maxScale", void 0), r.__decorate([R.reader("service", "maxScale", ["maxScale", "effectiveMaxScale"])], xe.prototype, "readMaxScale", null), r.__decorate([x.property({
            type: String
        })], xe.prototype, "globalIdField", void 0), r.__decorate([R.reader("globalIdField", ["layerDefinition.globalIdField", "layerDefinition.fields"]), R.reader("service", "globalIdField", ["globalIdField", "fields"])], xe.prototype, "readGlobalIdFieldFromService", null), r.__decorate([x.property({
            type: String,
            json: {
                origins: {
                    "web-map": {
                        write: {
                            target: "layerDefinition.objectIdField",
                            overridePolicy: Ee
                        }
                    }
                }
            }
        })], xe.prototype, "objectIdField", void 0), r.__decorate([R.reader("objectIdField", ["layerDefinition.objectIdField", "layerDefinition.fields"]), R.reader("service", "objectIdField", ["objectIdField", "fields"])], xe.prototype, "readObjectIdFieldFromService", null), r.__decorate([x.property({
            value: "ArcGISFeatureLayer",
            type: ["ArcGISFeatureLayer"]
        })], xe.prototype, "operationalLayerType", void 0), r.__decorate([x.property(Te.outFields)], xe.prototype, "outFields", void 0), r.__decorate([x.property({
            readOnly: !0
        })], xe.prototype, "parsedUrl", null), r.__decorate([x.property({
            type: String,
            json: {
                origins: {
                    "web-scene": {
                        read: !0,
                        write: !0
                    }
                },
                read: !1
            }
        })], xe.prototype, "path", void 0), r.__decorate([x.property($.popupEnabled)], xe.prototype, "popupEnabled", void 0), r.__decorate([x.property({
            type: i,
            json: {
                read: {
                    source: "popupInfo"
                },
                write: {
                    target: "popupInfo"
                }
            }
        })], xe.prototype, "popupTemplate", void 0), r.__decorate([x.property({
            readOnly: !0
        })], xe.prototype, "defaultPopupTemplate", null), r.__decorate([x.property({
            type: [ae],
            readOnly: !0
        })], xe.prototype, "relationships", void 0), r.__decorate([x.property({
            types: c.rendererTypes,
            json: {
                origins: {
                    service: {
                        write: {
                            target: "drawingInfo.renderer",
                            enabled: !1
                        }
                    },
                    "web-scene": {
                        types: c.webSceneRendererTypes,
                        write: {
                            target: "layerDefinition.drawingInfo.renderer",
                            writer: d.write
                        }
                    }
                },
                write: {
                    target: "layerDefinition.drawingInfo.renderer",
                    overridePolicy: (e, t, r) => ({
                        ignoreOrigin: null == r ? void 0 : r.writeLayerSchema
                    }),
                    writer: d.write
                }
            }
        })], xe.prototype, "renderer", null), r.__decorate([R.reader("service", "renderer", ["drawingInfo.renderer", "defaultSymbol"]), R.reader("renderer", ["layerDefinition.drawingInfo.renderer", "layerDefinition.defaultSymbol"])], xe.prototype, "readRenderer", null), r.__decorate([x.property()], xe.prototype, "sourceJSON", void 0), r.__decorate([x.property({
            type: Boolean
        })], xe.prototype, "returnM", void 0), r.__decorate([x.property({
            type: Boolean
        })], xe.prototype, "returnZ", void 0), r.__decorate([x.property($.screenSizePerspectiveEnabled)], xe.prototype, "screenSizePerspectiveEnabled", void 0), r.__decorate([x.property()], xe.prototype, "source", null), r.__decorate([D.cast("source")], xe.prototype, "castSource", null), r.__decorate([R.reader("portal-item", "source", ["featureSet"]), R.reader("web-map", "source", ["featureSet"])], xe.prototype, "readSource", null), r.__decorate([x.property({
            readOnly: !0
        })], xe.prototype, "serviceDefinitionExpression", void 0), r.__decorate([R.reader("service", "serviceDefinitionExpression", ["definitionQuery", "definitionExpression"])], xe.prototype, "readServiceDefinitionExpression", null), r.__decorate([x.property({
            type: j,
            json: {
                origins: {
                    service: {
                        read: {
                            source: "extent.spatialReference"
                        }
                    }
                },
                read: {
                    source: "layerDefinition.extent.spatialReference"
                }
            }
        })], xe.prototype, "spatialReference", void 0), r.__decorate([x.property({
            type: Number
        })], xe.prototype, "subtypeCode", void 0), r.__decorate([x.property({
            type: [Y]
        })], xe.prototype, "templates", void 0), r.__decorate([R.reader("templates", ["editFieldsInfo", "creatorField", "editorField", "templates"])], xe.prototype, "readTemplates", null), r.__decorate([x.property({
            type: pe
        })], xe.prototype, "timeInfo", void 0), r.__decorate([x.property()], xe.prototype, "title", void 0), r.__decorate([R.reader("service", "title", ["name"]), R.reader("portal-item", "title", ["layerDefinition.title", "layerDefinition.name", "title"])], xe.prototype, "readTitle", null), r.__decorate([R.reader("web-map", "title", ["layerDefinition.name", "title"])], xe.prototype, "readTitleFromWebMap", null), r.__decorate([x.property({
            type: String
        })], xe.prototype, "sublayerTitleMode", void 0), r.__decorate([x.property({
            type: String,
            json: {
                read: {
                    source: "timeInfo.trackIdField"
                }
            }
        })], xe.prototype, "trackIdField", void 0), r.__decorate([x.property({
            json: {
                read: !1
            }
        })], xe.prototype, "type", void 0), r.__decorate([x.property({
            type: String
        })], xe.prototype, "typeIdField", void 0), r.__decorate([R.reader("service", "typeIdField"), R.reader("typeIdField", ["layerDefinition.typeIdField"])], xe.prototype, "readTypeIdField", null), r.__decorate([x.property({
            type: [ee]
        })], xe.prototype, "types", void 0), r.__decorate([R.reader("service", "types", ["types"]), R.reader("types", ["layerDefinition.types"])], xe.prototype, "readTypes", null), r.__decorate([x.property({
            readOnly: !0,
            json: {
                write: !1
            }
        })], xe.prototype, "serverGens", void 0), r.__decorate([x.property({
            type: f.ofType(K.FeatureIndex),
            readOnly: !0
        })], xe.prototype, "indexes", void 0), r.__decorate([x.property($.url)], xe.prototype, "url", null), r.__decorate([L.writer("url")], xe.prototype, "writeUrl", null), r.__decorate([x.property({
            readOnly: !0
        })], xe.prototype, "userIsAdmin", void 0), r.__decorate([x.property({
            json: {
                origins: {
                    service: {
                        read: !0
                    }
                },
                read: !1
            }
        })], xe.prototype, "version", void 0), r.__decorate([R.reader("service", "version", ["currentVersion", "capabilities", "drawingInfo", "hasAttachments", "htmlPopupType", "relationships", "timeInfo", "typeIdField", "types"])], xe.prototype, "readVersion", null), r.__decorate([x.property({
            type: Boolean,
            json: {
                origins: {
                    "portal-item": {
                        write: {
                            target: "layerDefinition.defaultVisibility"
                        }
                    }
                }
            }
        })], xe.prototype, "visible", void 0), r.__decorate([R.reader("portal-item", "visible", ["visibility", "layerDefinition.defaultVisibility"])], xe.prototype, "readVisible", null), xe = r.__decorate([C.subclass("esri.layers.FeatureLayer")], xe);
        const De = M.createTypeReader({
            types: h.symbolTypesRenderer
        });
        return xe
    }));