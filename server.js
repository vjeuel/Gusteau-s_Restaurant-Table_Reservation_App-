var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"))

// code to "count" every time a person visits any of the pages.
var visitorCount = 0;
// stored data
var data = {
    waitList: [],
    reservations: []
};
// Routing
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
    visitorCount++;
})
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "public/reserve.html"));
});
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "public/tables.html"));
});
// reservation data routes from API below
app.get("/api/tables", function (res, req) {
    res.json(data.reservations);
})
app.get("/api/waitList", function (res, req) {
    res.json(data.waitList);
})
// return value to the reservations and waitlist array
app.get("/api/data", function (req, res) {
    res.json(data);
})
// clear reservations function
app.get("/api/clear", function (res, req) {
   reservations = [];
   waitList = [];
   //  data.waitList.length = 0;
   //  data.reservations.length = 0;
   //  res.json(data);
});
// function to get visitor count
app.get("/api/visitors", function (res, req) {
    res.json(visitorCount);
})
// pull table data with POST
app.post("/api/new", function (req, res) {
    var tableData = req.body;
    console.log(tableData);
    if (tableData && tableData.name) {
        tableData.routeName = tableData.name.replace(/\s+/g, "").toLowerCase();
    }
    console.log(tableData);
    //   if reservations are over 5 created function to push next reservation to waitlist.
    if (data.reservations.length < 5) {
        data.reservations.push(tableData);
    } else {
        data.waitlist.push(tableData);
    }
    res.json(tableData);
});
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

app.post("/api/reservation", function (req, res) {
   var newReservation = req.body;
   newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
   console.log(newReservation);
   reservations.push(newReservation);
   res.json(newReservation);
});