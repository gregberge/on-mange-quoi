define(
  ['underscore', 'jquery', 'lib/views/page', 'text!templates/pages/create/step-2.mustache'],
  function(_, $, PageView, template) {

    var View = PageView.extend({
      template: template,

      link: function () {
        return 'http://on-mange-quoi.co/m/' + this.foodMeeting.get('hash');
      }
    });

    return View;
  });