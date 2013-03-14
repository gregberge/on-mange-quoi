define(
  ['jquery', 'js/lib/views/template', 'text!tpl/partials/place-item.mustache'],
  function($, TemplateView, template) {
    var View = TemplateView.extend({
      template: template
    });

    return View;
  });