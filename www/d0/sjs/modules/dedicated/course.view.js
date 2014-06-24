/**
 * CourseModule (View)
 * The dedicated view for a course
 */
Crowded.module('CourseModule', function (CourseModule, Crowded, Backbone, Marionette, $, _) {
    // TODO: Make this into a CompositeView if necessary
    CourseModule.HeaderView = Marionette.ItemView.extend({
        model: null,
        template: '#course-hdr-tmpl',
        tagName: 'header',
        className: 'soft hard--bottom'
    });
    CourseModule.BodyView = Marionette.ItemView.extend({
        model: null,
        template: '#course-bdy-tmpl',
        tagName: 'section',
        className: 'soft',
        ui: {},
        events: {}
    });
});
