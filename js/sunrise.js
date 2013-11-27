$(function(){
    domain ="kawaii-max.tumblr.com";
    api_key ="ip4lAAyVgm2947UJinn73PaKsoiK81wLu2EggqRo5LAKJHbZa1 ";
    var gettumblr=function(opt){
        $.getJSON(
        "http://api.tumblr.com/v2/blog/"+domain+"/posts?api_key="+api_key+"&jsonp=?&tag="+opt.tag,
            opt.callback
        );
    };
    
    var getdate=function(datestr){
        return datestr.replace(/:.. GMT/g,'').replace(/-/g,'.');
    }
    gettumblr({tag:'news',callback:function(data){
            console.log(data);
            if(data.response){
                var posts=data.response.posts;
                for(var i=0;i<posts.length;i++){
                    var html=$("<article />");
                    var url=posts[i].short_url;
                    var date=getdate(posts[i].date);
                    var news_id=posts[i].id;
                    if(posts[i].type=="photo"){
                        var src=posts[i].photos[0].alt_sizes[4];
                        var img=$("<img src="+src.url+" height='"+src.height+"' width='"+src.width+"'/>");
                        html.append($("<span />").append(img));
                        var title=$("<div/>").html(posts[i].caption).find("p:first").html();
                    }else if(posts[i].type=="text"){
                        var title=posts[i].title;
                    }
                    var href=$("<a href='/news?id="+news_id+"'>"+title+"</a>")

                    html.append($("<p class='date new'>"+date+"</p>")).append(href);
                    $("#main section.news").append(html);
                }
            }
        }});
    gettumblr({tag:'gallery',callback:function(data){
//            console.log(data);
            if(data.response){
                var posts=data.response.posts;
                var alltags=['all'];

                for(var i=0;i<posts.length;i++){
                    var url=posts[i].short_url;
                    var date=posts[i].date;
                    var tags=posts[i].tags;
                    var id=posts[i].id;
                    var html=$("<li class='mix' data-tgt='"+id+"' />");
                    if(posts[i].type=="photo"){
                        var title=posts[i].caption;
                        var src=posts[i].photos[0].alt_sizes[3];
                        var img=$("<img src="+src.url+" />");
//                        var href=$("<a href='"+url+"' ></a>").append(img);
//                        console.log(src);
//                        html.append(href);//.css("padding",(100-src.width)/2);
                        html.append(img);    
                        for(var j=0;j<tags.length;j++){
                            if (tags[j]!="gallery"){
                                html.addClass(tags[j]);
                                if(alltags.indexOf(tags[j])==-1){
                                    alltags.push(tags[j]);
                                }
                            }
                        }
                        var urls=[];
                        for(var k=0;k<posts[i].photos.length;k++){
                            var photos=posts[i].photos[k];
                            var url=photos.alt_sizes[0].url;//.replace(/_.+¥.jpg/,'');
                            urls.push(url);
                        }
                        $.data(html.get(0),'url',urls);
//                        console.log(urls);
//                        console.log($.data(html.get(0),'url'));
                    }

                    $("#mix-grid").append(html);
                }
//console.log(alltags);
                //<button type="button" class="btn btn-info">Info</button>
                        for(var j=0;j<alltags.length;j++){
                            var button=$("<button/>").attr("type","button").addClass("btn btn-primary").html(alltags[j]);
                            $("<li class='filter' data-filter='"+alltags[j]+"'/>").append(button)
/*
                            $("<li class='filter' data-filter='"+alltags[j]+"'/>").html(alltags[j])
.hover(
                                function(){$(this).css("cursor","pointer").css("font-size","larger");},
                                function(){$(this).css("cursor","auto").css("font-size","smaller");}
                            )
                            */
                            .appendTo($("#mix-filter"));
                        }
	$('.mix').click(function(){
        var id = $(this).attr('data-tgt');
        var url= $.data(this,'url');
/*
        wn = '.' + $(this).attr('data-tgt');
		var mW = $(wn).find('.modalBody').innerWidth() / 2;
		var mH = $(wn).find('.modalBody').innerHeight() / 2;
		$(wn).find('.modalBody').css({'margin-left':-mW,'margin-top':-mH});
		$(wn).fadeIn(500);
*/
        var w=$("body").width();
        $("#mask").addClass('maskBK');
        $("#top").css("position","fixed");
        $("#modal").fadeIn(500);
        for(var i=0;i<url.length;i++){
            $("<img/>").attr("src",url[i]).appendTo($("#modalImg"));
        }

    $("#modalImg img").ready(function(){
            var mw=$("#modalBody").width();
//            console.log(w);
//            console.log(mw);
            $(".modalBody").css("left",(w/2 - 283));
        });

    });
	$('.close,#mask').click(function(){
		$("#modal").fadeOut(500,function(){
            $("#top").css("position","relative");
            $("#modalImg").html("");
            $("#mask").removeClass('maskBK');
        });
	});

                
    //Mixitup!
    $('#mix-grid').mixitup({
      targetSelector: '.mix',
      filterSelector: '.filter',
//      sortSelector: '.sort'
    });

            }
        }});
    
    var images=[
/*
        "0007.jpg",
        "3856.jpg",
        "4078.jpg",
        "3766.jpg",
        "4095.jpg",
*/
"http://static.tumblr.com/bhwyguc/Rrgmwf453/img_0013.jpg",
"http://static.tumblr.com/bhwyguc/KX9mwezgy/3766.jpg",
"http://static.tumblr.com/bhwyguc/kwUmwezhd/3856.jpg",
"http://static.tumblr.com/bhwyguc/zxsmwezhx/4078.jpg",
"http://static.tumblr.com/bhwyguc/ltOmwezib/4095.jpg",

    ];
    
    var interval=2000; 
    var imgdom=[];
    $.each(images,function(i){
//        var img=$("<img/>").attr("src","../../img/"+this).load(function(e){
        var img=$("<img/>").attr("src",this).load(function(e){
            var w=$(e.target).width();
            var h=$(e.target).height();
            //w>h && w>300 -> w=300
            if (w>h && w>300) $(e.target).width(300).parent().css({left:0,top:(300-(300*h/w))/2});
            console.log($(e.target).css("top"));
            //w<h && h>300 -> h=300
            if (w<h && h>300) $(e.target).height(300).parent().css({top:0,left:(300-(300*w/h))/2});
            console.log($(e.target).css("top"));
            if(i>0){
                $(e.target).hide();
            }
        });
        img.appendTo($("<li/>").appendTo($("#slideshow ul")))
        imgdom.push(img);
    });

    var num=0;
    setInterval(function(){
        imgdom[num].fadeOut(interval);
        if(num==imgdom.length-1){
            imgdom[0].fadeIn(interval);
            num=0;
        }else{
            imgdom[num+1].fadeIn(interval);
            num++;
        }
    },3500);
});
