$(document).ready(function(){
  console.log('scripts loaded');

  //declare variables

  var data = [];
  var data2 = [];
  var html = '';
  var timing_event = setInterval(timingFunction, 5000);

  //function to get the coordinates of the space station
function timingFunction(){
    $.ajax({
      type:'GET',
      url:'http://api.open-notify.org/iss-now.json',
      dataType:'json',
      async:true,
      data:data,
      success:function(data){
        var lat = data['iss_position']['latitude'];
        var lon = data['iss_position']['longitude'];
        var url2 = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&' + 'lon=' + lon;
        // var coordinates = [lat, lon];

        console.log(coordinates);
        //internal AJAX call to translate the lat and long to name of place
            //function coordinateToName(){
              $.ajax({
                type:'GET',
                url:url2,
                dataType:'json',
                async:true,
                data:data2,
                success:function(data2){
                  console.log(data2);
                  var location = data2['display_name'];
                  if(data2['error'] == "Unable to geocode"){
                    html = '<p>the ISS is over an ocean!</p>';
                  }
                  else{
                  //putting in the html
                  html = location;
                  }
                 $('#location').html(html);
                }//closes second success function
              });//closes second AJAX call
             }
      });
 }
});



  //To update the location every five seconds, you’ll need to wrap the whole thing in a function that fires on a JS timing event.

  //The API will throw an error in the console that reads “error: unable to geocode.” So you’ll need to account for that. If the geocoding API throws the error, display a message that reads, “The space station is currently over an ocean.” Otherwise, show the city/country message.
