define([
  'lib/views/template',
  'text!tpl/food-meeting/new-steps/choose.hbs',
  'app/collections/venues'
],
function (
  View,
  template,
  Venues
) {
  return View.extend({

    template: template,

    events: {
      'submit form'                  : 'onSubmit',
      'change .venue [type=checkbox]': 'onToggleVenue'
    },

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);

      this.collection = new Venues();

      this.collection.on('reset', this.render, this);
      this.on('localize', this.refreshFromPosition, this);

      this.localize();
    },

    render: function () {
      View.prototype.render.apply(this, arguments);

      _.each(this.model.get('venues'), _.bind(function (venue) {
        this.$('.venue[data-id=' + venue.id + '] [type=checkbox]').prop('checked', true);
      }, this));

      return this;
    },

    onSubmit: function (event) {
      event.preventDefault();

      this.trigger('done');
    },

    onToggleVenue: function (event) {
      var $checkbox = $(event.currentTarget),
      venue = this.collection.get($checkbox.parents('.venue').data('id')),
      venues = new Venues(this.model.get('venues'));

      if ($checkbox.is(':checked')) {
        venues.add(venue);
      }
      else {
        venues.remove(venue);
      }

      this.model.set('venues', venues.toJSON());
    },

    localize: function () {
      navigator.geolocation.getCurrentPosition(_.bind(function (position) {
        this.trigger('localize', position);
      }, this));
    },

    refreshFromPosition: function (position) {
      this.collection.fetch({
        data: {
          ll: position.coords.latitude + ',' + position.coords.longitude
        }
      });
    }
  });
});