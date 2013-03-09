var Poll = require( __dirname + '/../models/poll'),
FoodMeeting = require( __dirname + '/../models/food-meeting'),
moment = require('moment'),
mail = require('../mail'),
_process = {

  template: null,

  getPollResults: function (callback) {

    var now = moment().hour(0).minute(0).second(0).millisecond(0);

    Poll.aggregate({
      $match: {
        created: {
          $gte: now.toDate(),
          $lt: now.clone().add('d', 1).toDate()
        }
      },
      $group: {
        _id: {
          venue: '$venue',
          foodMeeting: '$foodMeeting'
        },
        total: {
          $sum: 1
        }
      }
    },
    function (err, polls) {
      if (err) {
        return console.log(err);
      }

      callback(polls);
    });
  },

  expandPollResult: function (pollResult, callback) {
    FoodMeeting.findOne({_id: pollResult._id.foodMeeting}).exec(function (err, foodMeeting) {
      if (err) {
        return console.log(err);
      }

      pollResult.foodMeeting = foodMeeting;
      pollResult.venue = foodMeeting.venues.reduce(function (previous, current, i, venues) {
        if (! previous) {
          return venues.id === pollResult._id.venue ? pollResult._id.venue : false;
        }

        return current;
      });

      callback(pollResult);
    });
  },

  sendResult: function (pollResult) {
    pollResult.foodMeeting.users.forEach(function (user) {
      _process.sendResultToUser(pollResult, user);
    });
  },

  sendResultToUser: function (pollResult, user) {
    var data = {
      result: pollResult,
      unsubscribeLink: 'http://www.on-mange-quoi.co/m/' + pollResult.foodMeeting.hash + '/' + user.email + '/' + user.hash + '/unsubscribe'
    };

    mail('result', data, {
      from: 'On-mange-quoi <noreply@on-mange-quoi.co>',
      to: [user.email],
      subject: 'Résultat du vote'
    }, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log('result email sent to ', user.email);
    });
  },

  exec: function () {
    _process.getPollResults(function (pollResults) {
      pollResults.forEach(function (pollResult) {
        _process.expandPollResult(pollResult, function (pollResult) {
          _process.sendResult(pollResult);
        });
      });
    });
  }
};

exports.exec = _process.exec;