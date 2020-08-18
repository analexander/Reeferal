var bForceRefreshForPhotos = false;

//populates dropdown menus in modal
function onLoad() {
  populateFlavors();
  populateEffects();
  loadStrains();
  searchStrains();
}

//Establishes query URL and API Key for --Upsplash--
function searchPhotos()
{
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
    // check race
    if(strain.race.toLowerCase() == desiredRace.toLowerCase() || desiredRace.toLowerCase() == "any"){
      // race found, check flavor
      if(strain.flavors.includes(desiredFlavor)){
        // flavor found, check effect
        if(JSON.stringify(strain.effects).includes(desiredEffect)){
          foundStrains.push(strain);
          displayStrain(key, strain, searchPhotos());
        }
      }
    }
  });

  function displayStrain(name, data) {
    var photos = JSON.parse(localStorage.getItem('strainPhotos'));
    var photo = photos[Math.floor(Math.random() * photos.length)];
    var $strainDataDiv = $("<div>");
    $strainDataDiv.addClass("strain-data");
    $("#searchResults").append($strainDataDiv);
    var nameofStrain = ("<p>Name of strain: " + name + "</p>");
    var race = ("<p>Type: " + data.race + "</p>");
    var posEffects = ("<p>Positive effects: " + data.effects.positive + "</p>");
    var negEffects = ("<p>Negative effects: " + data.effects.negative + "</p>");
    var medEffects = ("<p>Recommended if you suffer from: " + data.effects.medical + "</p>" + "<hr></hr>");
    var photo = '<img src="'+photo.urls.small+'">';
    $strainDataDiv.append(photo, nameofStrain, race, posEffects, negEffects, medEffects);

  }
}

function populateFlavors() {
  var queryURL = "https://strainapi.evanbusse.com/zOfVj0g/searchdata/flavors";
  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
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
    
    var strainCount = Object.keys(response).length;

    // load photos
    // false = don't get photos from API call. This way you don't need to load 'x' amount of random photos.
    // true = get photos from api call, returns number of photos for the number of strains
    if(JSON.parse(localStorage.getItem('strainPhotos')) == null) 
    {
      $.ajax({
        url: "https://api.unsplash.com/photos/random?query=cannabis,nug&count="+strainCount+"&client_id=7a5945QYBOBjj4CdltaYsVVS7U5ERTuHio86tpRdyd0",
        method: "GET"
      }).then(function(response) {
        localStorage.setItem('strainPhotos', JSON.stringify(response));
      });
    }
  });
}
document.getElementById('modal_1').checked = true; // open modal
document.getElementById('modal_1').checked = false; // close modal