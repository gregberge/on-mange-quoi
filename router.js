var router = function (app) {
  app.get('/', function (req, res) {
    res.render('layouts/main');
  });
};

exports = module.exports = router;