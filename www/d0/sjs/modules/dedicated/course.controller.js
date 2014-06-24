/**
 * CourseModule (Controller)
 * The dedicated view for a course
 */
Crowded.module('CourseModule', function (CourseModule, Crowded, Backbone, Marionette, $, _) {
    CourseModule.Controller = {
        'showCourse': function () {
            Crowded.headerRegion.show(new CourseModule.HeaderView());
            Crowded.mainRegion.show(new CourseModule.BodyView());
        }
    };

    // Handle Crowded.trigger('course')
    Crowded.on('course', function () {
        Crowded.navigate('#/course');
        CourseModule.Controller.showCourse();
    });
});
