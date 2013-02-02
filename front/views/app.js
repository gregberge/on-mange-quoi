define(
  ['jquery', 'lib/views/base', 'router'],
  function($, BaseView, router) {
    var View = BaseView.extend({

      el: $('body'),

      initialize: function() {
        BaseView.prototype.initialize.call(this);
        router.start();
      }

    });

    return View;
  });