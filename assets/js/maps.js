function initMap() {
    console.log('initmap');
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: {
            lat: 50.819840,
            lng: -0.152263
        }   


    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var locations = [
        { lat: 50.828689, lng: -0.141210 },
        { lat: 50.819840, lng: -0.152263 },
        { lat: 50.823814, lng: -0.143577 }, 


    ];

    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}