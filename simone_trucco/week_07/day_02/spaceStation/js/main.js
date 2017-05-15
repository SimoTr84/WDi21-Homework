// people API
var ISS_PEOPLE_URL = "http://api.open-notify.org/astros.json";
var ISS_METHOD = "GET";
var ISS_DATA_TYPE = "JSONP";
// location API
var ISS_LOCATION_URL = "http://api.open-notify.org/iss-now.json";
var ISS_METHOD = "GET";
var ISS_DATA_TYPE = "JSONP";
// map API
var MAP_URL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBxfMhKvkE7SWk1ybs74lVNmNZwRAoinx4&callback=initMap";
var MAP_METHOD = "GET";
var MAP_DATA_TYPE = "JSON";

// ----------------------------------------------
// number of people, names and craft
// ----------------------------------------------
  var displayPeople = function(data){
    var numOfPeople = data.number;
    var $newParagraph = $("<p></p>");
    $newParagraph.text("The number of People in space right now is: " + numOfPeople);
    $newParagraph.prependTo(".content");
  };

  var spacePeopleNames = function (data) {
    var people = data.people;
      for (var i = 0; i < people.length; i++) {
        var name = data.people[i].name;
        var craft = data.people[i].craft;
        $(".content ul").append("<li>" + "The astronaut: " + name + " is on the: " + craft + "</li>");
      }
    };

  var peopleInSpace = function (){
    $.ajax ({
      url: ISS_PEOPLE_URL,
      method: ISS_METHOD,
      dataType: ISS_DATA_TYPE
  }).done(displayPeople, spacePeopleNames);
  };

  peopleInSpace();


// ----------------------------------------------
// I.S.S. location
// ----------------------------------------------

var displayPosition = function (data) {

  var lat = parseFloat( data.iss_position.latitude );
  var lon = parseFloat(data.iss_position.longitude);
  
  $(".latitude").text( lat );
  $(".longitude").text( lon );
};

var issPosition = function (){
    $.ajax ({
      url: ISS_LOCATION_URL,
      method: ISS_METHOD,
      dataType: ISS_DATA_TYPE
  }).done(displayPosition);
};
issPosition();

$(document).ready(function () {
  issPosition();

  var ISS_POSITION = window.setInterval(function () {
    issPosition();
  }, 3000);
});


// ----------------------------------------------
// I.S.S. location - Map
// ----------------------------------------------
var lat;
var lng;
var map;

var initMap = function () {
  var spaceStation = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: spaceStation
  });
  var marker = new google.maps.Marker({
    map: map
  });
};
initMap();



// var initMap = function(lat, lon) {

//   // var lat = parseFloat( data.iss_position.latitude );
//   // var lon = parseFloat(data.iss_position.longitude);

//   var spaceStation = {
//     lat: lat,
//     lng: lon
//   };
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: spaceStation
//   });
//   var marker = new google.maps.Marker({
//     position: spaceStation,
//     map: map
//   });

//   var locateOnMap = function () {
//     $.ajax ({
//       url: MAP_URL,
//       method: MAP_METHOD,
//       dataType: MAP_DATA_TYPE
//   }).done("a map has appeared");
//   };
// };
// initMap( 37.6028, 51.5536 )







