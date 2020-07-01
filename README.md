# Brighton & Hove Walking Tour Planner

This is aiming to make a walking tour plan easy utilising Google Map API.
On a Map, they can click on a marker to see the descriptions, a photo or an Youtube video to see what's there.
They can easily filter the markers by clicking on a category, on the bottom of the map.

By clicking on "Add to Your Tour" button, they can add the destination to their tour, and display the place on the list of destinations in "Your Tour" box.

They can easily change orders of the destination by clicking on "Move Up" or "Move Down" buttons next to the destination.

They can delete the destination by clicking on "Delete" button next to the destination.

By Clicking on "Check Distance" button, they can see total duration, total distance in KM, and total calories consumed below "Your Tour" box.




## Wireframe

Coming soon.


## UX

When loaded, 
<ol>
<li>A Google Map with markers on destinations are shown.</li>
<li>An user can choose a category by clicking on a category button to filter markers</li>
<li>When an user clicks on a marker, a popup is shown to display the information of the destination</li>
<li>The dialog has two buttons - "Add to your tour" and "Close"</li>
<li>When an user clicks on "Add to your tour", it will add the destination to the tour plan and display the name of the destination in "Your Tour" box.</li>
<li>When an user clicks on "Close" button, it closes the dialog</li>
<li>In "Your Tour", an user can click the "delete" button to delete the destination from the tour</li>
<li>In "Your Tour", an user can click the "Move up" button to replace the order of the place with the one before.</li>
<li>In "Your Tour", an user can click the "Move up" button to replace the order of the place with the one next.</li>
<li>When an user clicks on the "Check Distance" button, it will display the tour map on the map, also calculates total KM, total duration, and calories consumed.</li>
</ol>
## Features

The Marker has my original animation, so an end user can easily identify the icon for each category.

This is using a json file for the data, so we can easily add more data or import data from another website etc.

We can add more data using the json file
 
### Existing Features

Marker Buttons - enable an user to see the destination details with a video or a photo.

"Check Distance" button - enables an user to see the distance and also calories they will consume by this tour, so they can plan their walking tour accurately.


### Features Left to Implement
- I would like to add more categories
- I would like to add more destinations, and pages for different towns
- I wouuld like to make icon ticked, and display the order on the marker when added to the tour

## Technologies Used

 <ul>
         <li>Javascript</li>
         <li><a href="https://developers.google.com/maps/documentation/javascript/tutorial" rel="nofollow">Google Maps Platform - Maps Javascript API</a> - To display markers, informations
        </li>
        <li><a href="https://developers.google.com/maps/documentation/directions/start" rel="nofollow">Google Maps Platform - Directions API</a> - To display directions on the map, calculate total distance and time by walking
        </li>
        <li>
           <a href="https://getbootstrap.com/" rel="nofollow">Bootstrap</a> - to display a clean responsive layout.
        </li>
        <li><a href="https://fontawesome.com/" rel="nofollow">FontAwesome</a> - The project uses <strong>FontAwesome</strong> to display effective buttons.
        </li>
         <li><a href="https://www.w3schools.com/howto/howto_css_modals.asp" rel="nofollow">W3C Modal Box</a> - The project uses W3c's Modal Box to display destination details.  
        </li> 
       </ul>
       
       
## Testing

<ol>
<li>A Google Map with markers on destinations are shown.</li>
<li>Click on a category button to filter markers</li>
<li>Click on a marker to see the popup modal to come up to display the details of the destination</li>
<li>On the dialog, click on  "Add to your tour" button, to see if the destination title is added to the tour, and displayed under "Your Tour" heading.</li>
<li>On the dialog, click on  "Add to your tour" button, to see if the dialog closes.</li>

<li>When an user clicks on "Close" button, it closes the dialog</li>
<li>In "Your Tour", click on the "delete" button to delete the destination from the tour</li>
<li>In "Your Tour", click on the "Move up" button to replace the order of the place with the one before.</li>
<li>In "Your Tour", click on  the "Move up" button to replace the order of the place with the one next.</li>
<li>click on  the "Check Distance" button, it will display the tour map on the map, also calculates total KM, total duration, and calories consumed.</li>
<li>Click on "Remove" button on all destinations to see if it removes all the destinations in the tour, and displays all the markers on the map without issues.</li>
<li>Test 1 to 10 on tablet and mobile phone sizes.</li>
</ol>
## Deployment

The page is deployed by Github pages. There is only master branch.


## Credits

### Content
- All the marker icons are made by Machiko Lacey-Kimura.


### Media
- The photos and texts used in this website are taken from:
https://restaurantsbrighton.co.uk
https://www.getawriggleon.com
https://www.brighton-hove.gov.uk/

- The videos used in this website are taken from:
https://www.youtube.com/


### Acknowledgements

- I received inspiration for this project from a resume project provided by Code Institute.

