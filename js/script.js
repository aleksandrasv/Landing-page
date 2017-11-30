$(function () {
    var isPortfolioLoaded = false;
    $.ajax({
        url:'https://gsclasses-ajax.herokuapp.com/portfolio',
        method: 'GET',
        dataType:'json',
        success:function (data){
                var row1 = $('<div class="row container-fluid new">');
                $('#portfolio').append(row1);
                for(var key in data){
                    var item = data[key];
                        var portfolioPics = $('<div class="col-xs-12 col-sm-6 col-md-3 mix pictures">');
                        var imgContainer = $('<div class="imgContainer">');
                        if(item.category=='art'){
                            portfolioPics.addClass('art');
                        }else if (item.category != 'interface') {
                            if (item.category == 'code') {
                                portfolioPics.addClass('code');
                            } else {
                                portfolioPics.addClass('programming');
                            }
                        } else {
                            portfolioPics.addClass('interface');
                        }
                        var hoverText = $('<div class="imgHover">');
                        var catecory = $('<h4>'+item.category+'</h4>');
                        var title = $('<h5>'+item.title+'</h5>');
                        imgContainer.append($('<img src="'+item.img+'" class="img-responsive size">'));
                        hoverText.append(catecory,title);
                        imgContainer.append(hoverText);
                        portfolioPics.append(imgContainer);
                        row1.append(portfolioPics);
                }
                mixitup('#portfolio');
                row1.hide();
                // if(isPortfolioLoaded)
        }
    });
    $('.extendedPortfolio').on('click',function () {
        $('.new').show();
    });
    $.ajax({
        url:'https://gsclasses-ajax.herokuapp.com/services',
        method:'GET',
        dataType:"json",
        success: function (data) {
            var divRow1 = $('<div class="row container-fluid serves">');
            var divRow2 = $('<div class="row container-fluid serves">');
            $('#infoSection').append(divRow1);
            $('#infoSection').append(divRow2);
            for(var key in data){
            	var item=data[key];
            	if(item.id<=3){
                    var div =$('<div class="col-sm-4">');
                    var icon =$('<i class="'+item.id+'">');
                    var title =$('<h3><span>0'+item.id+'|  </span>'+item.title+'</h3>');
                    var description =$('<p>'+item.description+'</p>');
                    div.append(icon,title,description);
                    divRow1.append(div);
				}
				if(item.id>=3 && item.id<=5){
                    var div =$('<div class="col-sm-4">');
                    var title =$('<h3><span>0'+item.id+'| </span>'+item.title+'</h3>');
                    var description =$('<p>'+item.description+'</p>');
                    div.append(icon,title,description);
                    divRow2.append(div);
				}
			}
        }
    })
    $( function() {
        var state = true;
        $( ".explore" ).on( "click", function() {
            if ( state ) {
                $('#effect').removeClass('noShow');
                $( "#effect" ).animate({
                    backgroundColor: "#FFE600",
                    color:"black"
                }, 1000 );
            } else {
                $( "#effect" ).animate({
                    backgroundColor: "#89898b",
                    color: "transparent"
                }, 1000 );
            }
            state = !state;
        });
    } );
	$('form').on('submit', function (e) {
        cleanError();
		e.preventDefault();
		var email = $('[type=email]').val().trim();
		var name = $('[name=name]').val().trim();
		var comment = $('textarea').val().trim();
		var subject = $('[name=subject]').val().trim();
		if(!email){
			$('[type=email]').addClass('error');
			$('#emailRqrd').show();
			return;
		}
		if(!validateEmail(email)){
            $('[type=email]').addClass('error');
			$('#shrtEmail').show();
			return;
		}
		if(!name){
			$('[name=name]').addClass('error');
			$('#nameRqrd').show();
			return;
		}
		if(name.length < 2){
			$('[name=name]').addClass('error');
			$('#shrtName').show();
			return;
		}
		if(!comment){
			$('textarea').addClass('error');
			$('#msgRqrd').show();
			return;
		}
		if(comment.length < 6){
			$('textarea').addClass('error');
			$('#shrtmssg').show();
			return;
		}
        $.ajax({
            url:' https://gsclasses-ajax.herokuapp.com/contact',
            method:'POST',
            data:{
                name: name,
                email:email,
                subject: subject,
                message: comment
            },
            success:function (data) {
                $('form').hide();
                $('#contacts').find('h1').text('Thank You!');
                $('#contacts').find('h2').text('Yor form has been recieved');
            }
        });
    });
    $('input').on('keydown', function () {
        cleanError();
    });
    $('textarea').on('keydown', function () {
        cleanError();
    })
	});
   /* $.ajax({
        url: "https://gsclasses-ajax.herokuapp.com/blog",
        method: "GET",
        dataType: "json",
        success: function(data){
        	console.log(data);
            /!*var divRow = $('<div class="row">');
            $('body').append(divRow);
            for(var key in data){
                var item = data[key];
                var div = $('<div class="col-sm-3">');
                var img = $('<img src="'+item.image+'">');
                var par = $('<p>'+item.discription+'</p>');
                var cat = $('<small>'+item.category+'</small>');
                div.append(par,img,cat);
                divRow.append(div);
            }*!/
        }
    })
});*/
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
function cleanError() {
	$('input').removeClass('error');
	$('textarea').removeClass('error');
	$('small').hide();
}