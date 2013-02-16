define(
  ['underscore', 'jquery', 'lib/views/page', 'text!templates/pages/food-meeting.mustache', 'collections/food-meetings'],
  function(_, $, PageView, template, FoodMeetings) {

    var View = PageView.extend({
      template: template,

      load: function () {
        var self = this,
        hash = this.urlParams[0],
        foodMeetings = new FoodMeetings();

        foodMeetings.fetch({
          data: {
            hash: hash
          }
        }).then(function () {
          if(foodMeetings.length === 0) {
            // error
            console.log('error here');
          }
          else {
            self.foodMeeting = foodMeetings.models[0];
            self.render();
          }
        });
      }
    });

    return View;
  });