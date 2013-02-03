define(
  ['jquery', 'lib/views/template'],
  function($, TemplateView) {

    var PageView = TemplateView.extend({

      el: $('#page')
      
    });

    return PageView;
  });