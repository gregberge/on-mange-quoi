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
      ''            : 'home',
      'create'      : 'create',
    },

    initialize: function () {
      this.page = null;
    },

    setPage: function (page) {
      require(['app/views/pages/' + page], _.bind(this.onRequirePage, this));
    },

    onRequirePage: function (PageView) {
      this.page = new PageView();
      this.trigger('change:page', this.page);
    },

    home: function () {
      this.setPage('home');
    },

    create: function () {
      this.setPage('create');
    },

    start: function () {
      Backbone.history.start();
    }
  });

  return new Router();
});