var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;


// Store our API endpoint inside queryUrl
var queryUrl = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.data);
});

function createFeatures(bikestations) {

  var bikestationMarkers = [];

  for (var i = 0; i < bikestations.stations.length; i++) {
    // loop through the cities array, create a new marker, push it to the bikestationMarkers array
    bikestationMarkers.push(
       L.marker([bikestations.stations[i].lat,bikestations.stations[i].lon]).bindPopup("<h1>" + bikestations.stations[i].station_id + "</h1>")
      //L.marker([bikestations.stations[i].lat,bikestations.stations[i].lon])
      );
  }

  // Sending our earthquakes layer to the createMap function
  createMap(bikestationMarkers);
}

function createMap(cityMarkers) {


  var cityLayer = L.layerGroup(cityMarkers);

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });


  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Bike Stations": cityLayer
  };

  
  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    // layers: [streetmap, cityMarkers]
  });

  // console.log(cityMarkers);

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
// // Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: true
}).addTo(myMap);
}
