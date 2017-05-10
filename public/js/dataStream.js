/**
 * Created by akshaymalik on 5/9/17.
 */

var geometry;

// Initiating a neo4j session

var populationQuery = "Match (n:District) return n.pop as pop;"

var HouseQuery = "Match (n:District) return n.HH as HH;"

function()





function clearMap(m) {

    for(var i in m._layers) {
        if (i != 22 && i != 24 && i != 25) {
            try {

                m.removeLayer(m._layers[i]);
            }
            catch(e) {
                console.log("problem with " + e + m._layers[i]);
            }

        }
    }
}



function parseWKTPolygons(wkt) {
    var pointArr = [];
    var points = wkt.slice(10,-3).split(",")

    for(var i = 0; i < points.length;i++){
        var xy =points[i].split(" ")

        if (!(isNaN(xy[0]) || isNaN(xy[1]))){
            pointArr.push({lat:parseFloat(xy[1]),lng:parseFloat(xy[0])})
        }
    }

    return pointArr;

}


