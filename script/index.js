var pastSliderTime = 0;
var NLSCSLyrs =[];
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "js/PictureLayer",
  "esri/layers/SceneLayer",
  "esri/geometry/support/webMercatorUtils",
  "esri/identity/IdentityManager",
  "esri/widgets/TimeSlider",
  "esri/widgets/Expand",
  "esri/widgets/Legend"
], function (Map, MapView, SceneView, FeatureLayer, PictureLayer, SceneLayer, webMercatorUtils, IdentityManager, TimeSlider, Expand, Legend) {
  const layer = new FeatureLayer({
    url:
      "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NDFD_Precipitation_v1/FeatureServer/0"
  });

  var g_token = "DCGdjiIssrApWxa4C_KSKbOwxDdcPtxue5JMdzOsa5tZ1VSy25YN8NdVCt90RdpPltVJPbp4dxfpBDJ--oCXBA.."
  IdentityManager.registerToken({
    server: 'https://dssmap.ncdr.nat.gov.tw/ceocgis/rest/services',
    token: g_token
  });
  const initialCamera = {
    position: {
      "spatialReference": {
        "latestWkid": 3857,
        "wkid": 102100
      },
      "x": 13403276.20252085,
      "y": 2501870.1667305403,
      "z": 73556.10364057217
    },
    "heading": 12.289746599260413,
    "tilt": 69.75693755690583
  }

  const map = new Map({
    basemap: "hybrid",
    ground: "world-elevation",
    layers: [layer]
  });

  const view = new SceneView({
    map: map,
    container: "viewDiv",
    zoom: 8,
    camera: initialCamera
   // center: [121, 23]
  });


  // add the UI for a title
  view.ui.add("titleDiv", "top-right");

  view.whenLayerView(layer).then(function (lv) {
    // around up the full time extent to full hour
    //  timeSlider.fullTimeExtent = layer.timeInfo.fullTimeExtent;
  });
  view.when(function () {
    var symbol = {
      type: "mesh-3d", // autocasts as new MeshSymbol3D()
      symbolLayers: [{
        type: "fill", // autocasts as new FillSymbol3DLayer()
        // If the value of material is not assigned, the default color will be grey
        material: {
          color: [255, 255, 255, 0.5],
          colorMixMode: "replace"
        },
        edges: {
          type: "solid",
          color: [0, 0, 0, 0.6],
          size: 1.0
        }
      }]
    };
    var NLSCUrl = "https://i3s.nlsc.gov.tw/i3s/Service"
    fetch(NLSCUrl)
      .then(res => {
        return res.json();
      }).then(result => {
        var Lyrs = result.LAYERS.LOD1
        Lyrs.forEach((item, i) => {
          NLSCSLyrs[i] = new SceneLayer({
            url: item.Url,
            listMode: "hide"
          });
          map.add(NLSCSLyrs[i]);
          NLSCSLyrs[i].renderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: symbol
          };
          NLSCSLyrs[i].outFields = ["BUILD_H", "BUILD_NO"];
          view.whenLayerView(NLSCSLyrs[i]).then(function (layerView) {
            sceneLayerView[i] = layerView;
            if (!isMobile.any()) {
              queryDiv.style.display = "block";
            }
          });
        })
      })
    const timeSlider = new TimeSlider({
      container: "timeSlider",
      view: view,
      mode: "instant",
      playRate: 2000,
      timeVisible: true, // show the time stamps on the timeslider
      fullTimeExtent: { // entire extent of the timeSlider
        start: new Date(2019, 6, 22, 5),
        end: new Date(2019, 6, 23, 4)
      },
      stops: {
        interval: {
          value: 1,
          unit: "hours"
        }
      },
      values: [ // location of timeSlider thumbs
        //		new Date(2000, 2, 1,0),
        new Date(2019, 6, 22, 5)
      ],
      loop: true
    });

    timeSlider.watch("timeExtent", function (value) {
      var dt = (new Date(value.end).getTime() - new Date(2019, 6, 22, 4).getTime()) / (60 * 60 * 1000)
      console.log(dt)

      var past = parseInt((pastSliderTime - new Date(2019, 6, 22, 4).getTime()) / (60 * 60 * 1000))
      //	var t = 11950013000 + 10000 * dt

      var url = "https://winds.ncdr.nat.gov.tw/data/flood/Frame_" + dt + ".png";
      addFloodingLayer(url, past, dt);

      pastSliderTime = (new Date(value.end).getTime());
    })
  })
  // time slider widget initialization


  function addFloodingLayer(url, past, dt) {
    var pt = ((dt - 1) == 0) ? 24 : (dt - 1);
    var currLayer = view.map.findLayerById("flood" + past);
    var grapherLayer = addPictureLayer1("flood" + dt, url);
    map.add(grapherLayer);
    if (currLayer) {
      setTimeout(function () { view.map.layers.remove(currLayer); }, 500)
    }
  }

  function addPictureLayer1(id, picUrl) {
    var units = "esriMeters";

    var minPoint = webMercatorUtils.lngLatToXY(121.489563, 25.009037);
    var maxPoint = webMercatorUtils.lngLatToXY(121.621786, 25.077316);
    console.log("load Picture...");
    var dynamicLayer = new PictureLayer({
      id: id,
      visible: true,
      url: picUrl,
      opacity: 0.75,
      pictureExtent: { 'xmin': minPoint[0], 'ymin': minPoint[1], 'xmax': maxPoint[0], 'ymax': maxPoint[1] },
      units: units,
      spatialReference: { wkid: 102100, latestWkid: 3857 }
    });
    return dynamicLayer;
  }
});