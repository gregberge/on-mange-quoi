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

    initialize: function() {
      View.prototype.initialize.apply(this, arguments);

      router.on('all', this.onRouteChange, this);
    },

    onClickBrand: function (event) {
      event.preventDefault();

      router.navigate('', {trigger: true});
    },

    onRouteChange: function(route) {
      var matches;

      if (route) {
        if (matches = route.match(/:(.*)/)) {
          this.page = matches[1];
          this.render();
        }
      }
    },

    render: function() {
      View.prototype.initialize.apply(this, arguments);

      this.$('.nav li')
      .removeClass('active')
      .filter('[data-route="' + this.page + '"]')
      .addClass('active');
    }
  });
});