require([
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "./esri/layers/PictureLayer.js",
    "esri/widgets/TimeSlider",
    "esri/widgets/Expand",
    "esri/widgets/Legend"
  ], function (Map, MapView, SceneView, FeatureLayer, PictureLayer,TimeSlider, Expand, Legend) {
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
      zoom: 4,
      center: [-100, 30]
    });

    // time slider widget initialization
    const timeSlider = new TimeSlider({
      container: "timeSlider",
      view: view,
      timeVisible: true, // show the time stamps on the timeslider
      loop: true
    });

    // add the UI for a title
    view.ui.add("titleDiv", "top-right");

    view.whenLayerView(layer).then(function (lv) {
      // around up the full time extent to full hour
      timeSlider.fullTimeExtent = layer.timeInfo.fullTimeExtent.expandTo("hours");
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
  });