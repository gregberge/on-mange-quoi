var app = require(global.base + '/config/application');

module.exports = exports = {
  show: function (req, res) {
    res.render('layouts/main', {
      env: {
        production: app.settings.env === 'production',
        development: app.settings.env === 'development'
      }
    });
  }
};