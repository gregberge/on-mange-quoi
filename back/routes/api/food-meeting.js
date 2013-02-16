var FoodMeeting = require(global.root + '/models/food-meeting'),
route = {

  findAll: function (req, res) {
    FoodMeeting.find(req.query).exec(function (err, foodMeetings) {
      res.send(foodMeetings);
    });
  },

  add: function (req, res) {
    var foodMeeting = new FoodMeeting(req.body);
    foodMeeting.save(function (err) {
      if (err) {
        return res.send({error: true});
      }

      return res.send(foodMeeting);
    });
  },

  update: function (req, res) {
    var data = req.body;
    delete data._id;

    FoodMeeting.update({_id: req.params.id}, data, function (err) {

      if (err) {
        console.log(err);
        return res.send({error: true});
      }

      FoodMeeting.findOne({_id: req.params.id}, function (err, foodMeeting) {
        if (err) {
          return res.send({error: true});
        }

        return res.send(foodMeeting);
      });
    });
  }
};

exports = module.exports = route;