<?php
    $domain ="kawaii-max.tumblr.com";
    $api_key ="ip4lAAyVgm2947UJinn73PaKsoiK81wLu2EggqRo5LAKJHbZa1";

/*
$tag=htmlspecialchars($_GET['tag'],ENT_QUOTES);
$offset=htmlspecialchars($_GET['offset'],ENT_QUOTES);
var_dump($tag);
var_dump($offset);
*/
$callback=htmlspecialchars($_GET['json'],ENT_QUOTES);

function _curl($sUrl){
$conn = curl_init();
curl_setopt($conn, CURLOPT_URL, $sUrl);
curl_setopt($conn, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($conn, CURLOPT_TIMEOUT, 5);
curl_setopt($conn, CURLOPT_HEADER, FALSE);
$ret = curl_exec($conn);
//var_dump(curl_error($conn));
curl_close($conn);
return(json_decode($ret));
}

$offset=0;
$tag="gallery";
$datas=array();
$c=0;
$tmp = apc_fetch('gallery');
if(!isset($tmp)){
    while($c<10){
        $c++;
        $sUrl = "http://api.tumblr.com/v2/blog/".$domain."/posts?api_key=".$api_key."&tag=".$tag."&offset=".$offset;
        $ret = _curl($sUrl);
        $posts = $ret->response->posts;
        $datas[] = $posts;
        $total = (int)$ret->response->total_posts;
        if($offset+20>=$total){
            break;
        }
        $offset+=20;
    }
    apc_store('gallery', serialize($datas)); 
}else{
    $datas = unserialize($tmp);
}
    
echo $callback."(".json_encode($datas).")";


?>
