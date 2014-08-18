# API #

From the Home.html page, the user can access courses. The course options available to the user are stored in a javascript structure with the following syntax:

var courses = [
	{
		id: *course id*,
		title: *course title*,
		professor: *course professor*,
		thumb: *filepath of image to be used as thumbnail for course*
	},
	*etc*
];

When a user selects a course, he is redirected to course.php?id=*course id*.

Upon loading, course.js (the js file linked to course.php) makes an AJAX POST call to getcourse.php with the course id as data. getcourse.php returns a JSON object with the following syntax:

var lectures = [
	{
		id: *lecture id*,
		title: *lecture title*,
		date: *lecture date*,
		time: *lecture time*,
		lecturer: *lecturer*,
		thumb: *filepath of image to be used as thumbnail for lecture*
	},
	*etc*
];

When a user selects one of these lectures, he is redirected to lecture.php?id=*lecture id*.

Upon loading, interface.js (the js file linked to lectuer.php) makes an AJAX POST call to getlecture.php with the lecture id as data. getlecture.php returns a JSON object with the following syntax:

var slides = [
	{
		img: *filepath of image of the slide*,
		time: *nmber of seconds into video at which slide begins*,
		notes: *notes that appear in bottom div while slide is active*,
		title: *slide title*,
		checkpoint: *true/false: whether or not this slide requires the passing of a quiz to continue through*,
	*optional:*
		thumb: *filepath of image to be used as thumbnail for slide. If not present then scaled-down version of slide is used.*
	}
	*etc*
];






		