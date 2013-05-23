$("#dict-button").click( function() {
	// Clear out any existing content.
	var unorderedList = $( "#dictionary" )[0];
	unorderedList.innerHTML = "";

	// Define our success handler. We're defining this here instead of as
	// an anonymous function because its cleaner.
	var succeeded = function( data ) {
		console.log( "Loaded data; populating controls." );

		// We'll use this to hold on to all of our new list items.
		var listItems = [];

		// Now we'll iterate through the data we pulled and create
		// list item DOM elements.
		var mutatorCallback = function( value, index, array ) {
			// Note: We're escaping the value here to prevent
			// <marquee>YOLO</marquee> and other fun XSS tricks
			// from showing up in our list.
			var escapedValue = escape( value );
			var listItemHTML = "<li>" + escapedValue + "</li>";
			this.push( listItemHTML );
		}

		// Wrap the words in <li> tags and append them to our list of elements.
		data.words.forEach( mutatorCallback, listItems );

		// At this point, we've got a massive list containing dictionary
		// items. Let's smoosh that down into a single string of HTML
		// and set that as the inner content of our dictionary unordered
		// list element.
		var unorderedList = $( "#dictionary" )[0];
		unorderedList.innerHTML = listItems.join( '' );

		// Indicate that we're done.
		console.log( "Finished writing out list." );
	}

	// Define our failure handler. Done here for the same reasons as above.
	var failed = function( data ) {
		console.log( "Failed!" );
	}
	
	// Define our endpoint.
	var jsonDataUrl = "words.json";
	console.log( "Making GET request against " + jsonDataUrl + "." );

	// Make the actual request.
	$.getJSON( jsonDataUrl )
	.done( succeeded )
	.fail( failed );
});