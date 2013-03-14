define(['js/lib/views/base', 'js/router', 'js/views/pages/create/step-1', 'js/views/pages/create/step-2', 'js/models/food-meeting'],
  function (Base, router, Step1, Step2, FoodMeeting) {
    var View = Base.extend({
      initialize: function () {
        Base.prototype.initialize.call(this);

        var self = this;

        this.currentStep = 1;

        this.foodMeeting = new FoodMeeting();

        this.step1 = new Step1();
        this.step1.foodMeeting = this.foodMeeting;

        this.step2 = new Step2();
        this.step2.foodMeeting = this.foodMeeting;

        router.route('create/step-1', 'create/step-1', function () {
          self.step1.render();
        });

        router.route('create/step-2', 'create/step-2', function () {
          self.step2.render();
        });

        this.step1.on('done', function () {
          router.navigate('create/step-2', {trigger: true});
        });
      },

      load: function () {
        router.navigate('create/step-1', {trigger: true});
      }
    });

    return View;
  });