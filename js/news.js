$(function(){
    var domain ="kawaii-max.tumblr.com";
    var api_key ="ip4lAAyVgm2947UJinn73PaKsoiK81wLu2EggqRo5LAKJHbZa1 ";
    var api_url="http://api.tumblr.com/v2/blog/"+domain+"/posts?api_key="+api_key+"&jsonp=?";
    var news_id=getUrlVars()['id'];

    var gettumblr=function(opt){
        if(opt.tag){
            opt.url+="&tag="+opt.tag;
        }
        if(opt.id){
            opt.url+="&id="+opt.id;
        }
        $.getJSON(
            opt.url,
            opt.callback
        );
    };
    
    var getdate=function(datestr){
        return datestr.replace(/:.. GMT/g,'').replace(/-/g,'.');
    }
    
    $("section.news").width(700);
    
        var opt={
            url:api_url,
            tag:'news',
            callback:function(data)
            {
                if(data.response){
                    var posts=data.response.posts;
                    for(var i=0;i<posts.length;i++){
                        var html=$("<article />").addClass("clearfix");
                        var url=posts[i].short_url;
                        var date=getdate(posts[i].date);
                        if(posts[i].type=="photo"){
                            var src=posts[i].photos[0].alt_sizes[4];
                            var img=$("<img src="+src.url+" height='"+src.height+"' width='"+src.width+"'/>");
                            html.append($("<span />").append(img));
                            var title=$("<div/>").html(posts[i].caption).find("p:first").html();
                        }else if(posts[i].type=="text"){
                            var title=$("<div/>").addClass('title').html(posts[i].title);
                        }
//                    var href=$("<a href='"+url+"'>"+title+"</a>")
                        var body=$("<p/>");
                    //var posts[i].body;
                        $("<div/>").html(posts[i].body).find("p").each(
                            function(){
                                body.append($(this).html().replace(/<[¥/]*span>/g,""));
                            }
                        );

                        html.append($("<p class='date new'>"+date+"</p>")).append(title)/*.append("<hr/>")*/.append(body);
                        $("#main section.news").append(html);
                        $("section.news article").height("auto");
                    }
                }
            }
        };
    if(news_id){
        opt.id=news_id;
    }
    gettumblr(opt);
                    
    function getUrlVars(){
        var vars = [], hash; 
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'); 
        for(var i = 0; i < hashes.length; i++) { 
            hash = hashes[i].split('='); 
            vars.push(hash[0]); 
            vars[hash[0]] = hash[1]; 
        } 
        return vars;
    } 
    

});
