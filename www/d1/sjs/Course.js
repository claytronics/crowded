var courseData;
var course;
var user = 0;
var username;
var lectures = [];

$(document).ready(function(){
    var course = $("#course").html();
    if(user==0) {
	$("#loginButton").html("<a onclick='showLogin'>log in</a>");
    } else {
	$("#loginButton").html("<a onclick='showLogin'>hi " + username + "</a>");
    };
    console.log("Getting course " + course);
    $.ajax({
	type: 'POST',
	url: '/php/loadcourse.php',
	data: 'course=' + course,
	dataType: 'json',
	cache: false,
	success: function(result) {
	    console.log("hi");
	    console.log(JSON.parse(result.test));
	    courseData = JSON.parse(result.data);
	    lectures = courseData.lectures;
	    $("title").html(courseData.title + ": " + courseData.professor);
	},
    });
    showLectureChooser();
});

/*var lectures = [
    {
	id: 100,
	title: "Welcome!",
	date: "6 September 2013",
	lecturer: "Arnold Schwartzenegger",
	thumb: "Slide1.jpg"
    },
    {
	id: 101,
	title: "Second lecture",
	date: "8 September 2013",
	lecturer: "Arnold Schwartzenegger",
	thumb: "Slide2.jpg"
    },
    {
	id: 102,
	title: "Third lecture",
	date: "10 September 2013",
	lecturer: "Arnold Schwartzenegger",
	thumb: "Slide3.jpg"
    },
    {
	id: 103,
	title: "Fourth lecture",
	date: "12 September 2013",
	lecturer: "Arnold Schwartzenegger",
	thumb: "Slide4.jpg"
    },
    {
	id: 104,
	title: "Fifth lecture",
	date: "14 September 2013",
	lecturer: "Arnold Schwartzenegger",
	thumb: "Slide2.jpg"
    },
    {
	id: 105,
	title: "Sixth lecture",
	date: "16 September 2013",
	lecturer: "Arnold Schwartzenegger",
	thumb: "Slide1.jpg"
    }
];*/



var alreadyAddedLectures=false;



function showLectureChooser() {
    if(!alreadyAddedLectures) {
	console.log("foot");
	var len = lectures.length;
	var htmlString = "";
	for(var i=0; i<len; i++) {
	    htmlString = $("#chooser").html();
	    $("#chooser").html(htmlString + "<div id='lecturechoice' class='lecturechoice" + (i+1) + "' onclick='getLecture(" + lectures[i].id + ")'></div>");
	    $(".lecturechoice"+(i+1)).html("<span id='lectureinfo'>Lecture " + lectures[i].id + ": " + lectures[i].title +"</span><div id='lecturechoicethumb"+ (i+1) + "'></div>");
	    $("#lecturechoicethumb" +(i+1)).css("height", "150px");
	    $("#lecturechoicethumb" +(i+1)).css("width", "200px");
	    $("#lecturechoicethumb" +(i+1)).css("background-image", "url('/d1/scss/"+lectures[i].thumb+"')");
	    $("#lecturechoicethumb" +(i+1)).css("background-size", "200px 150px");
	    $("#lecturechoicethumb" +(i+1)).css("float", "right");
	    $("#lecturechoicethumb" +(i+1)).css("line-height", "200px");
	    $("#lecturechoicethumb" +(i+1)).css("vertical-align", "middle");
	    $("#lecturechoicethumb" +(i+1)).css("position", "relative");
	    $("#lecturechoicethumb" +(i+1)).css("top", "25px");
	    
	}
    }
    alreadyAddedLectures=true;
};

function getLecture(i) {
    console.log("Getting lecture " + i);
    window.location.href = "http://localhost:8080/lecture.php?id="+i;

};
