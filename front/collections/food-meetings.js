define(['backbone', 'models/food-meeting'],
  function (Backbone, FoodMeeting) {
    return Backbone.Collection.extend({
      model: FoodMeeting,
      url: '/api/food-meeting'
    });
  });