<?php	
include 'pdoconn.php';

////////////////
// list all tables

function hasTable($name) 
{
  global $db;

  $sql = "SHOW TABLES like '$name'";
  $result = $db->query($sql);
  if ($result === FALSE) {
    die("Error getting info about $name\n");
  }
  $num = $result->rowCount();
  $result->closeCursor();
  return ($num == 1);
}

function createTable($name, $spec) {
  global $db;
  if (hasTable($name)) {
    print "$name already exists\n";
    return;
  }
  $ct = "CREATE TABLE $name $spec";
  try {
    $db->exec($ct);
    print "<p>Created $name\n";
  } catch(PDOException $e) {
    echo "ERROR CREATING TABLE $name\n";
    echo $e->getMessage();//Remove in production code
  }
  return;
}

function listTables() {
  global $db;
  global $mysql_database;
  print "Database: $mysql_database\n";

  $sql = "SHOW TABLES";
  $result = $db->query($sql);
  $tables = array();
  while ($row = $result->fetch(PDO::FETCH_NUM)) {
    array_push($tables, $row[0]);
  }  
  foreach ($tables as $table) {
    print "== Table '$table' ==\n";
    $q = $db->prepare("DESCRIBE $table");
    $q->execute();
    while ($row = $q->fetch(PDO::FETCH_NUM)) {
      $fname = array_shift($row);
      $type = array_shift($row);
      $str = implode("\t", $row);
      printf("\t%-20s %-15s %s\n", $fname, $type, $str);
    }
  }
}

createTable("user", "(
	userid		INT (10)	NOT NULL AUTO_INCREMENT,
	name		VARCHAR(64)	NOT NULL,
	username	VARCHAR(64),
	password	VARCHAR(64)	NOT NULL,
	email		VARCHAR(64),
	created		TIMESTAMP	default CURRENT_TIMESTAMP,
	status		INT(3)		NOT NULL,
	PRIMARY KEY (userid),
	KEY (userid))");

createTable("course", "(
	courseid		INT (10)	NOT NULL AUTO_INCREMENT,
	number			VARCHAR(16)	NOT NULL,
	title			VARCHAR(64)	NOT NULL,
	profid			INT (10)	NOT NULL,
	thumb			VARCHAR(128)	NOT NULL,
	created		TIMESTAMP	default CURRENT_TIMESTAMP,
	PRIMARY KEY (courseid),
	KEY (courseid, number))");

createTable("lecture", "(
	lectureid		INT (10)	NOT NULL AUTO_INCREMENT,
	courseid		INT (10)	NOT NULL,
	title			VARCHAR(64)	NOT NULL,
	date			DATE		NOT NULL,
	lecturerid		INT (10)	NOT NULL,
	thumb			VARCHAR(128)	NOT NULL,
	created			TIMESTAMP	default CURRENT_TIMESTAMP,
	PRIMARY KEY (lectureid),
	KEY (courseid,lectureid))");

createTable("slide", "(
	slideid			INT (10)	NOT NULL AUTO_INCREMENT,
	lectureid		INT (10)	NOT NULL,
	img			VARCHAR(128)	NOT NULL,
	offset			INT (10)	NOT NULL,
	notes			TEXT,
	title			VARCHAR(64)	,
	checkpoint		TINYINT(1)	NOT NULL,
	thumb			VARCHAR(128)	,
	created		TIMESTAMP	default CURRENT_TIMESTAMP,
	PRIMARY KEY (slideid),
	KEY (lectureid,slideid))");

createTable("viewed", "(
	userid			INT (10)	NOT NULL,
	lectureid		INT (10)	NOT NULL,
	slideid			INT (10)	NOT NULL,
	date			TIMESTAMP	NOT NULL,
	passed			INT (2)		NOT NULL,
	KEY (userid,lectureid,slideid))");

createTable("roster", "(
	userid			INT (10)	NOT NULL,
	courseid		INT (10)	NOT NULL,
	KEY (courseid,userid))");

listTables();

////////////////
// done
print "\nAll Done!\n";
?>