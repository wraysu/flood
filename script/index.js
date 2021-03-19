var pastSliderTime = 0;
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "js/PictureLayer",
  "esri/geometry/support/webMercatorUtils",
  "esri/widgets/TimeSlider",
  "esri/widgets/Expand",
  "esri/widgets/Legend"
], function (Map, MapView, SceneView, FeatureLayer, PictureLayer, webMercatorUtils, TimeSlider, Expand, Legend) {
  const layer = new FeatureLayer({
    url:
      "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NDFD_Precipitation_v1/FeatureServer/0"
  });

  const map = new Map({
    basemap: "hybrid",
    layers: [layer]
  });

  const view = new SceneView({
    map: map,
    container: "viewDiv",
    zoom: 8,
    center: [121, 23]
  });

  // time slider widget initialization
  const timeSlider = new TimeSlider({
    container: "timeSlider",
    view: view,
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

  // add the UI for a title
  view.ui.add("titleDiv", "top-right");

  view.whenLayerView(layer).then(function (lv) {
    // around up the full time extent to full hour
    //  timeSlider.fullTimeExtent = layer.timeInfo.fullTimeExtent;
  });
  const legend = new Legend({
    view: view
  });
  const legendExpand = new Expand({
    expandIconClass: "esri-icon-legend",
    expandTooltip: "Legend",
    view: view,
    content: legend,
    expanded: false
  });
  view.ui.add(legendExpand, "top-left");


  timeSlider.watch("timeExtent", function (value) {
    var dt = (new Date(value.end).getTime() - new Date(2019, 6, 22, 4).getTime()) / (60 * 60 * 1000)
    console.log(dt)

    var past = parseInt((pastSliderTime - new Date(2019, 6, 22, 4).getTime()) / (60 * 60 * 1000))
    //	var t = 11950013000 + 10000 * dt
    var url = "https://winds.ncdr.nat.gov.tw/data/flood/Frame_" + dt + ".png";
    addFloodingLayer(url, past, dt)
    pastSliderTime = (new Date(value.end).getTime());
  })

  function addFloodingLayer(url, past, dt) {
    var pt = ((dt - 1) == 0) ? 24 : (dt - 1);
    var currLayer = view.map.findLayerById("flood" + past);
    var grapherLayer = addPictureLayer1("flood" + dt, url);
    view.map.layers.add(grapherLayer);
    if (currLayer) {
      setTimeout(function () { view.map.layers.remove(currLayer); }, 500)
    }
  }

  function addPictureLayer1(id, picUrl) {
    var units = "esriMeters"
    var minPoint = webMercatorUtils.lngLatToXY(121.489563, 25.009037);
    var maxPoint = webMercatorUtils.lngLatToXY(121.621786, 25.077316);
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