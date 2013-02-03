var router = function (app) {
  app.get('/', require('./routes/home').show);
  app.get('/api/foursquare-venue', require('./routes/api/foursquare-venue').findAll);
  app.get('/api/food-meeting', require('./routes/api/food-meeting').findAll);
  app.post('/api/food-meeting', require('./routes/api/food-meeting').add);
};

exports = module.exports = router;