//populates dropdown menus in modal
function onLoad() {
  populateFlavors();
  populateEffects();
  loadStrains();
  searchStrains();
}
//Establishes query URL and API Key for --Upsplash--
function searchPhotos() {
  let clientId = "5fuRzTbXAYgl66d48PXBVa1WFSnqN8JSpO0VFqxIXtA";
  let query =  $("#race-dropdown option:selected").text();
  let url = "https://api.unsplash.com/search/photos?query=cannabis,nug&client_id=" +
    clientId +
    "&query=" +
    query;
// Make request to API to fetch photos from Upsplash -AA
  fetch(url)
    .then(function(data) {
      return data.json();
    })
    .then(function(data) {
      //console.log(data);
        data.results.forEach(photo => {
        let result = `
          <img src="${photo.urls.small}">
          <a href="${photo.links.download}">
        `;
        $("#photoResult").html(result);
    });
});
}
//strain API functions
function searchStrains(){
  var desiredRace = $("#race-dropdown option:selected").text();
  var desiredFlavor = $("#flavor-dropdown option:selected").text();
  var desiredEffect = $("#effect-dropdown option:selected").text();
  var foundStrains = [];
  var strainData = JSON.parse(localStorage.getItem("strainData"));
  if(!strainData){
    return;
  }
  var keys = Object.keys(strainData);
  keys.forEach(function(key){
    var strain = strainData[key];
    // console.log(strainData[key].id);
    // check race
    if(strain.race.toLowerCase() == desiredRace.toLowerCase() || desiredRace.toLowerCase() == "any"){
      // race found, check flavor
      if(strain.flavors.includes(desiredFlavor)){
        // flavor found, check effect
        if(JSON.stringify(strain.effects).includes(desiredEffect)){
          foundStrains.push(strain);
          displayStrain(key, strain, searchPhotos()
          )
        }
        else{
          //console.log("strain.effects !includes " + desiredEffect);
        }
      }
      else{
        //console.log("strain.flavors !includes " + desiredFlavor);
      }
    }
    else{
      //console.log(strain.race + " != " + desiredRace);
    }
  });
  console.log('number of found strains: ' + foundStrains.length);
  function displayStrain(name, data) {
    console.log(name, data.race, data.effects.positive, data.effects.negative, data.effects.medical)
    $("#searchResults").append(`<div> <br> Name of strain: ${name}<br> Type: ${data.race}<br> Positive effects: ${data.effects.positive}<br>Negative effects: ${data.effects.negative}<br> Great if you're suffering from: ${data.effects.medical} <br> <button id="faveBtn">♡</button></div>`)
  }
//if statement checking if the strains are greater or less than 0
// if(foundStrains > 0) {
// //append to dom
//   foundStrains.forEach(function(strain){
//     console.log(strain.race, strain.effects.positive)
//   });
// }
  // $("#searchResults").prepend("<p> Number of strains found: " + foundStrains.length);

}

function populateFlavors() {
  var queryURL = "https://strainapi.evanbusse.com/zOfVj0g/searchdata/flavors";
  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
      // Printing the entire object to console
      //console.log(response);
      response.forEach(function(item){
        $('#flavor-dropdown').append('<option value="'+ item + '">' + item + '</option>');
    });
  });
}
function populateEffects() {
  var queryURL = "https://strainapi.evanbusse.com/zOfVj0g/searchdata/effects";
  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
      response.forEach(function(item){
        if(item.type == "positive") {
          $('#effect-dropdown').append('<option value="'+ item.effect + '">' + item.effect + '</option>');
        }
    });
  });
}
function loadStrains() {
    var queryURL = "https://strainapi.evanbusse.com/zOfVj0g//strains/search/all";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      localStorage.setItem('strainData', JSON.stringify(response));
    });
}
document.getElementById('modal_1').checked = true; // open modal
document.getElementById('modal_1').checked = false; // close modal