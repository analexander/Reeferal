function SearchPhotos() {
  let clientId = 
    "5fuRzTbXAYgl66d48PXBVa1WFSnqN8JSpO0VFqxIXtA";
  let query = document.getElementById("search").value;
  let url = 
    "https://api.unsplash.com/search/photos/?client_id=" + 
    clientId + 
    "&query=" +
    query;

  // Make request to API

  fetch(url)
    .then(function(data) {
      return data.json();
    })
    .then(function(data) {
      console.log(data);

      data.results.forEach(photo => {

        let result = `
          <img src="${photo.urls.regular}">
          <a href="${photo.links.download}">
        `;
        
        $("#result").html(result);
    });
});

/*function searchStrain(strainid) {
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
