define([
  'lib/views/template',
  'text!tpl/pages/create.mustache'
],
function (View, template) {
  return View.extend({

    template: template,

    initialize: function () {
      View.prototype.initialize.call(this);
    }
  });
});