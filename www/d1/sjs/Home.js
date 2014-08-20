var user = 0;
var username;

$(document).ready(function(){
    showCourseChooser();
    if(user==0) {
	$("#loginButton").html("<a onclick='showLogin'>log in</a>");
    } else {
	$("#loginButton").html("<a onclick='showLogin'>hi " + username + "</a>");
    };
});

var courses = [
    {
	id: 0,
	title: "First Course",
	professor: "John Jones",
	thumb: "Slide1.jpg"
    },
    {
	id: 1,
	title: "Second Course",
	professor: "Joan Johnson",
	thumb: "Slide2.jpg"
    },
    {
	id: 2,
	title: "Third Course",
	professor: "Arnold Schwartzenegger",
	thumb: "Slide3.jpg"
    },
    {
	id: 3,
	title: "Fourth Course",
	professor: "Arnold Schwartzenegger",
	thumb: "Slide4.jpg"
    },
    {
	id: 4,
	title: "Fifth Course",
	professor: "Arnold Schwartzenegger",
	thumb: "Slide2.jpg"
    },
    {
	id: 5,
	title: "Sixth Course",
	professor: "Arnold Schwartzenegger",
	thumb: "Slide1.jpg"
    }
];



var alreadyAddedCourses=false;



function showCourseChooser() {
    if(!alreadyAddedCourses) {
	console.log("foo");
	var len = courses.length;
	var htmlString = "";
	for(var i=0; i<len; i++) {
	    htmlString = $("#chooser").html();
	    $("#chooser").html(htmlString + "<div id='coursechoice' class='coursechoice" + (i+1) + "' onclick='getCourse(" + courses[i].id + ")'></div>");
	    $(".coursechoice"+(i+1)).html("<span id='courseinfo'>" + courses[i].title + ": " + courses[i].professor +"</span><div id='coursechoicethumb"+ (i+1) + "'></div>");
	    $("#coursechoicethumb" +(i+1)).css("height", "150px");
	    $("#coursechoicethumb" +(i+1)).css("width", "200px");
	    $("#coursechoicethumb" +(i+1)).css("background-image", "url('/d1/scss/"+courses[i].thumb+"')");
	    $("#coursechoicethumb" +(i+1)).css("background-size", "200px 150px");
	    $("#coursechoicethumb" +(i+1)).css("float", "right");
	    $("#coursechoicethumb" +(i+1)).css("line-height", "200px");
	    $("#coursechoicethumb" +(i+1)).css("vertical-align", "middle");
	    $("#coursechoicethumb" +(i+1)).css("position", "relative");
	    $("#coursechoicethumb" +(i+1)).css("top", "25px");
	    
	}
    }
    alreadyAddedCourses=true;
};

function getCourse(i) {
    console.log("Getting course " + i);
    window.location.href = "http://localhost:8080/Course.php?id="+i;

};
function showLogIn() {
    $("#hazycover").css("visibility", "visible");
};
