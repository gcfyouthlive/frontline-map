mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHVhZ2FkIiwiYSI6ImNpaG4wYXd2ODBvb3F0dGx6dTZmeGVlZXQifQ.Kkp19uppZO2snbCqQqkT5A';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/joshuagad/cjn766fuo1rqw2snbl2ynogpw',
    center: [121.02, 14.61],
    zoom: 12
});

map.on('load', function() {
    $.getJSON("./js/school-areas.json", {}, function(data) {
        data.features.forEach(function(school) {
            map.addLayer({
                'id': school.properties.id + '-line',
                'type': 'line',
                'source': {
                    'type': 'geojson',
                    'data': school
                },
                'paint': {
                    'line-color': school.properties.color,
                    'line-width': 3
                }
            });
            map.addLayer({
                'id': school.properties.id + '-fill',
                'type': 'fill',
                'source': {
                    'type': 'geojson',
                    'data': school
                },
                'paint': {
                    'fill-color': school.properties.color,
                    'fill-opacity': 0.3
                }
            });

            var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });
            map.on('mouseenter', school.properties.id + '-fill', function(e) {
                map.getCanvas().style.cursor = 'pointer';
                var coordinates = e.features[0].properties.center;
                var description = e.features[0].properties.name;
                popup.setHTML(description)
                     .setLngLat(e.lngLat)
                     .addTo(map);
            });
            map.on('mouseleave', school.properties.id + '-fill', function() {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });
        });
    });
});
