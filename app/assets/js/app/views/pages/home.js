define([
  'lib/views/template',
  'text!tpl/pages/home.mustache',
  'app/router'
],
function (
  View,
  template,
  router
) {
  return View.extend({

    template: template,

    events: {
      'click .btn-create': 'onClickCreate'
    },

    onClickCreate: function (event) {
      event.preventDefault();

      router.navigate('create', {trigger: true});
    }

  });
});