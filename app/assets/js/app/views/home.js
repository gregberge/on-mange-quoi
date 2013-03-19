define([
  'lib/views/template',
  'text!tpl/home.hbs'
],
function (
  View,
  template
) {
  return View.extend({

    template: template
  });
});