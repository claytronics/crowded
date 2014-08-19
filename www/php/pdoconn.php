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

  // set global exception handler.  This should be different in production and development modes
function exception_handler($exception) {
  echo "<pre>";
  echo "Uncaught exception: " , $exception->getMessage(), "\n";
  echo "In:\n".$exception->getTraceAsString();
  echo "\n<br>\n".$exception->__toString()."\n";
  echo "</pre>";
  exit;
}

set_exception_handler('exception_handler');

if (!$onserver) {
  $mysql_user = "seth";
  $mysql_hostname = "localhost";
  $mysql_password = "none";
  $mysql_database = "crowded";
} else {
  die("Not set up for server yet");
}
$prefix = "";

// connect to database
try {
  $db = new \PDO("mysql:host=$mysql_hostname;dbname=$mysql_database;charset=utf8", 
		 $mysql_user,
		 $mysql_password,
		 array(
		       \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION
		       )
		 );
}
catch(\PDOException $ex){
  die($ex->getMessage());
}
 
function doQuery($q) {
  die("not implemented yet");
  ($x = mysql_query($q)) || showerror("Query $q died".mysql_error());
  return $x;
}

function showerror($msg) {
  global $globalinputs;
  print "<br>$msg";
  print "<br>";
  dump($globalinputs, "globals");
  die("Dieing");
}


function checkParameters($pspec) 
{
  foreach ($pspec as $name => $reqd) {
    if (isset($_REQUEST[$name])) {
      $pname = "post_".$name;
      $GLOBALS[$pname] = $_REQUEST[$name];
    } else {
      if ($reqd) {
	throw new Exception("$name is required: '$pspec':".var_export($_REQUEST, true));
      }
    }
  }
}

class ReturnObject {
  var $status;			/* status of the request */
  var $msg;			/* user friendly msg */
  var $data;			/* array of return data */

  // return codes
  const OK = 0;
  const NotAuthorized = 1;
  const InvalidUser = 2;
  const NoPermissions = 3;

  public function __construct($rcode = ReturnObject::OK, $rmsg = "ok") {   
    $this->status = $rcode;
    $this->msg = $rmsg;
    $this->data = 0;
  }

  public function encode() {
    return json_encode($this); //, JSON_FORCE_OBJECT);
  }

  public function output($endnow) {
    @ob_end_clean();
    header("Connection: close\r\n");
    header("Content-Encoding: none\r\n");
    ignore_user_abort(true); // optional
    ob_start();

    echo $this->encode();
    $size = ob_get_length();
    header("Content-Length: $size");
    ob_end_flush();     // Strange behaviour, will not work
    flush();            // Unless both are called !
    //ob_end_clean();  WAS GENERATING AN EMPTY BUFFER WARNING
    if ($endnow) exit;
  }

  public static function errorReturn($code, $msg)
  {
    $ret = new ReturnObject;
    $ret->status = $code;
    $ret->msg = $msg;
    $ret->data = 0;
    $ret->output(1);
  }
};


function userhashtoid($h)
{
  $str = substr($h, 0, 10);
  $basis = ord(substr($str, 0, 1))-65;
  $inc = ord(substr($str, 1, 1))-70;
  //print "$str: $basis, $inc\n";
  $u = 0;
  $pow = 1;
  for ($i=2; $i<9; $i++) {
    $d = ord(substr($str, $i, 1));
    $d -= (65+$basis);
    $u += ($pow*$d);
    $pow = $pow*10;
    //print substr($str, $i, 1)." ".ord(substr($str, $i, 1))." $d $u $basis -> ";
    $basis += ($d+$inc);
    $basis = $basis % 16;
    //print "$basis\n";
  }
  return $u;
}

function verifyuserhash($u, $e, $str)
{
  $basis = ord(substr($str, 0, 1))-65;
  $inc = ord(substr($str, 1, 1))-70;
  if (userhash($u, $e, $basis, $inc) == $str) return true;
  return false;
}

function makeuserhash($u, $e)
{
  $basis = rand(0, 15);
  $inc = rand(2,5);
  return userhash($u, $e, $basis, $inc);
}

function userhash($u, $e, $basis, $inc) 
{
  $newu = chr($basis+65).chr($inc+70);
  //print "$basis, $inc, $u\n";
  while ($u) {
    $d = $u%10;
    $u = ($u-$d)/10;
    $newu .= chr($d+(65+$basis));
    //print "$d $u ".$d+(65+$basis)." ".chr($d+(65+$basis))." -> ";
    $basis += ($d+$inc);
    $basis = $basis%16;
    //print "$basis\n";
  }
  //print "$newu\n";
  return $newu.md5(crypt("crowded.com".$newu.$e, "my favorite toy"));
}

function isauth()
{
  global $userid;

  $cset = 0;
  if (isset($_COOKIE['userid'])) $cset += 1;
  //if (isset($_COOKIE['token'])) $cset += 2;
  if (($cset > 0)&&($cset != 1)) {
    return false;
  }
  if ($cset == 0) return false;
  $userid = $_COOKIE['userid'] - 1000000;  
  return true;
}
?>
