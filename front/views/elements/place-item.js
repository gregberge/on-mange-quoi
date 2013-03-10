define(
  ['jquery', 'lib/views/template', 'text!templates/partials/place-item.mustache'],
  function($, TemplateView, template) {
    var View = TemplateView.extend({
      template: template
    });

    return View;
  });