var pastSliderTime = 0;
var NLSCSLyrs = [];
let sceneLayerView = [];
let bufferSize = 0;
var FloodingLayer = [];
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
  "esri/widgets/BasemapToggle",
  "esri/layers/ElevationLayer",
  "esri/layers/WebTileLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  "js/PictureLayer1",
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
], function (Map, MapView, SceneView, Basemap, BasemapToggle, ElevationLayer, WebTileLayer, FeatureLayer, GraphicsLayer, PictureLayer, SceneLayer, webMercatorUtils, IdentityManager, TimeSlider, Expand, Legend,
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
  var elevLyr = new ElevationLayer({
    // Custom elevation service
    url: "https://displ-gis1.ncdr.nat.gov.tw/ceocgis/rest/services/DEM_Taiwan_2020/ImageServer"
  });
  const map = new Map({
    basemap: "hybrid",
 //   ground: "world-elevation",
    ground: {
            layers: [elevLyr]
          },
    layers: [layer]
  });
/*
    map.ground.when(function() {
          map.ground.layers.add(elevationLayer);
        });
  */
  const view = new SceneView({
    map: map,
    container: "viewDiv",
    zoom: 8,
    camera: initialCamera
    // center: [121, 23]
  });

  //????????????    
  var twMap = new WebTileLayer("https://wmts.nlsc.gov.tw/wmts/EMAP2/default/GoogleMapsCompatible/{level}/{row}/{col}.png", {
    "id": "baseMaptw",
    title:"??????",
    listMode: "hide"
  })
  twMap.minScale = 500000;
  map.add(twMap);

  const sketchLayer = new GraphicsLayer({title:"????????????",listMode: "hide"});
  const bufferLayer = new GraphicsLayer({title:"????????????",listMode: "hide"});

  const Basmap_NLSC = new SceneLayer({
    url: "https://i3s.nlsc.gov.tw/Terrain20M/i3s/rest/services/nlsc/SceneServer/baselayers/0",
    elevationInfo: {
      mode: "absolute-height",
    //  offset: 10
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
       //     if (!isMobile.any()) {
              queryDiv.style.display = "block";
       //     }
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
      if (!FloodingLayer[dt]) {
        var url = "https://winds.ncdr.nat.gov.tw/data/flood/Frame_" + dt + ".png";
         addFloodingLayer(url, past, dt);
      }else{
        FloodingLayer[dt].visible = true;
      }
      if (FloodingLayer[past]){
        FloodingLayer[past].visible = false;
      }

      

      pastSliderTime = (new Date(value.end).getTime());
    })
  })
  // time slider widget initialization


  function addFloodingLayer(url, past, dt) {
    var pt = ((dt - 1) == 0) ? 24 : (dt - 1);
    var currLayer = view.map.findLayerById("flood" + past);
    FloodingLayer[dt] = addPictureLayer1("flood" + dt, url);
    map.add(FloodingLayer[dt]);
   // if (currLayer) {
    //  setTimeout(function () { view.map.layers.remove(currLayer); }, 500)
   // }
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
    view.ui.add([bgExpand], "top-left");
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
 //   bufferNumSlider.labelsVisible = true;
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
        outStatisticFieldName: "10????????????",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN BUILD_H >=10 and BUILD_H <20 THEN 1 ELSE 0 END",
        outStatisticFieldName: "10-20??????",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN BUILD_H >=20 and BUILD_H <30 THEN 1 ELSE 0 END",
        outStatisticFieldName: "20-30??????",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN BUILD_H >=30 and BUILD_H <40 THEN 1 ELSE 0 END",
        outStatisticFieldName: "30-40??????",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN BUILD_H >=40  THEN 1 ELSE 0 END",
        outStatisticFieldName: "40????????????",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN (BUILD_NO = 1 ) THEN 1 ELSE 0 END",
        outStatisticFieldName: "1???",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN (BUILD_NO = 2 ) THEN 1 ELSE 0 END",
        outStatisticFieldName: "2???",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN (BUILD_NO = 3 ) THEN 1 ELSE 0 END",
        outStatisticFieldName: "3???",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN (BUILD_NO = 4 ) THEN 1 ELSE 0 END",
        outStatisticFieldName: "4???",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN (BUILD_NO = 5 ) THEN 1 ELSE 0 END",
        outStatisticFieldName: "5???",
        statisticType: "sum"
      },
      {
        onStatisticField: "CASE WHEN (BUILD_NO >= 6 ) THEN 1 ELSE 0 END",
        outStatisticFieldName: "6?????????",
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
                  allStats['10????????????'],
                  allStats['10-20??????'],
                  allStats['20-30??????'],
                  allStats['30-40??????'],
                  allStats['40????????????']
                ]);
                updateChart(yearChart, [
                  allStats['1???'],
                  allStats['2???'],
                  allStats['3???'],
                  allStats['4???'],
                  allStats['5???'],
                  allStats['6?????????']
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
            "1???",
            "2???",
            "3???",
            "4???",
            "5???",
            "6?????????"
          ],
          datasets: [{
            label: "????????????",
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
            text: "????????????"
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
          labels: ["<10??????", "10-20??????", "20-30??????", "30-40??????", ">40??????"],
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
            text: "???????????????"
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
