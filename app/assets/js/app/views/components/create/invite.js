define([
  'lib/views/template',
  'text!tpl/components/create/invite.mustache'
],
function (
  View,
  template
) {
  return View.extend({

    template: template,

    events: {
      'submit form': 'onSubmit'
    },

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
    },

    toJSON: function () {
      var data = View.prototype.toJSON.apply(this, arguments);

      data.link = window.location.protocol + '//' + window.conf.domain + '/' + this.model.get('hash');

      return data;
    },

    render: function () {
      View.prototype.render.apply(this, arguments);

      return this;
    },

    onSubmit: function (event) {
      event.preventDefault();
    }
  });
});