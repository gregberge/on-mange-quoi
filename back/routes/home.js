var route = {
  show: function (req, res) {
    res.render('layouts/main', {
      partials: {
        content: '../pages/home'
      }
    });
  }
};

module.exports = exports = route;