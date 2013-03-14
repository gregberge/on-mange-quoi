define([
  'lib/views/base',
  'app/router',
  'app/views/components/nav'
],
function (
  View,
  router,
  NavView
) {
  return View.extend({

    el: $('body'),

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.pageView = null;
      this.navView = new NavView();

      router.start();
      router.on('change:page', this.onPageChange, this);
    },

    onPageChange: function (pageView) {

      // stop listening last page
      if (this.pageView) {
        this.pageView.stopListening();
      }

      this.pageView = pageView;
      this.renderPage();
    },

    render: function () {
      this.assign('.navbar', this.navView);

      this.renderPage();

      return this;
    },

    renderPage: function () {
      if (this.pageView) {
        this.assign('#page', this.pageView);
      }
    }
  });
});