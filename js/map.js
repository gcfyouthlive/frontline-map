
// initialize the map
var map = L.map('map').setView([14.59, 121.06], 13);

// load a tile layer

L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png',
    {
        attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
        maxZoom: 17,
        minZoom: 9
    }).addTo(map);

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "GCF Ortigas",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [121.0611, 14.5886]
    }
};


L.geoJSON(geojsonFeature).addTo(map);

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#FF0000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    console.log(feature.properties);
    console.log(layer);
    if (feature.properties && feature.properties.popupContent) {
        console.log("found popup");
        layer.bindPopup(feature.properties.popupContent);
    }
}

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature
}).addTo(map);

$.getJSON("js/frontline.json", {}, function (data){
    // add GeoJSON layer to the map once the file is loaded
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            console.log(feature);
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: feature.properties.color,
                color: feature.properties.color,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    }).addTo(map);
});
