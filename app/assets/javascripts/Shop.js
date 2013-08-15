var Shop = new Backbone.Marionette.Application();

Shop.addRegions({
	main: '#main'
});

Shop.on('initialize:after', function() {
	Backbone.history.start();
});

/*Marionette.Region.prototype.open = function(view){
  this.$el.hide();
  this.$el.html(view.el);
  this.$el.fadeIn();
}*/
Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
    // use Handlebars.js to compile the template;
    return Handlebars.compile(rawTemplate);
}