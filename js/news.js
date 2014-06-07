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

    $("section.news2").width(750);
    
        var opt={
            url:api_url,
            tag:'news',
            callback:function(data)
            {
                console.log(data);
                if(data.response){
                    var posts=data.response.posts;
                    var info_height=0;
                    for(var i=0;i<posts.length;i++){
                    var center=$('<div class="center" />');
                    var info=
                        $('<div class="info" />').html(
                            '<div class="top" />'+
                            '<div class="left" />'+
                            '<div class="right" />'+
                            '<div class="pin2" />'+
                            '<div class="bottom" />').append(center);
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
                    
                         var datetag=$("<p/>").html(date).addClass('date');
                        var tags = posts[i].tags;
                        for(var j=0;j<tags.length;j++){
                            if(tags[j]=="new"){
                                datetag.addClass('new');
                                break;
                            }
                        }
                       var showimg=function(url){
                            $("#mask").addClass('maskBK');
                            $("#top").css("position","fixed");
                            $("#modal").fadeIn(500);                            
                         var col=$("<div/>").appendTo("#modalImg .row");
                            var img=$("<img/>").attr("src",url).load(function(){
                                var base=$(this).parent().width();
                                $(this).parent().width(this.width).css("left",base/2 - this.width/2);
                            });
                        $("<a class='thumbnail'/>").append(img).appendTo(col);
                       }
                        $('.close,#mask').click(function(){
                            $("#modal").fadeOut(500,function(){
                                $("#top").css("position","relative");
                                $("#modalImg .row").html("");
                                $("#mask").removeClass('maskBK');
                            });
                        });
                        var body=$("<div/>").append(posts[i].body);
                        var p=$('img',body).each(function(i,val){
                            //console.log(this.src);
                            $(val).load(function(){
                                var height = html.height();
                                center.height(height-20);
                                info.height(height+104);
                                info_height+=height+104;
                                $('div.left',info).height(height);
                                $('div.right',info).height(height);
                                $('section.news2').height(info_height);
                            })
                            var _this=this;
                            $(_this).click(function(){
                                showimg(_this.src);
                            });
                        });

                        html.append(datetag).append(title).append(body).appendTo(center);
                        $("#main section.news2").append(info);
//                        html.height("auto");
                        if(!posts[i].body.match(/<img/)){
                            console.log('set');
                        var height = html.height();
                        center.height(height-20);
                        info.height(height+104);
                        info_height+=height+104;
                        $('div.left',info).height(height);
                        $('div.right',info).height(height);
                        }
                    }
                    $('section.news2').height(info_height);
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
