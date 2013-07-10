var express = require('express');

var FoodMeeting = require('../../models/food-meeting');

var app = express();

app.use(express.bodyParser());

app.param('id', function (req, res, next, id) {
  FoodMeeting.findById(id).exec(function (err, foodMeeting) {
    if (err) return res.send(503);
    if (! foodMeeting) return res.send(404);

    req.foodMeeting = foodMeeting;
    next();
  });
});

// List all
app.get('/', function (req, res) {
  FoodMeeting.find(req.query).exec(function (err, foodMeetings) {
    if (err) return res.send(503);
    res.send(foodMeetings);
  });
});

// Create
app.post('/', function (req, res) {
  var foodMeeting = new FoodMeeting(req.body);
  foodMeeting.save(function (err) {
    if (err) return res.send(503);
    return res.send(201, foodMeeting);
  });
});

// Find one
app.get('/:id', function (req, res) {
  res.send(req.foodMeeting);
});

// Update
app.patch('/:id', function (req, res) {
  var data = req.body;
  delete data._id;

  data.users = FoodMeeting.hashUsers(data.users || []);

  FoodMeeting.findByIdAndUpdate(req.foodMeeting._id, data, function (err, foodMeeting) {
    if (err) return res.send(503);

    return res.send(foodMeeting);
  });
});


module.exports = app;