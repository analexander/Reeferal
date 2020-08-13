//----------------
function searchStrain(strainid) {
  //URL for querying API
  var queryURL = "https://strainapi.evanbusse.com/zOfVj0g";

  
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  console.log(queryURL);
  $("#searchResults").empty();


// Printing the entire object to console
console.log(response);
});
}
