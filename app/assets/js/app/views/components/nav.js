define([
  'lib/views/base',
  'app/router'
],
function (
  View,
  router
) {
  return View.extend({

    events: {
      'click .brand': 'onClickBrand'
    },

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.route = null;

      router.on('route', this.setRoute, this);
    },

    render: function () {
      View.prototype.render.apply(this, arguments);

      this.$('.nav li')
      .removeClass('active')
      .filter('[data-route="' + this.route + '"]')
      .addClass('active');
    },

    setRoute: function (route) {
      this.route = route;
      this.render();
    },

    onClickBrand: function (event) {
      event.preventDefault();

      router.navigate('', {trigger: true});
    }
  });
});