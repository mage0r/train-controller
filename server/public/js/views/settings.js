window.SettingsView = Backbone.View.extend({

    initialize:function () {
        this.render();
        this.model.on('change', this.change, this);

    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    
    events: {
           "click #reset": "resetSettings"
    },
    
    change: function() {
        this.render();
    },

    resetSettings: function() {
        // Clear our global settings/state:
        this.model.set({'currentLayout': null, 'currentLoco': null});
        this.model.save(null, {
                success: function(model) {
                   utils.showAlert('Success', 'Settings cleared', 'alert-success');
                   return true;
                },
                error: function () {
                    utils.showAlert('Error', 'An error occurred while trying to clear the settings', 'alert-error');
            }
        });
        return false;
    }

});