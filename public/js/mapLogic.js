
mapboxgl.accessToken = 'pk.eyJ1IjoibWFha3MiLCJhIjoiY2l6cjRrZDMxMDF4dTM2cWc3eGxsYjU3diJ9.5wHed5clNi25rKFn34ZMXg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [77.4126, 23.2599],
    zoom: 4,
    bearing: 15,
    pitch: 60,
    interactive: false
});





function parseWKTPolygon(wkt) {
    var pointArr = [];
    var points = wkt.slice(10, -3).split(",");

    points.forEach( function(i,v) {
        var point = $.trim(v).split(" ");
        var xy = [Number(point[1]), Number(point[0])];
        pointArr.push(xy)
    });

    return pointArr;
}




map.on('load', function () {

    map.addLayer({
        'id': 'districts',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': "https://gist.githubusercontent.com/anonymous/21ecd012ca806bd52cfdc37772ee2b85/raw/c0694d9f07998faf9d4038ffb2203e574e1a5c02/map.geojson"
        },
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        }
    });
});
