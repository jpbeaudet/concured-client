// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Concured Client side
// Version : 2.0.1
// =====================================================

// SELECTORS
// =====================================================

(function($){
	// set locales for optimisation
	var _locales = {
	"test": {}
	}
	
	// set timeout cycle in miliseconds
	var refresh = 10000
	
	// Test Concured api connection
	var _test = (function test(){
		if ($('#test').length) {
			console.log("started")
		$.getJSON( "http://localhost:3000/api", function( data ) {
			if (data.success){
				var _cb = function(){
					console.log("_cb")
					setTimeout(function(){ return test();}, refresh)
				}
				if ( JSON.stringify(_locales.test) ==  JSON.stringify(data)){
					return _cb()
				}else{
					_locales.test = data
					console.log("generate")
					var ok = test_list(data, "alert alert-success", "testdiv", "body", _cb)
				}
			}else{
				//print error to console for debugging
				console.log(JSON.stringify(data))
			}
		});

		}
	})();
	
})(jQuery);
