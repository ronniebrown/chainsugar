(function(){

angular.module('trApp').directive('mapbox', [
  function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        callback: "="
      },
      template: '<div id="map"></div>',
      link: function (scope, element, attributes) {
        L.mapbox.accessToken = "pk.eyJ1Ijoicm9ubmllYnJvd24iLCJhIjoiZjE0NDRmMmJiZTYyNzZlY2Y2OGNhNGM5NDg3Yjc5ZjkifQ.oWwrU2zjDqgvikSLJODqvg";
        var map = L.mapbox.map('map', null);

        var layers = {
          "cray": L.mapbox.tileLayer('ronniebrown.mk1nidh4'),
          "concrete jungle": L.mapbox.tileLayer('ronniebrown.mk213a65')
        };

        layers["cray"].addTo(map);
        L.control.layers(layers).addTo(map);

        L.control.scale({imperial: true}).addTo(map);
        scope.callback(map);
      }
    };
  }
]);

angular.module('trApp').controller('TaskMapController', [
  '$scope',
  function ($scope) {
    $scope.callback = function (map) {
      // pass in filterValues when using filters
      function showMarkers() {
      var icons = {
        bunnyIcon : L.icon({
          iconUrl: "assets/img/bunny.png",
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
          // markers[feature.properties.taskId] = L.marker(latLng, {
        },
        onEachFeature: function(feature, Layer) {
          Layer.bindPopup(feature.properties.title);
          Layer.on("click", function(event) {
            sidebar = getElementById("sidebar");
              sidebar.innerHTML = "<h1>" + feature.properties.title + "</h1>" +
                "<p><strong>Task:</strong>" + feature.properties.name + "</p>" +
                "<p><strong>Deadline:</strong>" + feature.properties.deadline + "</p>" +
                "<p><strong>Description:</strong>" + feature.properties.description + "</p>";
          });

          Layer.on("dblclick", function(event) {
            showUserStats();
          });
        }  
      });
      layer.addTo(map);
      };
      map.setView([37.719, -122.435], 11);
    };
  }
]);
      // function updateMarkers(geojson) {
      //   geojson.feature.forEach(function(feature) {
      //     markers[feature.properties.taskId].setLatLng(
      //       feature.geometry.coordinates.reverse());
      //   });
      // }
      // filter: function(feature) {
        //   return filterValues[feature.properties.description];
        // }

      // function getFilterValues() {
      //   var checkboxes = document.getElementByClassName('filter');

      //   var values = {};
      //   for (var i = 0; i < checkboxes.length; i++) {
      //     values[checkboxes[i].value] = checkboxes[i].checked;
      //   }
      //   return values;
      // }

      // var markerLayer = showMarkers(getFilterValues());

      // var filters = document.getElementById('filters');
      // filters.onchange = function() {
      //   map.removeLayer(markerLayer);
      //   markerLayer = showMarkers(getFilterValues());
      // };

// setUpMap();
// showMarkers();

})();
