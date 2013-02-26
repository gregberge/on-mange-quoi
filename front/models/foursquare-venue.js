define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    urlRoot: '/api/foursquare-venue',
    
    parse: function (resp) {
      resp.id = resp.venue.id;
      return resp;
    }
  });
});