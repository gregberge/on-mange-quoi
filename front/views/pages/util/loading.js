define(
  ['lib/views/page', 'text!templates/pages/util/loading.mustache'],
  function(PageView, template) {
    
    var View = PageView.extend({
      template: template
    });

    return View;
  });