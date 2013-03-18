define([
  'lib/views/base'
],
function (
  View
) {
  return View.extend({

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);

      this.template = Hogan.compile(this.template);
    },

    toJSON: function () {
      var data = {};

      if (this.model) {
        data.model = this.model.toJSON();
      }

      if (this.collection) {
        data.collection = this.collection.toJSON();
      }

      return data;
    },

    render: function () {
      View.prototype.render.apply(this, arguments);

      this.$el.html(this.template.render(this.toJSON()));
      return this;
    }

  });
});