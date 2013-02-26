define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: '/api/food-meeting',

    addEmail: function (email) {
      this.attributes.emails.push({email: email});
    },

    findEmail: function (email) {
      for (var i = this.attributes.emails.length - 1; i >= 0; i--) {
        if (this.attributes.emails[i].email === email) {
          return this.attributes.emails[i];
        }
      }

      return false;
    },

    defaults: {
      venues: [],
      emails: []
    }
  });
});