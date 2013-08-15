Shop.module('Layout', function(Layout, App, Backbone, Marionette, $, _) {

    // Layout Header View
    // ------------------

   /* Layout.Header = Backbone.Marionette.Layout.extend({
        template: '#template-header',
        regions: {
            searchcontainer: '#search-container'
        },

        events: {
            "click .nav li": "updateActive"
        },
        updateActive: function(e){
            $('li', $(e.currentTarget).parent()).removeClass('active')
            $(e.currentTarget).addClass("active");
        }
    });*/

    Layout.EmptyView= Backbone.Marionette.Layout.extend({
     template: '#template-empty'
    });
});
