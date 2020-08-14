//Establishes query URL and API Key for --Upsplash--
function searchPhotos() {
  let clientId = "5fuRzTbXAYgl66d48PXBVa1WFSnqN8JSpO0VFqxIXtA";
  let query = document.getElementById("search").value;
  let url = "https://api.unsplash.com/search/photos/?client_id=" + 
    clientId + 
    "&query=" +
    query;

  // Make request to API to fetch photos from Upsplash -AA
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
        
        $("#photoResult").html(result);
    });
});

/*Establishes query URL and API key for --EvanBusse Strain API--
function searchStrains() {
  let userId = "zOfVj0g"
  let strainQuery = document.getElementById("submitBtn").value;
  let queryUrl = "http://strainapi.evanbusse.com/strains/search/flavor/FLAVOR/?client_id=" +
  userId + 
  "&query=" +
  strainQuery;
  
  //Make Request to EBS API to fetch strain data -AA
fetch(url)
  .then(function(data) {
    return data.json();
  })
  .then(function(data) {
    console.log(data);

    data.results.forEach(name => {
      let result =`<li class='list-group-item src="${name.urls.regular}">
      `;

      $("#strainResults").html(result);

    });
});

/*function searchStrain(strainid) {
  //URL for querying API
  var queryURL = "https://strainapi.evanbusse.com/zOfVj0g";
  
// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
//   console.log(queryURL);
//   $("#searchResults").empty();


// // Printing the entire object to console
// console.log(response);
// });
// }

var queryURL = "https://strainapi.evanbusse.com/zOfVj0g/searchdata/flavors";

function getFlavor() {
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);
      appendFlavor(response);
    });

    function appendFlavor (response) {
    var option = '';
    for (var i=0;i<response.length;i++){
       option += '<option value="'+ response[i] + '">' + response[i] + '</option>';
    }
    $('#flavor-dropdown').append(option);
    }
  };

getFlavor();

document.getElementById('modal_1').checked = true; // open modal
document.getElementById('modal_1').checked = false; // close modal
}
*/}
