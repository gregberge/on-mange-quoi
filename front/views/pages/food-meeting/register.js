define(
  ['underscore', 'jquery', 'router', 'lib/views/page', 'text!templates/pages/food-meeting/register.mustache', 'collections/food-meetings'],
  function(_, $, router, PageView, template, FoodMeetings) {

    var View = PageView.extend({
      template: template,

      render: function () {
        PageView.prototype.render.call(this);

        this.$('form').on('submit', _.bind(this.submit, this));
        this.$('#email').on('propertychange keyup input paste', _.bind(this.saveEmail, this));

        this.$('#email').val(this.email);
      },

      saveEmail: function () {
        this.email = this.$('#email').val().toLowerCase();
      },

      submit: function () {
        if (this.foodMeeting.findUserByEmail(this.email)) {
          this.finish();
          return false;
        }

        this.foodMeeting.addUser(this.email);
        this.foodMeeting.save();

        this.finish();
        return false;
      },

      finish: function () {
        this.done = true;
        this.render();
      },

      loadFoodMeeting: function () {
        var self = this,
        hash = this.urlParams[0],
        foodMeetings = new FoodMeetings();

        foodMeetings.fetch({
          data: {
            hash: hash
          }
        }).then(function () {
          if(foodMeetings.length === 0) {
            alert('Vous êtes tombé au mauvais endroit au mauvais moment, retour à la case départ.');
            window.location = '/';
          }
          else {
            self.foodMeeting = foodMeetings.models[0];
            self.render();
          }
        });
      },

      load: function () {
        this.loadFoodMeeting();
      }
    });
    return View;
  }
);