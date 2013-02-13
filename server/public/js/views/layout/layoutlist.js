window.LayoutListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var layouts = this.model.models;
        var len = layouts.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new LayoutListItemView({model: layouts[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.LayoutListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    
    events: {
        "click .select" : "selectLayout",
        "click .edit": "editLayout"

    },
    
    editLayout: function(event) {
        // Cf locolist.js for explanation
        event.stopPropagation();
    },
        
    selectLayout: function() {
        console.log('Layout selected: ' + this.model.id);
        var theID = this.model.id;
        // TODO: this is very bad, there must be a better way...
        var settings = new Settings();
        settings.fetch({success: function(){
                // Now store the loco ID in our settings:
                console.log('Layout - My settings ID: ' + settings.get('_id'));
                settings.set({currentLayout:theID});
                settings.save();
                app.navigate('/', true);

        }});
        return false;
    }


});