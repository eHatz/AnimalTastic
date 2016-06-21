var animals = ['cat',' dog', 'ostrich', 'flamingo', 'cow', 'parrot', 'penguin', 'turtle'];

//creates a bunch of buttons based on the array above and appends them to the search div
for (var i = 0; i < animals.length; i++) {
	var animalBtn = $('<button>', {
		text: animals[i],
		class: 'animalButtons btn btn-default',
		'data-animal': animals[i],
	});
	$('#searchDiv').append(animalBtn);
};

//takes the text value inside the form with an id of #button-text and creates a new button with that text
$('#addAnimal-btn').on('click', function addAnimal() {
	var formValue = $('#button-text').val();
	var userAnimals = $('<button>', {
		text: formValue,
		'data-animal': formValue,
		class: 'animalButtons btn btn-default'
	});

	//checks if there is any text inside the form and will only run if there is (prevent empty buttons)
	if (formValue) {
		$('#searchDiv').append(userAnimals);
	}
	//resets the text inside the form
	$('#button-text').val('');
	return false;
});

//searches the giphy API for values when clicking each button
$(document).on('click', '.animalButtons', function () {
	//resets results field so that the gifs don't continuously append to eachother
	$('#resultDiv').html('');

	//sets value of animal variable to the text inside the data-animal attribute
	var animal = $(this).attr('data-animal');
	console.log(animal);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10&rating";

	$.ajax({url: queryURL, method: 'GET'}).done(function(giphy) {

		var results = giphy.data;
		//creates 10 images that contain still versions of the gifs and creates 10 p tags that contain the rating of the gif
		for (var i = 0; i < results.length; i++) {
			var animalDiv = $('<div class="animalDiv">')

			var animalGifs = $('<img>', {
				src: results[i].images.fixed_height_still.url,
				'data-state': 'still',
				'data-still': results[i].images.fixed_height_still.url,
				'data-animate': results[i].images.fixed_height.url,
				class: "gifs"
			});
			var ratingP = $('<p>', {
				text: 'Rating: ' + results[i].rating
			});
			//appends each image and p tag to a div with a class of animalDiv (each image and p tag combo gets its own div)
			animalDiv.append(animalGifs);
			animalDiv.append(ratingP);
			//appends the animalDiv to an already existing element on the page
			$('#resultDiv').append(animalDiv);
		}
	});
});

//changes src of each gif to one of the data attributes set above
$(document).on('click', '.gifs', function() {
	//this refrences the gif that was clicked
	var state = $(this).attr('data-state'); 
	//if the data attribute on the image is still it is changed to animate and the src is changed to value stored in data-animate (gif is played)
	if (state === 'still') {
		$(this).attr('data-state' , 'animate');
		$(this).attr('src', $(this).attr('data-animate'));
	//if the data attribute on the image is animate it is changed to still and the src is changed to value stored in data-still (gif is paused)
	} else if (state === 'animate') {
		$(this).attr('data-state', 'still');
		$(this).attr('src', $(this).attr('data-still'));
	}
});