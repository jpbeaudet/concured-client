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
function pretty_number(num, digits) {
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        decimal;

    for(var i=units.length-1; i>=0; i--) {
        decimal = Math.pow(1000, i+1);

        if(num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }

    return num;
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

// span the topics rows corresponding to the number of sites
function span_topics_rows(order){
	if (document.getElementById("s"+String(order)) == null){
		var markupS = ['<div id="s'+order+'" >']
		var html = markupS.join('')
		console.log("markup is: "+html)
		$(html).appendTo("#dashboard_topics_wrapper")
		
	}
}

// 5 topics for dashboard
function Dashboard_Topics(data, _id, order, _cb){
	$("#"+order).remove()
	if (data.length >0){
	console.log("data is: "+JSON.stringify(data)+" id is: "+_id)
		var markupS = ['<div class="onerow site" id="'+_id+'" >']
		for(var x=0; x < data.length; x++){
			markupS.push('<div class="col2">')
			markupS.push('<h3> #'+String((x+1))+" "+data[x].topic+'</h3><ul class="results">')
			markupS.push('<li><img src="img/twitter.png" alt=""/><span class="twitter">'+pretty_number(data[x].twitter_count, 1)+'</span></li>')
			markupS.push('<li><img src="img/facebook.png" alt=""/><span class="facebook">'+pretty_number(data[x].facebook,1)+'</span></li>')
			markupS.push('<li><img src="img/linkedin.png" alt=""/><span class="linkedin">'+pretty_number(data[x].linked_in,1)+'</span></li>')
			markupS.push('<li><img src="img/googleplus.png" alt=""/><span class="gplus">'+pretty_number(data[x].google_plus,1)+'</span></li>')
			markupS.push('</ul></div>')
		}
		markupS.push('</div>')
		var html = markupS.join('')
		var target = document.getElementById("s"+String(order))
		target.innerHTML= html
	}else{
		var markupS = ['<div class="onerow site" id="'+_id+'" >']
		markupS.push('<div class="col2">')
		markupS.push('<h3>Searching for topics</h3><ul class="results">')
			markupS.push('<li><img src="img/twitter.png" alt=""/><span class="twitter">?</span></li>')
			markupS.push('<li><img src="img/facebook.png" alt=""/><span class="facebook">?</span></li>')
			markupS.push('<li><img src="img/linkedin.png" alt=""/><span class="linkedin">?</span></li>')
			markupS.push('<li><img src="img/googleplus.png" alt=""/><span class="gplus">?</span></li></ul>')
		var html = markupS.join('')
		var target = document.getElementById("s"+String(order))
		target.innerHTML= html
		}
	return _cb()
}
