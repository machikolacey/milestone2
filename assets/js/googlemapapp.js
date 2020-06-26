let yourtour = [];
let yourtourids = [];
var locations = [];
var totaldistance=0, totalduration=0, totalcalories=0;
let orglocations = [];
let currentcategory = 0;
var markers = [];
let isSmall = false;
var content = "";



window.addEventListener('resize', checkBrowserSize);

function checkBrowserSize(){
  console.log('checkBrowserSize');

  if(window.innerWidth < 768){
    isSmall = true;
  }
}


  fetch("./assets/js/data-brighton.json", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(resp=>resp.json())
    .then(function(data){

    locations =  orglocations = data;

    for (var i = 0; i < locations.length; i++) {
      locations[i]["id"] = i;
    }
    //currentcategory=1;
    //filterCategory(currentcategory);
    currentcategory = 0;
    initialize();
  });


  function initialize() {
    let zoom = 14;let lat =0; let lng = 0;
    switch(currentcategory){
      case 0 :
        zoom = 14;
        lat = 50.833878,
        lng =   -0.170442;
      break;
      case 1 :
      zoom = 14;
      lat = 50.824873;
      lng = -0.126048;
      break;
      case 2 :
      zoom = 13;
      lat = 50.824873;
      lng = -0.126048;
      break;
      case 3:
      zoom = 14;
      lat = 50.842827;
      lng = -0.148028;
      break;
    }
    var myOptions = {
      center: new google.maps.LatLng(lat, lng),
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    map = new google.maps.Map(document.getElementById("default"),myOptions);

    setMarkers(map, locations)

  }
 


  function filterCategory(category){
    // doument.getElementsByClassName('category').removeClass('active');
   currentcategory = category;
   
   if(category == 0){
    locations = orglocations;
   }else{
    locations = orglocations.filter( i => i.category == category );
   }
   //document.getElementById('category'+category).addClass('active');
   console.log(locations);
   initialize();
   }
   

  var markerIcon = {
    url: 'assets/images/mapicons/forest.png',
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(42,65)
  };

  var markerIconCafe = {
    url: 'assets/images/mapicons/cafe-pink.png',
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(42,65)
  };

  var markerIconAttraction = {
    url: 'assets/images/mapicons/attraction.png',
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(42,65)
  };

var infowindow;
var map;


  

function updateTour(){
let text = yourtourids.map((item) => {
  return '<li>'+orglocations[item]["title"] + "<button class='btn btn-danger btn-sm remove-from-tour' destid='"+orglocations[item]["id"]+"' onclick='removeLocation("+item+")'>Remove</button> </li>";
}).join(' ');
let text1 = "<ol id='tourlist'>"+text+"</ol> ";
 let text2 = "";

 if(yourtourids.length > 1){
  let e = document.createElement('div');
  text2  = "<button id='check-distance' class='btn btn-secondary d-inline-block' onclick='checkDistance()'>Check Distance</button>";
  text2 += "  <button id='reset-tour' class='btn btn-secondary d-inline-block' onclick='resetTour()'>Reset Tour</button>";
 }

 document.getElementById("yourtour").innerHTML =  text1 + text2; 
 //document.getElementById("tourcontent").style.display = "block";
 
}
/*
function updateTourNoButtons(){
  let text = yourtourids.map((item) => {
    return '<li>'+orglocations[item]["title"] + "</li>";
  }).join(' ');
  let text1 = "<h2>Your Tour</h2><ol>"+text+"</ol> ";
  let text2 = "";
  
   document.getElementById("yourtour-modal").innerHTML =  text1 + text2; 
  
  }
  */



function addLocation(id){

      if(!yourtourids.includes(id)){
        yourtourids.push(id);
        document.getElementById("add-to-yourtour").disabled = true;
      }else{
        alert("You've already added this place to your tour.");
      }

   updateTour();
  document.getElementById('direction-panel-modal').innerHTML = ""; 
  document.getElementById("printModal").style.display="none";

}

function resetTour(){
   yourtourids = [];
  // updateTour();
  // resetDistance();
   initialize();
   document.getElementById("yourtour-panel").style.display="none";
   document.getElementById("resetpanels").style.display="none";
}

function removeLocation(id){
  if(yourtourids.includes(id)){
    yourtourids = yourtourids.filter(item => item !== id);
  }   

  initialize();
  updateTour();  
  if(yourtourids.length == 0){
    document.getElementById("tourcontent").style.display = "none";
  }
}


function resetDistance(){
  
  initialize();
  updateTour(); 
  document.getElementById("yourtour-panel").style.display = "none";
}



function checkDistance(){
console.log('check distance');
console.log(yourtourids);
var service = new google.maps.DistanceMatrixService();
yourtourids.forEach(distancCalculator);
 document.getElementById("check-distance").style.display="block";
 document.getElementById("yourtour-panel").style.display = "block";
 document.getElementById("resetpanels").style.display = "block";
 
}

function distancCalculator(id, key){
  console.log('distancCalculator');
  console.log(yourtourids[key+1]);
  
  let nextid = yourtourids[key+1];
  if(nextid!=undefined){
    var origin = new google.maps.LatLng(orglocations[id]['lat'], orglocations[id]['lng']);
    var destination = new google.maps.LatLng(orglocations[nextid]['lat'], orglocations[nextid]['lng']);
    calculateAndDisplayRoute( origin, destination);
  }
}

function calculateAndDisplayRoute(origin, destination) {
  console.log('calculateAndDisplayRoute');
   
var directionsService = new google.maps.DirectionsService();
 var directionsRenderer = new google.maps.DirectionsRenderer();
 deleteMarkers();
        directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: 'WALKING'
            },
            function(response, status) {
              var routeinfo = response.routes[0].legs[0];
           totaldistance +=  routeinfo.distance.value;
         //  totaldistance = totaldistance /1000; //KM

           totalduration += routeinfo.duration.value;
     //      totalduration = Math.round( totalduration / 60 );// MINUTES
           let totalmiutes = Math.round( totalduration/60 );
           console.log(routeinfo.distance.text);
           console.log(routeinfo.duration.text);
           document.getElementById("totaldistance").innerHTML = "Total distance ="+ Math.round( totaldistance/1000 ) + "KM"; 
           document.getElementById("totalduration").innerHTML ="Total duration ="+ totalmiutes + "MINUTES";
         
           document.getElementById("totalcalories").innerHTML = "Calories consumed = " + Math.round(totalmiutes*10)+"kcal";

           if (status === 'OK') {
            
            console.log(response);
                directionsRenderer.setDirections(response);
                directionsRenderer.setMap(map);
                directionsRenderer.setPanel(document.getElementById('direction-panel-modal'));
          //     directionsRenderer.setPanel(document.getElementById('direction-panel-modal'));
          //     var textnode = document.createTextNode('<button onclick="openPrintModal()" class="btn btn-primary" id="check-directions">Check Directions</button>');         // Create a text node
        var text =   "<button id='check-directions' class='btn btn-primary' onclick='openPrintModal()'>Check Distance</button>";
        //  document.getElementById('yourtour-panel').appendChild(text); 
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
    let id      = 0;
    let embed   = "";
    let photo = "";

    if(locations[i]['youtube'] != undefined ){    
        embed = "<iframe width='100%' height='280' src='https://www.youtube.com/embed/"+locations[i]['youtube']+"' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
    }
    if(locations[i]['youtube'] == undefined && locations[i]['photo'] != undefined){    
      photo = "<img src='assets/images/"+locations[i]['photo']+"' alt='"+locations[i]['title']+"' class='location-photo' />"
    }
    let button = "<button class='btn btn-primary add-to-tour d-inline-block' id='add-to-yourtour' onclick='addLocation("+locations[i]['id']+")'>Add to your tour</button>";
    let currentlocation;

     var markercontent = "<h3>" + locations[i]['title'] +  "</h3>";   
     var title =  locations[i]['title'] ;
         content = "</h3><div class='row'><div class='col-sm-6'>"+photo + embed + "</div><div class='col-sm-6'>"
        + locations[i]['description']  + "</div></div>"  ;

          let icon = markerIcon;            
          switch(locations[i]['category']){
          case 2:
            icon = markerIconCafe;   
          break;
          case 1:
            icon = markerIconAttraction;
          break;

          }
    latlngset = new google.maps.LatLng(locations[i]['lat'], locations[i]['lng']);

           var marker = new google.maps.Marker({  
                   id:locations[i]['id'],  
                   map: map,
                    title: locations[i]['title'],
                     position: latlngset  , 
                     icon: icon,
                     content:content,
                     button:button,
                     optimized: false
            });
            markers.push(marker);
            map.setCenter(marker.getPosition())
     
           // if(!isSmall){

            google.maps.event.addListener(marker,'click', (function(marker,markercontent, position, content, title, id){ 
                return function() {
                      console.log('id='+marker.id);
                            document.getElementById('direction-panel-modal').innerHTML = marker.content; 
                            document.getElementById('yourtourtitle-modal').innerHTML = marker.title; 
                            document.getElementById('addbtn-wrapper').innerHTML = marker.button; 
                            if(yourtourids.includes(marker.id)){
                                document.getElementById('add-to-yourtour').disabled=true;
                                document.getElementById('add-to-yourtour').innerHTML="You've already added this!";
                                
                            }

                            document.getElementById('printModal').style.display='block';
                           


                      //if(!isSmall){      
                        /*
                        infowindow = new google.maps.InfoWindow({
                           minWidth:310
                        });
                        infowindow.setContent(marker.content);
                        infowindow.open(map,marker);
                        */
                    //  } else{
                      
                      
                  
                         
                   //   }
                        currentlocation = marker.id;

                    };
                })(marker,markercontent,infowindow)); 
       //   }
    } 
  }

  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  } 
function deleteMarkers() {
  setMapOnAll(null);
  markers = [];
}


function openPrintModal(){
  var tourcontent = document.getElementById('direction-panel').innerHTML;
 document.getElementById('direction-panel-modal').innerHTML = tourcontent; 
  document.getElementById('printModal').style.display='block';
}