$(document).ready(function(){
  console.log('scripts loaded');

  //declare variables
  // var url = 'http://api.open-notify.org/iss-now.json';
  // var url2 = 'https://nominatim.openstreetmap.org/reverse';
  var data = [];
  var html = '';
  var coordinates;
  //function to get the coordinates of the space station
function myfun(){
    $.ajax({
      type:'GET',
      url:'http://api.open-notify.org/iss-now.json',
      dataType:'json',
      async:true,
      data:data,
      success:function(data){

        var lat = data['iss_position']['latitude'];
        var lon = data['iss_position']['longitude'];
        var coordinates = [lat, lon];
        console.log(coordinates);
        html += '<h2>Location of the International Space Station Right Now : </h2>' + '<p>The space station is currently over: '  + coordinates + ' </p>';


        //internal AJAX call to translate the lat and long to name of place
            function coordinateToName(){
              $.ajax({
                type:'GET',
                url:'https://nominatim.openstreetmap.org/reverse',
                dataType:'json',
                async:true,
                data:coordinates,
                success:function(coordinates){
                  //putting in the html
                html += '<p>The cityand country it is over is: '  + address + ' </p>';

                }//closes second success function
              });//closes second AJAX call
             }
        $('#results').html(html);

      }

 });
} setInterval(myfun, 5000);









  //To update the location every five seconds, you’ll need to wrap the whole thing in a function that fires on a JS timing event.

  //The API will throw an error in the console that reads “error: unable to geocode.” So you’ll need to account for that. If the geocoding API throws the error, display a message that reads, “The space station is currently over an ocean.” Otherwise, show the city/country message.
});
