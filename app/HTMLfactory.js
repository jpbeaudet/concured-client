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
function url2param(url){
	return url.replace(/\//g, '_');
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
 $.fn.update = function(){
    var newElements = $(this.selector),i;    
    for(i=0;i<newElements.length;i++){
      this[i] = newElements[i];
    }
    for(;i<this.length;i++){
      this[i] = undefined;
    }
    this.length = newElements.length;
    return this;
  };
function update(){
	var $this = $('body');
	$this.update();
}

// COMPONENTS
// =====================================================

// Test list component
function test_list(data, css_class, _id, target, _cb){
	$("#"+_id).remove()
	var items = [];
	$.each( data, function( key, val ) {
		items.push( "<li id=''>" + key +" : " + val + "</li>" );
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
		items.push( "<li id='site'><a href='#' id='"+url2param(data.client_site)+"'>" + clean_url(data.client_site) + "</a></li>" );
	for (var i = 0; i < data.competitors_sites.length; i++) { 
		items.push( "<li id='site'><a href='#' id='"+url2param(data.competitors_sites[i])+"'>" + clean_url(data.competitors_sites[i]) + "</a></li>" );
	};
	$( "<ul/>", {
		"id": _id,
		"class": css_class,
		html: items.join( "" )
	}).appendTo(target);
	update()
	return _cb()
}

// span the topics rows corresponding to the number of sites
function span_topics_rows(order){
	if (document.getElementById("s"+String(order)) == null){
		var markupS = ['<div id="s'+order+'" >']
		var html = markupS.join('')
		//console.log("markup is: "+html)
		$(html).appendTo("#dashboard_topics_wrapper")
		update()
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
		update()
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
		update()
		}
	return _cb()
}
// 10 topics for audit
function Audit_Topics(data, _id, target, _cb){
	$("#"+_id).remove()
	if (data.length >0){
	console.log("audit topics data is: "+JSON.stringify(data)+" id is: "+_id)

		//var markupS = ['<div class="col6 tableContents" id="'+_id+'" >']
		var markupS = []
		markupS.push('<table cellspacing="0" cellpadding="0" border="0" width="100%" id="'+_id+'" >')
		markupS.push('<tr><th>Rank</th><th class="middle">Top Topics</th><th>cScore</th></tr>')
		for(var x=0; x < data.length; x++){
			markupS.push('<tr><td>'+data[x].rank+'</td><td class="middle" id="topic"><a href="#" name="'+data[x].rank+'" id="'+data[x].topic+'">'+data[x].topic+'</a></td><td>'+data[x].cscore+'</td></tr>')
		}
		markupS.push('</table>')
		var html = markupS.join('')
		$(html).appendTo(target)
		update()
	}else{

		//var markupS = ['<div class="col6 tableContents" id="'+_id+'" >']
		var markupS = []
		markupS.push('<table cellspacing="0" cellpadding="0" border="0" width="100%" id="'+_id+'" >')
		markupS.push('<tr><th>Rank</th><th class="middle">Top Topics</th><th>cScore</th></tr>')
		markupS.push('<tr><th> ? </th><th class="middle"> ? </th><th> ? </th></tr>')
		markupS.push('</table>')
		var html = markupS.join('')
		$(html).appendTo(target)
		update()
		}
	return _cb()
}
// selected topic details population
function Audit_Topics_Related_Concepts(data, _id, target, _cb){
	//$("#"+_id).remove()
	var items = [];

	items.push( "<div class='col6 wordCloudContainer' ><ul class='hidden cloudItems'>" );
	for (var i = 0; i < data.length; i++) { 
		items.push( "<li id='related_concepts data-weight='"+i+"'>"+data[i]+"</li>" );
	};
	items.push('</ul><div id="wordCloud" style="width: 530px; height: 220px;" class="jqcloud"></div>')
	items.push( "</div>" );
	var html = items.join('')
	console.log("markup is: "+html)
	$(html).appendTo(target)
	update()
	return _cb()
}
