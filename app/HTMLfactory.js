// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Concured Client side
// Version : 2.0.1
// =====================================================

// COMPONENTS
// =====================================================

// Test list component
function test_list(data, css_class, _id,  target){
	$("#"+_id).remove()
	var items = [];
	$.each( data, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val + "</li>" );
	});
	$( "<ul/>", {
		"class": css_class,
		"id": _id,
		html: items.join( "" )
	}).appendTo(target);
	return true
}
