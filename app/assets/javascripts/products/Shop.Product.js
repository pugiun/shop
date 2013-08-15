Shop.module('Products', function(Products, App, Backbone, Marionette, $, _) {

    // Product Model
    // ----------

    Products.Product = Backbone.Model.extend({
        urlRoot: "products"       
    });

    // Products Collection
    // ---------------

    Products.ProductList = Backbone.Collection.extend({
        model: Products.Product,
        url: 'products'
    });

});
