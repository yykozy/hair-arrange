<?php
$a=array("0"=>"a","1"=>"b");
$b=array("0"=>"c","1"=>"d");
$c=array();
$c[]=$a;
$c[]=$b;
var_dump($c);
