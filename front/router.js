define(
  ['backbone'],
  function (Backbone) {

    var Router = Backbone.Router.extend({

      start: function () {
        Backbone.history.start();
      }

    });

    return new Router();
  });