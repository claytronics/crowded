
var alreadyAddedSlides = false;

var slides = [
    {
	img: "Slide1.jpg",
	time: 0,
	notes: "<button>Slide1</button>",
	title: "Welcome"
    },
    {
	img: "Slide2.jpg",
	time: 10,
	notes: "<button>Slide2</button>",
	title: "Text Sizes"
    },
    {
	img: "Slide3.jpg",
	time: 22,
	notes: "<button>Slide3</button>",
	title: "Cloud Lion"
    },
    {
	img: "Slide4.jpg",
	time: 29,
	notes: "<button>Slide4</button>",
	title: "Table"
    }
];



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
    for(var i = 0; i<len; i++){
	slide = slides[i];
	if(i+1==len) {
	    break;
	}
	if(currentTime>=slide.time && currentTime <= slides[i+1].time){
	    break;
	}
    }
    console.log("Currently: "+$('#ppt').css('background-image'));
    console.log('Setting to slide: '+"\"url('http://localhost:8080/d1/scss/" + slide.img + "')\"");
    $('#ppt').css('background-image',"url(/d1/scss/" + slide.img + ")");
    $("#notespanel").html(slide.notes);
    var currentTime = player.getCurrentTime();
    if (i+1 < len) {
	var nextTime = slides[i+1].time;
	var timeoutval = (nextTime - currentTime)*1000;
	console.log("timeoutval: " + timeoutval);
	var iid = setTimeout(function() {
	    console.log('rendering next slide');
	    updateSlide();
	}, timeoutval);
	this.currentiid = iid;
    }
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




















