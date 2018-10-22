var mapCanvas;
var myLat = 0;
var myLng = 0;
var markers = [];
 
var stations = [
    ['South Station', 42.352271, -71.05524200000001, 'place-sstat'],
    ['Andrew', 42.330154, -71.057655, 'place-andrw'],
    ['Porter Square', 42.3884, -71.11914899999999, 'place-portr'],
    ['Harvard Square', 42.373362, -71.118956, 'place-harsq'],
    ['JFK/UMass', 42.320685, -71.052391, 'place-jfk'],
    ['Savin Hill', 42.31129, -71.053331, 'place-shmnl'],
    ['Park Street', 42.35639457, -71.0624242, 'place-pktrm'],
    ['Broadway', 42.342622, -71.056967, 'place-brdwy'],
    ['North Quincy', 42.275275, -71.029583, 'place-nqncy'],
    ['Shawmut', 42.29312583, -71.06573796000001, 'place-smmnl'],
    ['Davis', 42.39674, -71.121815, 'place-davis'],
    ['Alewife', 42.395428, -71.142483, 'place-alfcl'],
    ['Kendall/MIT', 42.36249079, -71.08617653, 'place-knncl'],
    ['Charles/MGH', 42.361166, -71.070628, 'place-chmnl'],
    ['Downtown Crossing', 42.355518, -71.060225, 'place-dwnxg'],
    ['Quincy Center', 42.251809, -71.005409, 'place-qnctr'],
    ['Quincy Adams', 42.233391, -71.007153, 'place-qamnl'],
    ['Ashmont', 42.284652, -71.06448899999999, 'place-asmnl'],
    ['Wollaston', 42.2665139, -71.0203369, 'place-wlsta'],
    ['Fields Corner', 42.300093, -71.061667, 'place-fldcr'],
    ['Central Square', 42.365486, -71.103802, 'place-cntsq'],
    ['Braintree', 42.2078543, -71.0011385, 'place-brntn']
];

var mainPathCoords = [
    {lat: 42.39674, lng: -71.121815},
    {lat: 42.395428, lng: -71.142483},
    {lat: 42.3884, lng: -71.11914899999999},
    {lat: 42.373362, lng: -71.118956},
    {lat: 42.365486, lng: -71.103802},
    {lat: 42.36249079, lng: -71.08617653},
    {lat: 42.361166, lng: -71.070628},
    {lat: 42.35639457, lng: -71.0624242},
    {lat: 42.355518, lng: -71.060225},
    {lat: 42.352271, lng: -71.05524200000001},
    {lat: 42.342622, lng: -71.056967},
    {lat: 42.330154, lng: -71.057655},
    {lat: 42.320685, lng: -71.052391}, // JKF/UMass
    {lat: 42.31129, lng: -71.053331},
    {lat: 42.284652, lng: -71.06448899999999},
    {lat: 42.29312583, lng: -71.06573796000001},
    {lat: 42.300093, lng: -71.061667},
]; 

var subPathCoords = [
    {lat: 42.320685, lng: -71.052391},
    {lat: 42.275275, lng: -71.029583},
    {lat: 42.2665139, lng: -71.0203369},
    {lat: 42.251809, lng: -71.005409},
    {lat: 42.233391, lng: -71.007153},
    {lat: 42.2078543, lng: -71.0011385},
]; 

function initMap() {
    var myLatLng = {lat: 42.352271, lng: -71.05524200000001};

    // display a map on the page
    mapCanvas = new google.maps.Map(document.getElementById('mapCanvas'), {
    center: myLatLng,
    zoom: 12,
    });

    getLocation(mapCanvas);
    placeMarkers();
    makeLines();
    // loadTrainSchedule();
}

function getLocation(myMap) {
    console.log("inside getLocation()")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            var meMarker = new google.maps.Marker({
                position: {lat: position.coords.latitude, lng: position.coords.longitude},
                map: myMap,
                title: "Me wohooo",
            })
            // mapCanvas.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
            mapCanvas.setCenter(meMarker.getPosition());
            // mapCanvas.setZoom(10);
        });
    }
    else 
        alert("geolocation is not supported");
}

function placeMarkers() {
    // loop through array of markers and place each one on the map
    var MBTALogo = 'MBTA_logo.png';
    console.log("in placeMarkers");
    for (var i = 0; i < stations.length; i++) {
        markers[i] = new google.maps.Marker({
            position: new google.maps.LatLng(stations[i][1], stations[i][2]),
            map: mapCanvas,
            title: stations[i][0],
            icon: MBTALogo,
        });
    }
}

function loadTrainSchedule() {
    // step 1: make instance of XHR object
    var request = new XMLHttpRequest();
    console.log("new XMLHttpRequest created");
    // step 2: open JSON file at remote location
    var i;
    for (i = 0; i < stations.length; i++) {
        var URL = "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=" + stations[i][3];
        request.open("GET", URL, true);
        request.send();
    }
    // step 3: set up callback for when HTTP response is returned (when you get JSON file back)
    request.onreadystatechange = function() {
        console.log("setting up callback");

        // anything in this loop will wait till i actually have data to send it (it'll wait)
        if (request.readyState == 4 && request.status == 200) {
            // step 5: when we get all the JSON data back, parse it and use it
            theData = request.responseText;
            console.log(theData);
            console.log(request);
            stations = JSON.parse(theData);
            makeInfoWindows(theData);
        } 
    }
}

function makeInfoWindows(theData) {
    console.log(markers);
    var infoWindow = new google.maps.InfoWindow();
    var content = theData;

    for (var i = 0; i < stations.length; i++)  {
        google.maps.event.addListener(markers[i], 'click', (function(markers, i) {
            // console.log("added event listener");
            return function() {
                console.log(infoWindow);
                infoWindow.setContent(this.content);
                infoWindow.open(mapCanvas, this);
                infoWindow = document.getElementById('infoWindow');
            }
        })(markers, i));
    }
}

function makeLines() {
    console.log(mainPathCoords);
    console.log(subPathCoords);
    var mainPath = new google.maps.Polyline({
        path: mainPathCoords,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    }); mainPath.setMap(mapCanvas);

    var subPath = new google.maps.Polyline({
        path: subPathCoords,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    }); subPath.setMap(mapCanvas);
}





