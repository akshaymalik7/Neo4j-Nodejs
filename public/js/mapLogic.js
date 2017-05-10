
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



console.log(parseWKTPolygon(testWKT));


