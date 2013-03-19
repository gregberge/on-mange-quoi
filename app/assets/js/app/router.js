define(function () {
  var Router = Backbone.Router.extend( {

    old_routes : {
      '': {
        path: '',
        page: 'home'
      },
      'create': {
        path: 'create',
        page: 'create/index'
      },
      'create/step-1': {
        path: 'create/step-1',
        redirect: 'create'
      },
      'create/step-2': {
        path: 'create/step-2',
        redirect: 'create'
      },
      'food-meeting/register': {
        path: 'm/:meetingHash',
        page: 'food-meeting/register'
      },
      'food-meeting/choose': {
        path: 'm/:meetingHash/:email/:emailHash',
        page: 'food-meeting/choose'
      }
    },

    routes: {
      ''                   : 'home',
      'food-meeting/new'   : 'newFoodMeeting',
      'food-meeting/:id'   : 'registerFoodMeeting'
    },

    initialize: function () {
      this.page = null;
    },

    requireRoute: function (route, params) {
      require(['app/routes/' + route], _.bind(function (pageFactory) {
        this.onRequireRoute(pageFactory, params);
      }, this));
    },

    onRequireRoute: function (pageFactory, params) {
      this.page = pageFactory.apply(this, params);
      this.trigger('change:page', this.page);
    },

    home: function () {
      this.requireRoute('home', arguments);
    },

    newFoodMeeting: function () {
      this.requireRoute('food-meeting/new', arguments);
    },

    registerFoodMeeting: function () {
      this.requireRoute('food-meeting/register', arguments);
    },

    start: function () {
      Backbone.history.start();
    }
  });

  return new Router();
});