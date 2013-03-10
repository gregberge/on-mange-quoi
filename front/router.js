define(
  ['backbone'],
  function (Backbone) {

    var Router = Backbone.Router.extend( {

      routes : {
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

      initialize: function () {
        this.views = [];

        var self = this,
        name,
        handleRouteConfig = function (name) {
          var routeConfig = self.routes[name];
          self.route(routeConfig.path, name, function () {
            self.routeHandler(routeConfig, arguments);
          });
        };

        for (name in this.routes) {
          handleRouteConfig(name);
        }
      },

      routeHandler: function (route, params) {
        var self = this;

        if(route.redirect) {
          this.navigate(route.redirect, {trigger: true, replace: true});
          return ;
        }

        if (typeof self.views[route.page] !== 'undefined') {
          this.renderPage(route.page);
        }
        else {
          require(['views/pages/util/loading'], function (LoadingView) {
            if(typeof self.loadingView === 'undefined') {
              self.loadingView = new LoadingView();
            }

            self.loadingView.render();

            require(['views/pages/' + route.page], function (PageView) {
              self.views[route.page] = new PageView();
              self.renderPage(route.page, params);
            });
          });
        }
      },

      renderPage: function (page, params) {
        var pageView = this.views[page];

        pageView.urlParams = params;

        if(typeof pageView.load !== 'undefined') {
          pageView.load();
        }

        pageView.render();
      },

      start: function () {
        var hash;

        if (window.location.hash) {
          hash = window.location.hash;
        }
        else {
          hash = window.location.pathname;
        }

        if (typeof window.history === 'object' && typeof window.history.replaceState === 'function') {
          window.history.replaceState(null, null, '/');
          window.location.hash = hash;

          Backbone.history.start();
        }
        else {
          window.location = '/#' + hash;
        }
      }

    });

    return new Router();
  }
);