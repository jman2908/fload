$(document).ready(function () {

    var userInput;
    $("#getStyleBTN").on("click", function (event) {
        event.preventDefault();
        userInput = $("#getStyle").val().trim();
        displayBeerStyle();
    });

    var beerName;
    var beerStyle;
    var beerDescription;
    function displayBeerStyle(event) {
        $("#infoSection").empty();
        var apiKey = "236b3591f8f9cc9a8b4672d788d3ab7b";
        var queryURL = "https://sandbox-api.brewerydb.com/v2/search?q=" + userInput + "&key=" + apiKey;

        $.ajax({
            url: "https://enigmatic-beyond-33445.herokuapp.com/cors",
            method: "POST",
            data: {
                url: queryURL,
                method: "GET",
                key: "6a00bee3031c82ad63a1aae5555a6e3b",
            },
        }).then(function (response) {
            console.log(response);
            for (i = 0; i < response.data.length; i++) {
                beerStyle = response.data[i].style.name;
                beerName = response.data[i].name + ": " + beerStyle + " --- ";
                beerDescription = response.data[i].style.description;
                var descriptionDiv = $("<div>").attr("id","textDes");
                var characteristics = $("#infoSection");
                descriptionDiv.prepend(beerName);
                descriptionDiv.append(beerDescription);
                $(characteristics).prepend(descriptionDiv);
                descriptionDiv.append("<br>");
                descriptionDiv.append("<hr>");
                
            };
        });
    };

    $(document).on("click", ".beer", function() {
        console.log("run");
        console.log(this.value);
        $(".modal-body").text(this.value);
    })

});

// user puts in a city
// city gets back coordinates
// coordinates are put into brewery url to find local breweries
// located breweries pop up on map
// user gets directions from current location to brewery