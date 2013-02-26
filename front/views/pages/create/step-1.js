define(
  ['underscore', 'jquery', 'lib/views/page', 'text!templates/pages/create/step-1.mustache', 'collections/foursquare-venues'],
  function(_, $, PageView, template, FoursquareVenues) {

    var View = PageView.extend({

      template: template,

      initialize: function () {
        PageView.prototype.initialize.call(this);

        this.foursquareVenues = new FoursquareVenues();
        this.foursquareVenues.on('reset', _.bind(this.render, this));

        this.loadVenues();
      },

      render: function () {
        PageView.prototype.render.call(this);

        var self = this;

        this.$('form').on('submit', _.bind(this.submit, this));
        this.$('.venue [type=checkbox]').on('change', _.bind(this.toggleVenue, this));

        _.each(this.foodMeeting.get('venues'), function (venue) {
          self.$('.venue[data-foursquare-id=' + venue.foursquareId + '] [type=checkbox]').prop('checked', true);
        });
      },

      submit: function () {
        var self = this;

        this.foodMeeting.save().then(function () {
          self.trigger('done');
        });

        return false;
      },

      toggleVenue: function (e) {
        var $checkbox = $(e.currentTarget),
        $venue = $checkbox.parents('.venue'),
        venues = this.foodMeeting.get('venues'),
        foursquareVenue;

        if ($checkbox.is(':checked')) {
          foursquareVenue = this.foursquareVenues.get($venue.data('id'));
          venues.push(foursquareVenue.attributes);
        }
        else {
          venues = venues.filter(function (venue) {
            return venue.foursquareId !== $venue.data('foursquare-id');
          });
        }

        this.foodMeeting.set('venues', venues);
      },

      loadVenues: function () {
        var self = this;
        navigator.geolocation.getCurrentPosition(function (position) {
          var data = {ll: position.coords.latitude + ',' + position.coords.longitude};
          self.foursquareVenues.fetch({data: data});
        });
      }
    });

return View;
});