// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// Concured Client side
// Version : 2.0.1
// =====================================================
// UTILS
// =====================================================
function clean_url(url){
	url = url.replace("https://","").replace("http://","").replace("www.","")
	url = url.replace(".com","").replace(".ca","")
	return url
}

// COMPONENTS
// =====================================================

// Test list component
function test_list(data, css_class, _id,  target, _cb){
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
	return _cb()
}

// Sites list in sidebarnav
function sites_list(data, css_class, _id,  target, _cb){
	$("#"+_id).remove()
	var items = [];
		items.push( "<li id='client-site'><a href='#'>" + clean_url(data.client_site) + "</a></li>" );
	for (var i = 0; i < data.competitors_sites.length; i++) { 
		items.push( "<li id='competitor" + i + "'><a href='#'>" + clean_url(data.competitors_sites[i]) + "</a></li>" );
	};
	$( "<ul/>", {
		"id": _id,
		"class": css_class,
		html: items.join( "" )
	}).appendTo(target);
	return _cb()
}

// 5 topics for dashboard
function Dashboard_Topics(data, _id, _cb){
	$("#dashboard_topics").remove()
	if (data.length >0){
	console.log("data is: "+JSON.stringify(data)+" id is: "+_id)
		var markupS = ['<div class="onerow site" id="'+_id+'" >']
		for(var x=0; x < data.length; x++){
			markupS.push('<div class="col2">')
			markupS.push('<h3> #'+String((x+1))+" "+data[x].topic+'</h3><ul class="results">')
			markupS.push('<li><img src="img/twitter.png" alt=""/><span class="twitter">2k</span></li>')
			markupS.push('<li><img src="img/facebook.png" alt=""/><span class="facebook">1.5k</span></li>')
			markupS.push('<li><img src="img/linkedin.png" alt=""/><span class="linkedin">1.7k</span></li>')
			markupS.push('<li><img src="img/googleplus.png" alt=""/><span class="gplus">1k</span></li>')
			markupS.push('</ul></div>')
		}
		markupS.push('</div>')
		var html = markupS.join('')
		console.log("markup is: "+html)
		//$(markupS).hide().appendTo('.onerow.site').fadeIn();
		$(html).appendTo('#dashboard_topics_wrapper')
	}else{
		var markupS = ['<div class="onerow site" id="'+_id+'" >']
		markupS.push('<div class="col2">')
		markupS.push('<h3>Searching for topics</h3><ul class="results">')
			markupS.push('<li><img src="img/twitter.png" alt=""/><span class="twitter">?</span></li>')
			markupS.push('<li><img src="img/facebook.png" alt=""/><span class="facebook">?</span></li>')
			markupS.push('<li><img src="img/linkedin.png" alt=""/><span class="linkedin">?</span></li>')
			markupS.push('<li><img src="img/googleplus.png" alt=""/><span class="gplus">?</span></li></ul>')
		var html = markupS.join('')
		console.log("markup is: "+html)
		//$(markupS).hide().appendTo('.onerow.site').fadeIn();
		$(html).appendTo('#dashboard_topics_wrapper')
		}
	return _cb()
}
