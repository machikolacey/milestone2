let yourtour =  [];
let yourtourids = [];
let locations = [];
let orglocations = [];
let markers = [];
let infowindow;
let map;
let content = "";
let routeinfo = "";
let totaldistance = totalduration =  totalminutes = totalcalories  = currentcategory =  0;



/* 
This imports JSON data from data-brighton.json,
and convert it to arrays.
*/
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

    initialize();

  });

  /* 
  This function sets Markers based on the current locations array 
   */
function initialize() {
 
    let myOptions = {
    
        center: new google.maps.LatLng(categories[currentcategory]['lat'], categories[currentcategory]['lng']),
        zoom: categories[currentcategory]['zoom'],
        mapTypeId: google.maps.MapTypeId.ROADMAP

    };

    map = new google.maps.Map(document.getElementById("mydreammap"),myOptions);

    setMarkers(map, locations)

}
 
/*
 This function filteres the location array when an user click 'Filter by category' button 
  and resets the marker by calling initialize();
*/
function filterCategory(category){

   currentcategory = category;
   
      if(category == 0){
    
          locations = orglocations;
    
      }else{
    
           locations = orglocations.filter( i => i.category == category );
    
      }
 
   initialize();

}
   
/* This sets markers based on the locations array */
function setMarkers(map,locations){

  let marker, i

    for (i = 0; i < locations.length; i++)
    {  
      let location = locations [i]
      let id      = 0;
      let embed   = "";
      let photo = "";

      if(locations[i]['youtube'] != undefined ){    
          embed = `<iframe width='100%' height='280'
           src='https://www.youtube.com/embed/${locations[i]['youtube']}' 
          frameborder='0' allow='accelerometer; autoplay; encrypted-media; 
          gyroscope; picture-in-picture' allowfullscreen></iframe>`;
      }

      if(locations[i]['youtube'] == undefined && locations[i]['photo'] != undefined){    
        photo = `<img src='assets/images/${locations[i]['photo']}' 
                  alt='${locations[i]['title']}' class='location-photo' />`;
      }

      let button = `<button class='btn btn-primary add-to-tour d-inline-block' 
                    id='add-to-yourtour' onclick='addLocation(${locations[i]['id']})'>
                    Add to your tour</button>`;

      let markercontent = `<h3>${locations[i]['title']}</h3>`;   


       content = `</h3><div class='row'><div class='col-sm-6'>"
                  ${photo}  ${embed}  </div><div class='col-sm-6'>
                  ${locations[i]['description']}</div></div>` ;

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
                map : map,
                title : locations[i]['title'],
                position : latlngset  , 
                icon : markerIcon,
                content : content,
                button : button,
                optimized : false
        });

        markers.push(marker);

        google.maps.event.addListener(marker,'click',
       
        (function(marker){ 
      
             return function() {
           
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



/* 
This function updates the tour  based on the current locations array,
creates 'yourtour' list and displays the tour in the box
*/
function updateTour(){
    
  let text = yourtourids.map((item,i, arr) => {

    let downArrow = upArrow ="";

            if(i > 0)
            {
              upArrow =  `<span id='plus' onclick='reorderPlus(${i})'>
              <i class='fa fa-arrow-up' aria-hidden='true'></i></span>`;
            }

            if(arr.length - 1 !== i){
              downArrow = `<span id='minus' onclick='reorderMinus(${i})'>
              <i class='fa fa-arrow-down' aria-hidden='true'></i></span>`;
            }

            return `<li>${orglocations[item]["title"]}
                    <br /><i class='fa fa-trash' onclick='removeLocation(${item})' 
                    aria-hidden='true'>
                    </i>${upArrow}  ${downArrow}</li>`; 
    
      }).join(' ');

    let text1 = `<ol id='tourlist'>${text}</ol> `;
    let text2 = "";

    if(yourtourids.length > 1){
      
      text2  = `<button id='check-distance' class='btn btn-secondary dc-inline-block' 
                onclick='checkDistance()'>Check Distance</button>
                <button id='reset-tour' class='btn btn-secondary dc-inline-block' 
                  onclick='resetTour()'>Reset Tour</button>
                <button id='reset-distance' class='btn btn-secondary dc-inline-block' 
                 onclick='resetDistance()'>Return to Map</button>`;
    }

    document.getElementById("yourtour").innerHTML =  text1 + text2; 
}

/*
This function adds location to the yourtourids array,
and displays 
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


/* 
   This function removes id from yourtourids array, when an user clicks on
   remove button. */
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
  
  
  /* This function empties yourtourids array, and updates display */
  function resetTour(){
   
    yourtourids = [];
  
    updateTour();
    resetDistance();
  
  }

/* 
This function swaps the order of the tour id, with the one next
*/
function reorderPlus(id){
  x= id, y= id-1;
  yourtourids[x] = yourtourids.splice(y, 1, yourtourids[x])[0];
  updateTour();
}

/* 
This function swaps the order of the tour id, with the one previous
*/
function reorderMinus(id){
  x= id, y= id+1;
  yourtourids[x] = yourtourids.splice(y, 1, yourtourids[x])[0];
  updateTour();
}


/*
This function sets all the markers on available on the map.
 */
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
} 

/*
This function removes all the markers on the map.
*/
function deleteMarkers() {  
   
   setMapOnAll(null);
   markers = [];

}

/* This is a modal function provided by W3C Schools.
The function is reused from their tutorial page, */
function openPrintModal(){

    let tourcontent = document.getElementById('direction-panel').innerHTML;
    
    document.getElementById('direction-panel-modal').innerHTML = tourcontent; 
    document.getElementById('printModal').style.display='block';

  }



/* 
This function sets origin and destination for each path from one place to the other, 
and calls calculateAndDisplayRoute function.
*/
function distancCalculator(id, key){  
  let nextid = yourtourids[key+1];
  if(nextid!=undefined){
    let origin = new google.maps.LatLng(orglocations[id]['lat'], orglocations[id]['lng']);
    let destination = new google.maps.LatLng(orglocations[nextid]['lat'], orglocations[nextid]['lng']);
    calculateAndDisplayRoute( origin, destination);
  }
}

/* 
This function uses Google Maps DirectionsService to get information of directions,
and displays the directions on the map.
*/
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

        routeinfo = response.routes[0].legs[0];
        totaldistance +=  routeinfo.distance.value;
        totalduration += routeinfo.duration.value;
        totalmiutes = Math.round( totalduration/60 );

        document.getElementById("totaldistance").innerHTML = `Total distance = ${Math.round( totaldistance/1000 )} KM`; 
        document.getElementById("totalduration").innerHTML = `Total duration  = ${ totalmiutes} MINUTES`;     
        document.getElementById("totalcalories").innerHTML = `Calories burned = ${Math.round(totalmiutes*10)} kcal`;

            if (status === 'OK') {
                directionsRenderer.setDirections(response);
                directionsRenderer.setMap(map);
                directionsRenderer.setPanel(document.getElementById('direction-panel-modal'));
            } else {
              window.alert('Directions request failed due to ' + status);
            }

        });
}


/* This function resets distance map, and sets initial markers on the map */
function resetDistance(){  

  initialize();
  updateTour(); 

  document.getElementById("yourtour-panel").style.display = "none";

}


/* This function is called when = */
function checkDistance(){

  totaldistance = totalduration = totalcalories = totalminutes =  0;

    yourtourids.forEach(distancCalculator);
    document.getElementById("reset-distance").style.display="inline-block";
    document.getElementById("yourtour-panel").style.display = "block";
}

