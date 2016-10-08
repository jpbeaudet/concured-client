
(function($){
	
	// TODO : Here will go all jquery stuff
	
	// Test Concured api connection
	if ($('#test').length) {
	$.getJSON( "http://localhost:3000/api", function( data ) {
	var items = [];
	$.each( data, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val + "</li>" );
	});
 
	$( "<ul/>", {
		"class": "my-new-list",
		html: items.join( "" )
	}).appendTo( "body" );
	});
	}
})(jQuery);
