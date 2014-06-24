/**
 * Extend Marionette.Region for a Dialog region
 *

 * onShow: show the view and listen to the close event
 * closeDialog: close and destroy the modal
 */
Marionette.Region.Dialog = Marionette.Region.extend({
    onShow: function (view) {
        var me = this;

        me.listenTo(view, 'dialog:close', me.closeDialog);

        me.$el.dialog({
            'modal': true,
            'title': view.title,
            'width': "auto",
            'close': function(e, ui){
                self.closeDialog();
            }
        });
    },

    closeDialog: function(){
        this.stopListening();
        this.close();
        this.$el.dialog("destroy");
    }
});
