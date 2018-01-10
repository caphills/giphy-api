
//singer arrays 
var topic = ["whitney houston", "Elton John", "Prince", "Bruce Sprinsteen"];
		
//function for displaying topic arrays of singers (getting no results when trying to use Jquery to show the buttons)
function showButtons(topicArray, div) {
	//deleting the search so as to avoid getting duplicate buttons
	$(div).empty();
	//looping through the topic arrays of singer
	for (var i = 0; i < topicArray.length; i++) {
		//modify the DOM creating a button tag using jquery, add a class, text and data attribute to a btn
		var singer = $("<button>");
		singer.addClass(newClass);
		singer.attr("data-person", topicArray[i]);
		singer.text(topicArray[i]);
		//appending buttons
		$(div).append(singer);
	}
}

$(document).on("click",".searchButton",function(){
	$("#searches").empty();
				var person = $(this).data("person");
				var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ person +"&api_key=urlYnvRwfca7BtMnMneu9UgFJ4nCkXA9&limit=10";
				$.ajax({url:queryURL,method:"GET"})
				//After receiving the data from AJAX request
					.done(function(response){
 						//looping through the response data
						for (var i=0;i<response.data.length;i++){
 								//create a reference to the Div to be modified
							var gifDiv =$('<div class="search-item">')
 								//to store the rating of the gif 
							var rating = response.data[i].rating;
							var p = $("<p>").text("Rating: "+rating);
							// need to collect animated and still images gifs.
							var animated = response.data[i].images.fixed_height.url;
							var still = response.data[i].images.fixed_height_still.url;
							var image = $("<img>");
							image.attr("src",still);
							image.attr("data-still",still);
							image.attr("data-animated",animated);
							image.attr("data-state","still");
							image.addClass("searchImage");
							//add new para for giv rating 
							gifDiv.append(p);
							//add image for the gifs
							gifDiv.append(image);
							//post our images to the browser
							$("#searches").append(gifDiv);
						}
					})
			})
                         
$(document).on("click",".searchImage",function(){
	var state = $(this).attr("data-state");
	if(state === "still"){
		$(this).attr("src",$(this).data("animated"));
		$(this).attr("data-state","animated");
	}else{
		$(this).attr("src",$(this).data("still"));
		$(this).attr("data-state","still");
	}
});
// TA - this part is not responding
	$("#searches").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newSearch = $("#search-input").val().trim();
           topicArray.push(newSearch);
  	showbuttons(topicArray, "searchButton","#buttonsDiv");
  });