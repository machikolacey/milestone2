function initMap() {
    console.log('initmap');


    var text = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the '+
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    'south west of the nearest large town, Alice Springs; 450&#160;km '+
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    'Aboriginal people of the area. It has many springs, waterholes, '+
    'rock caves and ancient paintings. Uluru is listed as a World '+
    'Heritage Site.</p>'+
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    '(last visited June 22, 2009).</p>'+
    '</div>'+
    '</div>';

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: {
            lat: 50.819840,
            lng: -0.152263
        }   


    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var locations = [
    //   { lat: 50.828689, lng: -0.141210 },
 //       { lat: 50.819840, lng: -0.152263 },
  //      { lat: 50.823814, lng: -0.143577 }, 
        { lat: 50.830839, lng: -0.134749 },



    ];

    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length],
            text : text,
            icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        });
    });


    var infowindow = new google.maps.InfoWindow({
        content: text
      });


      marker.addListener('click', function() {
        var uluru = {lat: 50.830839, lng: -0.134749};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
          });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            title: 'Uluru (Ayers Rock)'
          });

        infowindow.open(map, marker);
      });



    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}