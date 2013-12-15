<?php

$pary=array(
		'name',
		'rubi',
		'email',
		'tel',
		'role',
		'note',
		);

$param=array();
foreach($pary as $key){
	$param[$key]=htmlspecialchars(isset($_GET[$key])?$_GET[$key]:null,ENT_QUOTES);
}
	if($_GET['clear']==1){
		apc_delete('gallery');
		exit(0);
	}
	$callback=htmlspecialchars($_GET['json'],ENT_QUOTES);
	//var_dump($callback);

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
	if(!$tmp){
		while($c<10){
			$c++;
			$sUrl = "http://api.tumblr.com/v2/blog/".$domain."/posts?api_key=".$api_key."&tag=".$tag."&offset=".$offset;
			$ret = _curl($sUrl);
			$posts = $ret->response->posts;
			foreach($posts as $val){
				$datas[] = $val;
			}
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

	echo $callback."(".json_encode($datas).");";


	?>

