$(document).ready(function(){
  console.log('scripts loaded');
  //declare variables
  var data = [];
  var data2 = [];
  var html = '';
  var css = '';
  var timing_event = setInterval(timingFunction, 5000);
//To update the location every five seconds, you’ll need to wrap the whole thing in a function that fires on a JS timing event.
function timingFunction(){
  //ajax function to get the coordinates of the space station
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
        //nested AJAX call to translate the lat and long to the name of the place
              $.ajax({
                type:'GET',
                url:url2,
                dataType:'json',
                async:true,
                data:data2,
                success:function(data2){
                  console.log(data2);
                  var location = data2['display_name'];
                  //if the station is over the ocean, provide a message
                  if(data2['error'] == "Unable to geocode"){
                    html = '<p id="ocean">The ISS is currently over an ocean!</p>';
                  }
                  //else, give the location of the station
                  else{
                  //putting in the html
                  html =
                  '<p>The space station is currently over: </p>' + location;
                  }
                 $('#results').html(html);
                }//closes second success function
              });//closes second AJAX call
            }//closes first success function
      });//closes first AJAX call
 }//closes timingFunction
});//closes document ready function


//sources:
//helpful resource for setInterval: https://www.w3schools.com/jsref/met_win_setinterval.asp
