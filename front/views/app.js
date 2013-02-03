define(
  ['jquery', 'lib/views/base', 'views/elements/nav', 'router'],
  function($, BaseView, NavView, router) {
    var View = BaseView.extend({

      el: $('body'),

      initialize: function () {
        BaseView.prototype.initialize.call(this);
        this.nav = new NavView();

        router.start();
      },

      render: function () {
        this.nav.render();
      }

    });

    return View;
  });