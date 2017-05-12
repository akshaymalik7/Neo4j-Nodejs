
mapboxgl.accessToken = 'pk.eyJ1IjoibWFha3MiLCJhIjoiY2l6cjRrZDMxMDF4dTM2cWc3eGxsYjU3diJ9.5wHed5clNi25rKFn34ZMXg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [77.4126, 23.2599],
    zoom: 4,
    bearing: 15,
    pitch: 75,
    interactive: false
});


// pixels the map pans when the up or down arrow is clicked
var deltaDistance = 100;

// degrees the map rotates when the left or right arrow is clicked
var deltaDegrees = 25;

function easing(t) {
    return t * (2 - t);
}



map.on('load', function () {


  map.getCanvas().focus();

      map.getCanvas().addEventListener('keydown', function(e) {
          e.preventDefault();
          if (e.which === 38) { // up
              map.panBy([0, -deltaDistance], {
                  easing: easing
              });
          } else if (e.which === 40) { // down
              map.panBy([0, deltaDistance], {
                  easing: easing
              });
          } else if (e.which === 37) { // left
              map.easeTo({
                  bearing: map.getBearing() - deltaDegrees,
                  easing: easing
              });
          } else if (e.which === 39) { // right
              map.easeTo({
                  bearing: map.getBearing() + deltaDegrees,
                  easing: easing
              });
          }
      }, true);

    map.addSource("allDistricts", {
            "type": "geojson",
            "data": "https://gist.githubusercontent.com/anonymous/21ecd012ca806bd52cfdc37772ee2b85/raw/c0694d9f07998faf9d4038ffb2203e574e1a5c02/map.geojson"
        });



        map.addLayer({
              "id": "fills",
              "type": "fill",
              "source": "allDistricts",
              "layout": {},
              "paint": {
                  "fill-color": "#FFBA49",
                  "fill-opacity": 0.4
              }
          });

          map.addLayer({
              "id": "borders",
              "type": "line",
              "source": "allDistricts",
              "layout": {},
              "paint": {
                  "line-color": "#EF5B5B",
                  "line-width": 1,
                  "line-opacity": 0.3
              }
          });

    console.log(collectResponse);
});


var Population = function() {

  collectResponse.forEach(function(district, index){

        map.addLayer({
            'id': index + "district",
            'type': 'fill-extrusion',
            'source': {
                'type': 'geojson',
                'data':{
                          "type": "FeatureCollection",
                          "features": [
                            {
                              "type": "Feature",
                              "properties": {
                                "height": district.height,
                                "color": "red"
                              },
                              "geometry": {
                                "type": "MultiPolygon",
                                "coordinates": Terraformer.WKT.parse(district.wkt).coordinates


                              }
                            }
                          ]
                        }
                      },
                      'paint': {
                          // See the Mapbox Style Spec for details on property functions
                          // https://www.mapbox.com/mapbox-gl-style-spec/#types-function
                          'fill-extrusion-color': {
                              // Get the fill-extrusion-color from the source 'color' property.
                              'property': 'color',
                              'type': 'identity'
                          },
                          'fill-extrusion-height': {
                              // Get fill-extrusion-height from the source 'height' property.
                              'property': 'base_height',
                              'type': 'identity'
                          },
                          'fill-extrusion-base': {
                              // Get fill-extrusion-base from the source 'base_height' property.
                              'property': 'height',
                              'type': 'identity'
                          },
                          // Make extrusions slightly opaque for see through indoor walls.
                          'fill-extrusion-opacity': 1
                      }

          });
      });
    }
