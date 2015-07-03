(function(){

angular.module('trApp')
  .controller('TaskMapController', ['$scope', '$location', 'TaskService', TaskMapController]);

  function TaskMapController($scope, $location, TaskService) {

    function setUpMap() {
      // Provide your access token
    L.mapbox.accessToken = 'pk.eyJ1Ijoicm9ubmllYnJvd24iLCJhIjoiZjE0NDRmMmJiZTYyNzZlY2Y2OGNhNGM5NDg3Yjc5ZjkifQ.oWwrU2zjDqgvikSLJODqvg';
    // Create a map in the div #map
    window.map = L.mapbox.map('map', null);

    var layers = {
      "cray": L.mapbox.tileLayer('ronniebrown.mk1nidh4'),
      "concrete jungle": L.mapbox.tileLayer('ronniebrown.mk213a65')
    };

    layers["cray"].addTo(map);
    L.control.layers(layers).addTo(map);

    L.control.scale({imperial: true}).addTo(map);

    map.setView([37.719, -122.435], 11);

    }

    function showMarkers() {
    var icons = {
      bunnyIcon : L.icon({
        iconUrl: "assets/img/bunny.png",
        iconSize: [30, 15],
        className: "icon"
      }),
      taskIcon : L.icon({
        iconUrl: "images/task.png",
        iconSize: [30, 15],
        className: "icon"
      })
    };

    var layer = L.geoJson(markers, {
      pointToLayer: function(feature, latLng) {
        return L.marker(latLng, {
          title: feature.properties.title,
          icon: icons[feature.properties.description]
        });
      },
      onEachFeature: function(feature, layer) {
        Layer.bindPopup(feature.properties.title);

        Layer.on("click", function(event) {
          sidebar = getElementById("sidebar");

        })
      }
    });

    layer.addTo(map);
    };


    window.onload = function() {
    setUpMap();
    showMarkers();
    }
  }

})();

  // var marker = L.marker(markers.features[0].geometry.coordinates.reverse(),
  //   {title: markers.features[0].properties.description);
  // marker.addTo(map);

  // function onSucess(position) {
  //   marker.setLatLng([position.coordinates.latitude, position.coordinates.longitude]);
  // }

  // function onError(error) {
  //   console.log('Position error: ', error.code, error.message);
  // }

  // window.watchId = navigator.geolocation.watchPosition(onSuccess, onError, 
  //   {maximumAge: 0, timeOut: 60000, enableHighAccuracy: true});
  // };

  // function stopPositions() {
  //   navigator.geolocation.clearWatch(window.watchId);
  // }

  // function watchPositions() {
  //   setInterval(function() {
  //     navigator.geolocation.getCurrentPosition(onSuccess, onError,         {maximumAge: 0, timeOut: 1000, enableHighAccuracy: true});
  //   }, 1000);
  // }
  // }



  // add new markers when new tasks are added
  // remove markers when tasks are completed
  // compare task ids in markers hash against geojson task ids
  // function updateMarkers(geojson) {
  //   geojson.features.forEach(function(feature) {
  //     markers[feature.properties.userId].setLatLng(
  //       feature.geometry.coordinates.reverse());
  //   });
  // }

  // var layer = L.mapbox.featureLayer(markers).addTo(map);