var ISS_URL = "http://api.open-notify.org/iss-now.json";
var ISS_METHOD = "GET";
var ISS_DATA_TYPE = "JSONP";

var initMap = function(lat, lon) {

  var spaceStation = {
    lat: lat,
    lng: lon
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: spaceStation
  });
  var marker = new google.maps.Marker({
    position: iss,
    map: map
  });
};

var displayPosition = function(data) {

  var lat = parseFloat(data.iss_position.latitude);
  var lon = parseFloat(data.iss_position.longitude);

  $(".latitude").text(lat);
  $(".longitude").text(lon);

  initMap(lat, lon);
};

var issPosition = function() {
  $.ajax({
    url: ISS_URL,
    method: ISS_METHOD,
    dataType: ISS_DATA_TYPE
  }).done(displayPosition);
};

$(document).ready(function() {
  issPosition();

  window.setInterval(function() {
    issPosition();
  }, 3000);

});