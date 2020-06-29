let yourtour = [];
let yourtourids = [];
let locations = [];
let totaldistance=0, totalduration=0, totalcalories=0;
let orglocations = [];
let currentcategory = 0;
let markers = [];
let isSmall = false;
let content = "";
let infowindow;
let map;


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

    for (let i = 0; i < locations.length; i++) {
      locations[i]["id"] = i;
    }

    currentcategory = 0;
    currentcat = "all";
    initialize();
  });


function initialize() {
    let zoom = 14;let lat =0; let lng = 0;
 
    let myOptions = {
     center: new google.maps.LatLng(categories[currentcategory]['lat'], categories[currentcategory]['lng']),
   zoom: categories[currentcategory]['zoom'],
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    map = new google.maps.Map(document.getElementById("default"),myOptions);

    setMarkers(map, locations)

  }
 


function filterCategory(category){

   currentcategory = category;
   
   if(category == 0){
    locations = orglocations;
   }else{
    locations = orglocations.filter( i => i.category == category );
   }
 
   console.log(locations);
   initialize();

}
   
function setMarkers(map,locations){

  let marker, i

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

      let markercontent = "<h3>" + locations[i]['title'] +  "</h3>";   
      let title =  locations[i]['title'] ;
          content = "</h3><div class='row'><div class='col-sm-6'>"
           +photo + embed + "</div><div class='col-sm-6'>"
          + locations[i]['description']  + "</div></div>"  ;

      latlngset = new google.maps.LatLng(locations[i]['lat'], locations[i]['lng']);
      let catdata = categories[locations[i]['category']];
      let markerIcon = {
        url: catdata['markerIcon'],
        scaledSize: new google.maps.Size(catdata['scaledSizeWidth'], catdata['scaledSizeHeight']),
        origin: new google.maps.Point(catdata['originX'], catdata['originY']),
        anchor: new google.maps.Point(catdata['anchorX'], catdata['anchorY'])
      };
      let marker = new google.maps.Marker({  
              id:locations[i]['id'],  
              map: map,
                title: locations[i]['title'],
                position: latlngset  , 
                icon: markerIcon,
                content:content,
                button:button,
                optimized: false
        });
        markers.push(marker);
    //    map.setCenter(marker.getPosition())

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
                currentlocation = marker.id;
                };
            })(marker,markercontent,infowindow)); 
      } 
}

function updateTour(){
    let text = yourtourids.map((item,i, arr) => {
      let downArrow = upArrow ="";

      if(i > 0)
      {
         upArrow =  "<span id='plus' onclick='reorderPlus("+i+")'><i class='fa fa-arrow-up' aria-hidden='true'></i></span>";
      }
      if(arr.length - 1 !== i){
         downArrow = "<span id='minus' onclick='reorderMinus("+i+")'><i class='fa fa-arrow-down' aria-hidden='true'></i></span>";
      }

      return '<li>'+orglocations[item]["title"] 
      + "<i class='fa fa-trash'"   + orglocations[item]["id"]+"' onclick='removeLocation("+item+")' aria-hidden='true'></i>"
      +  upArrow  + downArrow +" </li>";
    
    }).join(' ');

    let text1 = "<ol id='tourlist'>"+text+"</ol> ";
    let text2 = "";

    if(yourtourids.length > 1){
      let e = document.createElement('div');
      text2  = "<button id='check-distance' class='btn btn-secondary d-inline-block' onclick='checkDistance()'>Check Distance</button>";
      text2 += "  <button id='reset-tour' class='btn btn-secondary d-inline-block' onclick='resetTour()'>Reset Tour</button>";
    }

    document.getElementById("yourtour").innerHTML =  text1 + text2; 
}

function reorderPlus(id){
console.log(id);
console.log(yourtourids);
x= id, y= id-1;
yourtourids[x] = yourtourids.splice(y, 1, yourtourids[x])[0];
console.log(yourtourids);
updateTour();
}


function reorderMinus(id){
  console.log(id);
console.log(yourtourids);
x= id, y= id+1;
yourtourids[x] = yourtourids.splice(y, 1, yourtourids[x])[0];
console.log(yourtourids);
updateTour();
  }

function distancCalculator(id, key){  
  let nextid = yourtourids[key+1];
  if(nextid!=undefined){
    let origin = new google.maps.LatLng(orglocations[id]['lat'], orglocations[id]['lng']);
    let destination = new google.maps.LatLng(orglocations[nextid]['lat'], orglocations[nextid]['lng']);
    calculateAndDisplayRoute( origin, destination);
  }
}

function calculateAndDisplayRoute(origin, destination) {   
  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();
 deleteMarkers();
  directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: 'WALKING'
      },
      function(response, status) {
        let routeinfo = response.routes[0].legs[0];
      totaldistance +=  routeinfo.distance.value;
      totalduration += routeinfo.duration.value;
      let totalmiutes = Math.round( totalduration/60 );
      console.log(routeinfo.distance.text);
      console.log(routeinfo.duration.text);
      document.getElementById("totaldistance").innerHTML = "Total distance ="+ Math.round( totaldistance/1000 ) + "KM"; 
      document.getElementById("totalduration").innerHTML ="Total duration ="+ totalmiutes + "MINUTES";     
      document.getElementById("totalcalories").innerHTML = "Calories consumed = " + Math.round(totalmiutes*10)+"kcal";

      if (status === 'OK') {
          directionsRenderer.setDirections(response);
          directionsRenderer.setMap(map);
          directionsRenderer.setPanel(document.getElementById('direction-panel-modal'));
      } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
}



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

function resetTour(){
  yourtourids = [];
 updateTour();
resetDistance();
  //initialize();
  document.getElementById("yourtour-panel").style.display="none";
  document.getElementById("resetpanels").style.display="none";
}
function resetDistance(){
  
  initialize();
  updateTour(); 
  document.getElementById("yourtour-panel").style.display = "none";
}



function checkDistance(){
console.log('check distance');
console.log(yourtourids);
let service = new google.maps.DistanceMatrixService();
yourtourids.forEach(distancCalculator);
 document.getElementById("check-distance").style.display="block";
 document.getElementById("yourtour-panel").style.display = "block";
 document.getElementById("resetpanels").style.display = "block";
 
}


  function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  } 
function deleteMarkers() {
  setMapOnAll(null);
  markers = [];
}


function openPrintModal(){
  let tourcontent = document.getElementById('direction-panel').innerHTML;
 document.getElementById('direction-panel-modal').innerHTML = tourcontent; 
  document.getElementById('printModal').style.display='block';
}