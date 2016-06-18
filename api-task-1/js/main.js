var street = $('#street');
var city = $('#city');
var submit = $('#submit-btn');
var form = $('#form');
var urlApiNYT = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var urlApiGSV = 'https://maps.googleapis.com/maps/api/streetview?size='+ $( document ).width() +'x'+ $( document ).height() +'&location=';
var ul = $('#nytimesArticlesList');
var body = $('body');
var bgimg = $('<div>');
bgimg.addClass('bgimg');
body.append(bgimg);

function makeUrlAndArticles(event){
	var queryCity = city.val();
	var queryStreet = street.val();
	event.preventDefault();
	urlApiNYT += '?' + $.param({
  		'api-key': "1f69cf6411d34fb79d118fff225705e2",
  		'q': queryCity + ' ' + queryStreet
	});
	$.ajax({
  		url: urlApiNYT,
 		method: 'GET',
	}).done(function(result) {

		console.log(result);
 		if(result.response.docs.length !== 0){
 			ul.text('');
 			$(result.response.docs).each(function(i,el){
 				var article = '<li><h3><a href='+ el.web_url +'>'+ el.headline.main + '</a></h3><p>' +
 					el.snippet + '</p><p>'+ el.pub_date +'</p></li>';
 				ul.append(article);
 			});
 		}
	}).fail(function(err) {
  		throw err;
	});
}

function googleApiImgBody(event){
	var urlApiGSV = 'https://maps.googleapis.com/maps/api/streetview?size='+ $( document ).height() +'x'+ $( document ).width() +'&location=';
	var queryCity = city.val();
	var queryStreet = street.val();	
	var imgUrl = urlApiGSV + queryCity +','+ queryStreet;
	bgimg.children().remove();
	var img = $('<img>');
	console.log(imgUrl);
	img.removeProp('src');
	img.attr('src',imgUrl.replace(/\s+/g,'')).appendTo(bgimg);
}

form.submit(makeUrlAndArticles);
form.submit(googleApiImgBody);