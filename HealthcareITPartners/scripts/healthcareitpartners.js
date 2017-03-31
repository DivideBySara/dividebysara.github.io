/* jshint browser: true, devel: true, esversion: 6 */

$(document).ready(function() {
  // test JavaScript and jQuery linked
 //console.log("JavaScript and jQuery are up to the challenge!");

/*let myJSONData = jQuery.getJSON("http://ec2-54-201-29-242.us-west-2.compute.amazonaws.com/rest/ehr/feature?limit=35&fields=id%2C%20category_id%2C%20feature_name%2C%20feature_desc&app_name=ehrSelect");
console.log(myJSONData);

let myData = $(":input").serializeArray();
$("#myTable").empty();
jQuery.each(myData, function(i, field) {
      myData.push(field.value + " ");
});

console.log(myData);*/

/*jQuery.each(myData, function(i, field) {
    $("#myTable").append(field.value + " ");
});*/


/*let myData = (function(){
  let myJSONData;

  $.ajax({
    url: "http://ec2-54-201-29-242.us-west-2.compute.amazonaws.com/rest/ehr/feature?limit=35&fields=id%2C%20category_id%2C%20feature_name%2C%20feature_desc&app_name=ehrSelect",
    dataType: "json",
    success: function(response) {
      myJSONData = response;
      console.log(myJSONData);
    } // End success
  });

  return {getMyJSONData : function() {
        if (myJSONData) {
          return myJSONData;
        } else {
          console.log("Error!");
        }
  }};

})();*/

/*jQuery.extend({
    getValues: function(url) {
        let myJSONData = null;
        $.ajax({
            url: "http://ec2-54-201-29-242.us-west-2.compute.amazonaws.com/rest/ehr/feature?limit=35&fields=id%2C%20category_id%2C%20feature_name%2C%20feature_desc&app_name=ehrSelect",
            type: 'get',
            dataType: 'json',
            async: true,
            success: function(response) {
                myJSONData = response;
            }
        });
       return myJSONData;
    }
});

let results = $.getValues("http://ec2-54-201-29-242.us-west-2.compute.amazonaws.com/rest/ehr/feature?limit=35&fields=id%2C%20category_id%2C%20feature_name%2C%20feature_desc&app_name=ehrSelect");

console.log(results);*/

/* myData credit:
answer by Phil Lowe 12/30/11
edited by Aakash Goplani 12/18/16
http://stackoverflow.com/questions/905298/jquery-storing-ajax-response-into-global-variable
accessed 3/30/17
*/

// get global JSON object
let myData = $.ajax({
  type: 'GET',
  url: "https://ec2-54-201-29-242.us-west-2.compute.amazonaws.com/rest/ehr/feature?limit=35&fields=id%2C%20category_id%2C%20feature_name%2C%20feature_desc&app_name=ehrSelect",
  dataType: 'json',
  global: false,
  async: false,
  success: function(data) {
    return data;
  }
}).responseJSON/*responseTest*/;

// Figure out what I got
//console.log(typeof(myData));
//console.log(myData);
//console.log(myData.record[0]);

// Create array of maps from JSON object
let myArrayOfMaps = [];
function createMyDataArray(myArrayOfMaps) {
  for (i = 0; i < myData.record.length; i++) {
    myArrayOfMaps.push(myData.record[i]);
  }
}
createMyDataArray(myArrayOfMaps);

// Create 2D array from array of maps
let my2DArray = [];
for (record in myArrayOfMaps) {
  let myArray = [];
  for (field in myArrayOfMaps[record]) {
    myArray.push(myArrayOfMaps[record][field]);
  }
  my2DArray.push(myArray);
}

// DataTable.net
$('#myTable').DataTable({
  data: my2DArray,
  columns: [
    {title: "ID"},
    {title: "Category ID"},
    {title: "Feature Name"},
    {title: "Feature Description"}
  ]
});

}); // End ready()
