$("#dict-button").click( function() {
	function hideSpinner() {
		$("#spinner")[0].style.display = "none";
	}

	function showSpinner() {
		$("#spinner")[0].style.display = "inline";
	}

	function loadDataAsync() {
		// We'll assume our data file is in the same directory.
		var url = "words.json";

		// Declare event handler methods. It's cleaner to pass them in then it
		// is to define them in line below.
		function succeeded( data ) {
			console.log( "Loaded data; populating!" );

			// We'll define a function that will let use insert some data as a
			// list item into an unordered list dom element.
			function insertIntoListDOM( element, word ) {
				var listItem = document.createElement("li");
				listItem.innerHTML = word;
				element.appendChild( listItem );
			}

			// Grab a reference to our DOM list element so we can push
			// elements into it later. We'll also want to go ahead and
			// clear it while we're at it.
			var listElement = $("#dictionary")[0];
			listElement.innerHTML = "";

			// Create a "wrapped" version of the above function that we can
			// just pass into our foreach.
			function mutatorCallback( value, index, array ) {
				insertIntoListDOM( listElement, value );
			}

			// Iterate over our data and push it into the DOM.
			var that = this;
			data.words.forEach( mutatorCallback, that );
		}

		function failed( data )	{
			console.log( "failed!" );
		}

		// (Actually) make the request.
		var params = {

		}

		// Make the actual request.
		$.getJSON( url )
		.done(succeeded)
		.fail( failed )
		.always( hideSpinner );
	}

	// When the button is clicked, we should show the spinner in case it takes
	// a long time for the json doc to load.
	showSpinner();

	// Kick off an async load.
	loadDataAsync();
});