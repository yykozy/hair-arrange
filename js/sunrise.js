$(function(){
    domain ="kawaii-max.tumblr.com";
    api_key ="ip4lAAyVgm2947UJinn73PaKsoiK81wLu2EggqRo5LAKJHbZa1 ";
    var category = {
        all     :'すべて',
        boys    :'男の子',
        girls	:'女の子',
        short	:'ショート',
        medium	:'ミディアム',
        long	:'ロング',
    };
    var event = {
        'leader_201308'            :'おしゃりーだ@2013.08',
        'kids-collection_201311'	:'関西キッズコレクション@2013.11',        
        'leader_201311'            :'おしゃりーだ@2013.11',
    };
    var onActive = 'leader_201311';

    var gettumblr=function(opt){
        $.getJSON(
        "http://api.tumblr.com/v2/blog/"+domain+"/posts?api_key="+api_key+"&jsonp=?&tag="+opt.tag+"&offset="+opt.offset,
            opt.callback
        );
    };
    
    var getdate=function(datestr){
        return datestr.replace(/:.. GMT/g,'').replace(/-/g,'.');
    }
    
    //preloading
    $('#indicator').fadeIn(300);

    gettumblr({tag:'news',offset:0,callback:function(data){
            //console.log(data);
            if(data.response){
                var posts=data.response.posts;
                for(var i=0;i<posts.length;i++){
                    var center=$('<div class="center" />');
                    var info=
                        $('<div class="info" />').html(
                            '<div class="top" />'+
                            '<div class="left" />'+
                            '<div class="right" />'+
                            '<div class="pin2" />'+
                            '<div class="bottom" />').append(center);
    //                console.log(info);
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
                    var href=$("<p class='title' />").append("<a href='/news?id="+news_id+"'>"+title+"</a>");

                    html.append($("<p class='date new'>"+date+"</p>")).append(href).appendTo(center);
                    $("#main section.news").append(info);
                }
            }
    }});
    
/*    
    var wrap=function(offset,datas){
//        console.log(datas);
        gettumblr({tag:'gallery',offset:offset,callback:function(data){
            if(data.response){
                var posts=data.response.posts;
                var total = data.response.total_posts;

                for(var i=0;i<posts.length;i++){
                    datas.push(posts[i]);
                }

                if(offset+20<total){
                    wrap(offset+20,datas);
                }else{
                    make_grid(datas);
                }
            }
        }});
    }
*/
    $.getJSON(
        "http://chocobread.webcrow.jp/oden/apc.php?json=?",
            function(datas){make_grid(datas);}
        );

//    var datas=[];
//    wrap(0,datas);

    var make_grid=function(posts){
            var alltags={all:0};
            //preloading
            $('#indicator').fadeOut(500);
//            console.log(data);
    
                for(var i=0;i<posts.length;i++){
                    alltags['all']++;
                    var url=posts[i].short_url;
                    var date=posts[i].date;
                    var tags=posts[i].tags;
                    var id=posts[i].id;
                    var html=$("<li class='mix' data-tgt='"+id+"' />");
                    if(posts[i].type=="photo"){
                        var title=posts[i].caption;
                        var src=posts[i].photos[0].alt_sizes[3];
                        var img=$("<img src="+src.url+" />");
                        html.append(img);    
                        var eventlabel={};
                        for(var j=0;j<tags.length;j++){ 
                            if (tags[j]!="gallery"){
                                html.addClass(tags[j]);
                                if(alltags[tags[j]]){
                                    alltags[tags[j]]++;
                                }else{
                                    alltags[tags[j]]=1;
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
                    }

                    $("#mix-grid").append(html);
                }

                var btntgl=function(e){
                    $('#mix-filter1 li button').removeClass('active');
                    $('#mix-filter2 li button').removeClass('active');
                    $(e.target).addClass('active');
                }
                for(var j in event){
                    if(typeof(alltags[j])=='undefined'){
                        continue;
                    }
                    var badge=$("<span class='badge badge-danger'>"+alltags[j]+"</span>");
                    var button=$("<button/>").attr("type","button");
                    button.addClass("btn btn-warning btn-xs").append(event[j]+" ").append(badge);
                    button.click(btntgl);
                    $("<li class='filter' data-filter='"+j+"'/>").append(button)
                    .appendTo($("#mix-filter1"));
                    //default
                    if(j==onActive){
                        button.addClass('active');
                    }
                }
                
                for(var j in category){
                    if(typeof(alltags[j])=='undefined'){
                        continue;
                    }
                    var badge=$("<span class='badge badge-danger'>"+alltags[j]+"</span>");
                    var button=$("<button/>").attr("type","button");
                    button.addClass("btn btn-info btn-xs").append(category[j]+" ").append(badge);
                    button.click(btntgl);
                    $("<li class='filter' data-filter='"+j+"'/>").append(button)
                    .appendTo($("#mix-filter2"));
                }
/*
        for(var j in alltags){
                    var badge=$("<span class='badge badge-danger'>"+alltags[j]+"</span>");
                    var button=$("<button/>").attr("type","button");
                    if(typeof(category[j])!='undefined'){
                        //console.log(category[j]);
                        button.addClass("btn btn-info btn-sm").append(category[j]+" ").append(badge);
                    }else if(typeof(event[j])!='undefined'){ // if(alltags[j].match(/[0-9]+/)){
                        button.addClass("btn btn-warning btn-sm").append(event[j]+" ").append(badge);
                    }else{
                        continue;
                    }
                    $("<li class='filter' data-filter='"+j+"'/>").append(button)
                    .appendTo($("#mix-filter"));
                }
*/                
                $('.mix').click(function(){
                    $("#mask").addClass('maskBK');
                    $("#top").css("position","fixed");
                    $("#modal").fadeIn(500);
                    var id = $(this).attr('data-tgt');
                    var url= $.data(this,'url');
                    var w=$("body").width();
            
                    for(var i=0;i<url.length;i++){
                        var col=$("<div/>").appendTo($("#modalImg .row"));
                        if(url.length==5){
                            if(i<2){
                                col.addClass('col-sm-6','col-md-6');
                            }else{
                                col.addClass('col-sm-4','col-md-4');
                            }
                        }else if(url.length==4 || url.length==2){
                                col.addClass('col-sm-6','col-md-6');
                        }else if(url.length==1 || url.length==3){
                            if(i==0){
                                col.addClass('col-sm-12','col-md-12');
                            }else{
                                col.addClass('col-sm-6','col-md-6');
                            }                
                        }
                        $("<a class='thumbnail'/>").append($("<img/>").attr("src",url[i])).appendTo(col);
                    }
                });

                $('.close,#mask').click(function(){
                    $("#modal").fadeOut(500,function(){
                        $("#top").css("position","relative");
                        $("#modalImg .row").html("");
                        $("#mask").removeClass('maskBK');
                    });
                });

                
                //Mixitup!
                $('#mix-grid').mixitup({
                  targetSelector: '.mix',
                  filterSelector: '.filter',
            //      sortSelector: '.sort'
                   showOnLoad: onActive,
                    onMixEnd: function(){
                        $("section.gallery").height($('#mix-filter1').height()+$('#mix-filter2').height()+$('#mix-grid').height());
                    },

                });
/*
                $('#mix-grid').bind('onMixLoad',function(){
//                    $('#mix-grid').mixitup('filter','leader_2013.11');
                    console.log("ready!");
                });
                */
    }

//SlideShow
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
        var img=$("<img/>").attr("src",this).css('position','absolute').css('z-index','100').load(function(e){
            var w=$(e.target).width();
            var h=$(e.target).height();
            //w>h && w>300 -> w=300
            if (w>h && w>300) $(e.target).width(300).parent().css({left:0,top:(300-(300*h/w))/2});
//            console.log($(e.target).css("top"));
            //w<h && h>300 -> h=300
            if (w<h && h>300) $(e.target).height(300).parent().css({top:0,left:(300-(300*w/h))/2});
//            console.log($(e.target).css("top"));
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
