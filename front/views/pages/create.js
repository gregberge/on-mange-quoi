define(
  ['lib/views/page', 'text!templates/pages/create.mustache'],
  function(PageView, template) {

    var View = PageView.extend({

      template: template,

      initialize: function () {
        PageView.prototype.initialize.call(this);
        this.venues = null;
        this.loadVenues();
        this.on('load:venues', this.render);
      },

      render: function () {
        PageView.prototype.render.call(this);
        
        if(this.venues === null) {
          this.$('.venues').html('Chargement en cours...');
        }
        else {
          this.$('.next-step').show();
        }
      },


      loadVenues: function () {
        var self = this;
        navigator.geolocation.getCurrentPosition(function (position) {
          var data = {ll: position.coords.latitude + ',' + position.coords.longitude};
          $.get('/api/foursquare-venue', data).then(function (data) {
            self.venues = data.response.groups[0].items;
            console.log(self.venues);
            self.trigger('load:venues');
          });
        });
      }
    });

    return View;
  });