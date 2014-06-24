

/**
 * YouTubeSlides
 * 
 * 
 * Given some youtube video options and a set of slides associated with time segments of the video,
 * render them at the appropriate times.
 *
 * @constructor
 * @param {Object} videoOptions - YT.Player options as per https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
 * @param {Array} slides - array of objects that have the time and the image to set the slide to
 * @param {string} videoTarget - the id of the video
 * @param {string} slideTarget - the id of the image to set the image source of the slide to
 * @param {Object} opts - an object that will hold extra options to be implemented as needed.
 * 
 **/
function YouTubeSlides(videoOptions, slides, videoTarget, slideTarget, opts) {
    this.videoOptions = videoOptions;
    this.videoTarget = videoTarget;
    this.slides = slides;
    this.slideTarget = slideTarget;
    this.videoId = videoOptions.videoId;
    this.ytplayer = null;
    if (! this.validateVideoOptions()) {
        console.log('video options validation failure, bailing')
        failure();
    }
    if (! this.validateSlides()) {
        console.log('slides validation failure, bailing');
        failure();//this func does not exist yet, will cause a crash
    }
    this.validateTargets();
}

/**
 * string that is the youtube video id
 **/
YouTubeSlides.prototype.videoId;

/**
 * Array of objects containing 3 objects:
 **/
YouTubeSlides.prototype.slides;

/**
 * YouTube player that exposes the js api reference: 
 * https://developers.google.com/youtube/js_api_reference
 **/
YouTubeSlides.prototype.player;

/**
 * validateSlides
 * 
 * Checks to make sure each entry in the slides array is an object of the following format:
 * 
 * {img : <path-to-slide-image>, time : <number>}
 *
 * @private
 * @return {boolean}
 **/
YouTubeSlides.prototype.validateSlides = function() {
    var len = this.slides.length;
    for (var i = 0; i < len; i++) {
        if (this.slides[i].img === undefined) {
            console.log('slides has an undefined image');
            return false;
        }
        if (this.slides[i].time === undefined) {
            console.log('missing time');
            return false;
        }
        if (i > 0) {
            if (this.slides[i-1].time >= this.slides[i].time) {
                console.log('slides time unsorted.');
            }
        }
    }
    return true;
};

/**
 * validateVideoOptions
 * 
 * Checks to make sure there is a height, width, and videoId in the videoOptions
 *
 * @return {boolean}
 **/
YouTubeSlides.prototype.validateVideoOptions = function() {
    var required = ['videoId', 'height', 'width'],
        len = required.length;

    var numOpts = 0;
    for (var i in this.videoOptions) {
        numOpts += 1;
    }
    if (numOpts != 3) {
        console.log('there must be exactly 3 arguments in the videoOptions')
        return false;
    }
    for (var i = 0; i < len; i++) {
        if (! (required[i] in this.videoOptions)) {
            return false;
        }
    }
    if (this.videoOptions.height < 200 || this.videoOptions.width < 200) {
        console.log('height and width must be > 200px');
        return false;
    }

    return true;
};

/**
 * validateTargets
 * 
 * Makes sure the id of the elements actually exists on the page
 *
 * @return {boolean}
 **/
YouTubeSlides.prototype.validateTargets = function() {
    for (var key in {'videoTarget' : 1, 'slideTarget' : 1}) {
        if ($('#' + this[key]).length != 0) {
            console.log(key + ' not found');
            return false;
        }
    }
    return true;
};

/**
 * onPlayerReady
 * 
 * Callback that is called after the player is ready to start.
 *
 **/
YouTubeSlides.prototype.onPlayerReady = function(event) {
    console.log('on player ready');
    console.log(event);
};

/**
 * renderCurrentSlide
 * 
 * Given the player's current time, render the correct image. Returns the index of the slide that was 
 * rendered.
 * 
 * @return {number}
 **/
YouTubeSlides.prototype.renderCurrentSlide = function() {
    var me = this;
    var currentTime = this.ytplayer.getCurrentTime();

    var len = this.slides.length;
    for (var slideIndex = 0; slideIndex < len; slideIndex++) {
        var slide = this.slides[slideIndex];
        if (slideIndex+1 == len) {
            break
        }
        if (currentTime >= slide.time && currentTime <= this.slides[slideIndex+1].time) {
            break;
        }
    }

    console.log('rendering slide at index ' + slideIndex + ' with src ' + slide.img);
    //actually set the source of the image
    $('#' + this.slideTarget).attr('src', slide.img);

    var currentTime = this.ytplayer.getCurrentTime();
    if (slideIndex+1 < this.slides.length) {
        var nextTime = this.slides[slideIndex+1].time;
        var timeoutval = (nextTime - currentTime)*1000;
        console.log('setting timeout to ' + timeoutval);
        var iid = setTimeout(function() {
            console.log('rendering next slide');
            me.renderCurrentSlide();
        }, timeoutval);
        this.currentiid = iid;
    }

    return slideIndex;
};

/**
 * onStateChange
 * 
 * Callback when state changes: https://developers.google.com/youtube/iframe_api_reference
 *
 **/
YouTubeSlides.prototype.onStateChange = function(event) {
    if (event.data != YT.PlayerState.PLAYING) {
        clearInterval(this.iid);
    }
    this.renderCurrentSlide();
};

/**
 * start
 * 
 * After the constructor has been called and everything has been validated, start playing
 * the video and rendering the slides.
 *
 **/
YouTubeSlides.prototype.start = function() {
    var me = this;
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.videoOptions.events = {
        onReady : function(event) {me.onPlayerReady(event);},
        onStateChange : function(event) {me.onStateChange(event);}
    };
    window['onYouTubeIframeAPIReady'] = function() {
        me.ytplayer = new YT.Player(me.videoTarget, me.videoOptions);
    };
};

///////////////////////////////////////////////////////
// TESTING STUFF
///////////////////////////////////////////////////////

$(document).ready(function() {
    var videoOptions = {
        height : 400,
        width: 500,
        videoId : 'XMjgSkfQPSY'
    };
    var slides = [
        {time : 0, img : 'http://www.purplesneakers.com.au/wp-content/uploads/2012/04/flight-of-the-conchords.jpg'},
        {time : 20, img : 'http://userserve-ak.last.fm/serve/_/2127927/Flight+of+the+Conchords.jpg'},
        {time : 40, img : 'http://flightoftheconchords.co.nz/wp-content/themes/fotc/images/home-page.gif'},
        {time : 60, img : 'http://encoremag.com/images/2009/flight_of_the_conchords_apr2009.jpg'}
        
    ];
    var ytp = new YouTubeSlides(videoOptions, slides, 'video', 'currentSlide');
    ytp.start();
});