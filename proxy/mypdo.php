<?php
class mypdo {
    var $db;
    public function __construct{
        $host='mysql1.webcrow-php.netowl.jp';
        $dbname='chocobread_gps';
        $user='chocobread_gps';
        $pass='Tomokozaru2005';
        $this->db = new PDO('dblib:host='.$host.';dbname='.$dbname.';charset=UTF-8', $user, $pass);
    }
    public function query($sql){
        return($this->db->query($sql));
    }
}
?>