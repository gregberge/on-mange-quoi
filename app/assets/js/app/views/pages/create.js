define([
  'lib/views/template',
  'text!tpl/pages/create.mustache',
  'app/views/components/create/venue-list',
  'app/collections/venues',
  'app/views/components/create/invite'
],
function (
  View,
  template,
  VenueListView,
  Venues,
  InviteView
) {
  return View.extend({

    template: template,

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);

      this.on('change:step', this.render, this);

      this.venueListView = new VenueListView({
        model: this.model,
        collection: new Venues()
      });

      this.inviteView = new InviteView({
        model: this.model
      });

      this.venueListView.on('submit', this.onSubmitVenues, this);

      this.setStep(this.venueListView);
    },

    render: function () {
      View.prototype.render.apply(this, arguments);

      return this
      .renderBreadcrumb()
      .assign('.step', this.step);
    },

    renderBreadcrumb: function () {
      var selected;

      switch (this.step) {
      case this.venueListView:
        selected = 'choice';
        break;
      case this.inviteView:
        selected = 'invite';
        break;
      }

      if (! selected) {
        return this;
      }

      this.$('.breadcrumb li')
      .removeClass('active')
      .filter('.' + selected)
      .addClass('active');

      return this;
    },

    setStep: function (step) {
      this.step = step;
      this.trigger('change:step', step);
      return this;
    },

    onSubmitVenues: function () {
      this.model.save(null, {
        success: _.bind(function () {
          this.setStep(this.inviteView);
        }, this)
      });
    }
  });
});