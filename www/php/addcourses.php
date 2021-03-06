<?php
// input file is a series of lines, one field per line with a blank line between courses
//
// each course is:
// number
// title
// professor (exact full name match required)
// path to thumbnail
// 
// lines starting with # will be ignored

include 'pdoconn.php'; 

if ($argc != 2) {
  die("Requiers 1 argument, name of file with course information");
}

$infile = $argv[1];
$indata = file($infile);
$row = array();			/* data we will insert */
$index = 0;			/* where we are in getting fields  */
$ln = 0;			/* line number of input file */
$skip = 0;			/* if 1, should get a blank line */
foreach ($indata as $line) {
  $ln++;
  $line = ltrim(rtrim($line));
  $pos = strpos($line, "#");
  if (!(($pos === FALSE) || ($pos > 0))) continue;
  if ($skip) {
    $skip = 0;
    if (strlen($line) != 0) die("Expected blank line @ $ln");
    continue;
  }
  // getting a field
  array_push($row, $line);
  $index++;
  if ((strlen($line) == 0)&&($index != 4)) {
    die("Blank line where expected the $index field on line $ln");
  }
  if ($index == 4) {
    // lookup the professor id
    $q = $db->prepare('select userid from user where name=? and status=1');
    $q->bindValue(1, $row[2]);
    $q->execute();
    if ($q->rowCount() == 0) {
      $q = $db->prepare('insert into user (name, password, status) values (?,?,?)');
      $q->bindParam(1, $row[2]);
      $pwd = "password";
      $q->bindParam(2, $pwd);
      $status = 1;
      $q->bindParam(3, $status);
      if ($q->execute() == FALSE) die("Tried to create professor ".$row[2]." and failed @ line:$ln");
      $q = $db->prepare('select userid from user where name=? and status=1');
      $q->bindValue(1, $row[2]);
      $q->execute();
    }
    if ($q->rowCount() != 1) die("More than one professor with the sname name @line:$ln");
    $profid = $q->fetchColumn();
    $row[2] = $profid;
      
    // have all fields, so insert
    $sql = "insert into course (number, title, profid, thumb) ".
      "values (?,?,?,?)";
    $q = $db->prepare($sql);
    if (!$q->execute($row)) {
      die("Failed to insert data @ line $ln");
    }
    $row = array();
    $index = 0;
    $skip = 1;
  }
}
?>


