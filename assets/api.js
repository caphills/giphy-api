$(function(){
	showButtons(topicArray,'searchButton','#buttonsArea');
	console.log("joy");
})
//singer arrays 
var topicArray = ["whitney houston","elton john","prince","Bruce springsteen"];
		
//function for displaying topic arrays of singers (getting no results when trying to use Jquery to show the buttons)
function showButtons(topicArray,classToAdd,areaForDiv){
	//empty out the searcharea so as to avoid getting duplicate buttons
	$(areaForDiv).empty();
	//looping through the topic arrays of singer
	for(var i=0;i<topicArray.length;i++){
		//modify the DOM creating a button tag using jquery, add a class, text and data attribute to a btn
		var singer = $('<button>');
		singer.addClass(classToAdd);
		singer.attr('data-person',topicArray[i]);
		singer.text(topicArray[i]);
		//appending buttons
		$(areaForDiv).append(singer);
	}
}
//reference the search button using jquery
$(document).on("click",".searchButton",function(){
			$("#searches").empty();
			var person = $(this).data('person');
			console.log(person);
			//api queryurl adding the data type
			var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+ person +'&api_key=urlYnvRwfca7BtMnMneu9UgFJ4nCkXA9&limit=10';
			// make the api call using ajax
			$.ajax({url:queryURL,method:'GET'})
			//After receiving the data from AJAX request
			.done(function(response){
				// console.log(response);
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
			//add the searchdiv to the searches div in html
			$("#searches").append(gifDiv);		}
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

//searchbox add in new search(tried multiple ways did not give me results)
	$("#addSearch").on("click",function(){
		//prevent default did not work for me
        // This line grabs the input from the textbox and place into the newSearch area
        var newSearch = $("input-type").val();
         topicArray.push(newSearch);
  		showbuttons(topicArray,"searchButton","#buttonsArea");
  // 		return false;
  })
                         
