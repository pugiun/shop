Shop.module('ProductList', function(ProductList, App, Backbone, Marionette, $, _) {

    // Projects Router
    // ---------------
    //
    // Handle routes to show the active vs complete todo items

    ProductList.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "products": "showProductList"
        }
    });

    // ProductList Controller (Mediator)
    // ------------------------------
    //
    // Control the workflow and logic that exists at the application
    // level, above the implementation detail of views and models

    ProductList.Controller = function() {
        //this.profile = new App.Profiles.Profile();
    };

    _.extend(ProductList.Controller.prototype, {

        // Start the app by showing the appropriate views
        // and fetching the list of products, if there are any
        start: function(){
            //this.showHeader();
            //this.showSidebar();
            this.showProductList();
        },

        showProductList: function() {
            var products, productLayout;
            products = new App.Products.ProductList();
            products.fetch();
            productLayout = new ProductList.Views.ProductLayoutView();
            App.main.show(productLayout);
            productLayout.region1.show(new ProductList.Views.ProductListView({
                collection : products
            }));
        }
    });

    // ProductList Initializer
    // --------------------
    //
    // Get the ProductList up and running by initializing the mediator
    // when the the application is started, pulling in all of the
    // existing project items and displaying them.

    ProductList.addInitializer(function() {
        var controller = new ProductList.Controller();
        new ProductList.Router({
            controller: controller
        });
        controller.start();
    });

});
