var FoodMeeting = require( __dirname + '/../models/food-meeting'),
mail = require('../mail'),
_process = {

  template: null,

  getFoodMeetings: function (callback) {
    FoodMeeting.find().exec(function (err, foodMeetings) {
      if (err) {
        return console.log(err);
      }

      callback(foodMeetings);
    });
  },

  processFoodMeetings: function (foodMeeting) {
    foodMeeting.users.forEach(function (user) {
      _process.processFoodMeetingUser(foodMeeting, user);
    });
  },

  processFoodMeetingUser: function (foodMeeting, user) {
    var data = {
      link: 'http://www.on-mange-quoi.co/m/' + foodMeeting.hash + '/' + user.email + '/' + user.hash,
      unsubscribeLink: 'http://www.on-mange-quoi.co/m/' + foodMeeting.hash + '/' + user.email + '/' + user.hash + '/unsubscribe'
    };

    mail('poll', data, {
      from: 'On-mange-quoi <noreply@on-mange-quoi.co>',
      to: [user.email],
      subject: 'On mange quoi ?'
    }, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log('poll email sent to ', user.email);
      _process.updateLastSentDate(foodMeeting, user);
    });
  },

  updateLastSentDate: function (foodMeeting, user) {
    user.lastSentDate = Date.now();
    foodMeeting.save(function (err) {
      if (err) {
        return console.log(err);
      }

      console.log('lastSentDate update for user', user.email);
    });
  },

  exec: function () {
    _process.getFoodMeetings(function (foodMeetings) {
      foodMeetings.forEach(_process.processFoodMeetings);
    });
  }
};

exports.exec = _process.exec;