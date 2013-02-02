define(
  ['views/app'],
  function (AppView) {
    window.app = new AppView();
    window.app.render();
  });