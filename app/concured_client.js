// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Concured Client side
// Version : 2.0.1
// =====================================================

// SELECTORS
// =====================================================

(function($){
	// set locales for optimisation
	var MD5 = new Hashes.MD5;
	var _locales = {
	"test": {},
	"sites": {},
	"dashboard_topics" : {}
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
				if ( _locales.test ==  MD5.hex(JSON.stringify(data))){
					return _cb()
				}else{
					_locales.test = MD5.hex(JSON.stringify(data))
					console.log("generate")
					var generate = test_list(data, "alert alert-success", "testdiv", "#test", _cb)
				}
			}else{
				//print error to console for debugging
				console.log(JSON.stringify(data))
			}
		});
		}
	})();
	
	// Get sites in a list
	var _sites = (function sites(){
		if ($('#sites').length) {
			console.log("started")
		$.getJSON( "http://localhost:3000/api", function( data ) {
			if (data.success){
				var _cb = function(){
					console.log("_cb")
					setTimeout(function(){ return sites();}, refresh)
				}
				if ( _locales.sites ==  MD5.hex(JSON.stringify(data))){
					return _cb()
				}else{
					_locales.test = MD5.hex(JSON.stringify(data))
					console.log("generate for "+JSON.stringify(data.projects[0]))
					var generate = sites_list(data.projects[0], "", "siteslist", "#sites", _cb)
				}
			}else{
				//print error to console for debugging
				console.log(JSON.stringify(data))
			}
		});
		}
	})();
	
	// Get sites in a list
	var _dashboard_topics = (function get_dashboard_topics(){
		if ($('#dashboard_topics').length) {
			console.log("started")
		$.getJSON( "http://localhost:3000/api", function( data ) {
			if (data.success){
				var items=[]
				var urls =[]
				var end =0
				var _cb = function(){
					end= end+1
					console.log("_cb "+end)
					if(end==data.projects[0].competitors_sites.length+1){
						console.log("_cb over ofr top 5 topics")
						end =0
					setTimeout(function(){ return get_dashboard_topics();}, refresh)
				}
				}
				if ( _locales.dashboard_topics ==  MD5.hex(JSON.stringify(data.projects[0]))){
					return _cb()
				}else{
					_locales.test = MD5.hex(JSON.stringify(data.projects[0]))
					// build the url list for the api call
					 urls.push(data.projects[0].client_site)
					for( var i=0; i < data.projects[0].competitors_sites.length; i++){
						 urls.push(data.projects[0].competitors_sites[i])
					}
					console.log("generate top 5 topics for "+JSON.stringify(urls))
					// build a fresh top 5 topics list
					for(var x=0; x < urls.length; x++){
						var url = urls[x].replace(/\//g, '_');
						console.log("generate 5 topics for "+JSON.stringify(url))
						$.getJSON( "http://localhost:3000/api/audit/TopTopicsPerSite/"+ url+"?number=5", function(topics ) {
							if(topics.success){
						       console.log("generated 5 topics: "+JSON.stringify(topics.TopTopics)+" id: "+topics.order)
								items.push({"top_topics": topics.TopTopics})
								var generate = Dashboard_Topics(topics.TopTopics, topics.order, _cb)
							}
						});
					}
				}
			}else{
				//print error to console for debugging
				console.log(JSON.stringify(data))
			}
		});
		}
	})();
	
	// BUTTONS
	// =====================================================
	var overview =true
	$('#overview').click(function(){
		if(overview){
		$('#sitediv').fadeOut( "fast", function() {
			$('#dashboard_topics_wrapper').css("width","90%")
			$('#overview_header').css("visibility","visible")
		overview=false
		});
	}else{
		$('#sitediv').fadeIn( "fast", function() {
			$('#dashboard_topics_wrapper').css("width","75%")
			$('#overview_header').css("visibility","hidden")
		overview=true
		});
	}
	});
		$('#overview_header').click(function(){
			$('#overview').click()
		});
})(jQuery);
