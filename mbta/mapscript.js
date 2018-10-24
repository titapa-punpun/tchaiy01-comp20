var mapCanvas;
var myLat = 0;
var myLng = 0;
var markers = [];
var content;
var infoWindow;
var meMarker;
var marker;
    
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
    {lat: 42.395428, lng: -71.142483},
    {lat: 42.39674, lng: -71.121815},
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
    {lat: 42.300093, lng: -71.061667},
    {lat: 42.29312583, lng: -71.06573796000001},
    {lat: 42.284652, lng: -71.06448899999999},
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
    // display a map on the page
    mapCanvas = new google.maps.Map(document.getElementById('mapCanvas'), {
    center: {lat: 42.352271, lng: -71.05524200000001},
    zoom: 12,
    });

    placeMarkers(content);
    getLocation(mapCanvas);
    makeLines();
}

function placeMarkers() {
    var MBTALogo = 'MBTA_logo.png';
    for (var i = 0; i < stations.length; i++) {        
        marker = new google.maps.Marker({
            stopID: stations[i][3],
            position: {lat: stations[i][1], lng: stations[i][2]},
            map: mapCanvas,
            title: stations[i][0],
            icon: MBTALogo,
        });
        marker.setMap(mapCanvas);
        infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.open(mapCanvas, marker);
                loadTrainSchedule(marker);
            }
        })(marker, i));
    }
}

function loadTrainSchedule(marker) {
    var request = new XMLHttpRequest();
    var i;

    API_KEY = '9ddcc2d7e29349da9012849a0ec9d993';
    var URL = "https://api-v3.mbta.com/predictions?filter[route]=Red&filter[stop]=" + marker.stopID + "&page[limit]=10&page[offset]=0&sort=departure_time&api_key=" + API_KEY;
    request.open('GET', URL, true);
    
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            theData = request.responseText;
            stationSchedule = JSON.parse(theData);
            for (var i = 0; i < stationSchedule.data.length; i++) {
                var arrival, departure, boundFor;
                var arr_time = stationSchedule.data[i].attributes.arrival_time;
                var dept_time = stationSchedule.data[i].attributes.departure_time;
                var bound = stationSchedule.data[i].attributes.direction_id;
                if (dept_time == null) {
                    departure = "Not Available"; 
                }
                else {
                    departure = dept_time.split("T"),
                    departure = departure[1]
                }
                if (arr_time == null) {
                    arrival = "Not Available";
                }
                else {
                    arrival = arr_time.split("T");
                    arrival = arrival[1];
                }
                if (bound == 0) {
                    boundFor = "Southbound";
                }
                if (bound == 1) {
                    boundFor = "Northbound";
                }
                content = "<h1>" + marker.title + "</h1>" + "<h3>" + 
                "Arrival time: " + "</h3>" + "<h4>" + arrival + "<h4>" + 
                "<h3>" + "Departure time: " + "</h3>" + "<h4>" + departure + 
                "</h4>" + "<h3>" + "Bound: " + "</h3>" + "<h4>" + boundFor + 
                "</h4>";
                infoWindow.setContent(content);
            };
        } 
        else {
            content = "Schedule is currently unavailable...";
            infoWindow.setContent(content);
        }
    }
    request.send();
    return infoWindow;
}

function getLocation(myMap) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            meMarker = new google.maps.Marker({
                position: {lat: position.coords.latitude, lng: position.coords.longitude},
                map: myMap,
                title: "I'm here!",
            })
            meMarker.setMap(mapCanvas);
            mapCanvas.panTo({lat: position.coords.latitude, lng: position.coords.longitude});
            google.maps.event.addListener(meMarker, 'click', function() {
                infoWindow.setContent(meMarker.title);
                infoWindow.open(mapCanvas, meMarker);

            });
            computeDistance(meMarker, marker);
        });
        // console.log(meMarker.position.lat);
    }
    else 
        alert("geolocation is not supported");
}

function makeLines() {
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

function computeDistance(meMarker) {
    console.log(meMarker.position.lat);
    for (var i = 0; i < stations.length; i++) {
        var distance = google.maps.geometry.spherical.computeDistanceBetween(meMarker.getPosition(), new google.maps.LatLng(stations[i][1], stations[i][2]));
        console.log(distance);
    }

}


