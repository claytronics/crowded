<?
include './setup.phpi';

date_default_timezone_set("UTC");




$info = array(
	array("id" => 0,
	      "title" => "First Course",
	      "professor" => "John Jones",
	      "lectures" => array(
				array("id" => 100,
				      "thumb" => "Slide1.jpg",
				      "date" => "6 September 2013",
				      "time" => "11:00 a.m.",
				      "title" => "Welcome",
				      "lecturer" => "Arnold Schwartzenegger"),
				array("id" => 101,
				      "thumb" => "Slide2.jpg",
				      "date" => "8 September 2013",
				      "time" => "11:00 a.m.",
				      "title" => "Second Lecture",
				      "lecturer" => "Arnold Schwartzenegger"),
				array("id" => 102,
				      "thumb" => "Slide3.jpg",
				      "date" => "10 September 2013",
				      "time" => "11:00 a.m.",
				      "title" => "Third Lecture",
				      "lecturer" => "Arnold Schwartzenegger"),
				array("id" => 103,
				      "thumb" => "Slide4.jpg",
				      "date" => "12 September 2013",
				      "time" => "11:00 a.m.",
				      "title" => "Fourth lecture",
				      "lecturer" => "Arnold Schwartzenegger"),
				array("id" => 104,
				      "thumb" => "Slide1.jpg",
				      "date" => "14 September 2013",
				      "time" => "11:00 a.m.",
				      "title" => "Fifth Lecture",
				      "lecturer" => "Arnold Schwartzenegger"),
				array("id" => 105,
				      "thumb" => "Slide2.jpg",
				      "date" => "16 September 2013",
				      "time" => "11:00 a.m.",
				      "title" => "Sixth Lecture",
				      "lecturer" => "Arnold Schwartzenegger")
				)
				),
	array("id" => 1,
	      "title" => "First Course",
	      "professor" => "Joan Johnson",
	      "lectures" => array(
				array("id" => 100,
				      "thumb" => "Slide1.jpg",
				      "date" => "6 September 2013",
				      "time" => "11:00 a.m.",
				      "title" => "Welcome",
				      "notes" => "Arnold Schwartzenegger"),
				array("id" => 101,
				      "thumb" => "Slide2.jpg",
				      "date" => "8 September 2013",
				      "time" => "11:00 a.m.",
				      "title" => "Second Lecture",
				      "notes" => "Arnold Schwartzenegger"),
				array("id" => 102,
				      "thumb" => "Slide3.jpg",
				      "date" => "10 September 2013",
				      "time" => "11:00 a.m.",
				      "title" => "Third Lecture",
				      "notes" => "Arnold Schwartzenegger"),
				array("id" => 103,
				      "thumb" => "Slide4.jpg",
				      "date" => "12 September 2013",
				      "time" => "11:00 a.m.",
				      "title" => "Fourth lecture",
				      "notes" => "Arnold Schwartzenegger"),
				array("id" => 104,
				      "thumb" => "Slide1.jpg",
				      "date" => "14 September 2013",
				      "time" => "11:00 a.m.",
				      "title" => "Fifth Lecture",
				      "notes" => "Arnold Schwartzenegger"),
				array("id" => 105,
				      "thumb" => "Slide2.jpg",
				      "date" => "16 September 2013",
				      "time" => "11:00 a.m.",
				      "title" => "Sixth Lecture",
				      "notes" => "Arnold Schwartzenegger")
				)
				)
	      );


$r = new ReturnObject();  
try {
  checkParameters(array('id' => 1));
  if ($post_id != 0 && $post_id != 1) {
    $r->errorReturn(2, "No such course as ".$post_id);
  } 

  // for now return hard coded object
  $r->msg = "Here is info for course ".$post_id;
  $r->data = json_encode($info);
  $r->output(0);
} catch(Exception $ex){
  // return a 0 for an error
  $r->errorReturn(1, "Error: ".$ex);
}
exit(0);
