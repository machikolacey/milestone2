let yourtour = [];
let yourtourids = [];
var locations = [];
var totaldistance=0, totalduration=0;
let orglocations = [];
  fetch("./assets/js/data-brighton.json", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(resp=>resp.json())
    .then(function(data){
    locations =  orglocations = data;
    console.log(locations);
    initialize();
  });

var infowindow;
var map;


  function initialize() {
    var myOptions = {
      center: new google.maps.LatLng(33.890542, 151.274856),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    map = new google.maps.Map(document.getElementById("default"),myOptions);

    setMarkers(map, locations)

  }
 

function updateTour(){

let text = yourtourids.map((item) => {
  return '<li>'+locations[item]["title"] + "<button class='remove-from-tour' destid='"+item+"' onclick='removeLocation("+item+")'>Remove</button></li>";
}).join(' ');
let text1 = "<h2>Your Tour</h2><ul>"+text+"</ul> ";
 let text2 = "";

 if(yourtourids.length > 1){
  let e = document.createElement('div');
  text2  = "<button id='check-distance' onclick='checkDistance()'>Check Distance</button>";

 }

 document.getElementById("yourtour").innerHTML =  text1 + text2; 

}

function addLocation(id){

    if(!yourtourids.includes(id)){
      yourtourids.push(id);
      document.getElementById("add-to-yourtour").disabled = true;
    }else{
      alert("You've already added this place to your tour.");
    }



   updateTour();
}



function removeLocation(id){

  if(yourtourids.includes(id)){
    yourtourids = yourtourids.filter(item => item !== id);
  }   

  updateTour();  
  
}

function filterCategory(category){
console.log(category);
locations = orglocations.filter( i => i.category == category );
console.log(locations);
initialize();
}

function checkDistance(){
console.log('check distance');
console.log(yourtourids);
totaldistance=0, totalduration=0;
var service = new google.maps.DistanceMatrixService();
  for(var i = 1 ; i < yourtourids.length; i++){
    var origin = new google.maps.LatLng(locations[i-1]['lat'], locations[i-1]['lng']);
    var destination = new google.maps.LatLng(locations[i]['lat'], locations[i]['lng']);
    calculateAndDisplayRoute( origin, destination);
  }
}

function calculateAndDisplayRoute(origin, destination) {
  console.log('calculateAndDisplayRoute');
   
var directionsService = new google.maps.DirectionsService();
 var directionsRenderer = new google.maps.DirectionsRenderer();
        directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: 'WALKING'
            },
            function(response, status) {
              var routeinfo = response.routes[0].legs[0];
       
           totaldistance += routeinfo.distance.value;
           totalduration += routeinfo.duration.value;
           console.log(routeinfo.distance.text);
           console.log(routeinfo.duration.text);
           document.getElementById("totaldistance").innerHTML = "Total distance ="+ totaldistance /1000 +"km"; 
           document.getElementById("totalduration").innerHTML ="Total duration ="+ Math.round( totalduration / 60 )+"mins";
              if (status === 'OK') {
               console.log(response);
                directionsRenderer.setDirections(response);
                directionsRenderer.setMap(map);
                directionsRenderer.setPanel(document.getElementById('direction-panel'));
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            });
}
function setMarkers(map,locations){

      var marker, i

    for (i = 0; i < locations.length; i++)
    {  


    let location = locations [i]
    let id      = i
    let embed   = "";


    if(locations[i]['youtube'] != undefined){    
        embed = "<iframe width='570' height='321' src='https://www.youtube.com/embed/"+locations[i]['youtube']+"' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
    }
    let button = "<button class='add-to-tour' id='add-to-yourtour' onclick='addLocation("+id+")'>Add to your tour</button>";
    let currentlocation;

     var markercontent = "<h3>" + locations[i]['title'] +  "</h3>";   
     var content = 
     "<h3>" + locations[i]['title'] + 
       "</h3>"+ locations[i]['description'] +   
       embed+ button+
       "";   

    latlngset = new google.maps.LatLng(locations[i]['lat'], locations[i]['lng']);

             var marker = new google.maps.Marker({  
                   id:id,  map: map, title: locations[i]['title'] , position: latlngset  , content:content
            });
            map.setCenter(marker.getPosition())
      
            google.maps.event.addListener(marker,'click', (function(marker,markercontent, position, content){ 
                return function() {
                    if (infowindow)
                            {
                                infowindow.close();
                            }

                        infowindow = new google.maps.InfoWindow();
                        infowindow.setContent(marker.content);
                        infowindow.open(map,marker);
                      //  document.getElementById("factdiv").innerHTML =  marker.content; 

                      //  document.getElementById("add-to-tour").value=marker.id;
                        currentlocation = marker.id;

                    };
                })(marker,markercontent,infowindow)); 
    } 
  }