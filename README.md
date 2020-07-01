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

1.  A Google Map with markers on destinations are shown.
2.  An user can choose a category by clicking on a category button to filter markers
3.  When an user clicks on a marker, a popup is shown to display the information of the destination
4.  The dialog has two buttons - "Add to your tour" and "Close"
5.  When an user clicks on "Add to your tour", it will add the destination to the tour plan and display the name of the destination in "Your Tour" box.
6.  When an user clicks on "Close" button, it closes the dialog
7.  In "Your Tour", an user can click the "delete" button to delete the destination from the tour
7.  In "Your Tour", an user can click the "Move up" button to replace the order of the place with the one before.
8.  In "Your Tour", an user can click the "Move up" button to replace the order of the place with the one next.
9.  When an user clicks on the "Check Distance" button, it will display the tour map on the map, also calculates total KM, total duration, and calories consumed.

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

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

Google Maps Platform - Maps Javascript API
To display markers, informations

Google Maps Platform - Directions API
To display directions on the map, calculate total distance and time by walking

Bootstrap
Bootstrap to display a clean responsive layout.

FontAwesome
The project uses FontAwesome to display effective buttons.

W3C Modal Box
The project uses W3c's Modal Box to display destination details.
https://www.w3schools.com/howto/howto_css_modals.asp

## Testing

1.  A Google Map with markers on destinations are shown.
2.  Click on a category button to filter markers
3.  Click on a marker to see the popup modal to come up to display the details of the destination
4.  On the dialog, click on  "Add to your tour" button, to see if the destination title is added to the tour, and displayed under "Your Tour" heading.
5.  On the dialog, click on  "Add to your tour" button, to see if the dialog closes.

6.  When an user clicks on "Close" button, it closes the dialog
7.  In "Your Tour", click on the "delete" button to delete the destination from the tour
7.  In "Your Tour", click on the "Move up" button to replace the order of the place with the one before.
8.  In "Your Tour", click on  the "Move up" button to replace the order of the place with the one next.
9.  click on  the "Check Distance" button, it will display the tour map on the map, also calculates total KM, total duration, and calories consumed.
10. Click on "Remove" button on all destinations to see if it removes all the destinations in the tour, and displays all the markers on the map without issues.
11. Test 1 to 10 on tablet and mobile phone sizes.

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

