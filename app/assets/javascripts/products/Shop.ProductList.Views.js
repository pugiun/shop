Shop.module('ProductList.Views', function(Views, App, Backbone, Marionette, $, _) {
    Views.ProductLayoutView = Backbone.Marionette.Layout.extend({
        template: "#template-product-layout",
        regions: {
            region1: "#region1",
            region2: "#region2"
        },
        events: {
            'click #link-add-product': 'viewCreateProduct'
        },
    	viewCreateProduct: function(){
    		App.main.currentView.region2.show(new Views.ProductView());
    	}           
    });
 
     Views.ItemView = Marionette.ItemView.extend({
        template: "#template-product-item",
        tagName: "tr",
        events: {
            'click .link-delete': 'deleteProduct',
            'click .link-edit': 'viewEditProduct'
        },
        onShow: function() {
        	var indexOfTThisModel;
            indexOfTThisModel = this.model.collection.indexOf(this.model);
            if (indexOfTThisModel % 2 === 0){
                this.el.className = 'even';
            }
            else{
                this.el.className = 'odd';
            }
        },
        deleteProduct: function(event) {
        	var id, product, that;
        	id = $(event.currentTarget).data("id");
            product = new App.Products.Product({id : id});
            that = this;
            product.destroy({
                success: function(product, response) {
                    console.log("product removed");
                    that.model.collection.remove(product);
                     App.main.currentView.region2.show(new App.Layout.EmptyView());  
                }
            });       	
        },
        viewEditProduct: function(event ) {
        	var id, product;
        	id = $(event.currentTarget).data("id");        	
            product = new App.Products.Product({id : id});
            product.fetch({
            	success: function() {
            		 App.main.currentView.region2.show(new Views.ProductView({model: product}));   
            	}
            });;
        }          
    });  
    
    Views.ProductListView = Marionette.CompositeView.extend({
        itemView: Views.ItemView,
        template: "#template-product-list",
        tagName: "div",       	
        id: 'product-listing',
        className: 'row-fluid',
        wrapped: true,
        itemViewContainer: '#product-table',       
        initialize: function() {
        	this.listenTo(this.collection, 'all', this.render);
    	}       
	});
	
	Views.ProductView = Marionette.Layout.extend({
		template:"#template-add-product",
        className: "row-fluid",
        events: {
            'click #btn-save': 'saveProduct',
            'click #btn-cancel': 'cancelEdit'
        },
        onShow: function() {
        	if (this.model) {
        		$("legend").text("Edit Product");
        	}
        },
        cancelEdit: function(){
            var name, code;
            name = $("#text-name").val();
            code = $("#text-code").val();
        },
        saveProduct: function(){
            var name, code, inputs, errors, product, that;
            name = $("#text-name").val();
            code = $("#text-code").val();
            inputs = $(this.el).find("form#form-create-product :input").not("[type=submit]");
            inputs.jqBootstrapValidation();
            inputs.trigger("change.validation", {submitting: true});
            errors = inputs.jqBootstrapValidation("collectErrors");
            product = new App.Products.Product();
            if (this.model) {
            	product.set({id: this.model.id})
            }           
            that = this;
            if ($.isEmptyObject(errors)) {
            	product.save({
                        name: name,
                        code: code
                    }, {
                        success: function (product, response) {
                            console.log("success");
                            App.main.currentView.region1.currentView.collection.remove(product);
                            App.main.currentView.region1.currentView.collection.add(product);
                            $("#text-name").val('');
            				$("#text-code").val('');
                        }
                });
            }          
		}         			
	})
})	
