<?
include './setup.phpi';

date_default_timezone_set("UTC");




$info = array(
	array("id" => 100,
	      "title" => "Intro to Binary",
	      "date" => new DateTime('2014-06-01'),
	      "speaker" => "John Jones",
	      "videoid" => "A-yZNMWFqvM",
	      "slides" => array(
				array("img" => "Slide1.jpg",
				      "thumb" => "thumb1.jpg",
				      "time" => 0,
				      "title" => "First Slide in Lecture",
				      "notes" => "Welcome to ...",
				      "checkpoint" => false),
				array("img" => "Slide2.jpg",
				      "thumb" => "thumb2.jpg",
				      "time" => 10,
				      "title" => "Second Slide in Lecture",
				      "notes" => "Binary is simple",
				      "checkpoint" => false),
				array("img" => "Slide3.jpg",
				      "thumb" => "thumb3.jpg",
				      "time" => 22,
				      "title" => "Third Slide in Lecture",
				      "notes" => "Honest",
				      "checkpoint" => true,
				      "checkpointText" => "Where is Africa?"),
				array("img" => "Slide4.jpg",
				      "thumb" => "thumb4.jpg",
				      "time" => 29,
				      "title" => "Fourth Slide in Lecture",
				      "notes" => "No I swear",
				      "checkpoint" => true,
				      "checkpointText" => "What is the capital of Lesotho?")
				)
				),
	array("id" => 101,
	      "title" => "Second Binary Lecture",
	      "date" => new DateTime('2014-06-01'),
	      "speaker" => "John Jones",
	      "videoid" => "YlgkfOr_GLY",
	      "slides" => array(
				array("img" => "Slide1.jpg",
				      "thumb" => "thumb1.jpg",
				      "time" => 0,
				      "title" => "First Slide in Lecture",
				      "notes" => "Welcome to ...",
				      "checkpoint" => false),
				array("img" => "Slide2.jpg",
				      "thumb" => "thumb2.jpg",
				      "time" => 10,
				      "title" => "Second Slide in Lecture",
				      "notes" => "Binary is simple",
				      "checkpoint" => false),
				array("img" => "Slide3.jpg",
				      "thumb" => "thumb3.jpg",
				      "time" => 22,
				      "title" => "Third Slide in Lecture",
				      "notes" => "Honest",
				      "checkpoint" => true,
				      "checkpointText" => "Where is Africa?"),
				array("img" => "Slide4.jpg",
				      "thumb" => "thumb4.jpg",
				      "time" => 29,
				      "title" => "Fourth Slide in Lecture",
				      "notes" => "No I swear",
				      "checkpoint" => true,
				      "checkpointText" => "What is the capital of Lesotho?")
				)
	      )
	      );


$r = new ReturnObject();  
try {
  checkParameters(array('id' => 1));
  if ($post_id != 100 && $post_id != 101) {
    $r->errorReturn(2, "No such lecture as ".$post_id);
  } 

  // for now return hard coded object
  $r->msg = "Here is info for lecture ".$post_id;
  $r->data = json_encode($info);
  $r->output(0);
} catch(Exception $ex){
  // return a 0 for an error
  $r->errorReturn(1, "Error: ".$ex);
}
exit(0);
