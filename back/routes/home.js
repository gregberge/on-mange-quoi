var route = {
  show: function (req, res) {
    res.render('layouts/main', {
      env: {
        production: process.env.NODE_ENV === 'production',
        development: ! process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      partials: {
        content: '../pages/home'
      }
    });
  }
};

module.exports = exports = route;