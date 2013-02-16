define(
  ['jquery', 'lib/views/base', 'router'],
  function($, BaseView, router) {
    var View = BaseView.extend({

      el: $('.navbar'),

      initialize: function() {
        BaseView.prototype.initialize.call(this);
        router.on('all', this.routeChange, this);

        this.$('.brand').on('click', function () {
          router.navigate('', {trigger: true});
          return false;
        });
      },

      render: function() {
        BaseView.prototype.render.call(this);
        this.$('.nav li')
        .removeClass('active')
        .filter('[data-route="' + this.page + '"]')
        .addClass('active');
      },

      routeChange: function(route) {
        if (typeof route !== 'undefined') {
          var matches = route.match(/:(.*)/),
          name;
          if (matches) {
            name = matches[1];
            this.page = name;
            this.render();
          }
        }
      }
    });

    return View;
  });