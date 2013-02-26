define(
  ['underscore', 'jquery', 'lib/views/page', 'text!templates/pages/food-meeting/choose.mustache', 'collections/food-meetings', 'collections/polls', 'models/poll'],
  function(_, $, PageView, template, FoodMeetings, Polls, Poll) {

    var View = PageView.extend({
      template: template,

      initialize: function () {
        PageView.prototype.initialize.call(this);

        this.poll = new Poll();
      },

      render: function () {
        PageView.prototype.render.call(this);

        this.$('form').on('submit', _.bind(this.submit, this));
        this.$('.venue [type=radio]').on('change', _.bind(this.toggleVenue, this));
      },

      toggleVenue: function (e) {
        var $checkbox = $(e.currentTarget),
        $venue = $checkbox.parents('.venue');

        this.venue = $venue.data('id');
      },

      submit: function () {
        this.poll.set('venue', this.venue);
        this.poll.set('foodMeeting', this.foodMeeting.get('_id'));
        this.poll.set('email', this.email);

        this.poll.save();

        return false;
      },

      loadAndCheckFoodMeeting: function () {
        var self = this,
        hash = this.urlParams[0],
        foodMeetings = new FoodMeetings();

        return foodMeetings.fetch({
          data: {
            hash: hash
          }
        }).then(function () {
          if (foodMeetings.length === 0) {
            alert('Vous êtes tombé au mauvais endroit au mauvais moment, retour à la case départ.');
            window.location = '/';
          }
          else {
            self.foodMeeting = foodMeetings.models[0];
            self.render();
          }
        });
      },

      checkEmail: function () {
        var emailHash = this.urlParams[2],
        emailData;

        this.email = this.urlParams[1];

        emailData = this.foodMeeting.findEmail(this.email);

        if (!emailData || emailData.hash !== emailHash) {
          alert('Vous êtes tombé au mauvais endroit au mauvais moment, retour à la case départ.');
          window.location = '/';
        }
      },

      loadAndCheckPoll: function () {
        var polls = new Polls();

        polls.fetch({
          data: {
            email: this.email,
            current: true,
            foodMeeting: this.foodMeeting._id
          }
        }).then(function () {
          if (polls.length) {
            alert('Vous avez déjà voté aujourd\'hui !');
          }
        });
      },

      load: function () {
        var self = this;
        this.loadAndCheckFoodMeeting().then(function () {
          self.checkEmail();
          self.loadAndCheckPoll();
        });
      }
    });

return View;
});