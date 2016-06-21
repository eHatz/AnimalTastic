var animals = ['cat',' dog', 'ostrich', 'flamingo', 'cow', 'parrot', 'penguin', 'turtle'];

for (var i = 0; i < animals.length; i++) {
	var animalBtn = $('<button>', {
		text: animals[i],
		class: 'animalButtons',
		id: animals[i]
	});
	$('#searchDiv').append(animalBtn);
};

$('#addAnimal-btn').on('click', function addAnimal() {
	var formValue = $('#button-text').val()
	var userAnimals = $('<button>', {
		text: formValue,
		id: formValue,
		class: 'animalButtons'
	});

	if (formValue) {
		$('#searchDiv').append(userAnimals);
	}
	return false;
});

$(document).on('click', '.animalButtons', function () {

	var animal = this.id;
	console.log(animal);

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10&rating";
	console.log(queryURL);

	$.ajax({url: queryURL, method: 'GET'}).done(function(giphy) {

		var results = giphy.data;

		for (var i = 0; i < results.length; i++) {
			var animalDiv = $('<div class="animalDiv">')

			var animalGifs = $('<img>', {
				src: results[i].images.fixed_height_still.url,
				attr: 'data-state=still',
				class: "gifs"
			});
			var ratingP = $('<p>', {
				text: 'Rating: ' + results[i].rating
			});

			animalDiv.append(ratingP);
			animalDiv.append(animalGifs);
			$('#resultDiv').prepend(animalDiv);
		}
	});
});
var playing = false;
$(document).on('click', '.gifs', function() {
	console.log(this);
	//console.log(this);
});