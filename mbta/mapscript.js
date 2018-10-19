// var myLatitude = 0;
// var myLongitude = 0;
// var me = new google.maps.LatLng(myLatitude, myLongitude);
// var myOptions = {
//  zoom: 13;
//  center: me, 
//  mapTypeId: google.maps.mapTypeId.ROADMAP
// };

// var map;
 
// function initMap() {
//  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
//  getMyLocation();
//     var southStation = {lat: 42.352271, lng: -71.05524200000001};
//     // The map, centered at southStation
//     var map = new google.maps.Map(
//         document.getElementById('map'), {zoom: 4, center: southStation});
//     // The marker, positioned at southStation
//     var marker = new google.maps.Marker({position: southStation, map: map});
// }

// function getMyLocation() {
//  // if the navigator.geolocation object is supported on your browser
//  if (navigator.geolocation) { 
//      navigator.geolocation.getCurrentPosition(function(position) {
//          myLatitude = position.coords.latitude;
//          myLongitude = position.coords.Longitude;
//          renderMap();
//      });
//  }
//  else {
//      alert("Geolocation is not supported by your web browser.");
//  }
// }

// function renderMap() {
// me = new google.maps.LatLng(myLatitude, myLongitude);

//  // update map and go there
//  map.panTo(me);

//  // create a marker
//  southStation = new google.maps.Marker({
//      position: me,
//      title: "I'm here!"
//  });
//  marker.setMap(map);

//  // open info window on click of market 
//  google.maps.event.addListener(marker, 'click', function() {
//      infowindow.setContent(marker.title);
//      infowindow.open(map, marker);
//  });
// }

var map;
var stations = ["South Station", "Andrew", "Porter Square", "Harvard Square",
                "JFK/UMass", "Savin Hill", "Park Street", "Broadway", 
                "North Quincy", "Shawmut", "Davis", "Alewife", "Kendall/MIT", 
                "Charles/MGH", "Downtown Crossing", "Quincy Center", 
                "Quincy Adams", "Ashmont", "Wollaston", "Fields Corner", 
                "Central Square", "Braintree"];

function initMap() {
    var myLatLng = {lat: 42.352271, lng: -71.05524200000001};

    // display a map on the page
    mapCanvas = new google.maps.Map(document.getElementById('mapCanvas'), {
    center: myLatLng,
    zoom: 12
    });
    
    // multiple markers
    var markers = [
        ['South Station', 42.352271, -71.05524200000001],
        ['Andrew', 42.330154, -71.057655],
        ['Porter Square', 42.3884, -71.11914899999999],
        ['Harvard Square', 42.373362, -71.118956],
        ['JFK/UMass', 42.320685, -71.052391],
        ['Savin Hill', 42.31129, -71.053331],
        ['Park Street', 42.35639457, -71.0624242],
        ['Broadway', 42.342622, -71.056967],
        ['North Quincy', 42.275275, 42.275275],
        ['Shawmut', 42.29312583, -71.06573796000001],
        ['Davis', 42.39674, -71.121815],
        ['Alewife', 42.395428, -71.142483],
        ['Kendall/MIT', 42.36249079, -71.08617653],
        ['Charles/MGH', 42.361166, -71.070628],
        ['Downtown Crossing', 42.355518, -71.060225],
        ['Quincy Center', 42.251809, -71.005409],
        ['Quincy Adams', 42.233391, -71.007153],
        ['Ashmont', 42.284652, -71.06448899999999],
        ['Wollaston', 42.2665139, -71.0203369],
        ['Fields Corner', 42.300093, -71.061667],
        ['Central Square', 42.365486, -71.103802],
        ['Braintree', 42.2078543, -71.0011385]
    ];

    // info window content
    var infoWindowContent = [
        ['<div class="infoContent">' +
        '<h3>South Station</h3>' +
        '<p>South Station info goes here.</p>' + '</div>'],
        ['<div class="infoContent">' +
        '<h3>Andrew Station info goes here.</h3>' +
        '<p>Andrew Station </p>' +
        '</div>']
    ];

    // display multiple markers on the map
    var infoWindow = new google.maps.InfoWindow(), marker, i; 

    // loop through array of markers and place each one on the map
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        markers = new google.maps.Marker({
            position: myLatLng,
            map: mapCanvas,
            title: markers[i][0]
        });
    }

    // allow each marker to have an info window
    google.maps.event.addListener(markers, 'click', (function(markers,i) {
        return function() {
            infoWindow.setContent(infoWindowContent[i][0]);
            infoWindow.open(map, markers);
        }
    })(markers, i));

    var stations = new google.maps.Marker({
        position: myLatLng,
        map: mapCanvas,
        title: 'South Station'
    });
}
