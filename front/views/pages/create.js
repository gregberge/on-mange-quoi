define(
  ['underscore', 'jquery', 'lib/views/page', 'text!templates/pages/create.mustache'],
  function(_, $, PageView, template) {

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

        this.$('form').on('submit', _.bind(this.submitVenues, this));
      },

      submitVenues: function () {
        var checkedVenues = this.$('.venue [type=checkbox]:checked'),
        data = {venues: []};

        checkedVenues.each(function () {
          var venue = $(this).parents('.venue');
          data.venues.push({
            name: venue.data('name'),
            foursquareId: venue.data('foursquare-id')
          });
        });

        $.post('/api/food-meeting', data).then(function (data) {
          console.log(data);
        });

        return false;
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