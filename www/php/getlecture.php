<?
include './setup.phpi';

$info = array("id" => 100,
	      "title" => "Intro to Binary",
	      "date" => new DateTime('2014-06-01'),
	      "speaker" => "John Jones",
	      "video" => "a url goes here",
	      "slides" => array(
				array("image" => "Slide1.jpg",
				      "thumb" => "thumb1.jpg",
				      "start" => 0,
				      "title" => "First Slide in Lecture",
				      "notes" => "Welcome to ..."),
				array("image" => "Slide2.jpg",
				      "thumb" => "thumb2.jpg",
				      "start" => 10,
				      "title" => "Second Slide in Lecture",
				      "notes" => "Binary is simple")
				)
	      );

$r = new ReturnObject();  
try {
  checkParameters(array('id' => 1));
  if ($post_id != 100) {
    $r->errorReturn(2, "No such lecture as ".$post_id);
  } 

  // for now return hard coded object
  $r->msg = "Here is info for lecture ".$post_id;
  $r->data = $info;
  $r->output(0);
} catch(Exception $ex){
  // return a 0 for an error
  $r->errorReturn(1, "Error: ".$ex);
}
exit(0);
