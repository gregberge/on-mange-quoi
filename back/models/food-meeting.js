var mongoose = require('mongoose'),
crypto = require('crypto'),
shasum = crypto.createHash('sha1'),

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
  shasum.update('' + this._id);
  this.hash = shasum.digest('hex');
  console.log(this);
  next();
});

module.exports = exports = mongoose.model('FoodMeeting', foodMeetingSchema);