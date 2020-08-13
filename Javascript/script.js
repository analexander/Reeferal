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

//----------------

var queryURL = "https://strainapi.evanbusse.com/zOfVj0g/searchdata/effects";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);

    });

document.getElementById('modal_1').checked = true; // open modal
document.getElementById('modal_1').checked = false; // close modal
