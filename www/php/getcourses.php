<?php
// if given a userid, return all course id's for that user.
// if no userid, then return all active courses
//

include 'pdoconn.php'; 

checkParameters(array('user' => 0));
$r = new ReturnObject();
if (isset($post_user)) {
    $q = $db->prepare('select courseid from roster where userid=?');
    $q->bindValue(1, $post_user);
} else {
    $q = $db->prepare('select courseid from course');
}
try {
  $q->execute();
  $result = $q->fetchAll(PDO::FETCH_COLUMN);
  $r->status = 0;
  $r->data = $result;
  $r->msg = "courses for $post_user";
} catch(PDOException $ex){
  // return a 0 for an error
  $r->status = 1;
  $r->msg = "Error:".$ex;
  $r->data = 0;
}
$r->output(0);
exit(0);
?>


