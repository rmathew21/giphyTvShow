    // Initial array of tv shows
    var queries = ["Fresh Prince of Bel Air", "The Office", "Game of Thrones", "Friends"];

    // Event listener for our buttons
    $("body").on("click", ".tv", function() {

        var giphy = $(this).attr("data-name");
        console.log(giphy);
        // Storing our giphy API URL for gifs
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=oWLpp9Hr35Lq9D2sfkMn1vHyQDsKB1S3&q=" +
         giphy + "&limit=25&offset=0&rating=PG-13&lang=en";

        // Function for dumping giphy content for each button into the div
        // function displayGiphyInfo() {
        // function displayGiphyInfo() {

    
        //Performing AJAX GET request 
        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function(response) {
            console.log(response);
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div for the gif
                    var gifDiv = $("<div>");

                    // Storing the results item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var personImage = $("<img>");

                    // Giving the image tag an src attribute of a property pulled of the result item
                    personImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div
                    gifDiv.append(p);
                    gifDiv.append(personImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);


                }

            }

            // $("#gifs-appear-here").text(JSON.stringify(response));
        });
    });
    
    // });
// Function for displaying tv data
function renderButtons() {

    // Deleting tv buttons prior to adding new tv buttons
    // Also prevents dupe buttons
    $("#buttons-view").empty();


    // Looping through the array of shows
    for (var i = 0; i < queries.length; i++) {

        // then dynamicaly generating buttons for each show in the array
        var a = $("<button>");
        // Adding class
        a.addClass("tv");
        // Adding a data-attribute with a value of the show at index i
        a.attr("data-name", queries[i]);
        // Providing the button's text with a value of the show at index i
        a.text(queries[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
        
    }
}

// This function handles events where a button is clicked
$("#add-tv").on("click", function(event) {
    // To prevent the form from trying to submit itself
    event.preventDefault();

    // Grab text from the input box
    var show = $("#tv-input").val().trim();
    // the show from the textbox is then added to the array
    queries.push(show);

    // Handles the processing of the array 
    renderButtons();
});

// // Function for displaying the giphy info
//$(document).on("click", ".show", displayGiphyInfo);


// will display the initial list of shows
renderButtons();