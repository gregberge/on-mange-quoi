define([
  'lib/views/base'
],
function (
  View
) {
  return View.extend({

    initialize: function() {
      this.template = Hogan.compile(this.template);
    },

    render: function() {
      this.$el.html(this.template.render(this));
      return this;
    }

  });
});