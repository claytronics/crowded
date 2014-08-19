<?php

global $onserver;
global $hostname;
if (1) {
  $onserver = 0;
  $hostname = "http://crowded.me";
  $chost = "crowded.me";
} else {
  $onserver = 1;
  $hostname = "http://nodomainyet.com";
  $chost = "nodomainyet.com";
}

date_default_timezone_set('UTC');
if (!$onserver) {
  $mysql_user = "seth";
  $mysql_hostname = "localhost";
  $mysql_password = "none";
  $mysql_database = "crowded";
} else {
  die("Not set up for server yet");
}

try {
  $dbh = new PDO("mysql:host=$mysql_hostname;charset=utf8", 
		 "root",
		 "root");	/* put in your root password here */
  
  $dbh->exec("CREATE DATABASE `$mysql_database`;
              GRANT ALL ON `$mysql_database`.* 
                TO '$mysql_user'@'$mysql_hostname';
              FLUSH PRIVILEGES;");
} catch (PDOException $e) {
  die("DB ERROR: ". $e->getMessage());
}
print "$mysql_database created\n";
?>