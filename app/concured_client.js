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
	"dashboard_topics" : {},
	"audit_topics": {},
	"audit_topics_details": {},
	"current_sites": {}
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
					// Expose the new href element related to sites
					$('a').click(function(){
					if( $(this).parent().attr('id')== 'site'){
						var element= $(this)
						var target = element.attr('id')
						console.log("target= "+target)
						window.location.href = '/audit?target='+target
					}
					});
					setTimeout(function(){ return sites();}, refresh)
				}
				if ( _locales.sites ==  MD5.hex(JSON.stringify(data))){
					return _cb()
				}else{
					_locales.sites = MD5.hex(JSON.stringify(data))
					console.log("generate for "+JSON.stringify(data.projects[0]))
					_locales.current_sites = data.projects[0]
					var generate = sites_list(data.projects[0], "", "siteslist", "#sites", _cb)
				}
			}else{
				//print error to console for debugging
				console.log(JSON.stringify(data))
			}
		});
		}
	})();
	
	// Get top 5 topics for dashboard
	var _dashboard_topics = (function get_dashboard_topics(){
		if ($('#dashboard_topics').length) {
			console.log("started")
		$.getJSON( "http://localhost:3000/api", function( data ) {
			if (data.success){

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
					_locales.dashboard_topics = MD5.hex(JSON.stringify(data.projects[0]))
					// build the url list for the api call
					urls.push(data.projects[0].client_site)
					for( var i=0; i < data.projects[0].competitors_sites.length; i++){
						 urls.push(data.projects[0].competitors_sites[i])
					}
					//console.log("generate top 5 topics for "+JSON.stringify(urls))
					
					// build a fresh top 5 topics list
					for(var x=0; x < urls.length; x++){
						var generated = span_topics_rows(x)
						var url = urls[x].replace(/\//g, '_');
						console.log("generate 5 topics for "+JSON.stringify(url))
						
						$.getJSON( "http://localhost:3000/api/audit/TopTopicsPerSite/"+ url+"?number=5&order="+x, function(topics ) {
							if(topics.success){
						       //console.log("generated 5 topics: "+JSON.stringify(topics.TopTopics)+" id: "+topics.id+" order: "+ topics.order)
								var generate = Dashboard_Topics(topics.TopTopics, topics.id, topics.order, _cb)
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
	
	// Get 10 top topics + cscore for audit page
	var _audit_topics = (function get_audit_topics(){
		if ($('#audit_topics').length) {
			console.log("started")
			var url = $('#target').text()
		$.getJSON( "http://localhost:3000/api/audit/TopTopicsPerSite/"+ url+"?number=10&order=0", function( data ) {
			if (data.success){
				var _cb = function(){
					console.log("_cb")
					// Expose the current topic list hrefs
					$('a').click(function(){
					if( $(this).parent().attr('id')== 'topic'){

						var element= $(this)
						var target = element.attr('id')
						var index = element.attr('name')
						console.log("target= "+target)
						var cscore = element.text()
						console.log("cscore= "+JSON.stringify(cscore))
						$('#selected_topic').text(target)
						if ( _locales.audit_topics_details !=  MD5.hex(JSON.stringify(target))){
							$("#wordCloud").text("")
						var fetch = audit_topics_details (target, index)
						_locales.audit_topics_details = MD5.hex(JSON.stringify(target))
						}else{
							console.log("topic data unchanged: " + JSON.stringify(target))

						}
					}
					});
					setTimeout(function(){ return get_audit_topics();}, refresh)
				}
				if ( _locales.audit_topics ==  MD5.hex(JSON.stringify(data))){
					return _cb()
				}else{
					_locales.audit_topics = MD5.hex(JSON.stringify(data))
					console.log("generate")
					var generate = Audit_Topics(data.TopTopics, url, "#audit_topics", _cb)
					//var generate = test_list(data, "alert alert-success", "testdiv", "#target", _cb)
				}
			}else{
				//print error to console for debugging
				console.log(JSON.stringify(data))
			}
		});
		}
	})();
	
	function audit_topics_details (target, index){
			// Finally populate selected topic data
			$.getJSON( "http://localhost:3000/api/audit/TopicDataPerName/"+ target, function( topic ) {
				if(topic.success){
				
				var _cb = function(){
					console.log("topic details _cb")
				}
				console.log("topic data returned: " + JSON.stringify(topic))
				$('#today_score').text(topic.topic.cscore.CSCORE) || 0
				$('#today_rank').text(index)
				$('#source_content').text(topic.topic.sentences_with_these_words[0])
				var data=[]
				data = topic.topic.subj_concepts.concat(topic.topic.obj_concepts)
				console.log("topic details data: "+data)
				var word_array = [],
				wordItems = data;
				for(var x=0; x < data.length; x++){
				var word = data[x].replace(/ /g,''),
				weight = x;
				word_array.push({'text': word, 'weight': weight});
				};
				$("#wordCloud").jQCloud(word_array); 
				}
			
			});
	}
	// BUTTONS
	// =====================================================
	var overview =true
	$('#overview').click(function(){
		if(overview){
		$('#sitediv').fadeOut( "fast", function() {
			$('#dashboard_topics_wrapper').css("width","100%")
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
		$('#audit_menu').click(function(){
			var element= $('#sites').children().children().children()
			var target = element.attr('id')
			console.log("target= "+target)
			window.location.href = '/audit?target='+target
		});

		$('#topic').click(function(){
			var element= $(this).children()
			var target = element.attr('id')
			console.log("target= "+target)
		});
})(jQuery);
