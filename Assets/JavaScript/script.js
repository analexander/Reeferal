var queryURL = "https://strainapi.evanbusse.com/zOfVj0g/strains/search/all";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);

    });