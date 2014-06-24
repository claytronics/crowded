// Initialize the main Marionette Application
var Crowded = new Marionette.Application();

// Set up the main layout
Crowded.addRegions({
    headerRegion: '#mainhdr',
    mainRegion: '#main',
    footerRegion: '#mainftr',
    dialogRegion: '#maindlg'
});

// History helpers
Crowded.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};
Crowded.getCurrentRoute = function () {
    return Backbone.history.fragment;
};

// Entry point: Go to welcome screen if no other route in URL
Crowded.on('initialize:after', function () {
    Backbone.history.start();

    Crowded.trigger('course');
});


$('document').ready(function () {
    Crowded.start();
});
