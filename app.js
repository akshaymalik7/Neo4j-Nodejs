

var express = require('express'); // routing
var path = require('path');
var logger = require('morgan'); // logging
var bodyParser = require('body-parser'); // getting data from an input
var neo4j = require('neo4j-driver').v1; // neo4j driver for Bolt protocol
var parse = require('wellknown');


// Init App
var app = express(); // setting the route to the app

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Initiating a neo4j session
var driver = neo4j.driver("bolt://165.123.139.8", neo4j.auth.basic("max", "1"));
var session = driver.session();

var districtL = [];


//Set router

app.get('/', function(req, res){

    session
        .run('Match (n:District) Return n limit 20')
        .then(function (result) {

            result.records.forEach(function (record) {
                console.log(record._fields[0].properties.name);

                districtL.push({
                    name: record._fields[0].properties.name ,
                    id: record._fields[0].properties.id.low,
                    wkt: record._fields[0].properties.wkt
                });


            });

        })

        .catch(function (error) {
            console.log(error);
        });


    res.render('index' , {
        districts: districtL
    });


});

// Set Port
app.listen(3000, function () {
    console.log("Server started on port 3000");
});

module.exports = app;