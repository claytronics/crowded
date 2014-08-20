var lectureData;
var lecture;
var user = 0;
var username;

$(document).ready(function(){
    var id = $("#id").html();
    if(user==0) {
	$("#loginButton").html("<a onclick='showLogin'>log in</a>");
    } else {
	$("#loginButton").html("<a onclick='showLogin'>hi " + username + "</a>");
    };
    console.log("Getting lecture " + id);
    $.ajax({
	type: 'POST',
	url: '/php/getlecture.php',
	data: 'id=' + id,
	dataType: 'json',
	cache: false,
	success: function(result) {
	    lectureData = JSON.parse(result.data);
	    for(var lect in lectureData) {
		if(lectureData[lect].id == id){
		    lecture = lectureData[lect];
		    break;
		};
	    };
	    slides = lecture.slides;
	    $("title").html(lecture.title + ": " + lecture.speaker);
	    $("#video").html("<iframe id='ytplayer' type='text/html' width='640 'height='390' src='http://www.youtube.com/embed/" + lecture.videoid + "?enablejsapi=1&controls=0' frameborder='0'></iframe>");
	},
    });
});




var alreadyAddedSlides = false;
var prevSlideIndex=-1;

var slides;
/*slides = [
    {
	img: "Slide1.jpg",
	time: 0,
	notes: "<button>Slide1</button>",
	title: "Welcome",
	checkpoint: false,
    },
    {
	img: "Slide2.jpg",
	time: 10,
	notes: "<button>Slide2</button>",
	title: "Text Sizes",
	checkpoint: false,
    },
    {
	img: "Slide3.jpg",
	time: 22,
	notes: "<button>Slide3</button>",
	title: "Cloud Lion",
	checkpoint: true,
	checkpointText: "How much wood could a woodchuck chuck if a woodchuck could chuck wood?"
    },
    {
	img: "Slide4.jpg",
	time: 29,
	notes: "<button>Slide4</button>",
	title: "Table",
	checkpoint: true,
	checkpointText: "What is the capital of Lesotho?"
    }
];*/



// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "http://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
        events: {
	    'onReady': onPlayerReady,
	    'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    updateSlide();
}
function updateSlide() {
    var currentTime = player.getCurrentTime();
    var len = slides.length;
    var slide;
    var slideIndex;
    for(slideIndex = 0; slideIndex<len; slideIndex++){
	slide = slides[slideIndex];
	if(slideIndex+1==len) {
	    break;
	}
	if(currentTime>=slide.time && currentTime <= slides[slideIndex+1].time){
	    break;
	}
    }
    console.log("Currently: "+$('#ppt').css('background-image'));
    console.log('Setting to slide: '+"\"url('http://localhost:8080/d1/scss/" + slide.img + "')\"");
    $('#ppt').css('background-image',"url(/d1/scss/" + slide.img + ")");
    $("#notespanel").html(slide.notes);
    var currentTime = player.getCurrentTime();
    if (slideIndex+1 < len) {
	var nextTime = slides[slideIndex+1].time;
	var timeoutval = (nextTime - currentTime)*1000;
	console.log("timeoutval: " + timeoutval);
	var iid = setTimeout(function() {
	    console.log('rendering next slide');
	    updateSlide();
	}, timeoutval);
	this.currentiid = iid;
    }
    if(slide.checkpoint && prevSlideIndex<slideIndex) {
	player.pauseVideo();
	var html = $('#checkpoint').html();
	$('#checkpoint').html(slide.checkpointText + "<button id='pass' onclick='pass("+slideIndex+")'>PASS</button><button id='fail' onclick='fail("+slideIndex+")'>FAIL</button>");
	$('#checkpoint').css('visibility', 'visible');
    }
    prevSlideIndex=slideIndex;
};
function prev() {
    var currentTime = player.getCurrentTime();
    var len = slides.length;
    var slide;
    var i = 0;
    for(i = 0; i<len; i++){
	slide = slides[i];
	if(i+1==len) {
	    break;
	}
	if(currentTime>=slide.time && currentTime <= slides[i+1].time){
	    break;
	}
    }
    if(i==0){
	player.seekTo(0, true);
	updateSlide();
    } else {
	player.seekTo(slides[i-1].time+.05, true);
	console.log(player.getCurrentTime());
	updateSlide();
    };
};
function first() {
    player.seekTo(0, true);
    updateSlide();
}
function next() {
    var currentTime = player.getCurrentTime();
    var len = slides.length;
    var slide;
    var i = 0;
    for(i = 0; i<len; i++){
	slide = slides[i];
	if(i+1==len) {
	    break;
	}
	if(currentTime>=slide.time && currentTime <= slides[i+1].time){
	    break;
	}
    }
    if(i+1==len){
    } 
    else {
	player.seekTo(slides[i+1].time+.05, true);
	console.log(player.getCurrentTime());
	updateSlide();
    };
};
function showscp() {
    player.pauseVideo();
    var len = slides.length;
    if(!alreadyAddedSlides) {
	var htmlstring = "";
	for(var i = 0; i < len; i++) {
	    htmlString = $("#chooser").html();
	    $("#chooser").html(htmlString + "<div id='slidechoice' class='slidechoice" + (i+1) + "' onclick='goToSlide(" + (i) + ")'></div>");
	    $(".slidechoice"+(i+1)).html("<span id='slideinfo'>Slide " + (i+1) + ": " + slides[i].title +"</span><div id='slidechoicethumb"+ (i+1) + "'></div>");
	    $("#slidechoicethumb" +(i+1)).css("height", "150px");
	    $("#slidechoicethumb" +(i+1)).css("width", "200px");
	    $("#slidechoicethumb" +(i+1)).css("background-image", "url('/d1/scss/"+slides[i].img+"')");
	    $("#slidechoicethumb" +(i+1)).css("background-size", "200px 150px");
	    $("#slidechoicethumb" +(i+1)).css("float", "right");
	    $("#slidechoicethumb" +(i+1)).css("line-height", "200px");
	    $("#slidechoicethumb" +(i+1)).css("vertical-align", "middle");
	    $("#slidechoicethumb" +(i+1)).css("position", "relative");
	    $("#slidechoicethumb" +(i+1)).css("top", "25px");
	    console.log($("#chooser").html());
	}
    }
    
    $("#slidechoicepanel").css("visibility", "visible");
    alreadyAddedSlides=true;
};
function closescp() {
    $("#slidechoicepanel").css("visibility", "hidden");
};
function goToSlide(index) {
    player.seekTo(slides[index].time+.05, true);
    updateSlide();
    closescp();
}
function pass(i) {
    alert("Correct");
    $("#checkpoint").css("visibility","hidden");
    player.playVideo();
}
function fail(i) { 
    alert("That is incorrect. You are being returned to the last slide.");
    player.seekTo(slides[i-1].time+.05,true);
    updateSlide();
    $("#checkpoint").css("visibility", "hidden");
    player.playVideo();
}




















