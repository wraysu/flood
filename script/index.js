var pastSliderTime = 0;
var NLSCSLyrs = [];
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }

};

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/Basemap",
  "esri/layers/WebTileLayer",
  "esri/layers/FeatureLayer",
  "js/PictureLayer",
  "esri/layers/SceneLayer",
  "esri/geometry/support/webMercatorUtils",
  "esri/identity/IdentityManager",
  "esri/widgets/TimeSlider",
  "esri/widgets/Expand",
  "esri/widgets/Legend",
  "esri/widgets/Sketch/SketchViewModel",
  "esri/widgets/Slider",
  "esri/geometry/geometryEngine",
  "esri/Graphic",
  "esri/core/promiseUtils",
  "esri/widgets/Search",
  "esri/core/watchUtils"
], function (Map, MapView, SceneView, Basemap, WebTileLayer, FeatureLayer, PictureLayer, SceneLayer, webMercatorUtils, IdentityManager, TimeSlider, Expand, Legend,
  SketchViewModel,
  Slider,
  geometryEngine,
  Graphic,
  promiseUtils,
  Search,
  watchUtils
) {
  const layer = new FeatureLayer({
    url:
      "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NDFD_Precipitation_v1/FeatureServer/0"
  });

  var g_token = "Idu-9uPF_bRQWDAqo5udB8XFNwmvjt-cMIB5XJ8ICXbgBT_FRmQ_rxxyLHVVuHsplleA8Vq2RZo7UuNDbW1LBw.."
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

  const Basmap_NLSC = new SceneLayer({
    url: "https://i3s.nlsc.gov.tw/Terrain20M/i3s/rest/services/nlsc/SceneServer/baselayers/0",
    elevationInfo: {
      mode: "absolute-height",
      offset: 10
    }
  });
  var mapBaseLayer = new WebTileLayer({
    urlTemplate: "https://stamen-tiles-{subDomain}.a.ssl.fastly.net/terrain/{level}/{col}/{row}.png",
    subDomains: ["a", "b", "c", "d"],
    /*   copyright: 'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ' +
         'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ' +
         'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ' +
         'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'*/
  });
  // Create a Basemap with the WebTileLayer. The thumbnailUrl will be used for
  // the image in the BasemapToggle widget.
  var stamen = new Basemap({
    baseLayers: [mapBaseLayer],
    title: "Terrain",
    id: "terrain",
    thumbnailUrl: "https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png"
  });

  // add the UI for a title
  view.ui.add("titleDiv", "top-right");

  view.whenLayerView(layer).then(function (lv) {
    // around up the full time extent to full hour
    //  timeSlider.fullTimeExtent = layer.timeInfo.fullTimeExtent;
  });
  view.when(function () {
    var toggle = new BasemapToggle({
      visibleElements: {
        title: true
      },
      view: view,
      nextBasemap: "terrain"
    });
    // Add widget to the top right corner of the view
    view.ui.add(toggle, "top-right");


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

  var bgExpand = new Expand({
    view: view,
    content: queryDiv
  });
  if (!isMobile.any()) {
    view.ui.add([bgExpand], "bottom-left");
    view.ui.add([resultDiv], "top-right");


    // use SketchViewModel to draw polygons that are used as a query
    let sketchGeometry = null;
    const sketchViewModel = new SketchViewModel({
      layer: sketchLayer,
      defaultUpdateOptions: {
        tool: "reshape",
        toggleToolOnClick: false
      },
      view: view,
      defaultCreateOptions: {
        hasZ: false
      }
    });
    sketchViewModel.on("create", function (event) {
      if (event.state === "complete") {
        sketchGeometry = event.graphic.geometry;
        runQuery();
      }
    });
    sketchViewModel.on("update", function (event) {
      if (event.state === "complete") {
        sketchGeometry = event.graphics[0].geometry;
        runQuery();
      }
    });
    // draw geometry buttons - use the selected geometry to sktech
    document
      .getElementById("point-geometry-button")
      .addEventListener("click", geometryButtonsClickHandler);
    document
      .getElementById("line-geometry-button")
      .addEventListener("click", geometryButtonsClickHandler);
    document
      .getElementById("polygon-geometry-button")
      .addEventListener("click", geometryButtonsClickHandler);

    function geometryButtonsClickHandler(event) {
      const geometryType = event.target.value;
      clearGeometry();
      sketchViewModel.create(geometryType);
    }
    const bufferNumSlider = new Slider({
      container: "bufferNum",
      min: 0,
      max: 500,
      steps: 1,
      visibleElements: {
        labels: true
      },
      precision: 0,
      labelFormatFunction: function (value, type) {
        return value.toString() + "m";
      },
      values: [0]
    });
    // get user entered values for buffer
    bufferNumSlider.on(
      ["thumb-change", "thumb-drag"],
      bufferVariablesChanged
    );

    function bufferVariablesChanged(event) {
      bufferSize = event.value;
      runQuery();
    }
    // Clear the geometry and set the default renderer
    document
      .getElementById("clearGeometry")
      .addEventListener("click", clearGeometry);
    // Clear the geometry and set the default renderer
    function clearGeometry() {
      sketchGeometry = null;
      sketchViewModel.cancel();
      sketchLayer.removeAll();
      bufferLayer.removeAll();
      clearHighlighting();
      clearCharts();
      resultDiv.style.display = "none";
    }
    // set the geometry query on the visible SceneLayerView
    var debouncedRunQuery = promiseUtils.debounce(function () {
      if (!sketchGeometry) {
        return;
      }
      resultDiv.style.display = "block";
      updateBufferGraphic(bufferSize);
      return promiseUtils.eachAlways([
        queryStatistics(),
        updateSceneLayer()
      ]);
    });

    function runQuery() {
      debouncedRunQuery().catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
        console.error(error);
      });
    }
    // Set the renderer with objectIds
    var highlightHandle = null;

    function clearHighlighting() {
      if (highlightHandle) {
        highlightHandle.remove();
        highlightHandle = null;
      }
    }

    function highlightBuildings(objectIds, sceneLayer, sceneLayerView) {
      // Remove any previous highlighting
      if (objectIds.length > 0) {
        clearHighlighting();
        const objectIdField = sceneLayer.objectIdField;
        document.getElementById("count").innerHTML = objectIds.length;
        highlightHandle = sceneLayerView.highlight(objectIds);
      }
    }
    // update the graphic with buffer
    function updateBufferGraphic(buffer) {
      // add a polygon graphic for the buffer
      if (buffer > 0) {
        var bufferGeometry = geometryEngine.geodesicBuffer(
          sketchGeometry,
          buffer,
          "meters"
        );
        if (bufferLayer.graphics.length === 0) {
          bufferLayer.add(
            new Graphic({
              geometry: bufferGeometry,
              symbol: sketchViewModel.polygonSymbol
            })
          );
        } else {
          bufferLayer.graphics.getItemAt(0).geometry = bufferGeometry;
        }
      } else {
        bufferLayer.removeAll();
      }
    }

    function updateSceneLayer() {
      for (let ii = 0, p = Promise.resolve(); ii < 22; ii++) {
        p = p.then(_ => new Promise(resolve => {
          const query = sceneLayerView[ii].createQuery();
          query.geometry = sketchGeometry;
          query.distance = bufferSize;
          if (ii < 22) {
            sceneLayerView[ii].queryObjectIds(query).then(function (res) {
              if (res.length > 0) highlightBuildings(res, NLSCSLyrs[ii], sceneLayerView[ii]);
              resolve();
            });
          } else {
            //       return sceneLayerView[i].queryObjectIds(query).then(function(res){if (res.length >0)  highlightBuildings(res,NLSCSLyrs[i],sceneLayerView[i])}); 
          }
        }))
      }
    }
    var yearChart = null;
    var materialChart = null;

    function queryStatistics() {
      const statDefinitions = [{
        onStatisticField: "CASE WHEN  BUILD_H <10 THEN 1 ELSE 0 END",
        outStatisticFieldName: "10公尺以下",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN BUILD_H >=10 and BUILD_H <20 THEN 1 ELSE 0 END",
        outStatisticFieldName: "10-20公尺",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN BUILD_H >=20 and BUILD_H <30 THEN 1 ELSE 0 END",
        outStatisticFieldName: "20-30公尺",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN BUILD_H >=30 and BUILD_H <40 THEN 1 ELSE 0 END",
        outStatisticFieldName: "30-40公尺",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN BUILD_H >=40  THEN 1 ELSE 0 END",
        outStatisticFieldName: "40公尺以上",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN (BUILD_NO = 1 ) THEN 1 ELSE 0 END",
        outStatisticFieldName: "1層",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN (BUILD_NO = 2 ) THEN 1 ELSE 0 END",
        outStatisticFieldName: "2層",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN (BUILD_NO = 3 ) THEN 1 ELSE 0 END",
        outStatisticFieldName: "3層",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN (BUILD_NO = 4 ) THEN 1 ELSE 0 END",
        outStatisticFieldName: "4層",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN (BUILD_NO = 5 ) THEN 1 ELSE 0 END",
        outStatisticFieldName: "5層",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN (BUILD_NO >= 6 ) THEN 1 ELSE 0 END",
        outStatisticFieldName: "6層以上",
        statisticType: "sum"
      }
      ];
      var allStats = [];
      for (let iii = 0, p = Promise.resolve(); iii < 22; iii++) {
        p = p.then(_ => new Promise(resolve => {
          try {
            const query = sceneLayerView[iii].createQuery();
            query.geometry = sketchGeometry;
            query.distance = bufferSize;
            query.outStatistics = statDefinitions;
            sceneLayerView[iii].queryFeatures(query).then(function (result) {
              if (iii == 0) {
                allStats = result.features[0].attributes;
              } else if (iii == 21) {
                updateChart(materialChart, [
                  allStats['10公尺以下'],
                  allStats['10-20公尺'],
                  allStats['20-30公尺'],
                  allStats['30-40公尺'],
                  allStats['40公尺以上']
                ]);
                updateChart(yearChart, [
                  allStats['1層'],
                  allStats['2層'],
                  allStats['3層'],
                  allStats['4層'],
                  allStats['5層'],
                  allStats['6層以上']
                ]);
                return;
              } else {
                var allStatsKey = Object.keys(allStats);
                allStatsKey.forEach(item => allStats[item] += result.features[0].attributes[item])
              }
              resolve();
            }, console.error);
          } catch (e) {
            resolve();
          }
        }))
      }
    }
    // Updates the given chart with new data
    function updateChart(chart, dataValues) {
      chart.data.datasets[0].data = dataValues;
      chart.update();
    }

    function createYearChart() {
      const yearCanvas = document.getElementById("year-chart");
      yearChart = new Chart(yearCanvas.getContext("2d"), {
        type: "horizontalBar",
        data: {
          labels: [
            "1層",
            "2層",
            "3層",
            "4層",
            "5層",
            "6層以上"
          ],
          datasets: [{
            label: "樓層統計",
            backgroundColor: "#149dcf",
            stack: "Stack 0",
            data: [0, 0, 0, 0, 0, 0]
          }]
        },
        options: {
          responsive: false,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: "樓層統計"
          },
          scales: {
            xAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true,
                precision: 0
              }
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
      });
    }

    function createMaterialChart() {
      const materialCanvas = document.getElementById("material-chart");
      materialChart = new Chart(materialCanvas.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: ["<10公尺", "10-20公尺", "20-30公尺", "30-40公尺", ">40公尺"],
          datasets: [{
            backgroundColor: [
              "#FD7F6F",
              "#7EB0D5",
              "#B2E061",
              "#BD7EBE",
              "#FFB55A"
            ],
            borderWidth: 0,
            data: [0, 0, 0, 0, 0]
          }]
        },
        options: {
          responsive: false,
          cutoutPercentage: 35,
          legend: {
            position: "bottom"
          },
          title: {
            display: true,
            text: "樓層高統計"
          }
        }
      });
    }

    function clearCharts() {
      updateChart(materialChart, [0, 0, 0, 0, 0]);
      updateChart(yearChart, [0, 0, 0, 0, 0, 0]);
      document.getElementById("count").innerHTML = 0;
    }
    createYearChart();
    createMaterialChart();
  }

});