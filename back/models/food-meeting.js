var mongoose = require('mongoose'),
crypto = require('crypto'),
shasum,

venueSchema = new mongoose.Schema({
  foursquareId: String,
  name: String
}),

foodMeetingSchema = new mongoose.Schema({
  venues: [venueSchema],
  hash: String,
  created: {type: Date, default: Date.now}
});

foodMeetingSchema.pre('save', function (next) {
  shasum = crypto.createHash('sha1');
  shasum.update('' + this._id);
  this.hash = shasum.digest('hex').substring(0, 5);
  next();
});

module.exports = exports = mongoose.model('FoodMeeting', foodMeetingSchema);