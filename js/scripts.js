$(document).ready(function(){
  console.log('scripts loaded');

  //declare variables
  var url = 'http://api.open-notify.org/iss-now.json';
  var url2 = 'https://nominatim.openstreetmap.org/reverse';
  var data = [];
  var coos = [];
  //function to get the coordinates of the space station
  function getLongLat(){
    $.ajax({
      type:'GET',
      url:url,
      dataType:'json',
      async:true,
      data:data,
      success:function(data){
        var lat = iss_position.latitude;
        var long = iss_position.longitude;
        var coordinates = [lat, long];
        var html = '';

        //internal AJAX call to translate the lat and long to name of place
        function coordinateToName(){
          $.ajax({
            type:'GET',
            url:url2,
            dataType:'json',
            async:true,
            data:coordinates,
            success:function(coordinates){
              //putting in the html
              html += '<div class="location">';
              html += '<h2>Location of the International Space Station Right Now</h2>';
              html += '<p>The space station is currently over </p>' + getLongLat().coordinates + '<p> </p>';
              html += '</div>';
            }//closes second success function
          });//closes second AJAX call
          $('#results').html(html);

        }
      }//closes first success function
    });
    setInterval(5000);
  }




  //To update the location every five seconds, you’ll need to wrap the whole thing in a function that fires on a JS timing event.

  //The API will throw an error in the console that reads “error: unable to geocode.” So you’ll need to account for that. If the geocoding API throws the error, display a message that reads, “The space station is currently over an ocean.” Otherwise, show the city/country message.
});
