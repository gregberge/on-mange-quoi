define(
  ['lib/views/page', 'text!templates/pages/home.mustache', 'router'],
  function(PageView, template, router) {

    var View = PageView.extend({

      template: template,

      render: function () {
        PageView.prototype.render.call(this);

        this.$('.btn-create').on('click', function () {
          router.navigate('create', {trigger: true});
          return false;
        });
      }

    });

    return View;
  });