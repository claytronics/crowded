<?php
// given a courseid, return all lecture id's for that course.
//

include 'pdoconn.php'; 

checkParameters(array('course' => 0));
$r = new ReturnObject();
$q = $db->prepare('select lectureid from lecture where courseid=?');
$q->bindValue(1, $post_course);
try {
  $q->execute();
  $result = $q->fetchAll(PDO::FETCH_COLUMN);
  $r->status = 0;
  $r->data = $result;
  $r->msg = "lectures for $post_course";
} catch(PDOException $ex){
  // return a 0 for an error
  $r->status = 1;
  $r->msg = "Error:".$ex;
  $r->data = 0;
}
$r->output(0);
exit(0);
?>


