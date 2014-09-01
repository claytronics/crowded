<?php
// given a courseid, return a JSON object of the lectures for that course
//

include 'pdoconn.php'; 

checkParameters(array('course' => 0));
$r = new ReturnObject();
$lectid = $db->prepare('select lectureid from lecture where courseid=?');
$lectid->bindValue(1, $post_course);
$lecttitle = $db->prepare('select title from lecture where courseid=?');
$lecttitle->bindvalue(1, $post_course);
$lectdate = $db->prepare('select date from lecture where courseid=?');
$lectdate->bindvalue(1, $post_course);
$lecturer = $db->prepare('select lecturerid from lecture where courseid=?');
$lecturer->bindvalue(1, $post_course);
$lectthumb = $db->prepare('select thumb from lecture where courseid=?');
$lectthumb->bindvalue(1, $post_course);

$coursename = $db->prepare('select title from course where courseid=?');
$coursename->bindvalue(1, $post_course);

$courseprofid = $db->prepare('select professorid from course where courseid=?');
$courseprofid->bindvalue(1, $post_course);

/*$courseprof = $db->prepare('select name from user where userid=? & status=1');
$courseprof->bindvalue(1, $courseprofid);*/

$lectures = array();
$info = array("id"=>$post_course, "title"=>$coursename, "professor"=>$courseprofid);

try {
  $lectid->execute();
  $lectidresult = $lectid->fetchAll(PDO::FETCH_COLUMN);
  $lecttitle->execute();
  $lecttitleresult = $lecttitle->fetchAll(PDO::FETCH_COLUMN);
  $lectdate->execute();
  $lectdateresult = $lectdate->fetchAll(PDO::FETCH_COLUMN);
  $lecturer->execute();
  $lecturerresult = $lecturer->fetchAll(PDO::FETCH_COLUMN);
  $lectthumb->execute();
  $lectthumbresult = $lectthumb->fetchAll(PDO::FETCH_COLUMN);
  $len=count($lectidresult);
  for($i=0; $i<$len; $i++) {
   $lectures[$i] = array("thumb"=>$lectthumbresult[$i], "title"=>$lecttitleresult[$i], "id"=>$lectidresult[$i], "date"=>$lectdateresult[$i], "lecturer"=>$lecturerresult[$i]);
  }
  $info["lectures"]=$lectures;
  $r->status = 0;
  $r->data = $info;
  $r->test = gettype($info['lectures']['title']);
  $r->msg = "lectures for $post_course";
} catch(PDOException $ex){
  // return a 1 for an error
  $r->status = 1;
  $r->msg = "Error:".$ex;
  $r->data = 0;
}
$r->output(0);
exit(0);
?>


