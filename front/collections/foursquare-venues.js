define(['backbone', 'models/foursquare-venue'], function (Backbone, FoursquareVenue) {
  return Backbone.Collection.extend({
    model: FoursquareVenue,
    url: '/api/foursquare-venue'
  });
});