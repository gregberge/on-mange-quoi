var FoodMeeting = require(global.root + '/models/food-meeting'),
route = {

  findAll: function (req, res) {
    FoodMeeting.find().exec(function (err, foodMeetings) {
      res.send(foodMeetings);
    });
  },

  add: function (req, res) {
    var foodMeeting;

    if (req.body.venues && req.body.venues.length) {

      foodMeeting = new FoodMeeting();

      req.body.venues.forEach(function (venue) {
        venue = JSON.parse(venue);
        foodMeeting.venues.push(venue);
      });

      foodMeeting.save(function (err) {
        if (err) {
          return res.send({error: true});
        }

        return res.send(foodMeeting);
      });
    }
    else {
      return res.send({error: true});
    }
  }
};

exports = module.exports = route;