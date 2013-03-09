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

        this.done = true;
        this.render();

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
          }
        });
      },

      checkUser: function () {
        var userHash = this.urlParams[2],
        userData;

        this.email = this.urlParams[1];

        userData = this.foodMeeting.findUserByEmail(this.email);

        if (!userData || userData.hash !== userHash) {
          alert('Vous êtes tombé au mauvais endroit au mauvais moment, retour à la case départ.');
          window.location = '/';
        }
      },

      loadAndCheckPoll: function () {
        var self = this,
        polls = new Polls();

        polls.fetch({
          data: {
            email: this.email,
            current: true,
            foodMeeting: this.foodMeeting._id
          }
        }).then(function () {
          if (polls.length) {
            self.hasVoted = true;
          }

          self.render();
        });
      },

      load: function () {
        var self = this;
        this.loadAndCheckFoodMeeting().then(function () {
          self.checkUser();
          self.loadAndCheckPoll();
        });
      }
    });

return View;
});