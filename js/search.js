$(function(){
/*
String.prototype.evaluate = 
      function(o){return this.replace(/%([a-zA-Z0-9]+)/g,function(m,$1){return o[$1];});};
//簡易テンプレート
Number.prototype._    = function(a){return (a+this).slice(-a.length);};
//ゼロパディング
Date.prototype.getMon = function(){return this.getMonth()+1;};
//日本風月数値表示
Date.prototype.format = 
    function(f,$){$=this;return f.evaluate({y:($.getYear()+"").slice(-2),
Y:$.getFullYear(),m:$.getMon()._("00"),d:$.getDate()._("00"),H:$.getHours()._("00"),
M:$.getMinutes()._("00"),S:$.getSeconds()._("00")});};
//日付フォーマティングメソッド定義

var getTime = function(created_time){
    return new Date(created_time.replace(/-/g,"/").replace(/T/g, " ").replace(/\+0000/g, ""));
}
*/
    domain ="kisteno.tumblr.com";
    api_key ="ip4lAAyVgm2947UJinn73PaKsoiK81wLu2EggqRo5LAKJHbZa1 ";
    var gettumblr=function(opt){
        $.getJSON(
        "http://api.tumblr.com/v2/blog/"+domain+"/posts?api_key="+api_key+"&jsonp=?&tag="+opt.tag,
            opt.callback
        );
    };
    
    var getdate=function(datestr){
        return datestr.replace(/:00 GMT/g,'').replace(/-/g,'.');
    }
    gettumblr({tag:'kawaii-news',callback:function(data){
            console.log(data);
            if(data.response){
                var posts=data.response.posts;
                for(var i=0;i<posts.length;i++){
                    var html=$("<article />");
                    var url=posts[i].short_url;
                    var date=getdate(posts[i].date);
                    if(posts[i].type=="photo"){
                        var src=posts[i].photos[0].alt_sizes[4];
                        var img=$("<img src="+src.url+" height='"+src.height+"' width='"+src.width+"'/>");
                        html.append($("<span />").append(img));
                        var title=posts[i].caption;
                    }else if(posts[i].type=="text"){
                        var title=posts[i].title;
                    }
                    var href=$("<a href='"+url+"'>"+title+"</a>")
                    html.append($("<p class='date'>"+date+"</p>")).append(href);
                    $("#main section.news").append(html);
                }
            }
        }});
    gettumblr({tag:'kawaii-gallery',callback:function(data){
            console.log(data);
            if(data.response){
                var posts=data.response.posts;
                for(var i=0;i<posts.length;i++){
                    var html=$("<li class='g-thumb' />");
                    var url=posts[i].short_url;
                    var date=posts[i].date;
                    if(posts[i].type=="photo"){
                        var img=posts[i].photos[0].alt_sizes[3];
                        html.append($("<img src="+img.url+" />"));
                        var title=posts[i].caption;
                    }
/*
                    var href=$("<a href='"+url+"'>"+title+"</a>")
                    html.append($("<p>"+date+"</p>")).append(href);
*/
                    $("#main section.gallery ul").append(html);
                }
            }
        }});
    


});
