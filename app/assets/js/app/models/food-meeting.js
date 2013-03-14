define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: '/api/food-meeting',

    addUser: function (email) {
      this.attributes.users.push({email: email});
    },

    findUserByEmail: function (email) {
      for (var i = this.attributes.users.length - 1; i >= 0; i--) {
        if (this.attributes.users[i].email === email) {
          return this.attributes.users[i];
        }
      }

      return false;
    },

    defaults: {
      venues: [],
      users: []
    }
  });
});