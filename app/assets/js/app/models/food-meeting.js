define(function () {
  return Backbone.Model.extend({

    idAttribute: '_id',
    urlRoot: '/api/food-meeting',
    defaults: {
      venues: [],
      users: []
    },

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
    }
  });
});