var feelings = ["sad","happy","angry","surprised","bored","mean","sleepy"];

function displayGif() {

    var feeling = $(this).attr("data-name");
    var queryURL = ("https://api.giphy.com/v1/gifs/search?q=" + feeling + "&api_key=dsqUShGIMi63XRVd1oCNqOCeOW1hV1A5");

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(queryURL);

        console.log(response);
        
        var results = response.data;

        
        for (var i = 15; i < results.length; i++) {

          
          var gifDiv = $("<div>");

          
          var p = $("<p>").text( results[i].rating);

          
          var gifImage = $("<img>");
          
          gifImage.attr("src", results[i].images.fixed_height_still.url);
          gifImage.attr("data-animate", results[i].images.fixed_height.url); 
          gifImage.attr("data-still",results[i].images.fixed_height_still.url);
          gifImage.attr("data-state","still");
           
          

          
          gifDiv.append(p);
          gifDiv.append(gifImage);
          gifImage.addClass("gif");

        

         
          $("#feelings-view").prepend(gifDiv);

          $(".gif").on("click", function() {

        $(gifDiv).empty();            
            
            var data = $(this).attr("data-state");
            
            if (data === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
      }
    })
}


function renderButtons (){
    
    $("#buttons-view").empty();

    for(var i=0; i<feelings.length; i++){

        var a = $("<button>");

        a.addClass("feeling");
        a.attr("data-name" , feelings[i]);
        a.text(feelings[i]);
        $("#buttons-view").append(a);
    }
};


    $("#add-feelings").on("click", function(event) {
        
        event.preventDefault();
        var feeling = $("#feelings-input").val().trim();
        feelings.push(feeling);
        renderButtons();
        $("#feelings-input").val("");
    });

    $(document).on("click", ".feeling", displayGif );

    $("#feelings-view").prepend();

    

    renderButtons();




    

    

