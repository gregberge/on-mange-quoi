var mail = require('mandrill-send')('GZoGtCqu9ER5ogoPCVsQFw'),
mongoose = require('mongoose'),
hogan = require('hogan.js'),
fs = require('fs'),
FoodMeeting = require( __dirname + '/models/food-meeting'),
sendEmailVote,
readTemplate,
templates = {};

mongoose.connect('localhost', 'test');

readTemplate = function (path, callback) {

  // read template from cache
  if (typeof templates[path] !== 'undefined') {
    return callback(null, templates[path]);
  }

  // read template
  fs.readFile(path, function (err, data) {
    if (err) {
      return callback(err);
    }

    // cache template
    templates[path] = hogan.compile(data + '');
    return callback(err, templates[path]);
  });
};

sendEmailVote = function (foodMeeting) {
  readTemplate(__dirname + '/../templates/emails/call.mustache', function (err, template) {
    if (err) {
      return console.log(err);
    }

    for (var i = 0; i < foodMeeting.emails.length; i++) {
      var email = foodMeeting.emails[i],
      html = template.render({
        link: 'http://www.on-mange-quoi.co/m/' + foodMeeting.hash + '/' + email.email + '/' + email.hash,
        unsubscribeLink: 'http://www.on-mange-quoi.co/m/' + foodMeeting.hash + '/' + email.email + '/' + email.hash + '/unsubscribe'
      });

      mail({
        from: 'On-mange-quoi <noreply@on-mange-quoi.co>',
        to: [email.email],
        subject: 'On mange quoi ?',
        html: html
      });
    }
  });
};

FoodMeeting.find().exec(function (err, foodMeetings) {
  foodMeetings.forEach(function (foodMeeting) {
    sendEmailVote(foodMeeting);
  });
});