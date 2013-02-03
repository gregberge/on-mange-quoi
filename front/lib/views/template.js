define(
  ['lib/views/base', 'hogan'],
  function(BaseView, hogan) {
    
    var View = BaseView.extend({

      initialize: function() {
        this.template = hogan.compile(this.template);
      },

      render: function() {
        this.$el.html(this.template.render(this));
        return this;
      }
    });

    return View;
  });