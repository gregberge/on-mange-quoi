define(
  ['js/lib/views/page', 'text!tpl/pages/util/loading.mustache'],
  function(PageView, template) {
    var View = PageView.extend({
      template: template
    });
    return View;
  }
);