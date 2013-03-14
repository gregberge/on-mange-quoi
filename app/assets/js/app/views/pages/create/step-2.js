define(
  ['underscore', 'jquery', 'js/lib/views/page', 'text!tpl/pages/create/step-2.mustache'],
  function(_, $, PageView, template) {

    var View = PageView.extend({
      template: template,

      link: function () {
        return 'http://on-mange-quoi.co/m/' + this.foodMeeting.get('hash');
      }
    });

    return View;
  });