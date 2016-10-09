// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Concured Client side
// Version : 2.0.1
// =====================================================

// SELECTORS
// =====================================================

(function($){
	// set timeout cycle in miliseconds
	var refresh = 10000
	
	// Test Concured api connection
	var _test = (function test(){
		if ($('#test').length) {
		$.getJSON( "http://localhost:3000/api", function( data ) {
			var ok = test_list(data, "alert alert-success", "testdiv", "body")
			setTimeout(function(){ return test();}, refresh)
		});
		}
	})();
	
})(jQuery);
